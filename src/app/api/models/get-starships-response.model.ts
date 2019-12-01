import {GetManyResponse} from './get-many-response.model';

export interface GetStarshipsResponse extends GetManyResponse {
  results: Starship[];
}

export interface Starship {
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  created: string;
  crew: string;
  edited: string;
  films: Array<any>; // no need for model
  hyperdrive_rating: string;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  pilots: Array<any>; // no need for model
  starship_class: string;
  url: string;
}
