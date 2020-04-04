import { exec } from "child_process";
import { FSUtil } from '../common/fs_util';

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
            if (part.startsWith('/')) { break; }

            if(part.startsWith('"/')) {
                part = part.substr(1, part.length - 2);
                break;
            }
        }

        return FSUtil.pathSplite(part).path;
    }

}