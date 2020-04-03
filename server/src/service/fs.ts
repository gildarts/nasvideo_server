import Router from 'koa-router';
import { ServiceContext } from '../types';
import { db as connections } from '../common/database';
import fs from 'fs-extra';
import conf, { getVideoRoot } from '../config';

const db = connections.default;

export class FS {

    public static async list(ctx: ServiceContext) {

        const root = getVideoRoot(ctx);

        const paths = await fs.readdir(root);

        const records = await db.manyOrNone('select * from savior');
        ctx.body = {
            videos: paths,
            data: records
        };
    }

}

export default new Router()
    .get('/fs/list', FS.list)
    ;
