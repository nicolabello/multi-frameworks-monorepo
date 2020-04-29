"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./services/feature.service"));
__export(require("./services/features.service"));
var http_1 = require("./http");
exports.baseURL = http_1.baseURL;
