import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import { Epic } from 'redux-observable';
import { Observable } from 'rxjs';

interface IHelloAction {
  type: 'HELLO';
  a: number;
}

interface IByeAction {
  type: 'BYE';
  b: string;
}

interface Action {
  type: string;
}

declare class ActionsObservable<T extends Action> extends Observable<T> {
  ofType(...key: T['type'][]): ActionsObservable<T>;
}

export const consoleEpic$: Epic<any, any> = (action$: ActionsObservable<IHelloAction>) => {
  return action$.ofType('HELLO')
          .map((action) => action)
          .mapTo({ type: 'NOOP'});
};

