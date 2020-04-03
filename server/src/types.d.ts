import { Context } from 'koa';
import { RouterContext } from 'koa-router';
import { PGConnection } from './common/database';
import { Auth } from './common/auth';

declare interface HLCContext {
    db: PGConnection;

    /** 目前使用者登入狀態。 */
    auth: Auth;
}

declare interface QAuthState {
    /** 登入完成之後要 redirect 的位置。 */
    restoreUrl: string;

    /** 第一次登入的註冊畫面。 */
    registerUrl: string;

    /** 從親師生來的可能會帶 dsns。 */
    dsns?: string;
}

declare type ServiceContext = Context & RouterContext & HLCContext;
