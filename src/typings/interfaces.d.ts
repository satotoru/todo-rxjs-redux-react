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
    editing: boolean;
    editText: string;
    errorMessage: ErrorMessage<ITodo>;
    onSave: (val: any) => any;
    onDestroy: () => any;
    onEdit: ()  => any;
    onCancel: () => any;
    onToggle: () => any;
    onChange: (val) => any;
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
    todos: ITodo[];
    appState: IAppState;
    onSave: () => any;
    onChange: (val) => any;
    onToggle: () => any;
  }

  interface IAppState {
    editing?: string;
    editText: string;
    nowShowing?: string;
    error: ErrorResult<ITodo> | null;
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

  type ErrorResult<T> = {
    id: string;
    messages: ErrorMessage<T>
  };

  type ErrorMessage<T> = {
    [P in keyof T]?: string;
  };

  interface Action {
    type: string;
  }

  class ActionsObservable<T extends Action> extends Observable<T> {
    ofType(...key: T['type'][]): ActionsObservable<T>;
  }

}
