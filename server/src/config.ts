import * as conf from './config.json';
import { ServiceContext } from 'types';

export const getVideoRoot = (ctx: ServiceContext) => {
    const name = ctx.query.src || 'default';
    const found = conf.video_roots.find((v) => v.name === name);

    if(found) {
        return found.path;
    } else {
        return conf.video_roots.find((v) => v.name === 'default').path;
    }
}

export default conf;