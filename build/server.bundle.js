/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/common/database.ts":
/*!********************************!*\
  !*** ./src/common/database.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * 資料庫相關初始設定。
 *
 * Library：https://github.com/vitaly-t/pg-promise
 * Example : https://github.com/vitaly-t/pg-promise/wiki/Learn-by-Example#single-parameter
 * TypeScript Ext Document：https://github.com/vitaly-t/pg-promise/tree/master/typescript
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var config_1 = tslib_1.__importDefault(__webpack_require__(/*! ../config */ "./src/config.ts"));
var pg_promise_1 = tslib_1.__importDefault(__webpack_require__(/*! pg-promise */ "pg-promise"));
var pgp = pg_promise_1.default();
/** 資料庫連線 instance。 */
exports.db = {
    /** 預設資料庫連線(字音字形網資料庫)。 */
    default: pgp(config_1.default.db)
};


/***/ }),

/***/ "./src/common/fs_util.ts":
/*!*******************************!*\
  !*** ./src/common/fs_util.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var path_1 = tslib_1.__importDefault(__webpack_require__(/*! path */ "path"));
var FSUtil = /** @class */ (function () {
    function FSUtil() {
    }
    /** 將檔案路徑切割為「檔案」與「路徑」。 */
    FSUtil.pathSplite = function (filePath) {
        var paths = filePath.split('/').reverse();
        var file = paths.shift();
        var ext = path_1.default.extname(file);
        var base = path_1.default.basename(file, ext);
        return {
            /** 檔案名稱。 */
            file: file,
            /** 副檔名。 */
            ext: ext,
            /** 主檔名。 */
            base: base,
            /** 路徑 */
            path: paths.reverse().join('/')
        };
    };
    return FSUtil;
}());
exports.FSUtil = FSUtil;


/***/ }),

/***/ "./src/common/middlewares.ts":
/*!***********************************!*\
  !*** ./src/common/middlewares.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = __webpack_require__(/*! ./database */ "./src/common/database.ts");
var config_1 = __webpack_require__(/*! ../config */ "./src/config.ts");
exports.setXFrameOptionsDENY = function (ctx, next) {
    ctx.response.set({
        'X-Frame-Options': 'DENY',
    });
    return next();
};
exports.setupDBConnection = function (ctx, next) {
    ctx.db = database_1.db.default;
    return next();
};
exports.checkSessionData = function (ctx, next) {
    if (ctx.session_error) {
        var message = ctx.session_error.message;
        ctx.status = 500;
        ctx.body = { message: message };
    }
    else {
        return next();
    }
};
exports.setVideoRoot = function (ctx, next) {
    ctx.videoRoot = config_1.getVideoRoot(ctx);
    return next();
};


/***/ }),

/***/ "./src/common/session_store.ts":
/*!*************************************!*\
  !*** ./src/common/session_store.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var database_1 = __webpack_require__(/*! ./database */ "./src/common/database.ts");
