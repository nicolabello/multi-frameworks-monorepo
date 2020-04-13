import { Feature } from '../../../express/src/models/feature';
import http from './http';

export class FeaturesService {

  private static http = http;

  public static getAll(): Promise<Feature[]> {
    return this.http.get<Feature[]>('/features').then(response => response.data);
  }

}
