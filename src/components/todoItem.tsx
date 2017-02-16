import * as React from 'react';
import { ENTER_KEY, ESCAPE_KEY } from '../lib/constants';
import { findDOMNode } from 'react-dom';
import * as classNames from 'classnames';

class TodoItem extends React.Component<ITodoItemProps, {}> {
  constructor(props: ITodoItemProps) {
    super(props);
  }

  public handleKeyDown(e: React.KeyboardEvent<any>) {
    if (e.keyCode !== ENTER_KEY) {
      return;
    }
    this.submit();
  }

  private submit() {
    const val = this.props.editText.trim();
    if (val) {
      this.props.onSave(val);
    } else {
      this.props.onDestroy();
    }
  }

  public handleChange(e: React.FormEvent<any>) {
    const val = e.currentTarget.value;
    this.props.onChange(val);
  }

  public shouldComponentUpdate(nextProps: ITodoItemProps, nextState: {}) {
    return (
      nextProps.todo !== this.props.todo ||
      nextProps.editing !== this.props.editing ||
      nextProps.editText !== this.props.editText
    );
  }

  public componentDidUpdate(prevProps: ITodoItemProps) {
    if (!prevProps.editing && this.props.editing) {
      const node = findDOMNode<HTMLInputElement>(this.refs['editField']);
      node.focus();
    }
  }

  public render() {
    return (
      <li className={classNames({
        completed: this.props.todo.completed,
        editing: this.props.editing
      })}>
        <div className='view'>
          <input
            className='toggle'
            type='checkbox'
            checked={this.props.todo.completed}
            onChange={(e) => this.props.onToggle()}
          />
          <label onDoubleClick={(e) => this.props.onEdit()}>
            {this.props.todo.title}
          </label>
          <button className='destroy' onClick={(e) => this.props.onDestroy()} />
        </div>
        <input
          ref='editField'
          className='edit'
          value={this.props.editText}
          onBlur={ e => this.props.onCancel() }
          onChange={ e => this.handleChange(e) }
          onKeyDown={ e => this.handleKeyDown(e) }
        />
        {this.props.errorMessage
          ? <small className='alert'>{this.props.errorMessage.title}</small>
          : null
        }
      </li>
    );
  }
}

export { TodoItem };
