import fsex from 'fs-extra';
import path from 'path';
import { Util } from './util';

export class VideoRoot {

    constructor(public basePath: string) { }

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

export class FSEntry {

    constructor(
        private root: VideoRoot,
        private path: string,
        public name: string,
        private state: fsex.Stats
    ) { }

    /**
     * 取得檔案絕對路徑。
     * @param withName 是否包含檔名。
     */
    public getAbsolutePath(withName: boolean = true) {
        if (withName) {
            return path.join(this.base, this.path, this.name);
        } else {
            return path.join(this.base, this.path);
        }
    }

    /**
     * 取得檔案路徑。
     * @param withName 是否包含檔案。
     */
    public getPath(withName: boolean = true) {
        if (withName) {
            return path.join(this.path, this.name);
        } else {
            return this.path;
        }
    }

    public get size() { return this.state.size; }

    public get isDir() { return this.state.isDirectory(); }

    public get isFile() { return this.state.isFile(); }

    public get isSystemFile() {
        const list = [
            '.DS_Store'
        ]

        if (this.name.startsWith('.')) {
            return true;
        }

        return list.find(v => v === this.name);
    }

    private get base() {
        return this.root.basePath;
    }

}

export class VideoFile {

    constructor(
        private entry: FSEntry
    ) { }

    /**
     *是否為影片檔案。
     *
     * @static
     * @param {FSEntry} entry
     * @returns
     * @memberof VideoFile
     */
    public static isVideo(entry: FSEntry) {
        return (Util.isVideoFile(entry.name) !== 'none') && entry.isFile
    }

    /**
     *影片格式。
     * @readonly
     * @memberof VideoFile
     */
    public get format() { 
        if (!this.entry.isFile) { return false; }

        return Util.isVideoFile(this.entry.name);
    }


}
