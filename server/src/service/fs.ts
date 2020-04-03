import Router from 'koa-router';
import { ServiceContext } from '../types';
import { db as connections } from '../common/database';
import fsex from 'fs-extra';
import path from 'path';

const db = connections.default;

export class FS {

    public static async list(ctx: ServiceContext) {
        const { videoRoot } = ctx;
        const { q = '.' } = ctx.query;

        const dirs = await fsex.readdir(path.join(videoRoot, q));
        const pathList = dirs.map(v => path.join(videoRoot, q, v));

        const pathInfoList = []
        for(const fp of pathList) {
            const fpstat = await fsex.stat(fp);
            pathInfoList.push({
                name: fp,
                isDir: fpstat.isDirectory(),
                isFile: fpstat.isFile(),
                size: fpstat.size,
            });
        }

        ctx.body = {
            videos: pathInfoList
        };
    }

}

export default new Router()
    .get('/fs/list', FS.list)
    ;
