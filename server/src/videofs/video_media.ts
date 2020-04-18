import { VideoFile } from './video_file';
import { VideoFS } from './video_fs';
import { Util } from './util';
import fsex from 'fs-extra';
import { FFMpeg } from '../ffmpeg';

/**
 *代表一個影片媒體，包含了影片檔、縮圖檔、預覽檔等相關檔案與目錄。
 */
export class VideoMedia {

    constructor(
        private vf: VideoFile
    ) { }

    public static async createMedia(fs: VideoFS, vf: VideoFile, force = false) {

        const zoemd = Util.getZoemdInfo(vf.absolutePath);

        await fsex.ensureDir(zoemd.dir);
        if(await fsex.pathExists(zoemd.file) && !force) {
            return false;
        }

        const ffmpeg = new FFMpeg(vf.absolutePath);
        const metadata = await ffmpeg.getMetadata();
        delete metadata.origin;
        delete metadata.codec_type;

        await fsex.writeJSON(zoemd.file, {
            metadata
        }, { spaces: 2 });

        return {
            zoemd,
            metadata
        }
    }
}