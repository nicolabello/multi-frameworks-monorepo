import { Feature } from '../../../express/src/models/feature';
import http, { httpCancelToken, promiseWithCanceller, PromiseWithCanceller } from '../helpers/http';

export class FeatureService {

  private static http = http;

  public static get(id: any): PromiseWithCanceller<Feature> {
    const cancelToken = httpCancelToken();
    const request = this.http.get<Feature>(`/features/${encodeURIComponent(id)}`, { cancelToken: cancelToken.token });
    return promiseWithCanceller(request, cancelToken);
  }

  public static add(data: Feature): PromiseWithCanceller<void> {
    const cancelToken = httpCancelToken();
    const request = this.http.post<void>(`/features`, data, { cancelToken: cancelToken.token });
    return promiseWithCanceller(request, cancelToken);
  }

  public static update(data: Feature): PromiseWithCanceller<void> {
    const cancelToken = httpCancelToken();
    const request = this.http.put<void>(`/features/${encodeURIComponent(data._id)}`, data, { cancelToken: cancelToken.token });
    return promiseWithCanceller(request, cancelToken);
  }

}
