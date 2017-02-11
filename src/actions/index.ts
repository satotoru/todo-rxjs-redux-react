export interface IInit {
  type: 'INIT';
}
export function init(): IInit {
  return { type: 'INIT'};
}

export interface IFetchTodo {
  type: 'FETCH_TODO';
}
export interface IFetchTodoSuccess {
  type: 'FETCH_TODO_SUCCESS';
  payload: {
    todos: ITodo[]
  };
}
export interface IFetchTodoFail {
  type: 'FETCH_TODO_FAIL';
  payload: {
    error: any;
  };
}
export function fetchTodo(): IFetchTodo {
  return { type: 'FETCH_TODO' };
}

export interface IChangeNewTodo {
  type: 'CHANGE_NEW_TODO';
  payload: {
    title: string;
  };
}
export function changeNewTodo(title: string): IChangeNewTodo {
  return {
    type: 'CHANGE_NEW_TODO',
    payload: { title }
  };
}

export interface IAddTodo {
  type: 'ADD_TODO';
  payload: {
    title: string;
  };
}
export interface IAddTodoSuccess {
  type: 'ADD_TODO_SUCCESS';
  payload: { todo: ITodo };
}
export interface IAddTodoFail {
  type: 'ADD_TODO_FAIL';
  payload: {
    error: any;
  };
}
export function addTodo(title: string): IAddTodo {
  return {
    type: 'ADD_TODO',
    payload: { title }
  };
}

export interface IDeleteTodo {
  type: 'DELETE_TODO';
  payload: {
    id: string;
  };
}
export interface IDeleteTodoSuccess {
  type: 'DELETE_TODO_SUCCESS';
  payload: {
    id: string;
  };
}
export interface IDeleteTodoFail {
  type: 'DELETE_TODO_FAIL';
  payload: {
    error: any;
  };
}
export function deleteTodo(id: string): IDeleteTodo {
  return {
    type: 'DELETE_TODO',
    payload: { id }
  };
}

export interface IEditTodo {
  type: 'EDIT_TODO';
  payload: {
    id: string;
  };
}
export function editTodo(id: string): IEditTodo {
  return {
    type: 'EDIT_TODO',
    payload: { id }
  };
}

export interface IValidateTodo {
  type: 'VALIDATE_TODO';
  payload: {
    todo: ITodo;
  };
}
export interface IValidateTodoSuccess {
  type: 'VALIDATE_TODO_SUCCESS';
  payload: IValidateTodo['payload'];
}
export interface IValidateTodoFail {
  type: 'VALIDATE_TODO_FAIL';
  payload: {
    error: any;
  };
}
export function validateTodo(todo: ITodo): IValidateTodo {
  return {
    type: 'VALIDATE_TODO',
    payload: { todo }
  };
}

export interface ICancelTodo {
  type: 'CANCEL_TODO';
}
export function cancelTodo(): ICancelTodo {
  return {
    type: 'CANCEL_TODO',
  };
}

export interface IUpdateTodo {
  type: 'UPDATE_TODO';
  payload: {
    id: string;
    title: string;
  };
}
export interface IUpdateTodoSuccess {
  type: 'UPDATE_TODO_SUCCESS';
  payload: { todo: ITodo };
}
export interface IUpdateTodoFail {
  type: 'UPDATE_TODO_FAIL';
  payload: {
    error: any;
  };
}
export function updateTodo(id: string, title: string): IUpdateTodo {
  return {
    type: 'UPDATE_TODO',
    payload: { id, title }
  };
}

export interface IToggleTodo {
  type: 'TOGGLE_TODO';
  payload: {
    id: string;
  };
}
export interface IToggleTodoSuccess {
  type: 'TOGGLE_TODO_SUCCESS';
  payload: IToggleTodo['payload'];
}
export interface IToggleTodoFail {
  type: 'TOGGLE_TODO_FAIL';
  payload: {
    error: any;
  };
}
export function toggleTodo(id: string): IToggleTodo {
  return {
    type: 'TOGGLE_TODO',
    payload: { id }
  };
}

export interface IToggleAll {
  type: 'TOGGLE_ALL';
}
export interface IToggleAllSuccess {
  type: 'TOGGLE_ALL_SUCCESS';
}
export interface IToggleAllFail {
  type: 'TOGGLE_ALL_FAIL';
}
export function toggleAll(): IToggleAll {
  return { type: 'TOGGLE_ALL' };
}

export interface IClearCompleted {
  type: 'CLEAR_COMPLETED';
}
export interface IClearCompletedSuccess {
  type: 'CLEAR_COMPLETED_SUCCESS';
}
export interface IClearCompletedFail {
  type: 'CLEAR_COMPLETED_FAIL';
}
export function clearCompleted(): IClearCompleted {
  return { type: 'CLEAR_COMPLETED' };
}

export interface INavigate {
  type: 'NAVIGATE';
  payload: {
    path: string;
  };
}
export function navigate(path): INavigate {
  return {
    type: 'NAVIGATE',
    payload: { path }
  };
}
