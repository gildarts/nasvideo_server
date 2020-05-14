const { exec } = require('child_process');
const { dockerRoot } = require('./env.json');
const readline = require('readline');
//docker build -t gildarts/ffmpegnode:testver . 
//docker push gildarts/ffmpegnode:0.0.33

let version = 'undefined';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

exports.askver = async(done) => {
    await execpromise(`docker images | grep 'gildarts/ffmpegnode'`);
    const ver = await ask('請輸入新版 Image 版本編號：');
    console.log(`您輸入了：${ver}`);
    version = ver;
    done();
}

exports.buildpush = async (done) => {
    console.info('************** 開始建置 Docker Image **************');
    await execpromise(`docker build -t gildarts/ffmpegnode:${version} . `);
    await execpromise(`docker push gildarts/ffmpegnode:${version}`);
    done();
}

const ask = async(question) => {
    return new Promise((r,j) => {
        rl.question(question, answer => {
            rl.close();
            r(answer);
        });
    });
}

const execpromise = async (cmd, args ) => {
    return new Promise((r,j) => {

        const p = exec(cmd, {
            cwd: dockerRoot
        })

        p.once('close', () => r());

        p.stdout.on('data', (data) => {
            console.log(data.toString());
        });
    });
};