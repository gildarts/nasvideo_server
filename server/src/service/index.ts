import Router from 'koa-router';
import fs from './fs';
import video from './video';
import acl from './acl';

export default new Router()
    .use(fs.routes())
    .use(video.routes())
    .use(acl.routes())
    ;
