import { Epic } from 'redux-observable';
import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import { Utils } from '../lib/utils';
import * as TodoRepository from '../repositories/todoRepository';
import { mapToFailure, mapToSuccess } from './epicUtils';
import {
  IValidateTodo,
  IUpdateTodo,
  IUpdateTodoSuccess,
  IAddTodo,
  IFetchTodo,
  IFetchTodoSuccess,
  IDeleteTodo,
  IDeleteTodoSuccess,
  IToggleTodo,
  IToggleTodoSuccess,
  IToggleAll,
  IToggleAllSuccess,
  IClearCompleted,
  IClearCompletedSuccess
} from '../actions';

const validateTodo = (todo: ITodo) => {
  const error: ErrorPayload<ITodo> = {};
  if (todo.title.length > 10) {
    error.title = 'Enter within 10 characters';
  }
  if (!Utils.isEmpty(error)) {
    error.id = todo.id;
  }
  return error;
};

const fetchTodoEpic: Epic<any, IState> = (action$: ActionsObservable<IFetchTodo>, store) => {
  return action$.ofType('FETCH_TODO')
          .mergeMap((action) => {
            return Observable.fromPromise(TodoRepository.fetchAll())
            .map((todos) => ({...action, payload: { todos }}))
            .catch((error) => Observable.throw({action, error}));
          })
          .map((action) => mapToSuccess(action, action.payload) as IFetchTodoSuccess);
};

const validateTodoEpic: Epic<any, IState> = (action$: ActionsObservable<IValidateTodo>, store) => {
  return action$.ofType('VALIDATE_TODO')
          .map((action) => {
            return {
              action,
              error: validateTodo(action.payload.todo)
            };
          })
          .map(({ action, error }) => Utils.isEmpty(error) ? mapToSuccess(action, action.payload) : mapToFailure(action, error));
};

const updateTodoEpic: Epic<any, IState> = (action$: ActionsObservable<IUpdateTodo>, store) => {
  return action$.ofType('UPDATE_TODO')
          .map((action) => {
            const currentTodo = store.getState().data.todos.filter((t) => t.id === action.payload.id)[0];
            const todo = { ...currentTodo, title: action.payload.title };
            return { ...action, payload: { todo } };
          })
          .map((action) => {
            const error = validateTodo(action.payload.todo);
            if (!Utils.isEmpty(error)) {
              throw { action, error };
            }
            return action;
          })
          .mergeMap((action) => {
            return Observable.fromPromise(TodoRepository.update(action.payload.todo))
            .map(() => action)
            .catch((error) => Observable.throw({action, error}));
          })
          .map((action) => mapToSuccess(action, action.payload) as IUpdateTodoSuccess)
          .catch((error, caught) => {
            store.dispatch(mapToFailure(error.action, error.error));
            return caught;
          });
};

const addTodoEpic: Epic<any, IState> = (action$: ActionsObservable<IAddTodo>, store) => {
  return action$.ofType('ADD_TODO')
          .map((action) => {
            const todo = {
              id: null,
              title: action.payload.title,
              completed: false
            };
            return { ...action, payload: { todo } };
          })
          .map((action) => {
            const error = validateTodo(action.payload.todo);
            if (!Utils.isEmpty(error)) {
              throw { action, error };
            }
            return action;
          })
          .mergeMap((action) => {
            return Observable.fromPromise(TodoRepository.insert(action.payload.todo))
            .map((id) => {
              const todo = { ...action.payload.todo, id };
              return { type: action.type, payload: { todo } };
            })
            .catch((error) => Observable.throw({action, error}));
          })
          .map((action) => mapToSuccess(action, action.payload))
          .catch((error, caught) => {
            store.dispatch(mapToFailure(error.action, error.error));
            return caught;
          });
};

const deleteTodoEpic: Epic<any, IState> = (action$: ActionsObservable<IDeleteTodo>, store) => {
  return action$.ofType('DELETE_TODO')
          .mergeMap((action) => {
            return Observable.fromPromise(TodoRepository.destroyOne(action.payload.id))
            .map(() => action)
            .catch((error) => Observable.throw({action, error}));
          })
          .map((action) => mapToSuccess(action, action.payload) as IDeleteTodoSuccess);
};

const toggleTodoEpic: Epic<any, IState> = (action$: ActionsObservable<IToggleTodo>, store) => {
  return action$.ofType('TOGGLE_TODO')
          .mergeMap((action) => {
            const todo = store.getState().data.todos.filter((t) => t.id === action.payload.id)[0];
            return Observable.fromPromise(TodoRepository.update({...todo, completed: !todo.completed}))
            .map(() => action)
            .catch((error) => Observable.throw({action, error}));
          })
          .map((action) => mapToSuccess(action, action.payload) as IToggleTodoSuccess);

};

const toggleAllTodoEpic: Epic<any, IState> = (action$: ActionsObservable<IToggleAll>, store) => {
  return action$.ofType('TOGGLE_ALL')
          .mergeMap((action) => {
            const hasActiveTodo = store.getState().data.todos.filter((t) => !t.completed).length > 0;
            return Observable.fromPromise(TodoRepository.updateAll({ completed: hasActiveTodo }))
            .map(() => action)
            .catch((error) => Observable.throw({action, error}));
          })
          .map((action) => mapToSuccess(action) as IToggleAllSuccess);

};

const clearCompletedEpic: Epic<any, IState> = (action$: ActionsObservable<IClearCompleted>, store) => {
  return action$.ofType('CLEAR_COMPLETED')
          .mergeMap((action) => {
            const ids = store.getState().data.todos.filter((t) => t.completed).map((t) => t.id);
            return Observable.fromPromise(TodoRepository.destroy(ids))
            .map(() => action)
            .catch((error) => Observable.throw({action, error}));
          })
          .map((action) => mapToSuccess(action) as IClearCompletedSuccess);

};

export default combineEpics(
  fetchTodoEpic,
  validateTodoEpic,
  updateTodoEpic,
  addTodoEpic,
  deleteTodoEpic,
  toggleTodoEpic,
  toggleAllTodoEpic,
  clearCompletedEpic
);
