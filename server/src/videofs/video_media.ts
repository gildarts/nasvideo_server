import { VideoFile } from './video_file';
import { VideoFS } from './video_fs';

/**
 *代表一個影片媒體，包含了影片檔、縮圖檔、預覽檔等相關檔案與目錄。
 */
export class VideoMedia {

    constructor(
        private vf: VideoFile
    ) { }

    public static createMedia(fs: VideoFS, vf: VideoFile) {
    }
}