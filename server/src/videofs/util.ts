
export class Util {

    public static supportVideoFormats = [
        '.mp4',
        '.mkv',
        '.wmv',
        '.rmvb',
        '.avi'
    ];

    public static supportImageFormats = [
        '.jpg',
        '.png'
    ]

    public static isVideoFile(file: string) {
        return Util.supportVideoFormats.find(f => {
            return file.endsWith(f);
        }) || 'none';
    }

    public static isImageFile(file: string) {
        return Util.supportImageFormats.find(f => {
            return file.endsWith(f);
        }) || 'none';
    }

    public static isMediaFile(file: string) {
        const video = Util.isVideoFile(file);

        if(video === 'none') {
            return Util.isImageFile(file);
        } else {
            return video;
        }
    }
}