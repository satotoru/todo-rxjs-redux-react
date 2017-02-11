import { IInit, INavigate } from '../typings/actions';

export * from './todoActions';

export function init(): IInit {
  return { type: 'INIT'};
}

export function navigate(path): INavigate {
  return {
    type: 'NAVIGATE',
    payload: { path }
  };
}
