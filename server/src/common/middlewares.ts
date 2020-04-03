import { ServiceContext } from '../types';
import { db } from './database';
import { getVideoRoot } from '../config';

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
    ctx.videoRoot = getVideoRoot(ctx);
    return next();
};
