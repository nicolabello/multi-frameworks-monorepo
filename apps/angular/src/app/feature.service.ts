import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiBaseURL, type Feature } from '@feature-toggles/helpers';
import { firstValueFrom } from 'rxjs';

export const featuresUrl = `${apiBaseURL}/features`;
export const featureUrl = (id: string) => `${featuresUrl}/${encodeURIComponent(id)}`;

@Injectable({ providedIn: 'root' })
export class FeatureService {
  private readonly http = inject(HttpClient);

  add(feature: Feature): Promise<Feature> {
    return firstValueFrom(this.http.post<Feature>(featuresUrl, feature));
  }

  update(feature: Feature): Promise<Feature> {
    return firstValueFrom(this.http.put<Feature>(featureUrl(feature._id ?? ''), feature));
  }
}
