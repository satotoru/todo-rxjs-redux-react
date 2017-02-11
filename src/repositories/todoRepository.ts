import * as Storage from '../lib/storage';
import { Utils } from '../lib/utils';

const TABLE_NAME = 'todos';

export function fetchAll(): Promise<ITodo[]> {
  return Storage.get(TABLE_NAME).catch(() => []);
}

export function findOne(id: ITodo['id']): Promise<ITodo> {
  return fetchAll().then((items) => items.filter((i) => i.id === id)[0]);
}

export function insert(data: ITodo): Promise<ITodo['id']> {
  const id = Utils.uuid();
  return fetchAll().then((items) => Storage.set(TABLE_NAME, [...items, {...data, id }])).then(() => id);
}

export function update(data: ITodo): Promise<void> {
  return fetchAll().then((items) => {
    const updated = items.map((i) => (i.id === data.id) ? { ...i, ...data } : i);
    Storage.set(TABLE_NAME, updated);
  });
}

export function updateAll(attrs: Partial<ITodo>): Promise<void> {
  return fetchAll().then((items) => {
    const updated = items.map((i) => ({ ...i, ...attrs }));
    Storage.set(TABLE_NAME, updated);
  });
}

export function destroyOne(id: ITodo['id']): Promise<void> {
  return fetchAll().then((items) => {
    const rest = items.filter((i) => i.id !== id);
    Storage.set(TABLE_NAME, rest);
  });
}

export function destroy(ids: ITodo['id'][]): Promise<void> {
  return fetchAll().then((items) => {
    const rest = items.filter((i) => ids.indexOf(i.id) === -1);
    Storage.set(TABLE_NAME, rest);
  });
}
