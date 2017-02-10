export interface IAddTodo {
  type: 'ADD_TODO';
  payload: {
    title: string;
  };
}
export interface IAddTodoSuccess {
  type: 'ADD_TODO_SUCCESS';
  payload: IAddTodo['payload'];
}
export interface IAddTodoFail {
  type: 'ADD_TODO_FAIL';
  payload: {
    original: IAddTodo['payload'];
    error: ErrorPayload<ITodo>;
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
    original: IValidateTodo['payload'];
    error: ErrorPayload<ITodo>;
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
  payload: IUpdateTodo['payload'];
}
export interface IUpdateTodoFail {
  type: 'UPDATE_TODO_FAIL';
  payload: {
    original: IUpdateTodo['payload'];
    error: ErrorPayload<ITodo>;
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
export function toggleTodo(id: string): IToggleTodo {
  return {
    type: 'TOGGLE_TODO',
    payload: { id }
  };
}

export interface IToggleAll {
  type: 'TOGGLE_ALL';
}
export function toggleAll(): IToggleAll {
  return { type: 'TOGGLE_ALL' };
}

export interface IClearCompleted {
  type: 'CLEAR_COMPLETED';
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
