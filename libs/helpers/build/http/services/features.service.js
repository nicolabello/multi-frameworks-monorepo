"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
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