var moment_1 = tslib_1.__importDefault(__webpack_require__(/*! moment */ "moment"));
var koa_session_1 = tslib_1.__importDefault(__webpack_require__(/*! koa-session */ "koa-session"));
var connection = database_1.db.default;
var TableName = 'session_hlc';
var db_store = {
    get: function (key, maxAge, _a) {
        var rolling = _a.rolling;
        return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var cmd, record, data, err_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        cmd = "select * from " + TableName + " where session_id = $(key)";
                        return [4 /*yield*/, connection.oneOrNone(cmd, { key: key })];
                    case 1:
                        record = _b.sent();
                        if (record) {
                            data = record.data || {};
                            data._id = key;
                            return [2 /*return*/, data];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _b.sent();
                        return [2 /*return*/, { __session_error: err_1 }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    set: function (key, sess, maxAge, _a) {
        var rolling = _a.rolling, changed = _a.changed;
        return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var data, time, get, record, cmd, cmd, error_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        if (!changed)
                            return [2 /*return*/];
                        data = JSON.stringify(sess);
                        time = moment_1.default().add(1, "hour").valueOf();
                        get = "select expiry_date from " + TableName + " where session_id = $(key)";
                        return [4 /*yield*/, connection.oneOrNone(get, { key: key })];
                    case 1:
                        record = _b.sent();
                        if (!record) return [3 /*break*/, 3];
                        cmd = "update " + TableName + " set expiry_date = $(time), data = $(data) where session_id = $(key)";
                        return [4 /*yield*/, connection.none(cmd, { key: key, time: time, data: data })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        cmd = "insert into " + TableName + "(session_id, expiry_date, data) values($(key), $(time), $(data))";
                        return [4 /*yield*/, connection.none(cmd, { key: key, time: time, data: data })];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _b.sent();
                        console.error("set session occure error: " + error_1.message);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    },
    destroy: function (key) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var cmd;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cmd = "delete from " + TableName + " where session_id = $(key)";
                    return [4 /*yield*/, connection.none(cmd, { key: key })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }
};
var session_conf = {
    key: 'hlc_boe_web',
    maxAge: 24 * 60 * 60 * 1000 * 1000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: true,
    renew: true,
    store: db_store,
    valid: function (ctx, session) {
        if (session.__session_error) {
            // 後續由 middleware 判斷是否有發生錯誤。
            ctx.session_error = session.__session_error;
            return false;
        }
        else {
            return true;
        }
    }
};
exports.default = (function (app) {
    return koa_session_1.default(session_conf, app);
});


/***/ }),

/***/ "./src/config.ts":
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var conf = tslib_1.__importStar(__webpack_require__(/*! config */ "config"));
exports.getVideoRoot = function (ctx) {
    var _a;
    var name = (typeof (ctx) === 'string') ? ctx : ((_a = ctx === null || ctx === void 0 ? void 0 : ctx.query) === null || _a === void 0 ? void 0 : _a.src) || 'default';
    var found = conf.video_roots.find(function (v) { return v.name === name; });
    if (found) {
        return found.path;
    }
    else {
        return conf.video_roots.find(function (v) { return v.name === 'default'; }).path;
    }
};
exports.default = conf;


/***/ }),

/***/ "./src/ffmpeg/cli.ts":
/*!***************************!*\
  !*** ./src/ffmpeg/cli.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var child_process_1 = __webpack_require__(/*! child_process */ "child_process");
var fs_util_1 = __webpack_require__(/*! ../common/fs_util */ "./src/common/fs_util.ts");
var CLI = /** @class */ (function () {
    function CLI(command) {
        this.command = command;
    }
    CLI.prototype.execute = function () {
        var cmd = this.command;
        var p = child_process_1.exec(cmd, { cwd: this.getCWD() });
        return new Promise(function (r, j) {
            var lines = [], error = null;
            p.stdout.on('data', function (chunk) {
                lines.push(chunk);
            });
            p.stderr.on('data', function (chunk) {
                console.log(chunk);
            });
            p.once('error', function (err) {
                j(err);
            });
            p.once('exit', function (code, _) {
                if (code === 0) {
                    r({
                        code: code,
                        output: lines.join('')
                    });
                }
                else {
                    j({ code: code });
                }
            });
        });
    };
    return CLI;
}());
exports.CLI = CLI;
var FFProbeCLI = /** @class */ (function (_super) {
    tslib_1.__extends(FFProbeCLI, _super);
    function FFProbeCLI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FFProbeCLI.prototype.getCWD = function () {
        var parts = this.command.split(' ');
        var part = null;
        while (!!(part = parts.shift())) {
            // 「/」開頭的就是路徑。
            if (part.startsWith('/')) {
                break;
            }
            // 也有可能有「"/」開頭，最後要把前後「"」去掉。
            if (part.startsWith('"/')) {
                part = part.substr(1, part.length - 2);
                break;
            }
        }
        return fs_util_1.FSUtil.pathSplite(part).path;
    };
    return FFProbeCLI;
}(CLI));
exports.FFProbeCLI = FFProbeCLI;
var FFMpegCLI = /** @class */ (function (_super) {
    tslib_1.__extends(FFMpegCLI, _super);
    function FFMpegCLI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FFMpegCLI.prototype.getCWD = function () {
        // 算出工作目錄。
        // return '/Users/yaoming/opt';
        var parts = this.command.split(' ');
        var part = null;
        while (!!(part = parts.shift())) {
            // 「-i」開頭的下一個就是路徑。
            if (part.trim() !== '-i') {
                continue;
            }
            var pathPart = [];
            var p = null;
            while (parts.length >= 0) {
                p = parts.shift();
                pathPart.push(p);
                if (p.endsWith("\"")) {
                    break;
                }
            }
            part = pathPart.join(" ");
            if (part.startsWith("\"") && part.endsWith("\"")) {
                part = part.substr(1, part.length - 2);
            }
            break;
        }
        return fs_util_1.FSUtil.pathSplite(part).path;
    };
    return FFMpegCLI;
}(CLI));
exports.FFMpegCLI = FFMpegCLI;


