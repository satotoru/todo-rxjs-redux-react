import { Epic } from 'redux-observable';
import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import {
  IValidateTodo,
  IUpdateTodo,
  IAddTodo,
} from '../actions';
import { Utils } from '../lib/utils';

interface Action {
  type: string;
}

declare class ActionsObservable<T extends Action> extends Observable<T> {
  ofType(...key: T['type'][]): ActionsObservable<T>;
}

const mapToSuccess = (action, payload) => {
  return {
    type: `${action.type}_SUCCESS`,
    payload
  };
};

const mapToFailure = (action, error: any) => {
  return {
    type: `${action.type}_FAIL`,
    payload: {
      original: action.payload,
      error
    }
  };
};

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

const updateTodoEpic: Epic<IUpdateTodo, IState> = (action$: ActionsObservable<IUpdateTodo>, store) => {
  return action$.ofType('UPDATE_TODO')
          .map((action) => {
            const currentTodo = store.getState().data.todos.filter((t) => t.id === action.payload.id)[0];
            return {
              action,
              error: validateTodo({...currentTodo, title: action.payload.title })
            };
          })
          .map(({ action, error }) => Utils.isEmpty(error) ? mapToSuccess(action, action.payload) : mapToFailure(action, error));
};

const addTodoEpic: Epic<IAddTodo, IState> = (action$: ActionsObservable<IAddTodo>, store) => {
  return action$.ofType('ADD_TODO')
          .map((action) => {
            const todo = {
              id: null,
              title: action.payload.title,
              completed: false
            };
            return {
              action,
              error: validateTodo(todo)
            };
          })
          .map(({ action, error }) => Utils.isEmpty(error) ? mapToSuccess(action, action.payload) : mapToFailure(action, error));
};


export default combineEpics(
  validateTodoEpic,
  updateTodoEpic,
  addTodoEpic
);
