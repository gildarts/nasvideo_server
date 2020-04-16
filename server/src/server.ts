import http from 'http';
import Koa from 'koa';
import serve from 'koa-static';
import send from 'koa-send';
import partialSend from 'send';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser'
import createSession from './common/session_store';
import { setupDBConnection, checkSessionData, setXFrameOptionsDENY, setVideoRoot } from './common/middlewares';
import allservice from './service';
import { getVideoRoot } from './config';
import * as qs from 'query-string';
import { db as connections } from './common/database';
const db = connections.default;

const PORT = process.env.PORT || 3000;

async function main(app: Koa) {
    app.keys = ['1234'];

    // 靜態檔案。
    app.use(serve("./public"));

    app.use(bodyParser());
    app.use(setupDBConnection);
    app.use(createSession(app));
    app.use(checkSessionData);
    app.use(setVideoRoot);

    // 所有 server side 程式都由 /service 路徑開始。
    const general = new Router();
    general.use('/service', allservice.routes());
    app.use(general.routes());

    // 設定 X-Frame-Options: DENY，安全性掃描需要。
    app.use(setXFrameOptionsDENY);

    // 處理 html5 mode。
    app.use(async (ctx) => {
        console.log(`resource not found: 「${ctx.path}」, fallback to 「/index.html」.`);
        await send(ctx, "./public/index.html"); // html5 mode
    });

    const callback = wrapCallback(app.callback());
    const server = http.createServer(callback).listen(PORT);

    (app as any).server = server;

    console.log('complete');
}

const wrapCallback = function(cb: http.RequestListener) {
    return async (req: http.IncomingMessage, rsp: http.ServerResponse) => {
        const query = qs.parseUrl(req.url);
        const aUrl = `path:${query.url}`; // 防止尋取代時不要出錯。
        const srcRecord = await db.one('select name from library where id = 1');

        if(aUrl.startsWith('path:/media')) {
            const rpath = aUrl.replace('path:/media', '');
            const root = getVideoRoot(srcRecord.name);
            partialSend(req,  `${root}${rpath}`, {
                acceptRanges: true
            }).pipe(rsp);
        } else {
            cb(req, rsp);
        }
    }
}

main(new Koa());


