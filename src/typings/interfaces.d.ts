import { Observable } from 'rxjs/observable';

declare global {
  interface ITodo {
    id: string;
    title: string;
    completed: boolean;
  }

  interface ITodoItemProps {
    key: string;
    todo: ITodo;
    editing?: boolean;
    onSave: (val: any) => void;
    onDestroy: () => void;
    onEdit: ()  => void;
    onCancel: (event: any) => void;
    onToggle: () => void;
    onChange: (event: any) => void;
    error: ErrorPayload<ITodo>;
  }

  interface ITodoItemState {
    editText: string;
  }

  interface ITodoFooterProps {
    completedCount: number;
    onClearCompleted: any;
    nowShowing: string;
    count: number;
  }


  interface ITodoModel {
    key: any;
    todos: Array<ITodo>;
    onChanges: Array<any>;
    subscribe(onChange);
    inform();
    addTodo(title: string);
    toggleAll(checked);
    toggle(todoToToggle);
    destroy(todo);
    save(todoToSave, text);
    clearCompleted();
  }

  interface IAppProps {
    dispatch: (...args) => any;
    todos: ITodo[];
    appState: IAppState;
  }

  interface IAppState {
    editing?: string;
    nowShowing?: string;
    error?: ErrorPayload<ITodo>;
    addText: string;
  }

  interface Window {
    devToolsExtension: any;
  }

  interface IState {
    ui: {
      todoApp: IAppState;
    };
    data: {
      todos: ITodo[];
    };
  }

  type ErrorPayload<T> = {
    [P in keyof T]?: string;
  };

  interface Action {
    type: string;
  }

  class ActionsObservable<T extends Action> extends Observable<T> {
    ofType(...key: T['type'][]): ActionsObservable<T>;
  }

}
