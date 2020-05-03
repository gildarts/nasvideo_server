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
var mongodb_1 = __webpack_require__(/*! mongodb */ "mongodb");
/** mongo db client。 */
var _a = config_1.default.bson, user = _a.user, password = _a.password, host = _a.host, port = _a.port;
exports.bsonDB = new mongodb_1.MongoClient("mongodb://" + user + ":" + password + "@" + host + ":" + port, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 6,
});
var pgp = pg_promise_1.default();
/** 資料庫連線 instance。 */
exports.db = {
    /** 預設資料庫連線(字音字形網資料庫)。 */
    default: pgp(config_1.default.db),
    /** mongo db 資料庫。 */
    mongo: null,
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
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var database_1 = __webpack_require__(/*! ./database */ "./src/common/database.ts");
var config_1 = __webpack_require__(/*! ../config */ "./src/config.ts");
var video_fs_1 = __webpack_require__(/*! ../videofs/video_fs */ "./src/videofs/video_fs.ts");
var video_file_1 = __webpack_require__(/*! ../videofs/video_file */ "./src/videofs/video_file.ts");
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
    ctx.videoRoot = config_1.getVideoRoot(ctx.session.video_src);
    ctx.vfs = new video_fs_1.VideoFS(ctx.videoRoot);
    return next();
};
exports.prepareVideoInfo = function (ctx, next) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var vfs, video, _a;
    var _b, _c;
    return tslib_1.__generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                vfs = ctx.vfs;
                video = '';
                if ((_b = ctx.request.query) === null || _b === void 0 ? void 0 : _b.video) {
                    video = ctx.request.query.video;
                }
                if ((_c = ctx.request.body) === null || _c === void 0 ? void 0 : _c.video) {
                    video = ctx.request.body.video;
                }
                if (!video) {
                    return [2 /*return*/, next()];
                }
                _a = ctx;
                return [4 /*yield*/, video_file_1.VideoFile.fromFile(vfs, video)];
            case 1:
                _a.vod = _d.sent();
                return [2 /*return*/, next()];
        }
    });
}); };


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
var koa_session_1 = tslib_1.__importDefault(__webpack_require__(/*! koa-session */ "koa-session"));
var TableName = 'session';
var db_store = {
    get: function (key, maxAge, _a) {
        var rolling = _a.rolling;
        return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var mongodb, session, bsonRecord, data, err_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        mongodb = database_1.db.mongodb;
                        session = mongodb.collection(TableName);
                        return [4 /*yield*/, session.findOne({ session_id: key })];
                    case 1:
                        bsonRecord = _b.sent();
                        if (bsonRecord) {
                            data = bsonRecord.data || {};
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
            var mongodb, session, error_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        if (!changed)
                            return [2 /*return*/];
                        mongodb = database_1.db.mongodb;
                        session = mongodb.collection(TableName);
                        return [4 /*yield*/, session.findOneAndUpdate({ session_id: key }, {
                                $set: { data: sess, expiration: new Date() }
                            }, {
                                upsert: true
                            })];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        console.error("set session occure error: " + error_1.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    destroy: function (key) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var mongodb, session;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mongodb = database_1.db.mongodb;
                    session = mongodb.collection(TableName);
                    return [4 /*yield*/, session.deleteOne({
                            session_id: key
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }
};
var session_conf = {
    key: 'koa_nasvideo',
    maxAge: 24 * 60 * 60 * 1000,
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
exports.getVideoRoot = function (srcName) {
    var name = srcName || 'default';
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
var CLI = /** @class */ (function () {
    function CLI(command, cwd) {
        this.command = command;
        this.cwd = cwd;
    }
    CLI.prototype.execute = function () {
        var cmd = this.command;
        var cwd = this.cwd;
        var p = child_process_1.exec(cmd, { cwd: cwd });
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
    return FFProbeCLI;
}(CLI));
exports.FFProbeCLI = FFProbeCLI;
var FFMpegCLI = /** @class */ (function (_super) {
    tslib_1.__extends(FFMpegCLI, _super);
    function FFMpegCLI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
var path_1 = tslib_1.__importDefault(__webpack_require__(/*! path */ "path"));
/** 可處理影片相關事務。 */
var FFMpeg = /** @class */ (function () {
    /**
     *Creates an instance of FFMpeg.
     * @param {string} absolutePath 影片絕對路徑。
     * @memberof FFMpeg
     */
    function FFMpeg(absolutePath, cwd) {
        if (cwd === void 0) { cwd = path_1.default.dirname(absolutePath); }
        this.absolutePath = absolutePath;
        this.cwd = cwd;
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
                        cmd = "ffprobe \"" + this.absolutePath + "\" -show_entries stream=duration,width,height,codec_name,codec_type:stream_tags=DURATION,DURATION-eng -of json -v quiet";
                        cli = new cli_1.FFProbeCLI(cmd, this.cwd);
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
    FFMpeg.prototype.takeScreenshot = function (secondsList) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var fn, secondsList_1, secondsList_1_1, each, fileName, post, cmd, cli, result, e_1_1;
            var e_1, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fn = fs_util_1.FSUtil.pathSplite(this.absolutePath).base;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 8]);
                        secondsList_1 = tslib_1.__values(secondsList), secondsList_1_1 = secondsList_1.next();
                        _b.label = 2;
                    case 2:
                        if (!!secondsList_1_1.done) return [3 /*break*/, 5];
                        each = secondsList_1_1.value;
                        fileName = each.name;
                        if (!each.name) {
                            post = (each.index).toString().padStart(3, '0');
                            fileName = fn + "_" + post;
                        }
                        cmd = "ffmpeg -ss " + each.seconds + " -i \"" + this.absolutePath + "\" -r 1 -vframes 1 -vf scale=640:-1 -y \"" + fileName + ".jpg\"";
                        cli = new cli_1.FFMpegCLI(cmd, this.cwd);
                        return [4 /*yield*/, cli.execute()];
                    case 3:
                        result = _b.sent();
                        if (result.code !== 0) {
                            throw new Error('執行 ffprobe 失敗。');
                        }
                        _b.label = 4;
                    case 4:
                        secondsList_1_1 = secondsList_1.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (secondsList_1_1 && !secondsList_1_1.done && (_a = secondsList_1.return)) _a.call(secondsList_1);
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
            codec_name: foundStream.codec_name,
            codec_type: foundStream.codec_type,
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

/***/ "./src/media_server.ts":
/*!*****************************!*\
  !*** ./src/media_server.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var fs_extra_1 = tslib_1.__importDefault(__webpack_require__(/*! fs-extra */ "fs-extra"));
var path_1 = tslib_1.__importDefault(__webpack_require__(/*! path */ "path"));
var send_1 = tslib_1.__importDefault(__webpack_require__(/*! send */ "send"));
var config_1 = __webpack_require__(/*! ./config */ "./src/config.ts");
var qs = tslib_1.__importStar(__webpack_require__(/*! query-string */ "query-string"));
var database_1 = __webpack_require__(/*! ./common/database */ "./src/common/database.ts");
exports.wrapCallback = function (cb) {
    var _this = this;
    return function (req, rsp) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var mongo, session, query, aUrl, src, sid, srcRecord, rpath, root, fullpath;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mongo = database_1.db.mongodb;
                    session = mongo.collection('session');
                    query = qs.parseUrl(req.url);
                    aUrl = "path:" + query.url;
                    src = query.query.src;
                    sid = getSessionId(req.headers.cookie);
                    return [4 /*yield*/, session.findOne({ session_id: sid })];
                case 1:
                    srcRecord = (_a.sent()) || { data: {} };
                    if (!aUrl.startsWith('path:/media')) return [3 /*break*/, 3];
                    rpath = aUrl.replace('path:/media', '');
                    root = config_1.getVideoRoot(src || srcRecord.data.video_src);
                    fullpath = path_1.default.join(root, rpath);
                    return [4 /*yield*/, fs_extra_1.default.pathExists(fullpath)];
                case 2:
                    if (!(_a.sent()) && query.query.default === 'jpg') {
                        send_1.default(req, path_1.default.join(root, 'default.jpg')).pipe(rsp);
                    }
                    else {
                        send_1.default(req, fullpath, {
                            acceptRanges: true
                        }).pipe(rsp);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    cb(req, rsp);
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); };
};
var getSessionId = function (cookie) {
    if (!!!cookie) {
        return '';
    }
    if (cookie.indexOf('koa_nasvideo') < 0) {
        return '';
    }
    var pattern = /koa_nasvideo=([\w\d-]*);/;
    return pattern.exec(cookie)[1];
};


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
var koa_router_1 = tslib_1.__importDefault(__webpack_require__(/*! koa-router */ "koa-router"));
var koa_bodyparser_1 = tslib_1.__importDefault(__webpack_require__(/*! koa-bodyparser */ "koa-bodyparser"));
var session_store_1 = tslib_1.__importDefault(__webpack_require__(/*! ./common/session_store */ "./src/common/session_store.ts"));
var middlewares_1 = __webpack_require__(/*! ./common/middlewares */ "./src/common/middlewares.ts");
var service_1 = tslib_1.__importDefault(__webpack_require__(/*! ./service */ "./src/service/index.ts"));
var database_1 = __webpack_require__(/*! ./common/database */ "./src/common/database.ts");
var media_server_1 = __webpack_require__(/*! ./media_server */ "./src/media_server.ts");
var config_1 = tslib_1.__importDefault(__webpack_require__(/*! config */ "config"));
var db = database_1.db.default;
var PORT = process.env.PORT || 3000;
function main(app) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _a, general, callback, server;
        var _this = this;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    app.keys = ['1234'];
                    _a = database_1.db;
                    return [4 /*yield*/, database_1.bsonDB.connect()];
                case 1:
                    _a.mongo = _b.sent();
                    database_1.db.mongodb = database_1.db.mongo.db(config_1.default.bson.database);
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
                    callback = media_server_1.wrapCallback(app.callback());
                    server = http_1.default.createServer(callback).listen(PORT);
                    app.server = server;
                    console.log('complete');
                    return [2 /*return*/];
            }
        });
    });
}
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
var ACL = /** @class */ (function () {
    function ACL() {
    }
    ACL.source = function (ctx) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var src;
            return tslib_1.__generator(this, function (_a) {
                src = ctx.query.src;
                ctx.session.video_src = src;
                ctx.redirect('/play_list');
                return [2 /*return*/];
            });
        });
    };
    ACL.mongodb = function (ctx) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var mongo, coll, records;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mongo = database_1.db.mongodb;
                        coll = mongo.collection('session');
                        return [4 /*yield*/, coll.find().toArray()];
                    case 1:
                        records = _a.sent();
                        ctx.session.count = (ctx.session.count || 0) + 1;
                        ctx.body = {
                            // news: ret.insertedIds,
                            records: records
                        };
                        return [2 /*return*/];
                }
            });
        });
    };
    ACL.deleteall = function (ctx) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var mongo, coll, result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.db.mongo];
                    case 1:
                        mongo = _a.sent();
                        coll = mongo.db('underground').collection('session');
                        return [4 /*yield*/, coll.deleteMany({})];
                    case 2:
                        result = _a.sent();
                        ctx.body = {
                            result: result
                        };
                        return [2 /*return*/];
                }
            });
        });
    };
    return ACL;
}());
exports.ACL = ACL;
exports.default = new koa_router_1.default()
    .get('/acl/source', ACL.source)
    .get('/acl/mongodb', ACL.mongodb)
    .get('/acl/deleteall', ACL.deleteall);


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
var path_1 = tslib_1.__importDefault(__webpack_require__(/*! path */ "path"));
var middlewares_1 = __webpack_require__(/*! ../common/middlewares */ "./src/common/middlewares.ts");
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
                                var video = new video_file_1.VideoFile(vr, v);
                                return {
                                    name: v.name,
                                    path: v.getPath(),
                                    size: v.isDir ? 0 : v.size,
                                    isFile: v.isFile,
                                    format: video.format,
                                    isVideo: video_file_1.VideoFile.isVideo(v),
                                    containsZoemd: video_file_1.VideoFile.isVideo(v) ? video.containsZoemd() : false,
                                    create_time: v.createTime,
                                };
                            })
                        };
                        return [2 /*return*/];
                }
            });
        });
    };
    FS.move_to_parent = function (ctx) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var vfs, dirname, basename;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vfs = ctx.vfs;
                        dirname = path_1.default.dirname(ctx.vod.absolutePath);
                        basename = path_1.default.basename(ctx.vod.absolutePath);
                        return [4 /*yield*/, vfs.move(ctx.vod.absolutePath, dirname + "/../" + basename)];
                    case 1:
                        _a.sent();
                        ctx.body = {
                            success: true,
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
    .use(middlewares_1.prepareVideoInfo)
    .get('/fs/list', FS.list)
    .get('/fs/move_to_parent', FS.move_to_parent);


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
var fs_1 = tslib_1.__importDefault(__webpack_require__(/*! ./fs */ "./src/service/fs.ts"));
var video_1 = tslib_1.__importDefault(__webpack_require__(/*! ./video */ "./src/service/video.ts"));
var acl_1 = tslib_1.__importDefault(__webpack_require__(/*! ./acl */ "./src/service/acl.ts"));
var zoemd_1 = tslib_1.__importDefault(__webpack_require__(/*! ./zoemd */ "./src/service/zoemd.ts"));
exports.default = new koa_router_1.default()
    .use(fs_1.default.routes())
    .use(video_1.default.routes())
    .use(acl_1.default.routes())
    .use(zoemd_1.default.routes());


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
                        _a = ctx.request.body, video = _a.video, seconds = _a.seconds;
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
    .post('/video/screenshot', Video.screenshot);


/***/ }),

