import * as React from 'react';
import { Router } from 'director';
import TodoApp from './containers/todoApp';
import * as ReactDOM from 'react-dom';
import { navigate, init } from './actions';
import { configureStore } from './lib/configureStore';
import { Provider } from 'react-redux';

const store = configureStore();

const routes = [
  '/',
  '/active',
  '/completed'
];
const router = Router(routes.reduce((res, route) => ({ ...res, [route]: () => store.dispatch(navigate(route))}), {}));

ReactDOM.render(
  <Provider store={store}>
    <TodoApp/>
  </Provider>,
  document.getElementsByClassName('todoapp')[0]
);

store.dispatch(init());
router.init('/');

