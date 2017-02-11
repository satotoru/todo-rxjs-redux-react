import { TodoAction } from '../typings/actions';

export function fetchTodo(): TodoAction.IFetchTodo {
  return { type: 'FETCH_TODO' };
}

export function fetchTodoSuccess(todos: ITodo[]): TodoAction.IFetchTodoSuccess {
  return {
    type: 'FETCH_TODO_SUCCESS',
    payload: { todos }
  };
}

export function changeNewTodo(title: string): TodoAction.IChangeNewTodo {
  return {
    type: 'CHANGE_NEW_TODO',
    payload: { title }
  };
}

export function addTodo(title: string): TodoAction.IAddTodo {
  return {
    type: 'ADD_TODO',
    payload: { title }
  };
}

export function deleteTodo(id: string): TodoAction.IDeleteTodo {
  return {
    type: 'DELETE_TODO',
    payload: { id }
  };
}

export function editTodo(id: string): TodoAction.IEditTodo {
  return {
    type: 'EDIT_TODO',
    payload: { id }
  };
}

export function validateTodo(todo: ITodo): TodoAction.IValidateTodo {
  return {
    type: 'VALIDATE_TODO',
    payload: { todo }
  };
}

export function validateTodoSuccess(): TodoAction.IValidateTodoSuccess {
  return {
    type: 'VALIDATE_TODO_SUCCESS'
  };
}

export function validateTodoFail(id: ITodo['id'], error: ErrorMessage<ITodo>): TodoAction.IValidateTodoFail {
  return {
    type: 'VALIDATE_TODO_FAIL',
    payload: { id, error }
  };
}

export function cancelTodo(): TodoAction.ICancelTodo {
  return {
    type: 'CANCEL_TODO',
  };
}

export function updateTodo(id: string, title: string): TodoAction.IUpdateTodo {
  return {
    type: 'UPDATE_TODO',
    payload: { id, title }
  };
}

export function toggleTodo(id: string): TodoAction.IToggleTodo {
  return {
    type: 'TOGGLE_TODO',
    payload: { id }
  };
}

export function toggleAll(): TodoAction.IToggleAll {
  return { type: 'TOGGLE_ALL' };
}

export function clearCompleted(): TodoAction.IClearCompleted {
  return { type: 'CLEAR_COMPLETED' };
}

export function setTodo(id: ITodo['id'], data: Partial<ITodo>): TodoAction.ISetTodo {
  return {
    type: 'SET_TODO',
    payload: { id, data }
  };
}

export function setNewTodo(todo: ITodo): TodoAction.ISetNewTodo {
  return {
    type: 'SET_NEW_TODO',
    payload: { todo }
  };
}

export function setAllTodo(data: Partial<ITodo>): TodoAction.ISetAllTodo {
  return {
    type: 'SET_ALL_TODO',
    payload: { data }
  };
}

export function removeTodo(ids: ITodo['id'][]): TodoAction.IRemoveTodo {
  return {
    type: 'REMOVE_TODO',
    payload: { ids }
  };
}
