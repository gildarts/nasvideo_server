import Router from 'koa-router';
import { ServiceContext } from '../types';
import { db as connections } from '../common/database';
import { VideoFS } from '../common/video_fs';
import { VideoFile } from '../common/video_file';

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
                    format: new VideoFile(v).format,
                    isVideo: VideoFile.isVideo(v)
                };
            })
        };
    }

    public static async video(ctx: ServiceContext) {
        const vod = `/Volumes/video/tvmv/4k_video/8k_181006 (HELLOVENUS), (NARA)(FANCAM).mkv`;

        ctx.body = {};
    }
}

export default new Router()
    .get('/fs/list', FS.list)
    .get('/fs/video', FS.video)
    ;
