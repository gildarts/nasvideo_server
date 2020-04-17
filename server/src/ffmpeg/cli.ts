import { exec } from "child_process";
import { FSUtil } from '../common/fs_util';

export interface CLIResult {
    code: number;

    output: string;
}

export abstract class CLI {

    constructor(
        protected command: string,
        private cwd?: string
    ) { }

    public execute() {
        const { command: cmd } = this;

        const cwd = this.cwd;
        const p = exec(cmd, {cwd});

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
}

export class FFProbeCLI extends CLI {
}

export class FFMpegCLI extends CLI {
}