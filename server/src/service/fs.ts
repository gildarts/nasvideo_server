import Router from 'koa-router';
import { ServiceContext } from '../types';
import { db as connections } from '../common/database';
import { VideoFS } from '../videofs/video_fs';
import { VideoFile } from '../videofs/video_file';

const db = connections.default;
export class FS {

    public static async list(ctx: ServiceContext) {
        const { videoRoot } = ctx;
        const { q = '.' } = ctx.query;

        const vr = new VideoFS(videoRoot);
        const pathInfoList = await vr.list(q);

        ctx.body = {
            videos: pathInfoList
            .map(v => {
                return {
                    name: v.name,
                    path: v.getPath(),
                    size: v.isDir ? 0 : v.size, 
                    isFile: v.isFile, 
                    format: new VideoFile(vr, v).format,
                    isVideo: VideoFile.isVideo(v)
                };
            })
        };
    }
}

export default new Router()
    .get('/fs/list', FS.list)
    ;
