import Router from 'koa-router';
import { ServiceContext } from '../types';
import { db as connections } from '../common/database';

export class ACL {

    public static async source(ctx: ServiceContext) {
        const { src } = ctx.query;

        ctx.session.video_src = src;

        ctx.body = `
        <html>
            <body><a href="/">${src || 'default'}</a></body>
        </html>
        `;
    }

    public static async mongodb(ctx: ServiceContext) {
        const mongo = connections.mongo;

        const coll = mongo.db('underground').collection('session');

        const ret = await coll.insert({
            session_id: 'string-xxxx-zoe', 
            create_at: new Date(),
            data: {
                names: [
                    'cindy',
                    'sandy'
                ],

            }
        });

        const records = await coll.find().toArray();

        ctx.body = {
            news: ret.insertedIds,
            records
        }
    }

    public static async deleteall(ctx: ServiceContext) {
        const mongo = await connections.mongo;

        const coll = mongo.db('underground').collection('session');

        const result = await coll.deleteMany({});

        ctx.body = {
            result
        }
    }

}

export default new Router()
    .get('/acl/source', ACL.source)
    .get('/acl/mongodb', ACL.mongodb)
    .get('/acl/deleteall', ACL.deleteall)
    ;
