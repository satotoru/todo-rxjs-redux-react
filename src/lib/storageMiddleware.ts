export const STORAGE_LOAD = 'STORAGE_LOAD';
export const STORAGE_LOAD_SUCCESS = 'STORAGE_LOAD_SUCCESS';

export interface IStorageLoadSuccessAction {
  type: 'STORAGE_LOAD_SUCCESS';
  payload: any;
}

export interface IStorageLoadAction {
  type: 'STORAGE_LOAD';
}

interface Options {
  states: string[];
  storage?: Storage;
}

export function createStorageMiddleware(options: Options) {
  const targetStateNames = options.states;
  const storage = options.storage || localStorage;

  return store => next => action => {
    if (action.type === STORAGE_LOAD) {
      const ret = next(action);
      const loaded = targetStateNames.reduce((obj, key) => ({ ...obj, [key]: JSON.parse(storage.getItem(key)) }), {});
      store.dispatch({
        type: STORAGE_LOAD_SUCCESS,
        payload: loaded
      });
      return ret;
    }

    const beforeState = store.getState();
    const beforeTargetState = targetStateNames.reduce((obj, key) => ({ ...obj, [key]: beforeState[key]}), {});

    const ret = next(action);
    const currentState = store.getState();

    Object.keys(beforeTargetState).forEach((key) => {
      const currentValue = currentState[key];
      if (currentValue !== beforeTargetState[key]) {
        storage.setItem(key, JSON.stringify(currentValue));
      }
    });
    return ret;
  };
}

