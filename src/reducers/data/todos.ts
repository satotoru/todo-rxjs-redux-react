import { Utils } from '../../lib/utils';
import { Reducer } from 'redux';
import {
  IAddTodoSuccess,
  IDeleteTodoSuccess,
  IUpdateTodoSuccess,
  IToggleTodoSuccess,
  IToggleAllSuccess,
  IClearCompletedSuccess,
  IFetchTodoSuccess,
} from '../../actions';

type IAction = IAddTodoSuccess | IDeleteTodoSuccess | IUpdateTodoSuccess | IToggleTodoSuccess | IToggleAllSuccess | IClearCompletedSuccess | IFetchTodoSuccess;
const todosReducer: Reducer<ITodo[]> = (state: ITodo[] = [], action: IAction): ITodo[] => {
  switch (action.type) {
  case 'FETCH_TODO_SUCCESS': {
    return action.payload.todos;
  }
  case 'ADD_TODO_SUCCESS': {
    return [ ...state, action.payload.todo ];
  }
  case 'DELETE_TODO_SUCCESS': {
    return state.filter((t) => t.id !== action.payload.id);
  }
  case 'UPDATE_TODO_SUCCESS': {
    return state.map((t) =>  (
      t.id === action.payload.todo.id
        ? { ...t, ...action.payload.todo }
        : t
    ));
  }
  case 'TOGGLE_TODO_SUCCESS': {
    return state.map((t) =>  (
      t.id === action.payload.id
        ? { ...t, completed: !t.completed }
        : t
    ));
  }
  case 'TOGGLE_ALL_SUCCESS': {
    const hasActiveTodo = state.filter((t) => !t.completed).length > 0;
    return state.map((t) => ({ ...t, completed: hasActiveTodo }));
  }
  case 'CLEAR_COMPLETED_SUCCESS': {
    return state.filter((t) => !t.completed);
  }
  default:
    return state;
  }
};

export default todosReducer;

