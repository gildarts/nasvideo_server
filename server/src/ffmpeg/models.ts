
export interface VideoData {
    streams: Stream[];
}

export interface Stream {
    codec_type: 'video' | 'audio';
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

    origin: VideoData
}