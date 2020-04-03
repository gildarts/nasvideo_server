import { db } from './database';

export type CreateArgs = {
    uuid: string;
    account: string;
    name: string;
}

export class Account {

    constructor() { }

    /** 建立帳號，並回傳新帳號編號。 */
    public async create({ uuid, account, name }: CreateArgs) {

        let record: any;

        const cmd = `
            insert into "ann_user" (user_id, auth_uuid, name, passwd, "維護更新")
            values($(account), $(uuid), $(name), '登入不了的密碼', now())
            returning id;
            `;

        record = await db.default.one(cmd, {
            account,
            uuid,
            name
        });

        return record.id as number;
    }

    /** 更新帳號，並回傳帳號編號。 */
    public async update({ uuid, account, name }: CreateArgs) {

        let record: any;

        const cmd = `
            update "ann_user"
            set user_id = $(account), name = $(name)
            where auth_uuid = $(uuid)
            returning id;
            `;

        record = await db.default.one(cmd, {
            account,
            uuid,
            name
        });

        return record.id as number;
    }

    /** 新增使用者學校角色關係。同步時只新增，不刪除。 */
    public async insertUserSchoolRole(uid: number, schoolName: string, role: string) {

        let record: any;

        const cmdSchool = `SELECT id FROM boe_school WHERE name = $(schoolName);`;
        const schoolInfo = await db.default.oneOrNone(cmdSchool, { schoolName });
        if (schoolInfo) {
            const cmd = `
                INSERT INTO "us_role" (ref_user_id, ref_school_id, role)
                SELECT ($(uid), $(schoolId), $(role))
                WHERE
                    NOT EXISTS (
                        SELECT ref_school_id
                        FROM "us_role"
                        WHERE ref_user_id = $(uid) AND ref_school_id = $(schoolId) AND role = $(role)
                    )
                RETURNING id;
            `;
            record = await db.default.oneOrNone(cmd, {
                uid, schoolId: schoolInfo.id, role
            });

            return record.id as number;
        } else {
            return 0 as number;
        }
    }
}
