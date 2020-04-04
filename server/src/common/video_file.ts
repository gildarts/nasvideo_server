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
        /** 代表影片檔案的檔案資訊。 */
        public entry: FSEntry
    ) { }

    /**
     *是否為影片檔案。
     */
    public static isVideo(entry: FSEntry) {
        return (Util.isVideoFile(entry.name) !== 'none') && entry.isFile
    }

    /**
     *影片格式。
     */
    public get format() { 
        if (!this.entry.isFile) { return false; }

        return Util.isVideoFile(this.entry.name);
    }
}