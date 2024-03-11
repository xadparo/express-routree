"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routree = void 0;
var express_1 = __importDefault(require("express"));
function convertKebabCase(str) {
    return str.replaceAll(/[A-Z]/g, function (sub) { return "-".concat(sub.toLowerCase()); });
}
var methodNames = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head', 'connect', 'trace'];
var methodNameMap = {};
for (var _i = 0, methodNames_1 = methodNames; _i < methodNames_1.length; _i++) {
    var methodName = methodNames_1[_i];
    methodNameMap[methodName] = true;
}
function routree(router, tree) {
    for (var key in tree) {
        if ((key === 'use') && (tree.use)) {
            var useHandlers = Array.isArray(tree.use) ? tree.use : [tree.use];
            useHandlers.forEach(function (handler) {
                router.use(handler);
            });
        }
        else if ((key in methodNameMap) && (tree[key])) {
            var methodName = key;
            console.log('bind', methodName, key);
            router[methodName]('/', tree[methodName]);
        }
        else {
            router.use('/' + convertKebabCase(key), routree(express_1.default.Router(), tree[key]));
        }
    }
    return router;
}
exports.routree = routree;
exports.default = routree;
