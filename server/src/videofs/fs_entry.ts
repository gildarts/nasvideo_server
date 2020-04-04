import fsex from 'fs-extra';
import path from 'path';
import { VideoFS } from './video_fs';

/**
 *可代表媒體檔與非媒體檔案。
 */
export class FSEntry {

    constructor(
        filePath: string,
        private state: fsex.Stats
    ) {
        const paths = filePath.split('/').reverse();
        this.name = paths.shift();
        this.path = paths.reverse().join('/');
    }

    public path: string;

    public name: string;

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

    /**
     * 是否為總統檔案，包含一些 metadata 檔案。
     *
     * @readonly
     * @memberof FSEntry
     */
    public get isSystemFile() {
        const equals = [
            '.DS_Store'
        ]

        const endWiths = [
            '.zoemd',
            '.zoemd.jpg' // 影片縮圖。
        ]

        if (this.name.startsWith('.')) {
            return true;
        }

        if (endWiths.find(v => this.name.endsWith(v))) {
            return true;
        }

        return equals.find(v => v === this.name);
    }
}