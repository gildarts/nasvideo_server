import { FSEntry } from './fs_entry';
import { Util } from './util';
import fsex from 'fs-extra';
import path from 'path';
import { VideoFS } from './video_fs';

/**
 *代表一個影片檔案，不含其他檔案資訊。
 */
export class VideoFile {

    constructor(
        private vfs: VideoFS,
        /** 代表影片檔案的檔案資訊。 */
        public entry: FSEntry
    ) { }

    /**
     *是否為影片檔案。
     */
    public static isVideo(entry: FSEntry) {
        return (Util.isVideoFile(entry.name) !== 'none') && entry.isFile
    }

    /** 從影片檔路徑建立 VideoFile 物件。 */
    public static async fromFile(vfs: VideoFS, filePath: string) {
        const fullpath = path.join(vfs.basePath, filePath);
        const fpstat = await fsex.stat(fullpath);

        return new VideoFile(vfs, new FSEntry(filePath, fpstat));
    }

    /**
     *影片格式。
     */
    public get format() { 
        if (!this.entry.isFile) { return false; }

        return Util.isVideoFile(this.entry.name);
    }

    /** 取得影片絕對路徑。 */
    public get absolutePath() {
        return this.entry.getAbsolutePath(this.vfs);
    }

    /** 是否包含了 Zoemd 資訊。 */
    public containsZoemd() {
        return true;
    }
}