/***/ }),

/***/ "./src/ffmpeg/ffmpeg.ts":
/*!******************************!*\
  !*** ./src/ffmpeg/ffmpeg.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var time_util_1 = __webpack_require__(/*! ./time_util */ "./src/ffmpeg/time_util.ts");
var cli_1 = __webpack_require__(/*! ./cli */ "./src/ffmpeg/cli.ts");
var fs_util_1 = __webpack_require__(/*! ../common/fs_util */ "./src/common/fs_util.ts");
/** 可處理影片相關事務。 */
var FFMpeg = /** @class */ (function () {
    /**
     *Creates an instance of FFMpeg.
     * @param {string} absolutePath 影片絕對路徑。
     * @memberof FFMpeg
     */
    function FFMpeg(absolutePath) {
        this.absolutePath = absolutePath;
    }
    /**
     * 取得影片相關資訊。
     */
    FFMpeg.prototype.getMetadata = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var cmd, cli, result, vd;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cmd = "ffprobe \"" + this.absolutePath + "\" -show_entries stream=duration,width,height,codec_type:stream_tags=DURATION,DURATION-eng -of json -v quiet";
                        cli = new cli_1.FFProbeCLI(cmd);
                        return [4 /*yield*/, cli.execute()];
                    case 1:
                        result = _a.sent();
                        if (result.code === 0) {
                            vd = JSON.parse(result.output);
                            return [2 /*return*/, time_util_1.TimeUtil.analysis(vd)];
                        }
                        else {
                            throw new Error('執行 ffprobe 失敗。');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    FFMpeg.prototype.takeScreenshot = function () {
        var seconds = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            seconds[_i] = arguments[_i];
        }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var fn, count, seconds_1, seconds_1_1, second, post, cmd, cli, result, e_1_1;
            var e_1, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fn = fs_util_1.FSUtil.pathSplite(this.absolutePath).base;
                        count = 0;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 8]);
                        seconds_1 = tslib_1.__values(seconds), seconds_1_1 = seconds_1.next();
                        _b.label = 2;
                    case 2:
                        if (!!seconds_1_1.done) return [3 /*break*/, 5];
                        second = seconds_1_1.value;
                        post = (count++).toString().padStart(3, '0');
                        cmd = "ffmpeg -ss " + second + " -i \"" + this.absolutePath + "\" -r 1 -vframes 1 -y \"" + fn + "_" + post + ".jpg\"";
                        cli = new cli_1.FFMpegCLI(cmd);
                        return [4 /*yield*/, cli.execute()];
                    case 3:
                        result = _b.sent();
                        if (result.code !== 0) {
                            throw new Error('執行 ffprobe 失敗。');
                        }
                        _b.label = 4;
                    case 4:
                        seconds_1_1 = seconds_1.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (seconds_1_1 && !seconds_1_1.done && (_a = seconds_1.return)) _a.call(seconds_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/, true];
                }
            });
        });
    };
    return FFMpeg;
}());
exports.FFMpeg = FFMpeg;


/***/ }),

