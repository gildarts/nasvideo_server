import { db } from './database';
import { AnnRec } from '../common/formdata_parser';

export class MemberHelper {

    /** 取得學校清單 */
    public static get_all_schools() {
        const sql = `SELECT * FROM boe_school`;

        return db.default.manyOrNone(sql);
    }

    /** 取得我訂閱的公告 */
    public static get_subscribe_ann(userID: number) {
        const sql = `
WITH target_school AS(
    SELECT
        *
    FROM
        sb_school
    WHERE
        ref_user_id = $1
), target_department AS(
    SELECT
        *
    FROM
        sb_department
    WHERE
        ref_user_id = $1
), school AS(
    SELECT
        ann_school.id
        , 'school'::TEXT AS type
        , ann_school.title
        , ann_school.last_update_time AS time
        , ann_school.co_organizer
    FROM
        ann_school
        INNER JOIN target_school
            ON target_school.ref_school_id = ann_school.ref_school_id
), teacher AS(
    SELECT
        ann_teacher.id
        , 'teacher'::TEXT AS type
        , ann_teacher.title
        , ann_teacher.last_update_time AS time
        , ann_teacher.co_organizer
    FROM
        ann_teacher
        INNER JOIN target_school
            ON target_school.ref_school_id = ann_teacher.ref_school_id
), department AS(
    SELECT
        ann_department.id
        , 'department'::TEXT AS type
        , ann_department.title
        , ann_department.last_update_time AS time
        , ann_department.co_organizer
    FROM
        ann_department
        INNER JOIN target_department
            ON target_department.ref_department_id = ann_department.ref_department_id
)
SELECT * FROM school
    UNION ALL
SELECT * FROM teacher
    UNION ALL
SELECT * FROM department
        `;

        return db.default.manyOrNone(sql, [userID]);
    }

    /** 取得我發布的公告 */
    public static get_my_ann(userID: number) {
        const sql = `
WITH department AS(
    SELECT
        id
        , '處務公告'::TEXT AS type
        , title
        , to_char(last_update_time, 'YYYY-MM-DD') AS time
        , co_organizer
        , is_open
    FROM 
        ann_department
    WHERE
        ref_user_id = $1
        AND is_delete = false
), school AS(
    SELECT
        id
        , '學校公告'::TEXT AS type
        , title
        , to_char(last_update_time, 'YYYY-MM-DD') AS time
        , co_organizer
        , is_open
    FROM
        ann_school
    WHERE
        ref_user_id = $1
        AND is_delete = false
), teacher AS(
    SELECT
        id
        , '教師甄試'::TEXT AS type
        , title
        , to_char(last_update_time, 'YYYY-MM-DD') AS time
        , co_organizer
        , is_open
    FROM
        ann_teacher
    WHERE
        ref_user_id = $1
        AND is_delete = false
)
SELECT * FROM department
    UNION ALL
SELECT * FROM school
    UNION ALL
SELECT * FROM teacher
        `;

        return db.default.manyOrNone(sql, [userID]);
    }

    /** 取得未訂閱學校清單 */
    public static get_school_list(userID: number , type: string) {
        const sql = `
SELECT
    boe_school.id
    , boe_school.nick_name AS name
    , COUNT(sb_school.id) AS sb_count
FROM
    boe_school
    LEFT OUTER JOIN sb_school
        ON sb_school.ref_school_id = boe_school.id
WHERE
    boe_school.type = $2
    AND boe_school.id NOT IN (
        SELECT 
            ref_school_id 
        FROM 
            sb_school 
        WHERE 
            ref_user_id = $1
    )
GROUP BY
    boe_school.id
    , boe_school.nick_name
        `;

        return db.default.manyOrNone(sql, [userID, type])
    }

    /** 取得科室清單 */
    public static get_department_list(userID: number, type: string) {
        const sql = `
SELECT
    boe_department.id
    , boe_department.name
    , COUNT(sb_department.id) AS sb_count
FROM
    boe_department
    LEFT OUTER JOIN sb_department
        ON sb_department.ref_department_id = boe_department.id
WHERE
    boe_department.id NOT IN(
        SELECT
            ref_department_id
        FROM
            sb_department
        WHERE
            ref_user_id = $1
    )
    AND boe_department.type = $2
GROUP BY
    boe_department.id
    , boe_department.name
        `;

        return db.default.manyOrNone(sql, [userID, type]);
    }

