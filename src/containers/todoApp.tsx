import * as React from 'react';
import { Router } from 'director';
import { TodoFooter } from '../components/footer';
import { TodoItem } from '../components/todoItem';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS, ENTER_KEY } from '../lib/constants';
import {
  addTodo,
  toggleAll,
  toggleTodo,
  deleteTodo,
  updateTodo,
  editTodo,
  validateTodo,
  cancelTodo,
  clearCompleted
} from '../actions';
import * as ReactDOM from 'react-dom';

export default class TodoApp extends React.Component<IAppProps, { addText: string; }> {
  constructor(props: IAppProps) {
    super(props);
    this.state = { addText: '' };
  }

  public handleNewTodoKeyDown(event: React.KeyboardEvent<any>) {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }
    event.preventDefault();
    if (this.state.addText) {
      this.props.dispatch(addTodo(this.state.addText));
    }
  }

  public handleNewTodoChange(event: React.FormEvent<HTMLInputElement>) {
    const text = event.currentTarget.value;
    this.setState({ addText: text });
    this.props.dispatch(validateTodo({ id: null, title: text, completed: false }));
  }

  public change(todo: ITodo, text) {
    this.props.dispatch(validateTodo({ ...todo, title: text }));
  }

  public filterTodo(todo) {
    switch (this.props.appState.nowShowing) {
    case ACTIVE_TODOS:
      return !todo.completed;
    case COMPLETED_TODOS:
      return todo.completed;
    default:
      return true;
    }
  }

  public render() {
    let footer;
    let main;
    const todos = this.props.todos;
    const error = this.props.appState.error;

    const todoItems = todos.filter((todo) => this.filterTodo(todo)).map((todo) => {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={ () => this.props.dispatch(toggleTodo(todo.id)) }
          onDestroy={ () => this.props.dispatch(deleteTodo(todo.id)) }
          onEdit={ () => this.props.dispatch(editTodo(todo.id)) }
          editing={this.props.appState.editing === todo.id}
          error={ (error && error.id === todo.id) ? error : null }
          onSave={ (text) => this.props.dispatch(updateTodo(todo.id, text)) }
          onCancel={ e => this.props.dispatch(cancelTodo()) }
          onChange={ e => this.change(todo, e.target.value) }
        />
      );
    });

    const activeTodoCount = todos.reduce(function (accum, todo) {
      return todo.completed ? accum : accum + 1;
    }, 0);
    const completedCount = todos.length - activeTodoCount;

    if (activeTodoCount || completedCount) {
      footer =
        <TodoFooter
          count={activeTodoCount}
          completedCount={completedCount}
          nowShowing={this.props.appState.nowShowing}
          onClearCompleted={ e => this.props.dispatch(clearCompleted()) }
        />;
    }

    if (todos.length) {
      main = (
        <section className='main'>
          <input
            className='toggle-all'
            type='checkbox'
            onChange={ e => this.props.dispatch(toggleAll()) }
            checked={activeTodoCount === 0}
          />
          <ul className='todo-list'>
            {todoItems}
          </ul>
        </section>
      );
    }

    const errorMsg = (error && !error.id)
                    ? <small className='alert'>{error.title}</small>
                    : null;

    return (
      <div>
        <header className='header'>
          <h1>todos</h1>
          <input
            className='new-todo'
            placeholder='What needs to be done?'
            onKeyDown={ e => this.handleNewTodoKeyDown(e) }
            autoFocus={true}
            onChange={ e => this.handleNewTodoChange(e) }
            value={this.state.addText}
          />
          {errorMsg}
        </header>
        {main}
        {footer}
      </div>
    );
  }
}
