import { SetIsOnline } from '../actions/network.actions';
import { Observable, merge, of, fromEvent, BehaviorSubject } from 'rxjs';
import { switchMap, mapTo, map } from 'rxjs/operators';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import * as networkActions from '../actions/network.actions';

@Injectable()
export class NetworkEffects {

  private estadoInternet: BehaviorSubject<boolean>;

  constructor(private actions$: Actions) {
      this.estadoInternet = new BehaviorSubject<boolean>(false);
  }

  @Effect()
  startOnlineOfflineCheck$: Observable<Action> = this.actions$.pipe(
    ofType(networkActions.NetworkActionTypes.StartOnlineOfflineCheck),
    switchMap(() => {
      return merge(
        of(navigator.onLine),
        fromEvent(window, 'online').pipe(mapTo(true)),
        fromEvent(window, 'offline').pipe(mapTo(false))
      );
    }),
    map(isOnline => {
      this.setEstadoInternet(isOnline);
      return new SetIsOnline(isOnline);
    })
  );

  getEstadoInternetAsObservable(): Observable<boolean>{
    return this.estadoInternet.asObservable();
  }

  getEstadoInternetAsBoolean(): boolean{
    return this.estadoInternet.value;
  }

  setEstadoInternet(estado): void {
    this.estadoInternet.next(estado);
  }
}
