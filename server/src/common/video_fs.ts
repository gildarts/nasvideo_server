import fsex from 'fs-extra';
import path from 'path';
import { FSEntry } from './fs_entry';

/**
 * 可處理媒體檔與非媒體檔增刪調整。
 */
export class VideoFS {

    constructor(public basePath: string) { }

    /**
     *列出指定目錄檔案。
     * @param {string} subPath 子目錄名稱。
     * @param {boolean} [withoutSystemFile=true] 不包含系統檔與穩藏檔，預設為「true」。
     */
    public async list(subPath: string, withoutSystemFile: boolean = true) {
        const entries = await fsex.readdir(path.join(this.basePath, subPath));

        const fsentries: FSEntry[] = []
        for (const e of entries) {
            const file = path.join(subPath, e);

            // 加上基礎路徑才是完整路徑。
            const fpstat = await fsex.stat(path.join(this.basePath, file));
            fsentries.push(new FSEntry(this, subPath, e, fpstat));
        }

        if(withoutSystemFile) {
            return fsentries.filter(v => !v.isSystemFile);
        } else {
            return fsentries;
        }
    }
}


