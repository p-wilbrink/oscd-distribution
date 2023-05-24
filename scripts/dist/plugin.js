"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var fs_1 = require("fs");
var path_1 = require("path");
var isRelativePlugin = function (plugin) {
    return !(plugin.src.indexOf("://") > 0 || plugin.src.indexOf("//") === 0);
};
var getPlugins = function () {
    return new Promise(function (resolve, reject) {
        fs_1["default"].readFile(path_1["default"].join(__dirname, "../", "plugins.json"), {
            encoding: "utf-8"
        }, function (err, data) {
            if (err) {
                return reject(err);
            }
            return resolve(JSON.parse(data));
        });
    });
};
getPlugins()
    .then(function (plugins) {
    console.log(plugins);
    __spreadArrays((plugins.menu || []), (plugins.editor || [])).forEach(function (plugin) {
        if (!isRelativePlugin(plugin)) {
            console.log("Not a relative plugin");
        }
    });
})["catch"](function (err) {
    console.error(err);
});
