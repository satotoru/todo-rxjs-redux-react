import * as React from 'react';
import TodoFooter from '../containers/TodoFooter';
import TodoItem from '../containers/todoItem';
import { ENTER_KEY } from '../lib/constants';

export default class TodoApp extends React.Component<IAppProps, {}> {
  constructor(props: IAppProps) {
    super(props);
  }

  public handleKeyDown(e: React.KeyboardEvent<any>) {
    if (e.keyCode !== ENTER_KEY) {
      return;
    }
    this.props.onSave();
  }

  public render() {
    const todos = this.props.todos;
    const error = this.props.appState.error;
    let main = null;
    let footer = null;

    const todoItems = todos.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
      />
    ));

    if (todos.length > 0) {
      main = (
        <section className='main'>
          <input
            className='toggle-all'
            type='checkbox'
            onChange={(e) => this.props.onToggle()}
            checked={todos.filter((t) => !t.completed).length === 0}
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
            className='new-todo'
            placeholder='What needs to be done?'
            onKeyDown={(e) => this.handleKeyDown(e)}
            autoFocus={true}
            onChange={(e) => this.props.onChange(e.currentTarget.value)}
            value={this.props.appState.addText}
          />
          {error && !error.id
            ? <small className='alert'>{error.messages.title}</small>
            : null
          }
        </header>
        {main}
        <TodoFooter />
      </div>
    );
  }
}


