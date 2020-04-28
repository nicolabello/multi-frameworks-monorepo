import { AxiosResponse, Canceler, CancelTokenSource } from 'axios';
declare const _default: import("axios").AxiosInstance;
export default _default;
export declare function httpCancelToken(): CancelTokenSource;
export interface PromiseWithCanceller<T = any> {
    request: Promise<T>;
    cancelRequest: Canceler;
}
export declare function promiseWithCanceller<T>(request: Promise<AxiosResponse<T>>, cancelToken: CancelTokenSource): {
    request: Promise<T>;
    cancelRequest: Canceler;
};
