import { Session} from 'koa-session'
import { db } from './database'

export type OAuthProvider = '';

export class Auth {

    constructor(
        private session: Session,
    ) { }

    /** 載入登入狀態，包含基本資料與權限 */
    public async load(args: AccountQueryArgs) {

    }

    public async loadByUUID(uuid: string) {

        let record: any;

        const cmd = `
            select "id", user_id, auth_uuid from "ann_user"
            where auth_uuid = $(uuid)
            limit 1;`;

        record = await db.default.oneOrNone(cmd, { uuid });

        /** 帳號不存在。 */
        if (!!!record) { return false; }

        this.record = {
            id: record.id,
            account: record.account,
            auth_uuid: record.auth_uuid,
        } as AccountRecord;

        return !!record;
    }

    /** 載入登入狀態，包含基本資料與權限。 */
    public async loadByID(id: number) {

        let record: any;

        const cmd = `
            select "id", user_id, auth_uuid from "ann_user"
            where id = $(id)
            limit 1;`;

        record = await db.default.oneOrNone(cmd, { id });

        /** 帳號不存在。 */
        if (!!!record) { return false; }

        this.record = {
            id: record.id,
            account: record.account,
            auth_uuid: record.auth_uuid,
        } as AccountRecord;

        return !!record;
    }

    public async reset() {
        this.record = null;
    }

    /** 是否已經登入。 */
    public get signed(): boolean { return !!this.id; }

    /** 使用者編號。 */
    public get id(): number { return this.record.id; }

    /** 使用者登入帳號。 */
    public get account(): string { return this.record.account; }

    public get auth_uuid(): string { return this.record.auth_uuid; }

    /** 讀取或寫入 session 資料。 */
    private get record(): AccountRecord {
        if (!this.session.auth_raw) {
            this.session.auth_raw = {};
        }

        return this.session.auth_raw;
    }

    private set record(state: AccountRecord) {
        this.session.auth_raw = state;
    }

    public getData() {
        return this.record;
    }

}

export interface AccountQueryArgs {

    id?: number;

    oauth_provider?: OAuthProvider;

    id_in_provider?: string;
}

export enum Role {
    // 系統管理員
    // 處端管理員
    // 處端承辦人
    // 學校管理員
    // 學校承辦人
    // 一般
}


// 代表資料庫中的使用者帳號記錄(useraccount)。
interface AccountRecord {

    id: number;

    account: string;

    auth_uuid: string;
}
