// import { Injectable } from '@angular/core';
// import { HttpService } from './http.service';
// import { Observable } from 'rxjs';
// import {GameMeta,GameMetaGet} from '../store/game.actions';
// import {Store} from '@ngrx/store';
// import {map, tap} from 'rxjs/operators';
// import {CookieService} from 'ngx-cookie-service';


// @Injectable({
//   providedIn: 'root'
// })
// export class StoreService {

//   constructor(private cookieService: CookieService, private httpService: HttpService, private store: Store<{ gameMeta: GameMeta }>) { }

//   getGameMeta(){
//     this.store.dispatch(new GameMetaGet());
//   }

//   setGameMeta(gameMeta: GameMeta) {
//     this.store.dispatch({})
//   this.cookieService.set('game-meta', JSON.stringify(gameMeta));
// }
// }
