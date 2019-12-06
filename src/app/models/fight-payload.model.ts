import {StarshipUI} from 'models/starship-ui.model';
import {PersonUI} from 'models/person-ui.model';
import {UNIT_BATTLE_PROP_NAME} from 'models/unit-battle-prop-name.model';

export interface FightPayloadModel {
  player1Unit: PersonUI | StarshipUI;
  player2Unit: PersonUI | StarshipUI;
  battleUnitProp: UNIT_BATTLE_PROP_NAME;
}

export interface FightUnitsIds {
  player1UnitId: string;
  player2UnitId: string;
}
