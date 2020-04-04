import { FSEntry } from './fs_entry';
import { Util } from './util';

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