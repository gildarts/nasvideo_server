import Router from 'koa-router';
import { ServiceContext } from '../types';
import { db as connections } from '../common/database';
const db = connections.default;

export class FS {

    public static async list(ctx: ServiceContext) {
        const records = await db.manyOrNone('select * from savior');
        ctx.body = records;
    }

}

export default new Router()
    .get('/fs/list', FS.list)
    ;
