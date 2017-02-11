import * as React from 'react';
import { ENTER_KEY, ESCAPE_KEY } from '../lib/constants';
import { findDOMNode } from 'react-dom';
import * as classNames from 'classnames';

class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {

  public state: ITodoItemState;

  constructor(props: ITodoItemProps) {
    super(props);
    this.state = { editText: this.props.todo.title };
  }

  public handleSubmit(event: React.FormEvent<any>) {
    let val = this.state.editText.trim();
    if (val) {
      this.props.onSave(val);
      this.setState({editText: val});
    } else {
      this.props.onDestroy();
    }
  }

  public handleEdit() {
    this.props.onEdit();
    this.setState({editText: this.props.todo.title});
  }

  public handleKeyDown(event: React.KeyboardEvent<any>) {
    if (event.keyCode === ENTER_KEY) {
      this.handleSubmit(event);
    }
  }

  public handleBlur(event: React.FormEvent<any>) {
    this.props.onCancel(event);
  }

  public handleChange(event: React.FormEvent<any>) {
    let input: any = event.target;
    this.setState({ editText: input.value });
    this.props.onChange(event);
  }

  public shouldComponentUpdate(nextProps: ITodoItemProps, nextState: ITodoItemState) {
    return (
      nextProps.todo !== this.props.todo ||
      nextProps.editing !== this.props.editing ||
      nextProps.errorMessages !== this.props.errorMessages ||
      nextState.editText !== this.state.editText
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
            onChange={this.props.onToggle}
          />
          <label onDoubleClick={ e => this.handleEdit() }>
            {this.props.todo.title}
          </label>
          <button className='destroy' onClick={this.props.onDestroy} />
        </div>
        <input
          ref='editField'
          className='edit'
          value={this.state.editText}
          onBlur={ e => this.handleBlur(e) }
          onChange={ e => this.handleChange(e) }
          onKeyDown={ e => this.handleKeyDown(e) }
        />
        {this.props.errorMessages
          ? <small className='alert'>{this.props.errorMessages.title}</small>
          : null
        }
      </li>
    );
  }
}

export { TodoItem };
