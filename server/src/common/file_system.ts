import fsex from 'fs-extra';
import path from 'path';
import { Util } from './util';

export class VideoRoot {

    constructor(public basePath: string) { }

    public async list(subPath: string) {
        const entries = await fsex.readdir(path.join(this.basePath, subPath));

        const fsentries: FSEntry[] = []
        for(const e of entries) {
            const file = path.join(subPath, e);

            // 加上基礎路徑才是完整路徑。
            const fpstat = await fsex.stat(path.join(this.basePath, file));
            fsentries.push(new FSEntry(this, subPath, e, fpstat));
        }

        return fsentries;
    }
}

export class FSEntry {

    constructor(
        private root: VideoRoot,
        public path: string,
        public name: string,
        private state: fsex.Stats
    ) {
        this.format = Util.isVideoFile(name);
    }

    public format: string;

    public get base() {
        return this.root.basePath;
    }

    public get size() { return this.state.size; }

    public get isDir() { return this.state.isDirectory(); }

    public get isFile() { return this.state.isFile(); }
}

export class VideoFile {

    constructor(
        private entry: FSEntry
    ) {}

}