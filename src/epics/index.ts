import { Epic } from 'redux-observable';
import { combineEpics } from 'redux-observable';
import todoEpic from './todoEpic';
import {
  IInit,
  fetchTodo,
} from '../actions';

const initEpic: Epic<any, IState> = (action$: ActionsObservable<IInit>, store) => {
  return action$.ofType('INIT').mapTo(fetchTodo());
};

export default combineEpics(
  initEpic,
  todoEpic,
);
