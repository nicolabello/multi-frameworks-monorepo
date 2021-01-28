"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeaturesService = void 0;
var http_1 = __importStar(require("../http"));
var FeaturesService = /** @class */ (function () {
    function FeaturesService() {
    }
    FeaturesService.getAll = function () {
        var cancelToken = http_1.httpCancelToken();
        var request = this.http.get('/features', { cancelToken: cancelToken.token });
        return http_1.promiseWithCanceller(request, cancelToken);
    };
    FeaturesService.http = http_1.default;
    return FeaturesService;
}());
exports.FeaturesService = FeaturesService;
