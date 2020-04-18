import http from 'http';
import fsex from 'fs-extra';
import path from 'path';
import partialSend from 'send';
import { getVideoRoot } from './config';
import * as qs from 'query-string';
import { db as connections } from './common/database';
const db = connections.default;

export const wrapCallback = function(cb: http.RequestListener) {
    return async (req: http.IncomingMessage, rsp: http.ServerResponse) => {
        const query = qs.parseUrl(req.url);
        const aUrl = `path:${query.url}`; // 防止尋取代時不要出錯。
        const sid = getSessionId(req.headers.cookie);
        const srcRecord = await db.oneOrNone('select data from session WHERE session_id like $(sid)', {sid}) || {data: {}};

        if(aUrl.startsWith('path:/media')) {
            const rpath = aUrl.replace('path:/media', '');
            const root = getVideoRoot(srcRecord.data.video_src);
            const fullpath = path.join(root, rpath);

            if(!await fsex.pathExists(fullpath) && query.query.default === 'jpg') {
                partialSend(req, path.join(root, 'default.jpg')).pipe(rsp);
            } else {
                partialSend(req,  fullpath, {
                    acceptRanges: true
                }).pipe(rsp);
            }
        } else {
            cb(req, rsp);
        }
    }
}

const getSessionId = function(cookie: string) {
    if (!!!cookie) { return ''; }
    if (cookie.indexOf('koa_nasvideo') < 0) { return ''; }

    const pattern = /koa_nasvideo=([\w\d-]*);/;
    return pattern.exec(cookie)[1];
}