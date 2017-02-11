import { Reducer } from 'redux';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS, ENTER_KEY } from '../../lib/constants';
import {
  INavigate,
  IEditTodo,
  ICancelTodo,
  IUpdateTodoSuccess,
  IValidateTodoSuccess,
  IValidateTodoFail,
  IChangeNewTodo,
  IAddTodoSuccess
} from '../../actions';

const initialState: IAppState = {
  editing: null,
  nowShowing: ALL_TODOS,
  addText: '',
  error: null
};

type IAction = (
  INavigate |
  IEditTodo |
  ICancelTodo |
  IUpdateTodoSuccess |
  IValidateTodoSuccess |
  IValidateTodoFail |
  IChangeNewTodo |
  IAddTodoSuccess
);

const todoApp: Reducer<IAppState> = (state = initialState, action: IAction) => {
  switch (action.type) {
  case 'NAVIGATE': {
    switch (action.payload.path) {
    case '/':
      return { ...state, nowShowing: ALL_TODOS };
    case '/active':
      return { ...state, nowShowing: ACTIVE_TODOS };
    case '/completed':
      return { ...state, nowShowing: COMPLETED_TODOS };
    default:
      return state;
    }
  }
  case 'EDIT_TODO':
    return { ...state, editing: action.payload.id };
  case 'UPDATE_TODO_SUCCESS':
    return { ...state, editing: null, error: null };
  case 'CANCEL_TODO':
    return { ...state, editing: null, error: null };
  case 'VALIDATE_TODO_SUCCESS': {
    return { ...state, error: null };
  }
  case 'VALIDATE_TODO_FAIL': {
    return { ...state, error: action.payload.error };
  }
  case 'CHANGE_NEW_TODO': {
    return { ...state, addText: action.payload.title };
  }
  case 'ADD_TODO_SUCCESS': {
    return { ...state, addText: '' };
  }
  default:
    return state;
  }
};

export default todoApp;

