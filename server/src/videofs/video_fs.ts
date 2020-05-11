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
     * @param {boolean} [withSystemFile=true] 不包含系統檔與穩藏檔，預設為「true」。
     */
    public async list(relPath: string, withSystemFile: boolean = true) {
        const entries = await fsex.readdir(path.join(this.basePath, relPath));

        const fsentries: FSEntry[] = []
        for (const e of entries) {
            const file = path.join(relPath, e);

            // 加上基礎路徑才是完整路徑。
            const fpstat = await fsex.stat(path.join(this.basePath, file));
            fsentries.push(new FSEntry(file, fpstat));
        }

        if(!withSystemFile) {
            return fsentries.filter(v => !v.isSystemFile);
        } else {
            return fsentries;
        }
    }

    /**
     * 移動影片檔案(包含 zoemd 檔)。
     * @param srcVideoPath 來源影片檔路徑。
     * @param destVideoPath 目的目錄。
     */
    public async moveVideo(srcVideoPath: string, destVideoPath: string) {
        const srcVideoZoemd = `${srcVideoPath}.zoemd`;
        await fsex.move(srcVideoPath, destVideoPath);

        if(await fsex.pathExists(srcVideoZoemd)) {
            await fsex.move(srcVideoZoemd, `${destVideoPath}.zoemd`)
        }
    }

    public async delete(relPath: string) {
        const p = path.join(this.basePath, relPath);
        const recycle = path.join(this.basePath, '/_recycle');
        if(await fsex.pathExists(p)) {
            await fsex.ensureDir(recycle);
            const target = path.join(recycle, `${Date.now()}_${path.basename(p)}`);
            await fsex.move(p, target);
        } else {
            throw new Error(`路徑不存在：${p}`);
        }
    }
}


