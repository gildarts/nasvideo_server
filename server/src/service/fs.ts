import Router from 'koa-router';
import { ServiceContext } from '../types';
import { db as connections } from '../common/database';
import { VideoRoot } from '../common/file_system';

const db = connections.default;

export class FS {

    public static async list(ctx: ServiceContext) {
        const { videoRoot } = ctx;
        const { q = '.' } = ctx.query;

        const vr = new VideoRoot(videoRoot);
       
        const pathInfoList = await vr.list(q);

        ctx.body = {
            videos: pathInfoList.map(v => {
                return {
                    path: v.path,
                    name: v.name,
                    isFile: v.isFile, 
                    size: v.size, 
                    format: v.format
                };
            })
        };
    }

}

export default new Router()
    .get('/fs/list', FS.list)
    ;
