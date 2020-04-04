import { exec } from "child_process";

export interface CliResult {
    code: number;

    output: string;
}

export class CliCommand {

    constructor(
        private command: string
    ) { }

    public execute() {
        const { command: cmd } = this;

        const p = exec(cmd);

        return new Promise<CliResult>((r, j) => {
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