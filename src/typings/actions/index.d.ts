export { TodoAction } from './TodoAction';

export interface IInit {
  type: 'INIT';
}

export interface INavigate {
  type: 'NAVIGATE';
  payload: {
    path: string;
  };
}