/***/ "./src/ffmpeg/index.ts":
/*!*****************************!*\
  !*** ./src/ffmpeg/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
tslib_1.__exportStar(__webpack_require__(/*! ./ffmpeg */ "./src/ffmpeg/ffmpeg.ts"), exports);


/***/ }),

/***/ "./src/ffmpeg/time_util.ts":
/*!*********************************!*\
  !*** ./src/ffmpeg/time_util.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var moment_1 = tslib_1.__importDefault(__webpack_require__(/*! moment */ "moment"));
var TimeUtil = /** @class */ (function () {
    function TimeUtil() {
    }
    TimeUtil.analysis = function (vd) {
        var e_1, _a, e_2, _b;
        var _c;
        var duration = -1;
        var foundStream;
        try {
            for (var _d = tslib_1.__values(vd.streams), _e = _d.next(); !_e.done; _e = _d.next()) {
                var stream = _e.value;
                if (stream.codec_type !== 'video') {
                    continue;
                }
                foundStream = stream;
                if ((_c = stream.duration) !== null && _c !== void 0 ? _c : false) {
                    duration = TimeUtil.asSeconds(stream.duration);
                    break;
                }
                else {
                    if (!stream.tags) {
                        break;
                    } //沒有 tags 屬性。
                    try {
                        for (var _f = (e_2 = void 0, tslib_1.__values(Object.getOwnPropertyNames(stream.tags))), _g = _f.next(); !_g.done; _g = _f.next()) {
                            var tagName = _g.value;
                            var tagValue = stream.tags[tagName];
                            duration = TimeUtil.asSeconds(tagValue);
                            break;
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return {
            duration: duration,
            width: +foundStream.width,
            height: +foundStream.height,
            origin: vd
        };
    };
    TimeUtil.asSeconds = function (val) {
        if (typeof (val) === 'number') {
            return val;
        }
        else {
            if (val.indexOf(":") >= 0) {
                return moment_1.default.duration(val).asSeconds();
            }
            else {
                return moment_1.default.duration(+val, 'seconds').asSeconds();
            }
        }
    };
    return TimeUtil;
}());
exports.TimeUtil = TimeUtil;


/***/ }),

/***/ "./src/server.ts":
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var http_1 = tslib_1.__importDefault(__webpack_require__(/*! http */ "http"));
var koa_1 = tslib_1.__importDefault(__webpack_require__(/*! koa */ "koa"));
var koa_static_1 = tslib_1.__importDefault(__webpack_require__(/*! koa-static */ "koa-static"));
var koa_send_1 = tslib_1.__importDefault(__webpack_require__(/*! koa-send */ "koa-send"));
var send_1 = tslib_1.__importDefault(__webpack_require__(/*! send */ "send"));
var koa_router_1 = tslib_1.__importDefault(__webpack_require__(/*! koa-router */ "koa-router"));
var koa_bodyparser_1 = tslib_1.__importDefault(__webpack_require__(/*! koa-bodyparser */ "koa-bodyparser"));
var session_store_1 = tslib_1.__importDefault(__webpack_require__(/*! ./common/session_store */ "./src/common/session_store.ts"));
var middlewares_1 = __webpack_require__(/*! ./common/middlewares */ "./src/common/middlewares.ts");
var service_1 = tslib_1.__importDefault(__webpack_require__(/*! ./service */ "./src/service/index.ts"));
var config_1 = __webpack_require__(/*! ./config */ "./src/config.ts");
var qs = tslib_1.__importStar(__webpack_require__(/*! query-string */ "query-string"));
var PORT = process.env.PORT || 3000;
function main(app) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var general, callback, server;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            app.keys = ['1234'];
            app.use(function (ctx, next) {
                if (ctx.request.path.startsWith('/media')) {
                    send_1.default(ctx.request.req, './public/media/snh48.mp4', {
                        acceptRanges: true
                    }).pipe(ctx.response.res);
                }
                else {
                    return next();
                }
            });
            // 靜態檔案。
            app.use(koa_static_1.default("./public"));
            app.use(koa_bodyparser_1.default());
            app.use(middlewares_1.setupDBConnection);
            app.use(session_store_1.default(app));
            app.use(middlewares_1.checkSessionData);
            app.use(middlewares_1.setVideoRoot);
            general = new koa_router_1.default();
            general.use('/service', service_1.default.routes());
            app.use(general.routes());
            // 設定 X-Frame-Options: DENY，安全性掃描需要。
            app.use(middlewares_1.setXFrameOptionsDENY);
            // 處理 html5 mode。
            app.use(function (ctx) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log("resource not found: \u300C" + ctx.path + "\u300D, fallback to \u300C/index.html\u300D.");
                            return [4 /*yield*/, koa_send_1.default(ctx, "./public/index.html")];
                        case 1:
                            _a.sent(); // html5 mode
                            return [2 /*return*/];
                    }
                });
            }); });
            callback = wrapCallback(app.callback());
            server = http_1.default.createServer(callback).listen(PORT);
            app.server = server;
            console.log('complete');
            return [2 /*return*/];
        });
    });
}
var wrapCallback = function (cb) {
    return function (req, rsp) {
        var query = qs.parseUrl(req.url);
        var aUrl = "path:" + query.url; // 防止尋取代時不要出錯。
        var src = query.query.src;
        if (aUrl.startsWith('path:/media')) {
            var rpath = aUrl.replace('path:/media', '');
            var root = config_1.getVideoRoot(src);
            send_1.default(req, "" + root + rpath, {
                acceptRanges: true
            }).pipe(rsp);
        }
        else {
            cb(req, rsp);
        }
    };
};
main(new koa_1.default());


