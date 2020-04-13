import { Feature } from '../../../express/src/models/feature';
import http from './http';

export class FeatureService {

  private static http = http;

  public static get(id: any): Promise<Feature> {
    return this.http.get<Feature>(`/features/${encodeURIComponent(id)}`).then(response => response.data);
  }

  public static add(data: Feature): Promise<void> {
    return this.http.post<void>(`/features`, data).then(response => response.data);
  }

  public static update(data: Feature): Promise<void> {
    return this.http.put<void>(`/features/${encodeURIComponent(data._id)}`, data).then(response => response.data);
  }

}
