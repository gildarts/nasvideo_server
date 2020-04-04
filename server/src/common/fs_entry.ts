import fsex from 'fs-extra';
import path from 'path';
import { VideoFS } from './video_fs';

/**
 *可代表媒體檔與非媒體檔案。
 */
export class FSEntry {

    constructor(
        private path: string,
        public name: string,
        private state: fsex.Stats
    ) { }

    /**
     * 取得檔案絕對路徑。
     * @param withName 是否包含檔名。
     */
    public getAbsolutePath(fs: VideoFS, withName: boolean = true) {
        if (withName) {
            return path.join(fs.basePath, this.path, this.name);
        } else {
            return path.join(fs.basePath, this.path);
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

}