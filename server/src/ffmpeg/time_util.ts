import { VideoMetadata, Stream, VideoData } from './models';
import moment from 'moment';

export class TimeUtil {

    public static analysis(vd: VideoData) {

        let duration = -1;
        let foundStream: Stream;
        for(const stream of vd.streams) {
            if(stream.codec_type !== 'video') {
                continue;
            }

            foundStream = stream;

            if(stream.duration ?? false) {
                duration = TimeUtil.asSeconds(stream.duration);
                break;
            } else {
                
                if (!stream.tags) { break; } //沒有 tags 屬性。

                for(const tagName of Object.getOwnPropertyNames(stream.tags)) {
                    const tagValue = stream.tags[tagName];
                    duration = TimeUtil.asSeconds(tagValue);
                    break;
                }
            }
        }

        return {
            duration: duration,
            width: +foundStream.width,
            height: +foundStream.height,
            codec_name: foundStream.codec_name,
            codec_type: foundStream.codec_type,
            origin: vd
        } as VideoMetadata;
    }

    private static asSeconds(val: any) {
        if(typeof(val) === 'number') {
            return val;
        } else {
            if((val as string).indexOf(":") >= 0) {
                return moment.duration(val).asSeconds();
            } else {
                return moment.duration(+val, 'seconds').asSeconds();
            }
        }
    }

}