import { TimeUtil } from './time_util';
import { CliCommand } from './cli_command';

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

        const cli = new CliCommand(cmd);

        const result = await cli.execute();

        if(result.code === 0) {
            const vd = JSON.parse(result.output);
            return TimeUtil.analysis(vd)
        } else {
            throw new Error('執行 ffprobe 失敗。');
        }
    }
}
