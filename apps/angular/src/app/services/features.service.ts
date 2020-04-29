import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature } from '@feature-toggles/helpers';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Feature[]> {
    return this.http.get<Feature[]>(`${environment.apiURL}/features`);
  }
}
