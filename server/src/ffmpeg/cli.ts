import { exec } from "child_process";
import { FSUtil } from '../common/fs_util';
import { pathExists } from 'fs-extra';

export interface CLIResult {
    code: number;

    output: string;
}

export abstract class CLI {

    constructor(
        protected command: string
    ) { }

    public execute() {
        const { command: cmd } = this;

        const p = exec(cmd, {cwd: this.getCWD()});

        return new Promise<CLIResult>((r, j) => {
            let lines: string[] = [], error = null;
            p.stdout.on('data', (chunk) => {
                lines.push(chunk);
            });

            p.stderr.on('data', (chunk) => {
                console.log(chunk);
            });

            p.once('error', (err) => {
                j(err);
            });

            p.once('exit', (code, _) => {
                if (code === 0) {
                    r({
                        code: code,
                        output: lines.join('')
                    });
                } else {
                    j({ code: code });
                }
            });
        });
    }

    /** 取得工作目錄。 */
    public abstract getCWD(): string;
}

export class FFProbeCLI extends CLI {

    public getCWD(): string {
        
        const parts = this.command.split(' ');

        let part: string = null;
        while(!!(part = parts.shift())) {
            // 「/」開頭的就是路徑。
            if (part.startsWith('/')) { break; }

            // 也有可能有「"/」開頭，最後要把前後「"」去掉。
            if(part.startsWith('"/')) {
                part = part.substr(1, part.length - 2);
                break;
            }
        }

        return FSUtil.pathSplite(part).path;
    }
}

export class FFMpegCLI extends CLI {

    public getCWD(): string {
        // 算出工作目錄。
        // return '/Users/yaoming/opt';

        const parts = this.command.split(' ');

        let part: string = null;
        while(!!(part = parts.shift())) {

            // 「-i」開頭的下一個就是路徑。
            if (part.trim() !== '-i') { continue; }

            part = parts.shift();

            if (part.startsWith("\"") && part.endsWith("\"")) {
                part = part.substr(1, part.length - 2);
            }

            break;
        }

        return FSUtil.pathSplite(part).path;
    }
}