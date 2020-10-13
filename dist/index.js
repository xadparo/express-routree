"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
function DashCase(str) {
    return str.replace(/[A-Z]/g, function (sub) { return "-" + sub.toLowerCase(); });
}
function routree(router, tree) {
    if (router === void 0) { router = express_1.default.Router(); }
    var keys = Object.keys(tree);
    keys.forEach(function (key) {
        var leaf = tree[key];
        if (leaf instanceof Promise) {
            return leaf.then(function (thenleaf) {
                var _a;
                routree(router, (_a = {}, _a[key] = thenleaf, _a));
            });
        }
        else if (leaf instanceof Function || leaf instanceof Array) {
            if (router[key] instanceof Function) {
                router[key].apply(router, __spreadArrays(['/'], (leaf instanceof Function ? [leaf] : leaf)));
            }
            else {
                throw new Error("Not found key:\"" + key + "\" in router:" + router);
            }
        }
        else {
            router.use('/' + DashCase(key), routree(express_1.default.Router(), leaf));
        }
    });
    return router;
}
exports.default = routree;
