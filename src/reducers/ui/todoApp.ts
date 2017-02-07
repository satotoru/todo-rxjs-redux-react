import { Reducer } from 'redux';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS, ENTER_KEY } from '../../lib/constants';
import { INavigate, IEditTodo, ICancelTodo, IUpdateTodo } from '../../actions';

const initialState: IAppState = {
  editing: null,
  nowShowing: ALL_TODOS
};

type IAction = INavigate | IEditTodo | ICancelTodo | IUpdateTodo;
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
  case 'UPDATE_TODO':
    return { ...state, editing: null };
  case 'CANCEL_TODO':
    return { ...state, editing: null };
  default:
    return state;
  }
};

export default todoApp;

