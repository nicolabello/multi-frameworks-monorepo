import type { Feature } from '../models/index.js';
import { http, type RequestOptions } from './http.js';

export const FeatureService = {
  async get(id: string, { signal }: RequestOptions = {}): Promise<Feature> {
    const { data } = await http.get<Feature>(`/features/${encodeURIComponent(id)}`, { signal });
    return data;
  },

  async add(feature: Feature, { signal }: RequestOptions = {}): Promise<Feature> {
    const { data } = await http.post<Feature>('/features', feature, { signal });
    return data;
  },

  async update(feature: Feature, { signal }: RequestOptions = {}): Promise<Feature> {
    const { data } = await http.put<Feature>(`/features/${encodeURIComponent(feature._id ?? '')}`, feature, {
      signal,
    });
    return data;
  },
};
