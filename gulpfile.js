const { series, parallel } = require('gulp');
const devenv = require('./gulps/dev');
const devmem = require('./gulps/kills'); // 處理開發產生的相關 process。
const output = require('./gulps/cleanup');
const build = require('./gulps/build');
const env = require('./gulps/install');

const kill_parallels = parallel(devmem.ng_serve, devmem.webpack, devmem.pm2);

// debug 指令
exports.kill = kill_parallels;
exports.copy = build.copy;
exports.cleanup = output.cleanup;

/** 核心指令 */
exports.install = series(env.install_angular, env.install_service_modules);
exports.build = series(output.cleanup, parallel(build.build_client, build.build_service), build.copy);
exports.build_service = series(build.build_service, build.copy);
exports.deploy = series(build.deploy);
exports.prod = series(output.cleanup, exports.build, exports.deploy);
exports.dev = series(kill_parallels, parallel(devenv.mkcert, devenv.client_start, devenv.server_start_dev), devenv.server_start_pm2, devenv.pm2_log);
exports.devclient = series(devmem.ng_serve, devenv.client_start);
exports.devserver = series(parallel(devmem.webpack, devmem.pm2), devenv.server_start_dev, devenv.server_start_pm2, devenv.pm2_log);
exports.mkcert = devenv.mkcert;

exports.default = (done) => {

    console.log(` ========== 指令說明 ==========
gulp install # 安裝 angular、nodejs 相關必要套件。
gulp dev # 啟動 dev server，會自動啟動 angular、webpack、pm2、tsc、nodejs ...
gulp devclient # 只啟動 Client。
gulp devserver # 只啟動 Server。
gulp build  # 清除輸出目錄並建置 angular、nodejs、複製檔案到 workspaceDir/build 「準」部署目錄。
gulp deploy # 將建置好的檔案複製到部署目錄。
gulp prod   # 執行 build + deploy (建置+部署)。
    `);
    done();
}