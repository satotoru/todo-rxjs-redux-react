import * as React from 'react';
import * as classNames from 'classnames';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../lib/constants';
import { Utils } from '../lib/utils';

const TodoFooter = (props: ITodoFooterProps) => {
  if ((props.count + props.completedCount) === 0) {
    return null;
  }
  const activeTodoWord = Utils.pluralize(props.count, 'item');
  let clearButton = null;

  if (props.completedCount > 0) {
    clearButton = (
      <button
        className='clear-completed'
        onClick={props.onClearCompleted}>
        Clear completed
      </button>
    );
  }

  const nowShowing = props.nowShowing;
  return (
    <footer className='footer'>
      <span className='todo-count'>
        <strong>{props.count}</strong> {activeTodoWord} left
      </span>
      <ul className='filters'>
        <li>
          <a
            href='#/'
            className={classNames({selected: nowShowing === ALL_TODOS})}>
              All
          </a>
        </li>
        {' '}
        <li>
          <a
            href='#/active'
            className={classNames({selected: nowShowing === ACTIVE_TODOS})}>
              Active
          </a>
        </li>
        {' '}
        <li>
          <a
            href='#/completed'
            className={classNames({selected: nowShowing === COMPLETED_TODOS})}>
              Completed
          </a>
        </li>
      </ul>
      {clearButton}
    </footer>
  );
};

export { TodoFooter };