/***/ }),

/***/ "./src/service/acl.ts":
/*!****************************!*\
  !*** ./src/service/acl.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var koa_router_1 = tslib_1.__importDefault(__webpack_require__(/*! koa-router */ "koa-router"));
var database_1 = __webpack_require__(/*! ../common/database */ "./src/common/database.ts");
var db = database_1.db.default;
var ACL = /** @class */ (function () {
    function ACL() {
    }
    ACL.savior = function (ctx) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var records;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.manyOrNone('select * from savior')];
                    case 1:
                        records = _a.sent();
                        ctx.body = records;
                        return [2 /*return*/];
                }
            });
        });
    };
    return ACL;
}());
exports.ACL = ACL;
exports.default = new koa_router_1.default()
    .get('/acl/savior', ACL.savior);


/***/ }),

/***/ "./src/service/fs.ts":
/*!***************************!*\
  !*** ./src/service/fs.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var koa_router_1 = tslib_1.__importDefault(__webpack_require__(/*! koa-router */ "koa-router"));
var database_1 = __webpack_require__(/*! ../common/database */ "./src/common/database.ts");
var video_fs_1 = __webpack_require__(/*! ../videofs/video_fs */ "./src/videofs/video_fs.ts");
var video_file_1 = __webpack_require__(/*! ../videofs/video_file */ "./src/videofs/video_file.ts");
var db = database_1.db.default;
var FS = /** @class */ (function () {
    function FS() {
    }
    FS.list = function (ctx) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var videoRoot, _a, q, vr, pathInfoList;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        videoRoot = ctx.videoRoot;
                        _a = ctx.query.q, q = _a === void 0 ? '.' : _a;
                        vr = new video_fs_1.VideoFS(videoRoot);
                        return [4 /*yield*/, vr.list(q)];
                    case 1:
                        pathInfoList = _b.sent();
                        ctx.body = {
                            videos: pathInfoList
                                .map(function (v) {
                                return {
                                    name: v.name,
                                    path: v.getPath(),
                                    size: v.isDir ? 0 : v.size,
                                    isFile: v.isFile,
                                    format: new video_file_1.VideoFile(vr, v).format,
                                    isVideo: video_file_1.VideoFile.isVideo(v)
                                };
                            })
                        };
                        return [2 /*return*/];
                }
            });
        });
    };
    return FS;
}());
exports.FS = FS;
exports.default = new koa_router_1.default()
    .get('/fs/list', FS.list);