/***/ "./src/service/zoemd.ts":
/*!******************************!*\
  !*** ./src/service/zoemd.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var koa_router_1 = tslib_1.__importDefault(__webpack_require__(/*! koa-router */ "koa-router"));
var video_file_1 = __webpack_require__(/*! ../videofs/video_file */ "./src/videofs/video_file.ts");
var video_media_1 = __webpack_require__(/*! ../videofs/video_media */ "./src/videofs/video_media.ts");
var ffmpeg_1 = __webpack_require__(/*! ../ffmpeg */ "./src/ffmpeg/index.ts");
var fs_extra_1 = tslib_1.__importDefault(__webpack_require__(/*! fs-extra */ "fs-extra"));
var path_1 = tslib_1.__importDefault(__webpack_require__(/*! path */ "path"));
var Zoemd = /** @class */ (function () {
    function Zoemd() {
    }
    Zoemd.zoemd_create = function (ctx) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var vod, _a, force, ffmpeg, metadata, result;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        vod = ctx.vod;
                        _a = ctx.request.body.force, force = _a === void 0 ? false : _a;
                        ffmpeg = new ffmpeg_1.FFMpeg(vod.absolutePath);
                        return [4 /*yield*/, ffmpeg.getMetadata()];
                    case 1:
                        metadata = _b.sent();
                        delete metadata.origin;
                        delete metadata.codec_type;
                        return [4 /*yield*/, video_media_1.VideoMedia.createMedia(vod, metadata, force)];
                    case 2:
                        result = _b.sent();
                        ctx.body = result || {
                            status: 'exists'
                        };
                        return [2 /*return*/];
                }
            });
        });
    };
    Zoemd.zoemd_get = function (ctx) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var vod, media, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        vod = ctx.vod;
                        media = new video_media_1.VideoMedia(vod);
                        _a = ctx;
                        return [4 /*yield*/, media.getZoemd()];
                    case 1:
                        _a.body = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Zoemd.screenshot_set = function (ctx) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var vod, seconds, media, ffmpeg, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        vod = ctx.vod;
                        seconds = ctx.request.body.seconds;
                        media = new video_media_1.VideoMedia(vod);
                        ffmpeg = new ffmpeg_1.FFMpeg(vod.absolutePath, media.getZoemdPath().dir);
                        return [4 /*yield*/, ffmpeg.takeScreenshot([{
                                    seconds: +seconds,
                                    name: '' + Math.floor(+seconds)
                                }])];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, media.setScreenshot(+seconds)];
                    case 2:
                        _b.sent();
                        _a = ctx;
                        return [4 /*yield*/, media.getZoemd()];
                    case 3:
                        _a.body = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Zoemd.screenshot_remove = function (ctx) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var vod, seconds, media, dir, abandonFile, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        vod = ctx.vod;
                        seconds = ctx.request.query.seconds;
                        media = new video_media_1.VideoMedia(vod);
                        dir = media.getZoemdPath().dir;
                        abandonFile = path_1.default.join(dir, Math.floor(+seconds) + ".jpg");
                        return [4 /*yield*/, fs_extra_1.default.pathExists(abandonFile)];
                    case 1:
                        if (!_b.sent()) return [3 /*break*/, 3];
                        return [4 /*yield*/, fs_extra_1.default.remove(abandonFile)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [4 /*yield*/, media.removeScreenshot(+seconds)];
                    case 4:
                        _b.sent();
                        _a = ctx;
                        return [4 /*yield*/, media.getZoemd()];
                    case 5:
                        _a.body = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Zoemd;
}());
exports.Zoemd = Zoemd;
exports.default = new koa_router_1.default()
    .use(function (ctx, next) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var vfs, video, _a;
    var _b, _c;
    return tslib_1.__generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                vfs = ctx.vfs;
                video = '';
                if ((_b = ctx.request.query) === null || _b === void 0 ? void 0 : _b.video) {
                    video = ctx.request.query.video;
                }
                if ((_c = ctx.request.body) === null || _c === void 0 ? void 0 : _c.video) {
                    video = ctx.request.body.video;
                }
                if (!video) {
                    ctx.body = {
                        status: 'not found!'
                    };
                    ctx.state = 404;
                    return [2 /*return*/];
                }
                _a = ctx;
                return [4 /*yield*/, video_file_1.VideoFile.fromFile(vfs, video)];
            case 1:
                _a.vod = _d.sent();
                return [2 /*return*/, next()];
        }
    });
}); })
    .post('/zoemd', Zoemd.zoemd_create)
    .get('/zoemd', Zoemd.zoemd_get)
    .post('/zoemd/screenshot', Zoemd.screenshot_set)
    .delete('/zoemd/screenshot', Zoemd.screenshot_remove);


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
    Object.defineProperty(FSEntry.prototype, "createTime", {
        get: function () { return this.state.birthtimeMs; },
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
            var startWiths = [
                '.',
                '@',
                '#'
            ];
            var endWiths = [
                '.zoemd'
            ];
            if (startWiths.find(function (v) { return _this.name.startsWith(v); })) {
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
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var path_1 = tslib_1.__importDefault(__webpack_require__(/*! path */ "path"));
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
    Util.getZoemdInfo = function (file) {
        var zoemdDir = file + ".zoemd";
        var zoemdFile = path_1.default.join(zoemdDir, 'video.json');
        return {
            dir: zoemdDir,
            file: zoemdFile,
        };
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
    /** 是否包含了 Zoemd 資訊。 */
    VideoFile.prototype.containsZoemd = function () {
        var exists = fs_extra_1.default.pathExistsSync(this.absolutePath + ".zoemd");
        return exists;
    };
    VideoFile.prototype.getZoemdPath = function () {
        return this.absolutePath + ".zoemd";
    };
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
    /**
     * 移動影片檔案(包含 zoemd 檔)。
     * @param srcVideoPath 來源影片檔路徑。
     * @param destVideoPath 目的目錄。
     */
    VideoFS.prototype.move = function (srcVideoPath, destVideoPath) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var srcVideoZoemd;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        srcVideoZoemd = srcVideoPath + ".zoemd";
                        return [4 /*yield*/, fs_extra_1.default.move(srcVideoPath, destVideoPath)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, fs_extra_1.default.pathExists(srcVideoZoemd)];
                    case 2:
                        if (!_a.sent()) return [3 /*break*/, 4];
                        return [4 /*yield*/, fs_extra_1.default.move(srcVideoZoemd, destVideoPath + ".zoemd")];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return VideoFS;
}());
exports.VideoFS = VideoFS;


/***/ }),

