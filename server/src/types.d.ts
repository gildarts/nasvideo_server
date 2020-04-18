import { Context } from 'koa';
import { RouterContext } from 'koa-router';
import { PGConnection } from './common/database';
import { VideoFS } from './videofs/video_fs';
import { VideoFile } from './videofs/video_file';
import { VideoMedia } from './videofs/video_media';

declare interface HLCContext {
    db: PGConnection;

    /**
     * 影片 root，透過「config.json」設定。
     */
    videoRoot: string;

    /** 影片檔案系統。 */
    vfs: VideoFS;

    /** 影片資訊。 */
    vod: VideoFile;

    /** 影片媒體資訊。 */
    media: VideoMedia;
}

declare type ServiceContext = Context & RouterContext & HLCContext;
