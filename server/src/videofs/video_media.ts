import { VideoFile } from './video_file';
import { Util } from './util';
import { Zoemd } from './zoemd';
import fsex from 'fs-extra';

/**
 *代表一個影片媒體，包含了影片檔、縮圖檔、預覽檔等相關檔案與目錄。
 */
export class VideoMedia {

    constructor(
        /** 影片檔案資訊。 */
        private file: VideoFile
    ) { }

    public static async createMedia(vf: VideoFile, metadata: any, force = false) {
        const zoemd = Util.getZoemdInfo(vf.absolutePath);

        await fsex.ensureDir(zoemd.dir);
        if (await fsex.pathExists(zoemd.file) && !force) {
            return false;
        }

        await fsex.writeJSON(zoemd.file, {
            metadata,
            screenshots: []
        }, { spaces: 2 });

        return {
            zoemd,
            metadata
        }
    }

    public async getZoemd() {
        const zoemd = Util.getZoemdInfo(this.file.absolutePath);
        return await fsex.readJSON(zoemd.file);
    }

    public getZoemdPath() {
        return Util.getZoemdInfo(this.file.absolutePath);
    }

    /** 加入快照時間點。 */
    public async setScreenshot(seconds: number) {
        const sec = +seconds;
        const zoemdInfo = Util.getZoemdInfo(this.file.absolutePath);
        const zoemd: Zoemd = await fsex.readJSON(zoemdInfo.file);

        const screenshots = (zoemd.screenshots || [])
            // 把 null、undefined 去掉。
            // 秒數一樣的去掉。
            .filter(v => ((v === 0 || !!v)) ?? false)
            .filter(v => Math.floor(v) !== Math.floor(sec))

        screenshots.push(sec);
        screenshots.sort((x, y) => x - y);
        zoemd.screenshots = screenshots;

        await fsex.writeJSON(zoemdInfo.file, zoemd);
    }

    public async removeScreenshot(seconds: number) {
        const sec = +seconds;
        const zoemdInfo = Util.getZoemdInfo(this.file.absolutePath);
        const zoemd: Zoemd = await fsex.readJSON(zoemdInfo.file);

        const screenshots = (zoemd.screenshots || [])
            // 把 null、undefined 去掉。
            // 秒數一樣的去掉。
            .filter(v => ((v === 0 || !!v)) ?? false)
            .filter(v => Math.floor(v) !== Math.floor(sec))

        zoemd.screenshots = screenshots;

        await fsex.writeJSON(zoemdInfo.file, zoemd);
    }
}
