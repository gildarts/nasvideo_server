import { db } from './database';

export class GeneralHelper {
    
    public static get_department() {
        const sql = `SELECT * FROM boe_department`;

        return db.default.manyOrNone(sql);
    }

    public static get_department_announcement(data: any) {

        let condition = ``;

        if (data.department) {
            condition += ` AND co_organizer = '${data.department}'`;
        }
        if (data.date) {
            condition += ` AND time = '${data.date}'::TIMESTAMP`;
        }
        if (data.keyWord) {
            // 處理單引號
            data.keyWord = data.keyWord.replace(/[^\w ]/, '');
            condition += ` AND (
                id::TEXT LIKE '%${data.keyWord}%'
                OR title LIKE '%${data.keyWord}%'
            )`;
        }

        const sql = `
WITH data_row AS(
    SELECT
        id
        , ref_department_id
        , title
        , organizer
        , co_organizer
        , co_owner
        , phone
        , fax
        , content
        , ref_user_id
        , to_char(first_update_time ,'YYYY-MM-DD HH:MI') AS first_update_time
        , to_char(last_update_time ,'YYYY-MM-DD HH:MI') AS last_update_time
        , date_trunc('day', last_update_time) AS time
        , origin_user_id
        , is_open
        , is_delete
        , url
        , url_2
        , url_3
    FROM
        ann_department
    WHERE
        last_update_time IS NOT NULL
)
SELECT
    *
FROM
    data_row
WHERE
    is_delete = false
    AND is_open = true
    ${condition}
ORDER BY
    last_update_time DESC
LIMIT
    $1 OFFSET($1 * $2)
        `;

        const clacTotalCount = `
WITH data_row AS(
    SELECT
        *
        , date_trunc('day', last_update_time) AS time
    FROM
        ann_department
    WHERE
        last_update_time IS NOT NULL
)
SELECT
    COUNT(*)
FROM
    data_row
WHERE
    is_delete = false
    AND is_open = true
    ${condition}
        `;

        return db.default.tx(t => {
            const q1 = t.manyOrNone(sql, [data.pageSize, data.pageIndex]);
            const q2 = t.one(clacTotalCount)
            return t.batch([q1, q2]);
        });
    }

    public static get_teacher_announcement(pageIndex: number, pageSize: number, keyWord: string, types: string[]) {

        let cd1 = '';
        let cd2 = [];

        if (keyWord) {
            // 處理單引號
            keyWord = keyWord.replace(/[^\w ]/, '');
            cd1 += `AND (
                id::TEXT LIKE '%${keyWord}%'
                OR title LIKE '%${keyWord}%'
            )`;
        }
        if (types.length > 0) {
            types.forEach((type: string) => {
                cd2.push(`type = '${type}'`);
            });

            cd1 += `AND(
                ${cd2.join(' OR ')}
            )`;
        }

        const sql = `
SELECT
    ann_teacher.id
    , ann_teacher.title
    , ann_teacher.co_organizer
    , ann_teacher.co_owner
    , ann_teacher.phone
    , ann_teacher.fax
    , ann_teacher.job_opportunities
    , ann_teacher.signup_place
    , ann_teacher.content
    , to_char(last_update_time ,'YYYY-MM-DD HH:MI') AS last_update_time
    , to_char(interview_time ,'YYYY-MM-DD HH:MI') AS interview_time
    , to_char(signup_start_time ,'YYYY-MM-DD HH:MI') AS signup_start_time
    , to_char(signup_end_time ,'YYYY-MM-DD HH:MI') AS signup_end_time
FROM
    ann_teacher
    LEFT OUTER JOIN boe_school
        ON boe_school.id = ann_teacher.ref_school_id
WHERE
    is_delete = false
    AND is_open = true
    ${cd1}
ORDER BY
    interview_time::DATE DESC
LIMIT 
    $1 OFFSET( $1 * $2 )
        `;

        const calcTotalCount = `
SELECT
    count(*)
FROM
    ann_teacher
    LEFT OUTER JOIN boe_school
        ON boe_school.id = ann_teacher.ref_school_id
WHERE
    is_delete = false
    AND is_open = true
    ${cd1}
        `;

        return db.default.tx(t => {
            const q1 = t.manyOrNone(sql, [pageSize, pageIndex]);
            const q2 = t.one(calcTotalCount);

            return t.batch([q1, q2]);
        });
    }

    public static get_school_announcement(pageIndex: number, pageSize: number, keyWord: string) {

        let condition = ``;

        if (keyWord) {
            // 處理單引號
            keyWord = keyWord.replace(/[^\w ]/, '');

            condition += `
            AND (
                title LIKE '%${keyWord}%'
                OR id::TEXT LIKE '%${keyWord}%'
            )
            `;
        }

        const sql = `
SELECT
    id
    , ref_school_id
    , ref_user_id
    , origin_user_id
    , title
    , organizer
    , co_organizer
    , co_owner
    , phone
    , fax
    , content
    , to_char(last_update_time ,'YYYY-MM-DD HH:MI') AS last_update_time
    , to_char(first_update_time ,'YYYY-MM-DD HH:MI') AS first_update_time
FROM
    ann_school
WHERE
    is_delete = false
    AND is_open = true
    AND last_update_time IS NOT NULL
    ${condition}
ORDER BY
    last_update_time DESC
LIMIT
    $1 OFFSET( $1 * $2)
        `;

        const calcTotalCount = `
SELECT
    count(*)
FROM
    ann_school
WHERE
    is_delete = false
    AND is_open = true
    ${condition}
        `;
        
        return db.default.tx(t => {
            const q1 = t.manyOrNone(sql, [pageSize, pageIndex]);
            const q2 = t.one(calcTotalCount);

            return t.batch([q1, q2]);
        });
    }

    public static get_department_by_id(id: number) {
        const sql = `
            SELECT
                *
            FROM
                ann_department
            WHERE
                id = $1
        `;

        return db.default.oneOrNone(sql, [id]);
    }

    public static get_department_file(id: number) {
        const sql = `
            SELECT
                boe_file.file_name
                , boe_file.save_name
                , boe_file.type
                , storage.path
            FROM
                boe_file
                LEFT OUTER JOIN storage
                    ON storage.id = boe_file.ref_storage_id
            WHERE
                boe_file.ref_ann_department_id = $1
        `;

        return db.default.manyOrNone(sql, [id]);
    }

    public static get_school_by_id(id: number) {
        const sql = `
            SELECT
                *
            FROM
                ann_school
            WHERE
                id = $1
        `;

        return db.default.oneOrNone(sql, [id])
    }

    public static get_school_file(id: number) {
        const sql = `
            SELECT
                boe_file.file_name
                , boe_file.save_name
                , boe_file.type
                , storage.path
            FROM
                boe_file
                LEFT OUTER JOIN storage
                    ON storage.id = boe_file.ref_storage_id
            WHERE
                boe_file.ref_ann_school_id = $1
        `;

        return db.default.manyOrNone(sql, [id]);
    }

    public static get_teacher_by_id(id: number) {
        const sql = `
            SELECT
                *
            FROM
                ann_teacher
            WHERE
                id = $1
        `;

        return db.default.oneOrNone(sql, [id]);
    }

    public static get_teacher_file(id: number) {
        const sql = `
            SELECT
                boe_file.file_name
                , boe_file.save_name
                , boe_file.type
                , storage.path
            FROM
                boe_file
                LEFT OUTER JOIN storage
                    ON storage.id = boe_file.ref_storage_id
            WHERE
                boe_file.ref_ann_teacher_id = $1
        `;

        return db.default.manyOrNone(sql, [id]);
    }
}