import { TimeUtil } from './time_util';
import { FFProbeCLI, FFMpegCLI } from './cli';

/** 可處理影片相關事務。 */
export class FFMpeg {

    /**
     *Creates an instance of FFMpeg.
     * @param {string} absolutePath 影片絕對路徑。
     * @memberof FFMpeg
     */
    constructor(
        private absolutePath: string
    ) { }

    /**
     * 取得影片相關資訊。
     */
    public async getMetadata() {
        const cmd = `ffprobe "${this.absolutePath}" -show_entries stream=duration,width,height,codec_type:stream_tags=DURATION,DURATION-eng -of json -v quiet`;

        const cli = new FFProbeCLI(cmd);

        const result = await cli.execute();

        if(result.code === 0) {
            const vd = JSON.parse(result.output);
            return TimeUtil.analysis(vd)
        } else {
            throw new Error('執行 ffprobe 失敗。');
        }
    }

    public async takeScreenshot(seconds: number) {
        const cmd = `ffmpeg -ss ${seconds} -i "${this.absolutePath}" -r 1 -vframes 1 out%05d.jpg`

        const cli = new FFMpegCLI(cmd);

        const result = await cli.execute();

        if(result.code === 0) {
            return true;
        } else {
            throw new Error('執行 ffprobe 失敗。');
        }
    }
}
