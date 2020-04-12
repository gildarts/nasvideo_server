import Router from 'koa-router';
import { ServiceContext } from '../types';
import { db as connections } from '../common/database';
import { VideoFS } from '../videofs/video_fs';
import { VideoFile } from '../videofs/video_file';
import { FFMpeg } from '../ffmpeg';

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

    public static async metadata(ctx: ServiceContext) {
        const { videoRoot } = ctx;
        const { video } = ctx.query;

        const vfs = new VideoFS(videoRoot);
        const vod = await VideoFile.fromFile(vfs, video);

        const ffmpeg = new FFMpeg(vod.absolutePath);

        const metadata = await ffmpeg.getMetadata();
        ctx.body = metadata;
    }

    public static async screenshot(ctx: ServiceContext) {
        const { videoRoot } = ctx;
        const { video, seconds } = ctx.query;

        const v = video;
        const vfs = new VideoFS(videoRoot);
        const vod = await VideoFile.fromFile(vfs, v);

        const ffmpeg = new FFMpeg(vod.absolutePath);

        const success = await ffmpeg.takeScreenshot(seconds);
        ctx.body = {
            status: success
        };
    }
}

export default new Router()
    .get('/fs/list', FS.list)
    .get('/fs/metadata', FS.metadata)
    .get('/fs/screenshot', FS.screenshot)
    ;
