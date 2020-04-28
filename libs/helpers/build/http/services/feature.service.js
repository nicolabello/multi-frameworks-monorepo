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
var FeatureService = /** @class */ (function () {
    function FeatureService() {
    }
    FeatureService.get = function (id) {
        var cancelToken = http_1.httpCancelToken();
        var request = this.http.get("/features/" + encodeURIComponent(id), { cancelToken: cancelToken.token });
        return http_1.promiseWithCanceller(request, cancelToken);
    };
    FeatureService.add = function (data) {
        var cancelToken = http_1.httpCancelToken();
        var request = this.http.post("/features", data, { cancelToken: cancelToken.token });
        return http_1.promiseWithCanceller(request, cancelToken);
    };
    FeatureService.update = function (data) {
        var cancelToken = http_1.httpCancelToken();
        var request = this.http.put("/features/" + encodeURIComponent(data._id), data, { cancelToken: cancelToken.token });
        return http_1.promiseWithCanceller(request, cancelToken);
    };
    FeatureService.http = http_1.default;
    return FeatureService;
}());
exports.FeatureService = FeatureService;
