import Router from 'koa-router';
import acl from './acl';
import fs from './fs';
import video from './video';

export default new Router()
    .use(acl.routes())
    .use(fs.routes())
    .use(video.routes())
    ;
