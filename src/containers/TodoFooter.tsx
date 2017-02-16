import * as React from 'react';
import { TodoFooter } from '../components/footer';
import { clearCompleted, } from '../actions';
import { connect } from 'react-redux';

interface IStateProps {
  count: number;
  completedCount: number;
  nowShowing: string;
}

interface IDispatchProps {
  onClearCompleted: () => any;
}

const mapStateToProps = (state: IState) => {
  return {
    count: state.data.todos.filter((t) => !t.completed).length,
    completedCount: state.data.todos.filter((t) => t.completed).length,
    nowShowing: state.ui.todoApp.nowShowing,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClearCompleted: () => dispatch(clearCompleted()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoFooter);

