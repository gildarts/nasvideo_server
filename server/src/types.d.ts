import { Context } from 'koa';
import { RouterContext } from 'koa-router';
import { PGConnection } from './common/database';

declare interface HLCContext {
    db: PGConnection;

    /**
     * 影片 root，透過「config.json」設定。
     */
    videoRoot: string;
}

declare type ServiceContext = Context & RouterContext & HLCContext;
