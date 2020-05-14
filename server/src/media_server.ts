import http from 'http';
import fsex from 'fs-extra';
import path from 'path';
import partialSend from 'send';
import { getVideoRoot } from './config';
import * as qs from 'query-string';
import { db as connections } from './common/database';

export const wrapCallback = function(cb: http.RequestListener) {
    return async (req: http.IncomingMessage, rsp: http.ServerResponse) => {

        const mongo = connections.mongodb;
        const session = mongo.collection('session');

        const query = qs.parseUrl(req.url);
        const aUrl = `path:${decodeURIComponent(query.url)}`; // 防止尋取代時不要出錯。
        const src = query.query.src;
        const sid = getSessionId(req.headers.cookie);
        const srcRecord = (await session.findOne({ session_id: sid })) || { data: {} }

        if(aUrl.startsWith('path:/media')) {
            const rpath = aUrl.replace('path:/media', '');
            // 有指定 src 為優先。
            const root = getVideoRoot(src || srcRecord.data.video_src);
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

    const pattern = /koa_nasvideo=([\w\d-]*);?/;
    return pattern.exec(cookie)[1];
}