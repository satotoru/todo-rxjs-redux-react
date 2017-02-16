import { createEpicMiddleware } from 'redux-observable';
import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import rootEpic$ from '../epics';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export function configureStore() {
  const epicMiddleware = createEpicMiddleware(rootEpic$);
  return createStore(rootReducer, compose(
      applyMiddleware(epicMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}