/***/ }),

/***/ "./src/service/index.ts":
/*!******************************!*\
  !*** ./src/service/index.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var koa_router_1 = tslib_1.__importDefault(__webpack_require__(/*! koa-router */ "koa-router"));
var acl_1 = tslib_1.__importDefault(__webpack_require__(/*! ./acl */ "./src/service/acl.ts"));
var fs_1 = tslib_1.__importDefault(__webpack_require__(/*! ./fs */ "./src/service/fs.ts"));
var video_1 = tslib_1.__importDefault(__webpack_require__(/*! ./video */ "./src/service/video.ts"));
exports.default = new koa_router_1.default()
    .use(acl_1.default.routes())
    .use(fs_1.default.routes())
    .use(video_1.default.routes());


/***/ }),

/***/ "./src/service/video.ts":
/*!******************************!*\
  !*** ./src/service/video.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var koa_router_1 = tslib_1.__importDefault(__webpack_require__(/*! koa-router */ "koa-router"));
var video_fs_1 = __webpack_require__(/*! ../videofs/video_fs */ "./src/videofs/video_fs.ts");
var video_file_1 = __webpack_require__(/*! ../videofs/video_file */ "./src/videofs/video_file.ts");
var ffmpeg_1 = __webpack_require__(/*! ../ffmpeg */ "./src/ffmpeg/index.ts");
var Video = /** @class */ (function () {
    function Video() {
    }
    Video.metadata = function (ctx) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var videoRoot, video, vfs, vod, ffmpeg, metadata;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        videoRoot = ctx.videoRoot;
                        video = ctx.query.video;
                        vfs = new video_fs_1.VideoFS(videoRoot);
                        return [4 /*yield*/, video_file_1.VideoFile.fromFile(vfs, video)];
                    case 1:
                        vod = _a.sent();
                        ffmpeg = new ffmpeg_1.FFMpeg(vod.absolutePath);
                        return [4 /*yield*/, ffmpeg.getMetadata()];
                    case 2:
                        metadata = _a.sent();
                        ctx.body = metadata;
                        return [2 /*return*/];
                }
            });
        });
    };
    Video.screenshot = function (ctx) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var videoRoot, _a, video, seconds, v, vfs, vod, ffmpeg, success;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        videoRoot = ctx.videoRoot;
                        _a = ctx.query, video = _a.video, seconds = _a.seconds;
                        v = video;
                        vfs = new video_fs_1.VideoFS(videoRoot);
                        return [4 /*yield*/, video_file_1.VideoFile.fromFile(vfs, v)];
                    case 1:
                        vod = _b.sent();
                        ffmpeg = new ffmpeg_1.FFMpeg(vod.absolutePath);
                        return [4 /*yield*/, ffmpeg.takeScreenshot(seconds)];
                    case 2:
                        success = _b.sent();
                        ctx.body = {
                            status: success
                        };
                        return [2 /*return*/];
                }
            });
        });
    };
    return Video;
}());
exports.Video = Video;
exports.default = new koa_router_1.default()
    .get('/video/metadata', Video.metadata)
    .get('/video/screenshot', Video.screenshot);


/***/ }),

/***/ "./src/videofs/fs_entry.ts":
/*!*********************************!*\
  !*** ./src/videofs/fs_entry.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var path_1 = tslib_1.__importDefault(__webpack_require__(/*! path */ "path"));
var fs_util_1 = __webpack_require__(/*! ../common/fs_util */ "./src/common/fs_util.ts");
/**
 *可代表媒體檔與非媒體檔案。
 */
