import {
ActionReducerMap,
createFeatureSelector,
createSelector,
MetaReducer
} from '@ngrx/store';

import { environment } from 'src/environments/environment';
import * as fromNetwork from './network.reducer';

export interface State {
network: fromNetwork.State;
}

export const reducers: ActionReducerMap<State> = {
network: fromNetwork.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
? []
: [];

export const getNetworkState = createFeatureSelector<fromNetwork.State>(
'network'
);

export const getIsOnline = createSelector(
getNetworkState,
fromNetwork.getIsOnline
);
