import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from './store/reducers';
import { StartOnlineOfflineCheck } from './store/actions/network.actions';
import { NetworkEffects } from './store/effects/network.effects';

@Injectable({
    providedIn : 'root'
})
export class estadoInternetService {

    public _ESTADO_INTERNET$: Observable<boolean>;

    constructor(private store: Store<fromRoot.State>,
                private internet: NetworkEffects
    ) {
      this._ESTADO_INTERNET$ = this.store.select(fromRoot.getIsOnline);
      this.store.dispatch(new StartOnlineOfflineCheck());
    }

    getEstadoInternetAsBoolean(): boolean {
        return this.internet.getEstadoInternetAsBoolean();
    }
}