var FSEntry = /** @class */ (function () {
    function FSEntry(filePath, state) {
        this.state = state;
        var pathParts = fs_util_1.FSUtil.pathSplite(filePath);
        this.name = pathParts.file;
        this.path = pathParts.path;
    }
    /**
     * 取得檔案絕對路徑。
     * @param withName 是否包含檔名。
     */
    FSEntry.prototype.getAbsolutePath = function (fs, withName) {
        if (withName === void 0) { withName = true; }
        if (withName) {
            return path_1.default.join(fs.basePath, this.path, this.name);
        }
        else {
            return path_1.default.join(fs.basePath, this.path);
        }
    };
    /**
     * 取得檔案路徑。
     * @param withName 是否包含檔案。
     */
    FSEntry.prototype.getPath = function (withName) {
        if (withName === void 0) { withName = true; }
        if (withName) {
            return path_1.default.join(this.path, this.name);
        }
        else {
            return this.path;
        }
    };
    Object.defineProperty(FSEntry.prototype, "size", {
        get: function () { return this.state.size; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FSEntry.prototype, "isDir", {
        get: function () { return this.state.isDirectory(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FSEntry.prototype, "isFile", {
        get: function () { return this.state.isFile(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FSEntry.prototype, "isSystemFile", {
        /**
         * 是否為總統檔案，包含一些 metadata 檔案。
         *
         * @readonly
         * @memberof FSEntry
         */
        get: function () {
            var _this = this;
            var equals = [
                '.DS_Store'
            ];
            var endWiths = [
                '.zoemd',
                '.zoemd.jpg' // 影片縮圖。
            ];
            if (this.name.startsWith('.')) {
                return true;
            }
            if (endWiths.find(function (v) { return _this.name.endsWith(v); })) {
                return true;
            }
            return equals.find(function (v) { return v === _this.name; });
        },
        enumerable: true,
        configurable: true
    });
    return FSEntry;
}());
exports.FSEntry = FSEntry;


/***/ }),

/***/ "./src/videofs/util.ts":
/*!*****************************!*\
  !*** ./src/videofs/util.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.isVideoFile = function (file) {
        return Util.supportVideoFormats.find(function (f) {
            return file.endsWith(f);
        }) || 'none';
    };
    Util.isImageFile = function (file) {
        return Util.supportImageFormats.find(function (f) {
            return file.endsWith(f);
        }) || 'none';
    };
    Util.isMediaFile = function (file) {
        var video = Util.isVideoFile(file);
        if (video === 'none') {
            return Util.isImageFile(file);
        }
        else {
            return video;
        }
    };
    Util.supportVideoFormats = [
        '.mp4',
        '.mkv',
        '.wmv',
        '.rmvb',
        '.avi'
    ];
    Util.supportImageFormats = [
        '.jpg',
        '.png'
    ];
    return Util;
}());
exports.Util = Util;


/***/ }),

/***/ "./src/videofs/video_file.ts":
/*!***********************************!*\
  !*** ./src/videofs/video_file.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var fs_entry_1 = __webpack_require__(/*! ./fs_entry */ "./src/videofs/fs_entry.ts");
var util_1 = __webpack_require__(/*! ./util */ "./src/videofs/util.ts");
var fs_extra_1 = tslib_1.__importDefault(__webpack_require__(/*! fs-extra */ "fs-extra"));
var path_1 = tslib_1.__importDefault(__webpack_require__(/*! path */ "path"));
/**
 *代表一個影片檔案，不含其他檔案資訊。
 */
var VideoFile = /** @class */ (function () {
    function VideoFile(vfs, 
    /** 代表影片檔案的檔案資訊。 */
    entry) {
        this.vfs = vfs;
        this.entry = entry;
    }
    /**
     *是否為影片檔案。
     */
    VideoFile.isVideo = function (entry) {
        return (util_1.Util.isVideoFile(entry.name) !== 'none') && entry.isFile;
    };
    /** 從影片檔路徑建立 VideoFile 物件。 */
    VideoFile.fromFile = function (vfs, filePath) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var fullpath, fpstat;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fullpath = path_1.default.join(vfs.basePath, filePath);
                        return [4 /*yield*/, fs_extra_1.default.stat(fullpath)];
                    case 1:
                        fpstat = _a.sent();
                        return [2 /*return*/, new VideoFile(vfs, new fs_entry_1.FSEntry(filePath, fpstat))];
                }
            });
        });
    };
    Object.defineProperty(VideoFile.prototype, "format", {
        /**
         *影片格式。
         */
        get: function () {
            if (!this.entry.isFile) {
                return false;
            }
            return util_1.Util.isVideoFile(this.entry.name);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoFile.prototype, "absolutePath", {
        /** 取得影片絕對路徑。 */
        get: function () {
            return this.entry.getAbsolutePath(this.vfs);
        },
        enumerable: true,
        configurable: true
    });
    return VideoFile;
}());
exports.VideoFile = VideoFile;


