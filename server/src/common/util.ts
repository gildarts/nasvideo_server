import { Context } from 'koa';
import { ServiceContext } from '../hlc_types';

export class Util {
    static getClientAddress(ctx: Context) {
        return (ctx.request.headers['x-forwarded-for'] || '').split(',')[0] || ctx.request.ip;
    }

    static async AddActionLog(ctx: ServiceContext, action: string) {
        const data = (ctx.method === 'GET') ? ctx.request.querystring : JSON.stringify(ctx.request.body) ;
        const srv_name = action ;
        const uuid = ctx.session.userInfo.uuid ;
        const name = ctx.session.userInfo.name ;
        const email = ctx.session.userInfo.email ;
        const ip = Util.getClientAddress(ctx) ;
        const cmd = `
            INSERT INTO user_action_log (
                uuid
                , action
                , data
                , name
                , email
                , ip
            )
            VALUES (
                $1, $2, $3, $4, $5, $6
            );
        `;

        await ctx.db.none(cmd, [ uuid, srv_name, data, name, email, ip]);

    }
}