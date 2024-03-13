// import {Injectable} from '@angular/core';
// import {GameMetaActions, GameMeta} from './game.actions';
// import {StoreService } from '../services/store.service';
// import {Actions, Effect, ofType} from '@ngrx/effects';
// import {catchError, map, mergeMap} from 'rxjs/operators';
// import {EMPTY} from 'rxjs';

// @Injectable()
// export class UserEffects {
//   @Effect()
//   getPermissions$ = this.actions$.pipe(
//     ofType(GameMetaActions.gameMeta),
//     mergeMap(() => this.storeService.getGameMeta()
//       .pipe(
//         map((gameMeta: GameMeta) => {
//           return new GameMeta(gameMeta); // sets user permission in store
//         }),
//         catchError(() => EMPTY)
//       ))
//   );

//   constructor(
//     private actions$: Actions,
//     private storeService: StoreService
//   ) {
//   }

// }
