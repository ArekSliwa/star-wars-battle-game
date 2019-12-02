import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {PeopleApiService, StarshipsApiService} from 'api/index';

import * as GameActions from './game.actions';
import {catchError, concatMap, map, mergeMap, pluck, switchMap} from 'rxjs/operators';
import {GetPeopleResponse, GetStarshipsResponse} from 'api/models/index';
import {empty, Observable, of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {PersonAdapter} from 'models/person-ui.model';

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
            response.next ? GameActions.getPeople({nextPageUrl: response.next.substring(response.next.lastIndexOf('/'))}) : GameActions.getAllPeopleFinish()
          ]),
          catchError(({message}: HttpErrorResponse) =>
            of(GameActions.getPeopleFailure({error: message})))
        )
      )
    ));

  getStarshipsTotal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.getStarshipsTotal),
      switchMap(() =>
        this.starshipsApiService.getStarships().pipe(
          pluck('body'),
          map((response: GetStarshipsResponse) =>
            GameActions.getStarshipsTotalSuccess({starshipsTotal: response.count})),
          catchError(({message}: HttpErrorResponse) =>
            of(GameActions.getStarshipsTotalFailure({error: message})))
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
