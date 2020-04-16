import Router from 'koa-router';
import fs from './fs';
import video from './video';

export default new Router()
    .use(fs.routes())
    .use(video.routes())
    ;
