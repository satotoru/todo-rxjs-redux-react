export namespace TodoAction {
  export interface IFetchTodo {
    type: 'FETCH_TODO';
  }

  export interface IFetchTodoSuccess {
    type: 'FETCH_TODO_SUCCESS';
    payload: {
      todos: ITodo[]
    };
  }

  export interface IChangeNewTodo {
    type: 'CHANGE_NEW_TODO';
    payload: {
      title: string;
    };
  }

  export interface IAddTodo {
    type: 'ADD_TODO';
  }

  export interface IDeleteTodo {
    type: 'DELETE_TODO';
    payload: {
      id: string;
    };
  }

  export interface IEditTodo {
    type: 'EDIT_TODO';
    payload: {
      id: string;
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
  }

  export interface IValidateTodoFail {
    type: 'VALIDATE_TODO_FAIL';
    payload: {
      id: ITodo['id']
      error: ErrorMessage<ITodo>;
    };
  }

  export interface ICancelTodo {
    type: 'CANCEL_TODO';
  }

  export interface IUpdateTodo {
    type: 'UPDATE_TODO';
    payload: {
      id: string;
      title: string;
    };
  }

  export interface IToggleTodo {
    type: 'TOGGLE_TODO';
    payload: {
      id: string;
    };
  }

  export interface IToggleAll {
    type: 'TOGGLE_ALL';
  }

  export interface IClearCompleted {
    type: 'CLEAR_COMPLETED';
  }

  export interface ISetTodo {
    type: 'SET_TODO';
    payload: {
      id: ITodo['id'];
      data: Partial<ITodo>;
    };
  }

  export interface ISetNewTodo {
    type: 'SET_NEW_TODO';
    payload: {
      todo: ITodo;
    };
  }

  export interface ISetAllTodo {
    type: 'SET_ALL_TODO';
    payload: {
      data: Partial<ITodo>;
    };
  }

  export interface IRemoveTodo {
    type: 'REMOVE_TODO';
    payload: {
      ids: ITodo['id'][];
    };
  }

  export interface ISetEditText {
    type: 'SET_EDIT_TEXT';
    payload: {
      text: string;
    };
  }
}