/***/ }),

/***/ "./src/videofs/video_fs.ts":
/*!*********************************!*\
  !*** ./src/videofs/video_fs.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var fs_extra_1 = tslib_1.__importDefault(__webpack_require__(/*! fs-extra */ "fs-extra"));
var path_1 = tslib_1.__importDefault(__webpack_require__(/*! path */ "path"));
var fs_entry_1 = __webpack_require__(/*! ./fs_entry */ "./src/videofs/fs_entry.ts");
/**
 * 可處理媒體檔與非媒體檔增刪調整。
 */
var VideoFS = /** @class */ (function () {
    function VideoFS(basePath) {
        this.basePath = basePath;
    }
    /**
     *列出指定目錄檔案。
     * @param {string} relPath 子目錄名稱。
     * @param {boolean} [withoutSystemFile=true] 不包含系統檔與穩藏檔，預設為「true」。
     */
    VideoFS.prototype.list = function (relPath, withoutSystemFile) {
        if (withoutSystemFile === void 0) { withoutSystemFile = true; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var entries, fsentries, entries_1, entries_1_1, e, file, fpstat, e_1_1;
            var e_1, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, fs_extra_1.default.readdir(path_1.default.join(this.basePath, relPath))];
                    case 1:
                        entries = _b.sent();
                        fsentries = [];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 7, 8, 9]);
                        entries_1 = tslib_1.__values(entries), entries_1_1 = entries_1.next();
                        _b.label = 3;
                    case 3:
                        if (!!entries_1_1.done) return [3 /*break*/, 6];
                        e = entries_1_1.value;
                        file = path_1.default.join(relPath, e);
                        return [4 /*yield*/, fs_extra_1.default.stat(path_1.default.join(this.basePath, file))];
                    case 4:
                        fpstat = _b.sent();
                        fsentries.push(new fs_entry_1.FSEntry(file, fpstat));
                        _b.label = 5;
                    case 5:
                        entries_1_1 = entries_1.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (entries_1_1 && !entries_1_1.done && (_a = entries_1.return)) _a.call(entries_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 9:
                        if (withoutSystemFile) {
                            return [2 /*return*/, fsentries.filter(function (v) { return !v.isSystemFile; })];
                        }
                        else {
                            return [2 /*return*/, fsentries];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return VideoFS;
}());
exports.VideoFS = VideoFS;


/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),

/***/ "config":
/*!********************************!*\
  !*** external "./config.json" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("./config.json");

/***/ }),

/***/ "fs-extra":
/*!***************************!*\
  !*** external "fs-extra" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs-extra");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "koa":
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),

/***/ "koa-bodyparser":
/*!*********************************!*\
  !*** external "koa-bodyparser" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-bodyparser");

/***/ }),

/***/ "koa-router":
/*!*****************************!*\
  !*** external "koa-router" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),

/***/ "koa-send":
/*!***************************!*\
  !*** external "koa-send" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-send");

/***/ }),

/***/ "koa-session":
/*!******************************!*\
  !*** external "koa-session" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-session");

/***/ }),

/***/ "koa-static":
/*!*****************************!*\
  !*** external "koa-static" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-static");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "pg-promise":
/*!*****************************!*\
  !*** external "pg-promise" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("pg-promise");

/***/ }),

/***/ "query-string":
/*!*******************************!*\
  !*** external "query-string" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("query-string");

/***/ }),

/***/ "send":
/*!***********************!*\
  !*** external "send" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("send");

/***/ }),

/***/ "tslib":
/*!************************!*\
  !*** external "tslib" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ })

/******/ });
//# sourceMappingURL=server.bundle.js.map