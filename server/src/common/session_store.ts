import { db } from './database';
import KoaSession from 'koa-session';
import Koa from 'koa';

const TableName = 'session';

const db_store = {
    get: async (key: string, maxAge: number, { rolling }: { rolling: any }) => {
        try {
            const mongodb = db.mongodb;

            const session = mongodb.collection(TableName);
            const bsonRecord = await session.findOne({session_id: key});

            if (bsonRecord) {
                const data = bsonRecord.data || {};
                data._id = key;
                return data;
            } else {
                return null;
            }
        } catch(err) {
            return { __session_error: err };
        }
    },
    set: async (key: string, sess: any, maxAge: number, { rolling, changed }: { rolling: any, changed: any }) => {

        try {
            if (!changed) return;

            const mongodb = db.mongodb;
            const session = mongodb.collection(TableName);

            await session.findOneAndUpdate({ session_id: key }, {
                $set: { data: sess, expiration: new Date() }
            }, {
                upsert: true
            });
        } catch (error) {
            console.error(`set session occure error: ${error.message}`);
        }
    },
    destroy: async (key: string) => {
        const mongodb = db.mongodb;
        const session = mongodb.collection(TableName);

        await session.deleteOne({
            session_id: key
        });
    }
};

const session_conf = {
    key: 'koa_nasvideo', /** (string) cookie key (default is koa:sess) */
    maxAge: 24 * 60 * 60 * 1000, // 用戶端 cookie 過期時間，多久沒使用 cookie 會失效。
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: true, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: true, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
    store: db_store,
    valid(ctx: any, session: any) {
        
        if (session.__session_error) {
            // 後續由 middleware 判斷是否有發生錯誤。
            ctx.session_error = session.__session_error;
            return false;
        } else {
            return true;
        }
    }
};

export default (app: Koa) => {
    return KoaSession(session_conf, app)
}