    /** 取得已訂閱的單位 */
    public static get_subscribe_unit(userID: number) {
        const sql = `
WITH school AS(
    SELECT
        boe_school.id
        , boe_school.name
        , COUNT(sb_school.id) AS sb_count
    FROM(
        SELECT * FROM sb_school WHERE ref_user_id = $1
    ) AS target_sb
    LEFT OUTER JOIN boe_school
        ON boe_school.id = target_sb.ref_school_id
    LEFT OUTER JOIN sb_school
        ON sb_school.ref_school_id = boe_school.id
    GROUP BY
        boe_school.id
        , boe_school.name
), department AS(
    SELECT
        boe_department.id
        , boe_department.name
        , COUNT(sb_department.id) AS sb_count
    FROM(
        SELECT * FROM sb_department WHERE ref_user_id = $1
    ) AS target_sb
    LEFT OUTER JOIN boe_department
        ON boe_department.id = target_sb.ref_department_id
    LEFT OUTER JOIN sb_department
        ON sb_department.ref_department_id = boe_department.id
    GROUP BY
        boe_department.id
        , boe_department.name
)
SELECT 
    school.*
    , 'school'::TEXT AS type
FROM 
    school
    UNION ALL
SELECT 
    department.*
    , 'department'::TEXT AS type 
FROM 
    department
        `;

        return db.default.manyOrNone(sql, [userID]);
    }

    /** 訂閱學校公告 */
    public static subscribe_school_unit(userID: number, unitID: number) {
        const sql = `
WITH data_row AS(
    SELECT
        $1::INT AS user_id
        , $2::INT AS school_id
), check_sb AS(
    SELECT
        data_row.*
        , CASE WHEN sb_school.id IS NOT NULL
            THEN 'repeat'
            ELSE 'ok'
            END AS status
    FROM
        data_row
        LEFT OUTER JOIN sb_school
            ON sb_school.ref_user_id = data_row.user_id
            AND sb_school.ref_school_id = data_row.school_id
), insert_data AS(
    INSERT INTO sb_school(
        ref_user_id
        , ref_school_id
    )
    SELECT
        user_id
        , school_id
    FROM
        check_sb
    WHERE
        status = 'ok'
)
SELECT * FROM check_sb
        `;
        return db.default.one(sql, [userID, unitID]);
    }

    /** 訂閱處務公告 */
    public static subscribe_department_unit(userID: number, unitID: number) {
        const sql = `
WITH data_row AS(
    SELECT
        $1::INT AS user_id
        , $2::INT AS department_id
), check_sb AS(
    SELECT
        data_row.*
        , CASE WHEN sb_department.id IS NOT NULL
            THEN 'repeat'
            ELSE 'ok'
            END AS status
    FROM
        data_row
        LEFT OUTER JOIN sb_department
            ON sb_department.ref_user_id = data_row.user_id
            AND sb_department.ref_department_id = data_row.department_id
), insert_data AS(
    INSERT INTO sb_department(
        ref_user_id
        , ref_department_id
    )
    SELECT
        user_id
        , department_id
    FROM
        check_sb
    WHERE
        status = 'ok'
)
SELECT * FROM check_sb
        `;
        return db.default.one(sql, [userID, unitID]);
    }

    /** 取消訂閱學校公告 */
    public static unsubscribe_school_unit(userID: number, unitID: number) {
        const sql = `
DELETE FROM sb_school
WHERE 
    ref_user_id = $1
    AND ref_school_id = $2
        `;
        return db.default.none(sql, [userID, unitID]);
    }

    /** 取消訂閱處務公告 */
    public static unsubscribe_department_unit(userID: number, unitID: number) {
        const sql = `
DELETE FROM sb_department
WHERE 
    ref_user_id = $1
    AND ref_department_id = $2`;
        return db.default.none(sql, [userID, unitID]);
    }