/***/ "./src/videofs/video_media.ts":
/*!************************************!*\
  !*** ./src/videofs/video_media.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var util_1 = __webpack_require__(/*! ./util */ "./src/videofs/util.ts");
var fs_extra_1 = tslib_1.__importDefault(__webpack_require__(/*! fs-extra */ "fs-extra"));
/**
 *代表一個影片媒體，包含了影片檔、縮圖檔、預覽檔等相關檔案與目錄。
 */
var VideoMedia = /** @class */ (function () {
    function VideoMedia(
    /** 影片檔案資訊。 */
    file) {
        this.file = file;
    }
    VideoMedia.createMedia = function (vf, metadata, force) {
        if (force === void 0) { force = false; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var zoemd;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        zoemd = util_1.Util.getZoemdInfo(vf.absolutePath);
                        return [4 /*yield*/, fs_extra_1.default.ensureDir(zoemd.dir)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, fs_extra_1.default.pathExists(zoemd.file)];
                    case 2:
                        if ((_a.sent()) && !force) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, fs_extra_1.default.writeJSON(zoemd.file, {
                                metadata: metadata,
                                screenshots: []
                            }, { spaces: 2 })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                zoemd: zoemd,
                                metadata: metadata
                            }];
                }
            });
        });
    };
    VideoMedia.prototype.getZoemd = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var zoemd;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        zoemd = util_1.Util.getZoemdInfo(this.file.absolutePath);
                        return [4 /*yield*/, fs_extra_1.default.readJSON(zoemd.file)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VideoMedia.prototype.getZoemdPath = function () {
        return util_1.Util.getZoemdInfo(this.file.absolutePath);
    };
    /** 加入快照時間點。 */
    VideoMedia.prototype.setScreenshot = function (seconds) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var sec, zoemdInfo, zoemd, screenshots;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sec = +seconds;
                        zoemdInfo = util_1.Util.getZoemdInfo(this.file.absolutePath);
                        return [4 /*yield*/, fs_extra_1.default.readJSON(zoemdInfo.file)];
                    case 1:
                        zoemd = _a.sent();
                        screenshots = (zoemd.screenshots || [])
                            // 把 null、undefined 去掉。
                            // 秒數一樣的去掉。
                            .filter(function (v) { var _a; return (_a = ((v === 0 || !!v))) !== null && _a !== void 0 ? _a : false; })
                            .filter(function (v) { return Math.floor(v) !== Math.floor(sec); });
                        screenshots.push(sec);
                        screenshots.sort(function (x, y) { return x - y; });
                        zoemd.screenshots = screenshots;
                        return [4 /*yield*/, fs_extra_1.default.writeJSON(zoemdInfo.file, zoemd)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    VideoMedia.prototype.removeScreenshot = function (seconds) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var sec, zoemdInfo, zoemd, screenshots;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sec = +seconds;
                        zoemdInfo = util_1.Util.getZoemdInfo(this.file.absolutePath);
                        return [4 /*yield*/, fs_extra_1.default.readJSON(zoemdInfo.file)];
                    case 1:
                        zoemd = _a.sent();
                        screenshots = (zoemd.screenshots || [])
                            // 把 null、undefined 去掉。
                            // 秒數一樣的去掉。
                            .filter(function (v) { var _a; return (_a = ((v === 0 || !!v))) !== null && _a !== void 0 ? _a : false; })
                            .filter(function (v) { return Math.floor(v) !== Math.floor(sec); });
                        zoemd.screenshots = screenshots;
                        return [4 /*yield*/, fs_extra_1.default.writeJSON(zoemdInfo.file, zoemd)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return VideoMedia;
}());
exports.VideoMedia = VideoMedia;


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

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongodb");

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