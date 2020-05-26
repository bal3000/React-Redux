import { createStore, applyMiddleware, compose } from "redux";
import immutableStateInvariantMiddleware from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middlewares = [thunk, immutableStateInvariantMiddleware()];
  const middleWareEnhancer = applyMiddleware(...middlewares);
  const composeEnhancers =
    (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  return createStore(rootReducer, composeEnhancers(middleWareEnhancer));
}