    /** 新增處務公告 */
    public static new_department_ann(userID: number, departmentID: number, ann: AnnRec): Promise<AnnRec> {

        const sql = `
WITH insert_ann AS(
    INSERT INTO ann_department(
        ref_user_id
        , ref_department_id
        , title
        , organizer
        , co_organizer
        , co_owner
        , phone
        , fax
        , content
        , url
        , url_2
        , url_3
        , origin_user_id
        , is_open
        , is_delete
        , first_update_time
        , last_update_time
    ) VALUES (
        $(ref_user_id)::INT
        , $(ref_department_id)::INT
        , $(title)::TEXT
        , $(organizer)::TEXT
        , $(co_organizer)::TEXT
        , $(co_owner)::TEXT
        , $(phone)::TEXT
        , $(fax)::TEXT
        , $(content)::TEXT
        , $(url)::TEXT
        , $(url_2)::TEXT
        , $(url_3)::TEXT
        , $(ref_user_id)::INT
        , $(is_open)::BOOLEAN
        , false::BOOLEAN
        , NOW()
        , NOW()
    )
    RETURNING *
)
SELECT * FROM insert_ann
        `;

        return db.default.one(sql, {
            ref_user_id: userID
            , ref_department_id: departmentID
            , title: ann.title
            , organizer: ann.organizer
            , co_organizer: ann.co_organizer
            , co_owner: ann.co_owner
            , phone: ann.phone
            , fax: ann.fax
            , content: ann.content
            , url: ann.url
            , url_2: ann.url_2
            , url_3: ann.url_3
            , is_open: ann.is_open
        });
    }

    /** 新增學校公告 */
    public static new_school_ann(userID: number, schoolID: number, ann: AnnRec):Promise<AnnRec> {
        const sql = `
WITH insert_ann AS(
    INSERT INTO ann_school(
        ref_user_id
        , ref_school_id
        , title
        , organizer
        , co_organizer
        , co_owner
        , phone
        , fax
        , content
        , url
        , origin_user_id
        , is_open
        , is_delete
        , last_update_time
    ) VALUES (
        $(ref_user_id)::INT
        , $(ref_school_id)::INT
        , $(title)::TEXT
        , $(organizer)::TEXT
        , $(co_organizer)::TEXT
        , $(co_owner)::TEXT
        , $(phone)::TEXT
        , $(fax)::TEXT
        , $(content)::TEXT
        , $(url)::TEXT
        , $(ref_user_id)::INT
        , $(is_open)::BOOLEAN
        , false::BOOLEAN
        , NOW()
    )
    RETURNING *
)
SELECT * FROM insert_ann
        `;

        return db.default.oneOrNone(sql, {
            ref_user_id: userID
            , ref_school_id: schoolID
            , title: ann.title
            , organizer: ann.organizer
            , co_organizer: ann.co_organizer
            , co_owner: ann.co_owner
            , phone: ann.phone
            , fax: ann.fax
            , content: ann.content
            , url: ann.url
            , is_open: ann.is_open
        });
    }

    /** 新增教師甄試 */
    public static new_teacher_ann(userID: number, schoolID: number, ann: AnnRec):Promise<AnnRec> {
        const sql = `
WITH insert_ann AS(
    INSERT INTO ann_teacher
    (
        ref_user_id
        , ref_school_id
        , title
        , co_organizer
        , co_owner
        , phone
        , fax
        , content
        , job_opportunities
        , signup_start_time
        , signup_end_time
        , signup_place
        , interview_time
        , origin_user_id
        , last_update_time
        , is_open
        , is_delete
    ) VALUES (
        $(ref_user_id)::INT
        , $(ref_school_id)::INT
        , $(title)::TEXT
        , $(co_organizer)::TEXT
        , $(co_owner)::TEXT
        , $(phone)::TEXT
        , $(fax)::TEXT
        , $(content)::TEXT
        , $(job_opportunities)::TEXT
        , $(signup_start_time)::TIMESTAMP
        , $(signup_end_time)::TIMESTAMP
        , $(signup_place)::TEXT
        , $(interview_time)::TIMESTAMP
        , $(ref_user_id)::INT
        , NOW()  
        , $(is_open)::BOOLEAN
        , false::BOOLEAN
    )
    RETURNING *
)
SELECT * FROM insert_ann
        `;

        return db.default.oneOrNone(sql, {
            ref_user_id: userID
            , ref_school_id: schoolID
            , title: ann.title
            , co_organizer: ann.co_organizer
            , co_owner: ann.co_owner
            , phone: ann.phone
            , fax: ann.fax
            , content: ann.content
            , job_opportunities: ann.job_opportunities
            , signup_start_time: ann.signup_start_time
            , signup_end_time: ann.signup_end_time
            , signup_place: ann.signup_place
            , interview_time: ann.interview_time
            , is_open: ann.is_open
        });
    }
}