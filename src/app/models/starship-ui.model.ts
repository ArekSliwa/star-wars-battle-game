import {Starship} from 'api/models';

export interface StarshipUI {
  name: string;
  crew: string;
  url: string;
}

export class StarshipAdapter {
  static adapt(starshipBackend: Starship): StarshipUI {
    return <StarshipUI>{
      name: starshipBackend.name,
      crew: starshipBackend.crew,
      url: starshipBackend.url
    };
  }
}


