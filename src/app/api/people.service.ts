import { Injectable } from '@angular/core';
import {BaseApiService} from './base.service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GetPeopleResponse} from './models';

@Injectable({
  providedIn: 'root'
})
export class PeopleApiService extends BaseApiService {

  constructor(private http: HttpClient) {
    super();
  }

  getPeople(): Observable<HttpResponse<GetPeopleResponse>> {
    const peopleRoot = 'people';
    return this.http.get<GetPeopleResponse>(this.rootUrl + peopleRoot, { observe: 'response' });
  }
}
