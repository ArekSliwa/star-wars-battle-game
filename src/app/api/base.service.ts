export class BaseApiService {
  private _rootUrl = 'https://swapi.co/api/';

  get rootUrl() {
    return this._rootUrl;
  }
}
