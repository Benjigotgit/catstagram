import {AsyncStorage} from 'react-native';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import AppReducer from './reducers/AppReducer';
import AppPersistedReducer from './reducers/AppPersistedReducer';

const persistConfig = {
  key: 'user',
  storage: AsyncStorage,
};

const middlewares = [thunk];


export default function configureStore() {
  const enhancer = compose(applyMiddleware(...middlewares));
  const persistedReducer = persistReducer(persistConfig, AppPersistedReducer);
  const store = createStore(
      combineReducers({persistedReducer, reducer: AppReducer}),
      enhancer,
  );
  const persistor = persistStore(store);
  return {store, persistor};
}