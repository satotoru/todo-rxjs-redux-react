import { Utils } from '../../lib/utils';
import { Reducer } from 'redux';
import {
  IAddTodo,
  IDeleteTodo,
  IUpdateTodo,
  IToggleTodo,
  IToggleAll,
  IClearCompleted
} from '../../actions';
import { IStorageLoadSuccessAction } from '../../lib/storageMiddleware';

type IAction = IAddTodo | IDeleteTodo | IUpdateTodo | IToggleTodo | IToggleAll | IClearCompleted | IStorageLoadSuccessAction;
const todosReducer: Reducer<ITodo[]> = (state: ITodo[] = [], action: IAction): ITodo[] => {
  switch (action.type) {
  case 'STORAGE_LOAD_SUCCESS': {
    return action.payload.data.todos;
  }
  case 'ADD_TODO': {
    const todo = { id: Utils.uuid(), title: action.payload.title, completed: false };
    return [ ...state, todo ];
  }
  case 'DELETE_TODO': {
    return state.filter((t) => t.id !== action.payload.id);
  }
  case 'UPDATE_TODO': {
    return state.map((t) =>  (
      t.id === action.payload.id
        ? { ...t, title: action.payload.title }
        : t
    ));
  }
  case 'TOGGLE_TODO': {
    return state.map((t) =>  (
      t.id === action.payload.id
        ? { ...t, completed: !t.completed }
        : t
    ));
  }
  case 'TOGGLE_ALL': {
    const hasActiveTodo = state.filter((t) => !t.completed).length > 0;
    return state.map((t) => ({ ...t, completed: hasActiveTodo }));
  }
  case 'CLEAR_COMPLETED': {
    return state.filter((t) => !t.completed);
  }
  default:
    return state;
  }
};

export default todosReducer;

