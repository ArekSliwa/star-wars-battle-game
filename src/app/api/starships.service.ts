import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BaseApiService} from './base.service';
import {Observable} from 'rxjs';
import {GetStarshipsResponse} from './models';

@Injectable({
  providedIn: 'root'
})
export class StarshipsApiService extends BaseApiService {

  constructor(private http: HttpClient) {
    super();
  }

  getStarships(): Observable<HttpResponse<GetStarshipsResponse>> {
    const peopleRoot = 'starships';
    return this.http.get<GetStarshipsResponse>(this.rootUrl + peopleRoot, { observe: 'response' });
  }
}
