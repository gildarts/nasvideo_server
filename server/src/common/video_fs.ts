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
     * @param {string} relPath 子目錄名稱。
     * @param {boolean} [withoutSystemFile=true] 不包含系統檔與穩藏檔，預設為「true」。
     */
    public async list(relPath: string, withoutSystemFile: boolean = true) {
        const entries = await fsex.readdir(path.join(this.basePath, relPath));

        const fsentries: FSEntry[] = []
        for (const e of entries) {
            const file = path.join(relPath, e);

            // 加上基礎路徑才是完整路徑。
            const fpstat = await fsex.stat(path.join(this.basePath, file));
            fsentries.push(new FSEntry(relPath, e, fpstat));
        }

        if(withoutSystemFile) {
            return fsentries.filter(v => !v.isSystemFile);
        } else {
            return fsentries;
        }
    }

        /**
     * 從指定路徑載入 VideoFile。
     * @param {string} relPath 檔案路徑。
     * @param {string} name 檔案名稱。
     */
    public async fromPath(relPath: string, name: string) {
        const fullpath = path.join(this.basePath, relPath, name);

        if(await fsex.pathExists(fullpath)) {
            const fpstat = await fsex.stat(fullpath);
            const entry = new FSEntry(relPath, name, fpstat);
            return entry;    
        } else {
            return FSEntry.notExists;
        }

    }
}


