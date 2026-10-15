import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiBaseURL, type Feature } from '@feature-toggles/helpers';
import { firstValueFrom } from 'rxjs';

export const featuresUrl = `${apiBaseURL}/features`;
export const featureUrl = (id: string) => `${featuresUrl}/${encodeURIComponent(id)}`;

// A singleton service, injected wherever it's needed: https://angular.dev/guide/di/creating-injectable-service
// Reads use `httpResource` directly in the components; writes live here.
@Injectable({ providedIn: 'root' })
export class FeatureService {
  // `inject()` is the modern alternative to constructor injection: https://angular.dev/api/core/inject
  private readonly http = inject(HttpClient);

  // HttpClient returns Observables; `firstValueFrom` turns one into a Promise to use with async/await.
  // https://rxjs.dev/api/index/function/firstValueFrom
  add(feature: Feature): Promise<Feature> {
    return firstValueFrom(this.http.post<Feature>(featuresUrl, feature));
  }

  update(feature: Feature): Promise<Feature> {
    return firstValueFrom(this.http.put<Feature>(featureUrl(feature._id ?? ''), feature));
  }
}
