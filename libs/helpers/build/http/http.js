"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
exports.baseURL = {
    dev: 'http://localhost:8080',
    prod: 'http://localhost:8080'
};
exports.default = axios_1.default.create({
    baseURL: exports.baseURL.dev
});
function httpCancelToken() {
    return axios_1.default.CancelToken.source();
}
exports.httpCancelToken = httpCancelToken;
function promiseWithCanceller(request, cancelToken) {
    return {
        request: request.then(function (response) { return response.data; }),
        cancelRequest: cancelToken.cancel.bind(cancelToken)
    };
}
exports.promiseWithCanceller = promiseWithCanceller;