import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {PeopleApiService, StarshipsApiService} from 'api/index';

import * as GameActions from './game.actions';
import {catchError, map, pluck, switchMap} from 'rxjs/operators';
import {GetPeopleResponse, GetStarshipsResponse} from 'api/models/index';
import {of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class GameEffects {

  getPeopleTotal$ = createEffect(() =>
  this.actions$.pipe(
    ofType(GameActions.getPeopleTotal),
    switchMap(() =>
      this.peopleApiService.getPeople().pipe(
        pluck('body'),
        map((response: GetPeopleResponse) =>
          GameActions.getPeopleTotalSuccess({ peopleTotal: response.count })),
        catchError(({message}: HttpErrorResponse) =>
          of(GameActions.getPeopleTotalFailure({error: message})))
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
            GameActions.getStarshipsTotalSuccess({ starshipsTotal: response.count })),
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
