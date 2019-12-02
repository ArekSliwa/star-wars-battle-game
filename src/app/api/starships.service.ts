import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BaseApiService} from './base.service';
import {Observable} from 'rxjs';
import {GetStarshipsResponse, Person, Starship} from './models';

@Injectable({
  providedIn: 'root'
})
export class StarshipsApiService extends BaseApiService {

  constructor(private http: HttpClient) {
    super();
  }

  getStarships(): Observable<HttpResponse<GetStarshipsResponse>> {
    const starshipsUrl = 'starships';
    return this.http.get<GetStarshipsResponse>(this.rootUrl + starshipsUrl, { observe: 'response' });
  }

  getStarship(id: number): Observable<HttpResponse<Starship>> {
    const starshipUrl = 'starships/';
    return this.http.get<Starship>(this.rootUrl + starshipUrl + id, { observe: 'response' });
  }
}
