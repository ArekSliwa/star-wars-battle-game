import {Person} from 'api/models';
import {BattleUnitModel} from 'models/battle-unit.model';

export interface PersonUI extends BattleUnitModel {
  mass: string;
}

export class PersonAdapter {
  static adapt(personBackend: Person): PersonUI {
    return {
      name: personBackend.name,
      mass: personBackend.mass,
      url: personBackend.url
    } as PersonUI;
  }
}


