import * as React from 'react';
import { Router } from 'director';
import { TodoFooter } from '../components/footer';
import { TodoItem } from '../components/todoItem';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS, ENTER_KEY } from '../lib/constants';
import * as ReactDOM from 'react-dom';

export default class TodoApp extends React.Component<IAppProps, IAppState> {

  public state: IAppState;

  constructor(props: IAppProps) {
    super(props);
    this.state = {
      nowShowing: ALL_TODOS,
      editing: null
    };
  }

  public componentDidMount() {
    const setState = this.setState;
    const router = Router({
      '/': setState.bind(this, {nowShowing: ALL_TODOS}),
      '/active': setState.bind(this, {nowShowing: ACTIVE_TODOS}),
      '/completed': setState.bind(this, {nowShowing: COMPLETED_TODOS})
    });
    router.init('/');
  }

  public handleNewTodoKeyDown(event: React.KeyboardEvent<any>) {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    const val = ReactDOM.findDOMNode<HTMLInputElement>(this.refs['newField']).value.trim();

    if (val) {
      this.props.model.addTodo(val);
      ReactDOM.findDOMNode<HTMLInputElement>(this.refs['newField']).value = '';
    }
  }

  public toggleAll(event: React.FormEvent<any>) {
    const target: any = event.target;
    const checked = target.checked;
    this.props.model.toggleAll(checked);
  }

  public toggle(todoToToggle: ITodo) {
    this.props.model.toggle(todoToToggle);
  }

  public destroy(todo: ITodo) {
    this.props.model.destroy(todo);
  }

  public edit(todo: ITodo) {
    this.setState({editing: todo.id});
  }

  public save(todoToSave: ITodo, text: String) {
    this.props.model.save(todoToSave, text);
    this.setState({editing: null});
  }

  public cancel() {
    this.setState({editing: null});
  }

  public clearCompleted() {
    this.props.model.clearCompleted();
  }

  public render() {
    let footer;
    let main;
    const todos = this.props.model.todos;

    const shownTodos = todos.filter((todo) => {
      switch (this.state.nowShowing) {
      case ACTIVE_TODOS:
        return !todo.completed;
      case COMPLETED_TODOS:
        return todo.completed;
      default:
        return true;
      }
    });

    const todoItems = shownTodos.map((todo) => {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={this.toggle.bind(this, todo)}
          onDestroy={this.destroy.bind(this, todo)}
          onEdit={this.edit.bind(this, todo)}
          editing={this.state.editing === todo.id}
          onSave={this.save.bind(this, todo)}
          onCancel={ e => this.cancel() }
        />
      );
    });

    // Note: It's usually better to use immutable data structures since they're
    // easier to reason about and React works very well with them. That's why
    // we use map(), filter() and reduce() everywhere instead of mutating the
    // array or todo items themselves.
    const activeTodoCount = todos.reduce(function (accum, todo) {
      return todo.completed ? accum : accum + 1;
    }, 0);

    const completedCount = todos.length - activeTodoCount;

    if (activeTodoCount || completedCount) {
      footer =
        <TodoFooter
          count={activeTodoCount}
          completedCount={completedCount}
          nowShowing={this.state.nowShowing}
          onClearCompleted={ e => this.clearCompleted() }
        />;
    }

    if (todos.length) {
      main = (
        <section className='main'>
          <input
            className='toggle-all'
            type='checkbox'
            onChange={ e => this.toggleAll(e) }
            checked={activeTodoCount === 0}
          />
          <ul className='todo-list'>
            {todoItems}
          </ul>
        </section>
      );
    }

    return (
      <div>
        <header className='header'>
          <h1>todos</h1>
          <input
            ref='newField'
            className='new-todo'
            placeholder='What needs to be done?'
            onKeyDown={ e => this.handleNewTodoKeyDown(e) }
            autoFocus={true}
          />
        </header>
        {main}
        {footer}
      </div>
    );
  }
}