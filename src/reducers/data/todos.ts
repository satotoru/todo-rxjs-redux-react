import { Utils } from '../../lib/utils';
import { Reducer } from 'redux';
import { TodoAction } from '../../typings/actions';

type IAction = (
  TodoAction.IFetchTodoSuccess |
  TodoAction.ISetNewTodo |
  TodoAction.ISetTodo |
  TodoAction.ISetAllTodo |
  TodoAction.IRemoveTodo
);

const todosReducer: Reducer<ITodo[]> = (state: ITodo[] = [], action: IAction): ITodo[] => {
  switch (action.type) {
  case 'FETCH_TODO_SUCCESS': {
    return action.payload.todos;
  }
  case 'SET_NEW_TODO':
    return [...state, action.payload.todo];
  case 'SET_TODO':
    return state.map((t) =>  (
      t.id === action.payload.id
        ? { ...t, ...action.payload.data }
        : t
    ));
  case 'SET_ALL_TODO':
    return state.map((t) => ({ ...t, ...action.payload.data }));
  case 'REMOVE_TODO':
    return state.filter((t) => action.payload.ids.indexOf(t.id) === -1);
  default:
    return state;
  }
};

export default todosReducer;

