import {Starship} from 'api/models';
import {BattleUnitModel} from 'models/battle-unit.model';

export interface StarshipUI extends BattleUnitModel {
  crew: string;
}

export class StarshipAdapter {
  static adapt(starshipBackend: Starship): StarshipUI {
    return {
      name: starshipBackend.name,
      crew: starshipBackend.crew,
      url: starshipBackend.url
    } as StarshipUI;
  }
}


