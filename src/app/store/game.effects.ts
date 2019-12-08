import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {PeopleApiService, StarshipsApiService} from 'api/index';

import * as GameActions from './game.actions';
import {catchError, concatMap, filter, map, pluck, switchMap} from 'rxjs/operators';
import {GetPeopleResponse, GetStarshipsResponse} from 'api/models/index';
import {combineLatest, of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {PersonAdapter} from 'models/person-ui.model';
import {StarshipAdapter} from 'models/starship-ui.model';
import {getPeople} from './game.actions';

@Injectable()
export class GameEffects {

  getPeople$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.getPeople),
      concatMap(({nextPageUrl}) =>
        this.peopleApiService.getPeople(nextPageUrl).pipe(
          pluck('body'),
          switchMap(({results, next, count}: GetPeopleResponse) => [
            GameActions.getPeopleSuccess({
              people: results.map((person) => PersonAdapter.adapt(person)),
              page: getPageNumber(nextPageUrl),
              total: count
            }),
            next ?
              GameActions.getPeople({nextPageUrl: getLastSegment(next)})
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
          switchMap(({results, next, count}: GetStarshipsResponse) => [
            GameActions.getStarshipsSuccess({
              starships: results.map((starship) => StarshipAdapter.adapt(starship)),
              page: getPageNumber(nextPageUrl),
              total: count
            }),
            next ?
              GameActions.getStarships({nextPageUrl: getLastSegment(next)})
              : GameActions.getAllStarshipsFinish()
          ]),
          catchError(({message}: HttpErrorResponse) =>
            of(GameActions.getStarshipsFailure({error: message})))
        )
      )
    ));

  countTotalLoadedInPercentage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.getPeopleSuccess),
      (getPeopleSuccess) =>  combineLatest( getPeopleSuccess, this.actions$.pipe(ofType(GameActions.getStarshipsSuccess))),
      map(([getPeopleSuccess, getStarshipsSuccess]) => {
        const onePage = 10;
        const resourcesTotalPages = Math.ceil((getPeopleSuccess.total + getStarshipsSuccess.total) / onePage);
        const resourcesTotalLoadedPages = getPeopleSuccess.page + getStarshipsSuccess.page;
        const totalLoadedInPercentage = Number(((resourcesTotalLoadedPages * 100) / resourcesTotalPages).toFixed());

        return GameActions.countTotalLoaded({ totalLoadedInPercentage });
      })
    )
  );

  resetScore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.changeBattleUnit),
      map(() => GameActions.updateScore({
        score: {
          player1: 0,
          player2: 0
        }
      }))
    ));

  constructor(
    private actions$: Actions,
    private peopleApiService: PeopleApiService,
    private starshipsApiService: StarshipsApiService
  ) {
  }
}

export function getLastSegment(url: string): string {
  return url.substring(url.lastIndexOf('/'));
}

export function getPageNumber(pageUrl: string): number {
  return Number(pageUrl.substring(pageUrl.lastIndexOf('=') + 1));
}
