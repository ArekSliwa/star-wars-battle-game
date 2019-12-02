import { Injectable } from '@angular/core';
import {BaseApiService} from './base.service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GetPeopleResponse, Person} from './models';

@Injectable({
  providedIn: 'root'
})
export class PeopleApiService extends BaseApiService {

  constructor(private http: HttpClient) {
    super();
  }

  getPeople(nextPageUrl = ''): Observable<HttpResponse<GetPeopleResponse>> {
    const peopleUrl = 'people';
    return this.http.get<GetPeopleResponse>(this.rootUrl + peopleUrl + nextPageUrl, { observe: 'response' });
  }

  getPerson(id: number): Observable<HttpResponse<Person>> {
    const personUrl = 'people/';
    return this.http.get<Person>(this.rootUrl + personUrl + id, { observe: 'response' });
  }
}
