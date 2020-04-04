import Router from 'koa-router';
import { ServiceContext } from '../types';
import { db as connections } from '../common/database';
import { VideoRoot, VideoFile } from '../common/file_system';

const db = connections.default;

export class FS {

    public static async list(ctx: ServiceContext) {
        const { videoRoot } = ctx;
        const { q = '.' } = ctx.query;

        const vr = new VideoRoot(videoRoot);
        const pathInfoList = await vr.list(q, true);

        ctx.body = {
            videos: pathInfoList
            .map(v => {
                return {
                    name: v.name,
                    path: v.getPath(),
                    size: v.isDir ? 0 : v.size, 
                    isFile: v.isFile, 
                    format: new VideoFile(v).format,
                    isVideo: VideoFile.isVideo(v)
                };
            })
        };
    }

}

export default new Router()
    .get('/fs/list', FS.list)
    ;
