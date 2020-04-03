import http from 'http';
import Koa from 'koa';
import serve from 'koa-static';
import send from 'koa-send';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser'
import createSession from './common/session_store';
import { setupDBConnection, setupAuthStatus, checkSessionData, setXFrameOptionsDENY } from './common/middlewares';
import allservice from './service';
import { FormDataParser } from './common/formdata_parser';

const PORT = process.env.PORT || 3000;

async function main(app: Koa) {
    app.keys = ['1234'];

    app.use(bodyParser());
    app.use(setupDBConnection);
    app.use(createSession(app));
    app.use(setupAuthStatus);
    app.use(checkSessionData);

    // 所有 server side 程式都由 /service 路徑開始。
    const general = new Router();
    general.use('/service', allservice.routes());
    app.use(general.routes());

    // 設定 X-Frame-Options: DENY，安全性掃描需要。
    app.use(setXFrameOptionsDENY);

    // 靜態檔案。
    app.use(serve("./public"));

    // 處理 html5 mode。
    app.use(async (ctx) => {
        console.log(`resource not found: 「${ctx.path}」, fallback to 「/index.html」.`);
        await send(ctx, "./public/index.html"); // html5 mode
    });

    const server = http.createServer(app.callback()).listen(PORT);
    (app as any).server = server;

    await FormDataParser.initPath();

    console.log('complete');
}

main(new Koa());


