import {Person} from 'api/models';

export interface PersonUI {
  name: string;
  mass: string;
  url: string;
}

export class PersonAdapter {
  static adapt(personBackend: Person): PersonUI {
    return <PersonUI>{
      name: personBackend.name,
      mass: personBackend.mass,
      url: personBackend.url
    };
  }
}


