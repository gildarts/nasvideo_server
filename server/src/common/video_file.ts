import { FSEntry } from './fs_entry';
import { Util } from './util';

/**
 *代表一個影片檔案，不含其他檔案資訊。
 */
export class VideoFile {

    constructor(
        private entry: FSEntry
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