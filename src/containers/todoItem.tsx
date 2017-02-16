import * as React from 'react';
import { TodoItem } from '../components/todoItem';
import { ENTER_KEY, ESCAPE_KEY } from '../lib/constants';
import { connect } from 'react-redux';
import {
  toggleTodo,
  deleteTodo,
  updateTodo,
  editTodo,
  validateTodo,
  cancelTodo,
  setEditText,
} from '../actions';

interface IOwnProps {
  key: string;
  todo: ITodo;
}

interface IStateProps {
  key: string;
  todo: ITodo;
  editing: boolean;
  editText: string;
  errorMessage: ErrorMessage<ITodo>;
}

interface IDispatchProps {
  onSave: (val: any) => any;
  onDestroy: () => any;
  onEdit: ()  => any;
  onCancel: () => any;
  onToggle: () => any;
  onChange: (val) => any;
}

const mapStateToProps = (state: IState, ownProps: IOwnProps): IStateProps => {
  const todo = ownProps.todo;
  const { editing, editText, error } = state.ui.todoApp;
  return {
    ...ownProps,
    editing: editing === todo.id,
    editText: editText,
    errorMessage: (error && error.id === todo.id) ? error.messages : null
  };
};

const mapDispatchToProps = (dispatch, ownProps: IOwnProps): IDispatchProps => {
  const todo: ITodo = ownProps.todo;
  return {
    onSave: (val: string) => dispatch(updateTodo(todo.id, val)),
    onDestroy: () => dispatch(deleteTodo(todo.id)),
    onEdit: () => dispatch(editTodo(todo.id)),
    onCancel: () => dispatch(cancelTodo()),
    onToggle: () => dispatch(toggleTodo(todo.id)),
    onChange: (val) => {
      dispatch(setEditText(val));
      dispatch(validateTodo({ ...todo, title: val }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
