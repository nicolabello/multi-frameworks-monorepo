import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature } from '@feature-toggles/helpers';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  constructor(private http: HttpClient) {
  }

  public get(id: any): Observable<Feature> {
    return this.http.get<Feature>(`${environment.apiURL}/features/${encodeURIComponent(id)}`);
  }

  public add(data: Feature): Observable<void> {
    return this.http.post<void>(`${environment.apiURL}/features`, data);
  }

  public update(data: Feature): Observable<void> {
    return this.http.put<void>(`${environment.apiURL}/features/${encodeURIComponent(data._id)}`, data);
  }

}
