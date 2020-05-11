import Router from 'koa-router';
import { ServiceContext } from '../types';
import { db as connections } from '../common/database';
import { VideoFS } from '../videofs/video_fs';
import { VideoFile } from '../videofs/video_file';
import path from 'path';
import { prepareVideoInfo } from '../common/middlewares';

const db = connections.default;
export class FS {

    public static async list(ctx: ServiceContext) {
        const { videoRoot } = ctx;
        const { q = '.', all = false } = ctx.query;

        const vr = new VideoFS(videoRoot);
        const pathInfoList = await vr.list(q, all);

        ctx.body = {
            videos: pathInfoList
                .map(v => {
                    const video = new VideoFile(vr, v);
                    return {
                        name: v.name,
                        path: v.getPath(),
                        size: v.isDir ? 0 : v.size,
                        isFile: v.isFile,
                        format: video.format,
                        isVideo: VideoFile.isVideo(v),
                        containsZoemd: VideoFile.isVideo(v) ? video.containsZoemd() : false,
                        create_time: v.createTime
                    };
                })
        };
    }

    public static async move_to_parent(ctx: ServiceContext) {
        const { vfs } = ctx;

        const dirname = path.dirname(ctx.vod.absolutePath);
        const basename = path.basename(ctx.vod.absolutePath);
        await vfs.moveVideo(ctx.vod.absolutePath, `${dirname}/../${basename}`);

        ctx.body = {
            success: true,
        }
    }

    public static async delete(ctx: ServiceContext) {
        const { vfs } = ctx;
        const { path } = ctx.params;

        if (!path) throw new Error('沒有指定 path 參數。');

        try {
            await vfs.delete(path);

            ctx.body = {
                success: true,
                path: path,
            }
        } catch (error) {
            ctx.status = 404;
            ctx.body = {
                success: false,
                message: error.message,
            }
        }

        // const dirname = path.dirname(ctx.vod.absolutePath);
        // const basename = path.basename(ctx.vod.absolutePath);
        // await vfs.move(ctx.vod.absolutePath, `${dirname}/../${basename}`);

    }
}

export default new Router()
    .use(prepareVideoInfo)
    .delete('/fs/:path', FS.delete)
    .get('/fs/list', FS.list)
    .get('/fs/move_to_parent', FS.move_to_parent)
    ;
