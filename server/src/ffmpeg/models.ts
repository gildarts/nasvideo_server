
export interface VideoData {
    streams: Stream[];
}

export interface Stream {
    codec_type: 'video' | 'audio';
    codec_name: string;
    width?: number;
    height?: number;
    duration?: number;
    tags: Tags;
}

export interface Tags {
    DURATION?: string;
    "DURATION-eng"?: string;
}

export interface VideoMetadata {

    duration?: number;

    width: number;

    height: number;

    codec_type: string;

    codec_name: string;

    origin: VideoData;
}