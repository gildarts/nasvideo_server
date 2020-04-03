import Router from 'koa-router';
import { ServiceContext } from '../hlc_types';
import { db as connections } from '../common/database';
const db = connections.default;

export class ACL {

    public static async savior(ctx: ServiceContext) {
        const records = await db.manyOrNone('select * from savior');
        ctx.body = records;
    }

}

export default new Router()
    .get('/acl/savior', ACL.savior)
    ;
