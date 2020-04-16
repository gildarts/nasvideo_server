import * as conf from 'config';
import { ServiceContext } from 'types';

export const getVideoRoot = (srcName?: string) => {
    const name = srcName || 'default';
    const found = conf.video_roots.find((v) => v.name === name);

    if(found) {
        return found.path;
    } else {
        return conf.video_roots.find((v) => v.name === 'default').path;
    }
}

export default conf;