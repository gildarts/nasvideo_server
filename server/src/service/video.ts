import Router from 'koa-router';
import { VideoFS } from '../videofs/video_fs';
import { VideoFile } from '../videofs/video_file';
import { FFMpeg } from '../ffmpeg';
import { ServiceContext } from '../types';

export class Video {
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
.get('/video/metadata', Video.metadata)
.get('/video/screenshot', Video.screenshot)
;