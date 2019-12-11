import {UNIT_BATTLE_PROP_NAME} from 'models/unit-battle-prop-name.model';

export function getEnumKeyByValue(enumType, enumVal) {
  let enumKeyToReturn;
  for (const enumKey in enumType) {

    if (UNIT_BATTLE_PROP_NAME[enumKey] === enumVal) {
      enumKeyToReturn = enumKey;
    }
  }
  return enumKeyToReturn;
}
