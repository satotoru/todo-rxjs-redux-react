import { Epic } from 'redux-observable';
import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import { Utils } from '../lib/utils';
import * as TodoRepository from '../repositories/todoRepository';
import { TodoAction } from '../typings/actions';
import * as todoActions from '../actions/todoActions';

const validateTodo = (todo: ITodo) => {
  const error: ErrorMessage<ITodo> = {};
  if (todo.title.length > 10) {
    error.title = 'Enter within 10 characters';
  }
  return {
    isValid: Utils.isEmpty(error),
    error,
    data: todo
  };
};

const fetchTodoEpic: Epic<any, IState> = (action$: ActionsObservable<TodoAction.IFetchTodo>, store) => {
  return action$.ofType('FETCH_TODO')
          .mergeMap((action) => Observable.fromPromise(TodoRepository.fetchAll()))
          .map((todos) => todoActions.fetchTodoSuccess(todos));
};

const validateTodoEpic: Epic<any, IState> = (action$: ActionsObservable<TodoAction.IValidateTodo>, store) => {
  return action$.ofType('VALIDATE_TODO')
          .debounceTime(1000 * 0.5)
          .map((action) => validateTodo(action.payload.todo))
          .map(({ isValid, error, data }) => isValid ? todoActions.validateTodoSuccess() : todoActions.validateTodoFail(data.id, error));
};

const updateTodoEpic: Epic<any, IState> = (action$: ActionsObservable<TodoAction.IUpdateTodo>, store) => {
  return action$.ofType('UPDATE_TODO')
          .map((action) => {
            const currentTodo = store.getState().data.todos.filter((t) => t.id === action.payload.id)[0];
            return { ...currentTodo, title: action.payload.title };
          })
          .map(validateTodo)
          .filter(({ isValid }) => isValid)
          .map(({ data }) => data)
          .mergeMap((todo) => (
            Observable.fromPromise(TodoRepository.update(todo))
            .map(() => todo)
          ))
          .map((todo) => todoActions.setTodo(todo.id, Utils.omit(todo, 'id')));
};

const addTodoEpic: Epic<any, IState> = (action$: ActionsObservable<TodoAction.IAddTodo>, store) => {
  return action$.ofType('ADD_TODO')
          .map((action) => ({ id: null, title: store.getState().ui.todoApp.addText, completed: false }) )
          .filter((todo) => !!todo.title)
          .map(validateTodo)
          .filter(({ isValid }) => isValid)
          .map(({ data }) => data)
          .mergeMap((todo) => (
            Observable.fromPromise(TodoRepository.insert(todo))
            .map((id) => ({ ...todo, id }))
          ))
          .map((todo) => todoActions.setNewTodo(todo));
};

const deleteTodoEpic: Epic<any, IState> = (action$: ActionsObservable<TodoAction.IDeleteTodo>, store) => {
  return action$.ofType('DELETE_TODO')
          .map((action) => action.payload.id)
          .mergeMap((id) => (
            Observable.fromPromise(TodoRepository.destroy([id]))
            .map(() => id)
          ))
          .map((id) => todoActions.removeTodo([id]));
};

const toggleAllTodoEpic: Epic<any, IState> = (action$: ActionsObservable<TodoAction.IToggleAll>, store) => {
  return action$.ofType('TOGGLE_ALL')
          .map((action) => store.getState().data.todos.filter((t) => !t.completed).length)
          .map((activeTodoCount) => activeTodoCount > 0)
          .mergeMap((completed) => (
            Observable.fromPromise(TodoRepository.updateAll({ completed }))
            .map(() => completed)
          ))
          .map((completed) => todoActions.setAllTodo({ completed }));
};

const clearCompletedEpic: Epic<any, IState> = (action$: ActionsObservable<TodoAction.IClearCompleted>, store) => {
  return action$.ofType('CLEAR_COMPLETED')
          .map((action) => store.getState().data.todos.filter((t) => t.completed).map((t) => t.id))
          .mergeMap((ids) => (
            Observable.fromPromise(TodoRepository.destroy(ids))
            .map(() => ids)
          ))
          .map((ids) => todoActions.removeTodo(ids));
};

const toggleTodoEpic: Epic<any, IState> = (action$: ActionsObservable<TodoAction.IToggleTodo>, store) => {
  return action$.ofType('TOGGLE_TODO')
          .map((action) => store.getState().data.todos.filter((t) => t.id === action.payload.id)[0])
          .map((todo) => ({ ...todo, completed: !todo.completed }))
          .mergeMap((todo) => (
            Observable.fromPromise(TodoRepository.update(todo))
            .map(() => todo)
          ))
          .map((todo) => todoActions.setTodo(todo.id, Utils.pick(todo, 'completed')));
};

const editTodoEpic: Epic<any, IState> = (action$: ActionsObservable<TodoAction.IEditTodo>, store) => {
  return action$.ofType('EDIT_TODO')
          .map((action) => store.getState().data.todos.filter((t) => t.id === action.payload.id)[0])
          .map((todo) => todoActions.setEditText(todo.title));
};

export default combineEpics(
  fetchTodoEpic,
  validateTodoEpic,
  updateTodoEpic,
  addTodoEpic,
  deleteTodoEpic,
  toggleTodoEpic,
  toggleAllTodoEpic,
  clearCompletedEpic,
  editTodoEpic,
);
