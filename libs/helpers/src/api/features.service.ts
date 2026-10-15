import type { Feature } from '../models/index.js';
import { http, type RequestOptions } from './http.js';

export const FeaturesService = {
  async getAll({ signal }: RequestOptions = {}): Promise<Feature[]> {
    const { data } = await http.get<Feature[]>('/features', { signal });
    return data;
  },
};
