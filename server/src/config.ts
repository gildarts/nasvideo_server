import * as conf from 'config';
import { ServiceContext } from 'types';

export const getVideoRoot = (ctx?: ServiceContext | string) => {
    const name = (typeof(ctx) === 'string') ? ctx : ctx?.query?.src || 'default';
    const found = conf.video_roots.find((v) => v.name === name);

    if(found) {
        return found.path;
    } else {
        return conf.video_roots.find((v) => v.name === 'default').path;
    }
}

export default conf;