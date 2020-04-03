import { Context } from 'koa';
import { ServiceContext } from '../types';

export class Util {

    public static supportFormats = [
        '.mp4',
        '.mkv',
        '.wmv',
        '.rmvb',
        '.avi'
    ];

    public static isVideoFile(file: string) {
        return Util.supportFormats.find(f => {
            return file.endsWith(f);
        });
    }
}