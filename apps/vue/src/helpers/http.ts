import axios, { AxiosResponse, Canceler, CancelTokenSource } from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8080'
});

export function httpCancelToken(): CancelTokenSource {
  return axios.CancelToken.source();
}

export interface PromiseWithCanceller<T = any> {
  request: Promise<T>;
  cancelRequest: Canceler;
}

export function promiseWithCanceller<T>(request: Promise<AxiosResponse<T>>, cancelToken: CancelTokenSource) {
  return {
    request: request.then(response => response.data),
    cancelRequest: cancelToken.cancel.bind(cancelToken)
  };
}
