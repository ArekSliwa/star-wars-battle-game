import {GetManyResponse} from './get-many-response.model';

export interface GetPeopleResponse extends GetManyResponse {
  results: Person[];
}

export interface Person {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: Array<any>; // no need for model
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: Array<any>; // no need for model
  starships: Array<any>; // no need for model
  url: string;
  vehicles: Array<any>; // no need for model
}
