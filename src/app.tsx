import * as React from 'react';
import { Router } from 'director';
import { createEpicMiddleware, ActionsObservable } from 'redux-observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import TodoApp from './containers/todoApp';
import * as ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import rootEpic$ from './epics';
import { navigate } from './actions';
import { createStorageMiddleware, STORAGE_LOAD } from './lib/storageMiddleware';
import { Observable } from 'rxjs/Observable';

const epicMiddleware = createEpicMiddleware(rootEpic$);
const storageMiddleware = createStorageMiddleware({
  states: ['data']
});

const store = createStore(rootReducer, compose(
    applyMiddleware(storageMiddleware, epicMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
const state$ = new BehaviorSubject(store.getState());
store.subscribe(() => state$.next(store.getState()));

function render(state) {
  const { ui, data } = state;
  ReactDOM.render(
    <TodoApp dispatch={store.dispatch} todos={data.todos} appState={ui.todoApp} />,
    document.getElementsByClassName('todoapp')[0]
  );
}

state$.subscribe(render);

const routes = [
  '/',
  '/active',
  '/completed'
];
const router = Router(routes.reduce((res, route) => ({ ...res, [route]: () => store.dispatch(navigate(route))}), {}));

Observable.fromEvent(document, 'DOMContentLoaded').subscribe(() => {
  store.dispatch({ type: STORAGE_LOAD });
  router.init('/');
});

