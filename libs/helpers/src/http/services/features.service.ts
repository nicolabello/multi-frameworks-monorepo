import { Feature } from '../../models/feature';
import http, { httpCancelToken, promiseWithCanceller, PromiseWithCanceller } from '../http';

export class FeaturesService {

  private static http = http;

  public static getAll(): PromiseWithCanceller<Feature[]> {
    const cancelToken = httpCancelToken();
    const request = this.http.get<Feature[]>('/features', { cancelToken: cancelToken.token });
    return promiseWithCanceller(request, cancelToken);
  }

}
