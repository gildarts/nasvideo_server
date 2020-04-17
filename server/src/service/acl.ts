import Router from 'koa-router';
import { ServiceContext } from '../types';
import { db as connections } from '../common/database';
const db = connections.default;

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

}

export default new Router()
    .get('/acl/source', ACL.source)
    ;
