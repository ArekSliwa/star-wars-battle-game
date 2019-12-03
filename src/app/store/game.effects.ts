import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {PeopleApiService, StarshipsApiService} from 'api/index';

import * as GameActions from './game.actions';
import {catchError, concatMap, pluck, switchMap} from 'rxjs/operators';
import {GetPeopleResponse, GetStarshipsResponse} from 'api/models/index';
import {of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {PersonAdapter} from 'models/person-ui.model';
import {StarshipAdapter} from 'models/starship-ui.model';

@Injectable()
export class GameEffects {

  getPeople$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.getPeople),
      concatMap(({nextPageUrl}) =>
        this.peopleApiService.getPeople(nextPageUrl).pipe(
          pluck('body'),
          switchMap((response: GetPeopleResponse) => [
            GameActions.getPeopleSuccess({
              people: response.results.map((person) => PersonAdapter.adapt(person))
            }),
            response.next ?
              GameActions.getPeople({nextPageUrl: getLastSegment(response.next)})
              : GameActions.getAllPeopleFinish()
          ]),
          catchError(({message}: HttpErrorResponse) =>
            of(GameActions.getPeopleFailure({error: message})))
        )
      )
    ));

  getStarships$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.getStarships),
      switchMap(({nextPageUrl}) =>
        this.starshipsApiService.getStarships(nextPageUrl).pipe(
          pluck('body'),
          switchMap((response: GetStarshipsResponse) => [
            GameActions.getStarshipsSuccess({starships: response.results.map((starship) => StarshipAdapter.adapt(starship))}),
            response.next ?
              GameActions.getStarships({nextPageUrl: getLastSegment(response.next)})
              : GameActions.getAllStarshipsFinish()
          ]),
          catchError(({message}: HttpErrorResponse) =>
            of(GameActions.getStarshipsFailure({error: message})))
        )
      )
    ));

  constructor(
    private actions$: Actions,
    private peopleApiService: PeopleApiService,
    private starshipsApiService: StarshipsApiService
  ) {
  }
}

export function getLastSegment(url) {
  return url.substring(url.lastIndexOf('/'));
}
