import fsex from 'fs-extra';
import path from 'path';
import { VideoFS } from './video_fs';
import { FSUtil } from '../common/fs_util';
/**
 *可代表媒體檔與非媒體檔案。
 */
export class FSEntry {

    constructor(
        filePath: string,
        private state: fsex.Stats
    ) {
        const pathParts = FSUtil.pathSplite(filePath);

        this.name = pathParts.file;
        this.path = pathParts.path;
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

    public get createTime() { return this.state.birthtimeMs; }

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

        const startWiths = [
            '.',
            '@',
            '#'
        ]

        const endWiths = [
            '.zoemd'
        ]

        if (startWiths.find(v => this.name.startsWith(v))) {
            return true;
        }

        if (endWiths.find(v => this.name.endsWith(v))) {
            return true;
        }

        return equals.find(v => v === this.name);
    }
}