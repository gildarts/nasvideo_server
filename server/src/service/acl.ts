import Router from 'koa-router';
import { ServiceContext } from '../types';
import { db as connections } from '../common/database';
const db = connections.default;

export class ACL {

    public static async source(ctx: ServiceContext) {
        const { src } = ctx.query;

        await db.none('update library set "name"=$(src) where id = 1', {src});
        ctx.session.video_src = src;

        ctx.redirect('/');
    }

}

export default new Router()
    .get('/acl/source', ACL.source)
    ;
