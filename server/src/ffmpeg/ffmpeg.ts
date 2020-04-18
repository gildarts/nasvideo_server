import { TimeUtil } from './time_util';
import { FFProbeCLI, FFMpegCLI } from './cli';
import { FSUtil } from '../common/fs_util';
import path from 'path';

/** 可處理影片相關事務。 */
export class FFMpeg {

    /**
     *Creates an instance of FFMpeg.
     * @param {string} absolutePath 影片絕對路徑。
     * @memberof FFMpeg
     */
    constructor(
        private absolutePath: string,
        private cwd = path.dirname(absolutePath)
    ) { }

    /**
     * 取得影片相關資訊。
     */
    public async getMetadata() {
        const cmd = `ffprobe "${this.absolutePath}" -show_entries stream=duration,width,height,codec_name,codec_type:stream_tags=DURATION,DURATION-eng -of json -v quiet`;

        const cli = new FFProbeCLI(cmd, this.cwd);

        const result = await cli.execute();

        if(result.code === 0) {
            const vd = JSON.parse(result.output);
            return TimeUtil.analysis(vd)
        } else {
            throw new Error('執行 ffprobe 失敗。');
        }
    }

    public async takeScreenshot(seconds: { second: number, index: number }[]) {

        let fn = FSUtil.pathSplite(this.absolutePath).base;

        for(const each of seconds) {
            const post = (each.index).toString().padStart(3, '0');
            const cmd = `ffmpeg -ss ${each.second} -i "${this.absolutePath}" -r 1 -vframes 1 -y "${fn}_${post}.jpg"`

            const cli = new FFMpegCLI(cmd, this.cwd);
    
            const result = await cli.execute();
    
            if(result.code !== 0) {
                throw new Error('執行 ffprobe 失敗。');
            }
        }

        return true;
    }
}
