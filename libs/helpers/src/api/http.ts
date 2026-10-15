import axios from 'axios';

// Hard-coded for local development. In a real app this would come from build-time config,
// e.g. `import.meta.env.VITE_API_URL` in Vite apps: https://vite.dev/guide/env-and-mode
export const apiBaseURL = 'http://localhost:8080';

// A pre-configured axios instance: every request made with it is relative to `apiBaseURL`.
// https://axios-http.com/docs/instance
export const http = axios.create({ baseURL: apiBaseURL });

/**
 * Options accepted by every service call.
 *
 * Pass the `signal` of an `AbortController` to cancel the request, e.g. when a component unmounts
 * before the response arrives. https://developer.mozilla.org/docs/Web/API/AbortController
 * Axios supports it natively (its old `CancelToken` API is deprecated): https://axios-http.com/docs/cancellation
 */
export interface RequestOptions {
  signal?: AbortSignal;
}

/** True when a request failed only because it was cancelled through its `AbortSignal`. */
export const isRequestCancelled = (error: unknown): boolean => axios.isCancel(error);
