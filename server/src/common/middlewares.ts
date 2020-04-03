import { ServiceContext } from '../types';
import { db } from './database';
import { Auth } from './auth';
import { ACLQuery } from './acl_query';

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

export const setupAuthStatus = (ctx: ServiceContext, next: () => Promise<void>) => {
    ctx.auth = new Auth(ctx.session);
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

export const checkPermission = (permissions: string[]) => {

    return async (ctx: ServiceContext, next: () => Promise<void>) => {

        // 這裡要抓使用真正的角色清單。
        const acl = new ACLQuery(['admin']);

        if(!await acl.has(permissions)) {
            ctx.body = {
                code: 401,
                message: 'access deny!'
            }
            ctx.state = 401;
            return;
        }

        return next();
    }

}
