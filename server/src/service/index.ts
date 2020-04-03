import Router from 'koa-router';
import acl from './acl';

export default new Router()
    .use(acl.routes())
    ;
