import Router from 'koa-router';
import fs from './fs';
import video from './video';
import acl from './acl';
import zoemd from './zoemd';

export default new Router()
    .use(fs.routes())
    .use(video.routes())
    .use(acl.routes())
    .use(zoemd.routes())
    ;
