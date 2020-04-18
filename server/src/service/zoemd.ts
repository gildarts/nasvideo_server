import Router from 'koa-router';
import { VideoFile } from '../videofs/video_file';
import { VideoMedia } from '../videofs/video_media';
import { ServiceContext } from '../types';
import { FFMpeg } from '../ffmpeg';
import fs from 'fs-extra';
import path from 'path';

export class Zoemd {

    public static async zoemd_create(ctx: ServiceContext) {
        const { vod } = ctx;
        const { force = false } = ctx.request.body;

        const ffmpeg = new FFMpeg(vod.absolutePath);
        const metadata = await ffmpeg.getMetadata();
        delete metadata.origin;
        delete metadata.codec_type;

        const result = await VideoMedia.createMedia(vod, metadata, force);
        ctx.body = result || {
            status: 'exists'
        }
    }

    public static async zoemd_get(ctx: ServiceContext) {
        const { vod } = ctx;
        const media = new VideoMedia(vod);
        ctx.body = await media.getZoemd();
    }

    public static async screenshot_set(ctx: ServiceContext) {
        const { vod } = ctx;
        const { seconds } = ctx.request.body;     

        const media = new VideoMedia(vod);

        const ffmpeg = new FFMpeg(vod.absolutePath, media.getZoemdPath().dir);

        await ffmpeg.takeScreenshot([{
            seconds: +seconds,
            name: '' + Math.floor(+seconds)
        }]);

        await media.setScreenshot(+seconds);

        ctx.body = await media.getZoemd()
    }

    public static async screenshot_remove(ctx: ServiceContext) {
        const { vod } = ctx;
        const { seconds } = ctx.request.body;

        const media = new VideoMedia(vod);
        const dir = media.getZoemdPath().dir;
        
        const abandonFile = path.join(dir, `${Math.floor(+seconds)}.jpg`);

        if(await fs.pathExists(abandonFile)) {
            await fs.remove(abandonFile);
        }
        await media.removeScreenshot(+seconds);

        ctx.body = await media.getZoemd()
    }
    
}

export default new Router()
.use(async (ctx: ServiceContext, next: any) => {
    const { vfs } = ctx;

    let video = '';
    if(ctx.request.query?.video) {
        video = ctx.request.query.video;
    }

    if(ctx.request.body?.video) {
        video = ctx.request.body.video;
    }

    if(!video) {
        ctx.body = {
            status: 'not found!'
        }
        ctx.state = 404;
        return;
    }
    ctx.vod = await VideoFile.fromFile(vfs, video);

    return next();
})
.post('/zoemd', Zoemd.zoemd_create)
.get('/zoemd', Zoemd.zoemd_get)
.post('/zoemd/screenshot', Zoemd.screenshot_set)
.delete('/zoemd/screenshot', Zoemd.screenshot_remove)
;