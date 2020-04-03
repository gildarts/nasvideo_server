import { ServiceContext } from '../hlc_types';
import { db } from './database';
import formidable from 'formidable';
import * as path from 'path';
import fs from 'fs-extra';

export class FormDataParser {

    public static defaultDir: string;

    public static async initPath() {
        console.log('init path');
        try {
            // 取得 storage path
            const rsp = await db.default.one('SELECT * FROM storage WHERE is_default = true');
            this.defaultDir = rsp.path;
            // 檢查資料夾路徑是否存在
            this.createDir(this.defaultDir);
            this.createDir(path.join(this.defaultDir, 'department'));
            this.createDir(path.join(this.defaultDir, 'school'));
            this.createDir(path.join(this.defaultDir, 'teacher'));
        } catch (error) {
            console.log(error);
        }
    }
    
    public static createDir(dirPath: string) {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, {recursive: true});
        }
    }

    /** 表單解析 附件下載 */
    public static async recieve(req: any, type: 'department' | 'school' | 'teacher'): Promise<AnnRec> {

        const targetDir = path.join(this.defaultDir, type);
        const form = new formidable.IncomingForm();

        form.multiples = true;
        form.keepExtensions = true; // 儲存副檔名

        let errCount = 0;

        return new Promise((r, j) => {
            form.parse(req, (err, fields, files) => {
                if (err) {
                    j(err);
                }
    
                const ann: AnnRec = {
                    id: null
                    , title: fields.title as string
                    , organizer: fields.organizer as string
                    , co_organizer: fields.co_organizer as string
                    , co_owner: fields.co_owner as string
                    , phone: fields.phone as string
                    , fax: fields.fax as string
                    , is_open: fields.status == 'true' ? true : false
                    , content: fields.content as string
                    , url: fields.url1 as string || null
                    , url_2: fields.url2 as string || null
                    , url_3: fields.url3 as string || null
                    , files: []
                    , job_opportunities: fields.job_opportunities as string || null
                    , signup_place: fields.signup_place as string || null
                    , interview_time: fields.interview_time as string || null
                    , signup_start_time: fields.signup_start_time as string || null
                    , signup_end_time: fields.signup_end_time as string || null
                };
    
                Object.keys(files).forEach((key) => {
                    const filePath = files[key].path;
                    // 取得副檔名
                    const fileExt = filePath.substring(filePath.indexOf('.'));
    
                    // 判断文件类型是否允许上传
                    if (('.jpg.jpeg.png.gif.sql').indexOf(fileExt.toLowerCase()) === -1) {
                        errCount++;
                    } else {
                        // 以目前時間為檔案名稱重新命名
                        const newfileName = new Date().getTime() + fileExt;
                        const targetFile = path.join(targetDir, newfileName);
                        // 移動文件
                        fs.rename(filePath, targetFile);
    
                        const file: FileRec = {
                            file_name: files[key].name
                            , save_name: newfileName
                            , type: fileExt.substring(1)
                            , size: files[key].size
                            , permission: fields.permission as string
                            , specific_school: fields.specific_school
                        };
                        
                        ann.files.push(file);
                    }
                });

                r(ann);
            });
        });
    }

    /** 新增附件紀錄 */
    public static async insertFileRec(userID: number ,ann: AnnRec, files: FileRec[], target: 'department' | 'school' | 'teacher'): Promise<FileRec[]> {

        if (files.length) {
            const fileSQL = [];

            files.forEach((file: FileRec) => {
                const sql = `(
                    ${userID}::INT
                    , ${ann.id}::INT
                    , '${ann.title}'::TEXT
                    , '${file.permission}'::TEXT
                    , '${file.file_name}'::TEXT
                    , '${file.save_name}'::TEXT
                    , '${file.type}'::TEXT
                    , '${file.specific_school || '[{}]'}'::JSON
                    , NOW()
                    , (SELECT id FROM storage WHERE is_default IS true)
                )`;
                fileSQL.push(sql);
            });

            let col = ''
            switch(target) {
                case 'department':
                    col = 'ref_ann_department_id';
                    break;
                case 'school':
                    col = 'ref_ann_school_id';
                    break;
                case 'teacher':
                    col = 'ref_ann_teacher_id'
                    break;
                default:
                    break;
            }

            const sql = `
WITH insert_data AS(
    INSERT INTO boe_file(
        ref_user_id
        , ${col}
        , title
        , permission
        , file_name
        , save_name
        , type
        , specific_school
        , last_update_time
        , ref_storage_id
    ) VALUES ${fileSQL.join(',')}
    RETURNING *
)
SELECT * FROM insert_data
            `;

            return db.default.manyOrNone(sql);
        } else {
            return [];
        }
    }
}

export interface AnnRec {
    id: number;
    title: string;
    organizer: string;
    co_organizer: string;
    co_owner: string;
    phone: string;
    fax: string;
    is_open: boolean;
    content: string;
    url: string;
    url_2: string;
    url_3: string;
    files: FileRec[];

    job_opportunities: string;
    signup_place: string;
    interview_time: string;
    signup_start_time: string;
    signup_end_time: string;
}

export interface FileRec {
    file_name: string;
    save_name: string;
    type: string;
    size: number;
    permission: string;
    specific_school: any;
}