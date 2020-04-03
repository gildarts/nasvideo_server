import { db } from './database';

export class ACLQuery {

    constructor(private roleCodeList: string[]) {
    }

    /**
     * 判斷該角色有沒有該代碼的權限。
     * @param permissionCodeList 權限代碼。
     */
    public async has(permissionCodeList: string[]) {
        const sql = `
        select count(*)
        from "role" r join "rp_contains" rp on r.id = rp.ref_role_id
            join "permission" perm on perm.id = rp.ref_permission_id
        where r.code in ($(rcode:list)) and perm.code in ($(pcode:list))
        `

        const record = await db.default.one(sql, {pcode: permissionCodeList, rcode: this.roleCodeList});

        return record.count > 0;
    }
}
