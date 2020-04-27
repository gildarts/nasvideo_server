import { ServiceContext } from '../types';
import { db } from './database';
import { getVideoRoot } from '../config';
import { VideoFS } from '../videofs/video_fs';
import { VideoFile } from '../videofs/video_file';

export const setXFrameOptionsDENY = (ctx: ServiceContext, next: () => Promise<void>) => {
    ctx.response.set({
        'X-Frame-Options': 'DENY',
    })
    return next();
}

export const setupDBConnection = (ctx: ServiceContext, next: () => Promise<void>) => {
    ctx.db = db.default;
    return next();
}


export const checkSessionData = (ctx: ServiceContext, next: () => Promise<void>) => {
    if(ctx.session_error) {
        const { message } = ctx.session_error;
        ctx.status = 500;
        ctx.body = { message };
    } else {
        return next();
    }
}

export const setVideoRoot = (ctx: ServiceContext, next: () => Promise<void>) => {   
    ctx.videoRoot = getVideoRoot(ctx.session.video_src);
    ctx.vfs = new VideoFS(ctx.videoRoot);
    return next();
};

export const prepareVideoInfo = async (ctx: ServiceContext, next: any) => {
    const { vfs } = ctx;

    let video = '';
    if (ctx.request.query?.video) {
        video = ctx.request.query.video;
    }

    if (ctx.request.body?.video) {
        video = ctx.request.body.video;
    }

    if (!video) {
        return next();
    }
    ctx.vod = await VideoFile.fromFile(vfs, video);

    return next();
}
