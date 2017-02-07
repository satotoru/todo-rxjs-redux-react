import { combineEpics } from 'redux-observable';
import { consoleEpic$ } from './consoleEpic';

export default combineEpics(
  consoleEpic$
);
