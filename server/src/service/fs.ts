import Router from 'koa-router';
import { ServiceContext } from '../types';
import { db as connections } from '../common/database';
import { VideoFS } from '../videofs/video_fs';
import { VideoFile } from '../videofs/video_file';
import { FFMpeg } from '../ffmpeg';

const db = connections.default;
export class FS {

    public static async list(ctx: ServiceContext) {
        const { videoRoot } = ctx;
        const { q = '.' } = ctx.query;

        const vr = new VideoFS(videoRoot);
        const pathInfoList = await vr.list(q);

        ctx.body = {
            videos: pathInfoList
            .map(v => {
                return {
                    name: v.name,
                    path: v.getPath(),
                    size: v.isDir ? 0 : v.size, 
                    isFile: v.isFile, 
                    format: new VideoFile(vr, v).format,
                    isVideo: VideoFile.isVideo(v)
                };
            })
        };
    }

    public static async metadata(ctx: ServiceContext) {
        // const vod = `/Volumes/video/movie/(英倫對決)The.Foreigner.2017.1080p.BluRay.x264/Movie/The.Foreigner.2017.1080p.BluRay.x264.mkv`
        // const vod = `/Volumes/video/movie/雷霆沙赞.Shazam.2019.HD720P.x264.英语中文字幕.Eng.CHS.Korean.aac2.0.btzimu/雷霆沙赞.Shazam.2019.HD720P.x264.英语中文字幕.Eng.CHS.Korean.aac2.0.btzimu.mp4`;
        // const vod = `/Volumes/video/movie/(移動迷宮)Maze.Runner.The.Death.Cure.2017.1080p.WEB-DL.DD5.1.H264-FGT/Maze.Runner.The.Death.Cure.2017.1080p.WEB-DL.DD5.1.H264-FGT.mkv`;
        // const vod = `/Volumes/video/movie/(氣象戰)Geostorm.2017.1080p.WEB-DL.X264.AC3-EVO/Geostorm.2017.1080p.WEB-DL.X264.AC3-EVO.mkv`;

        const vfs = new VideoFS('/');
        const vod = await VideoFile.fromFile(vfs, `/Users/yaoming/opt/4kf.mp4`);

        const ffmpeg = new FFMpeg(vod.absolutePath);

        const metadata = await ffmpeg.getMetadata();
        ctx.body = metadata;
    }

}

export default new Router()
    .get('/fs/list', FS.list)
    .get('/fs/metadata', FS.metadata)
    ;
