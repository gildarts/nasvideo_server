import Router from 'koa-router';
import acl from './acl';
import fs from './fs';

export default new Router()
    .use(acl.routes())
    .use(fs.routes())
    ;
