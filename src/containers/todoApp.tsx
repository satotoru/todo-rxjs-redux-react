import * as React from 'react';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/merge';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS, ENTER_KEY } from '../lib/constants';
import TodoApp from '../components/todoApp';
import {
  addTodo,
  toggleAll,
  validateTodo,
  changeNewTodo
} from '../actions';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';

const getVisibleTodos = (todos: ITodo[], nowShowing) => {
  switch (nowShowing) {
  case ACTIVE_TODOS:
    return todos.filter((todo) => !todo.completed);
  case COMPLETED_TODOS:
    return todos.filter((todo) => todo.completed);
  default:
    return todos;
  }
};

interface IStateProps {
  todos: ITodo[];
  appState: IAppState;
}

interface IDispatchProps {
  onSave: () => any;
  onChange: (val) => any;
  onToggle: () => any;
}

const mapStateToProps = (state: IState): IStateProps => {
  return {
    todos: getVisibleTodos(state.data.todos, state.ui.todoApp.nowShowing),
    appState: state.ui.todoApp
  };
};

const mapDispatchToProps = (dispatch): IDispatchProps => {
  return {
    onToggle: () => dispatch(toggleAll()),
    onChange: (val) =>  {
      dispatch(changeNewTodo(val));
      dispatch(validateTodo({ id: null, title: val, completed: false }));
    },
    onSave: () => dispatch(addTodo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
