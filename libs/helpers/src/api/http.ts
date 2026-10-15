import axios from 'axios';

export const apiBaseURL = 'http://localhost:8080';

export const http = axios.create({ baseURL: apiBaseURL });

/** Options accepted by every service call; pass an `AbortSignal` to cancel the request. */
export interface RequestOptions {
  signal?: AbortSignal;
}
