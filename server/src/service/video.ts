import Router from 'koa-router';
import { VideoFS } from '../videofs/video_fs';
import { VideoFile } from '../videofs/video_file';
import { VideoMedia } from '../videofs/video_media';
import { FFMpeg } from '../ffmpeg';
import { ServiceContext } from '../types';
import { Util } from '../videofs/util';

import fs from 'fs-extra';

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
        const { video, seconds } = ctx.request.body;

        const v = video;
        const vfs = new VideoFS(videoRoot);
        const vod = await VideoFile.fromFile(vfs, v);

        const ffmpeg = new FFMpeg(vod.absolutePath);

        const success = await ffmpeg.takeScreenshot(seconds);
        ctx.body = {
            status: success
        };
    }

    public static async createZoemd(ctx: ServiceContext) {
        const { videoRoot } = ctx;
        const { video, force = false } = ctx.request.body;

        const vfs = new VideoFS(videoRoot);
        const vod = await VideoFile.fromFile(vfs, video);

        const result = await VideoMedia.createMedia(vfs, vod, force);
        ctx.body = result || {
            status: 'exists'
        }
    }

    public static async getZoemd(ctx: ServiceContext) {
        const { videoRoot } = ctx;
        const { video } = ctx.request.query;

        const vfs = new VideoFS(videoRoot);
        const vod = await VideoFile.fromFile(vfs, video);
        const media = new VideoMedia(vod);

        ctx.body = await media.getZoemd();
    }
}

export default new Router()
.get('/video/metadata', Video.metadata)
.post('/video/screenshot', Video.screenshot)
.post('/video/zoemd', Video.createZoemd)
.get('/video/zoemd', Video.getZoemd)
;