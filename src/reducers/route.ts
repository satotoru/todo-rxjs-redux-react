import { Reducer, Action } from 'redux';
import { INavigate } from '../typings/actions';

const initialState = {
  path: '/'
};

const route: Reducer<{ path: string }> = (state = initialState, action: INavigate) => {
  switch (action.type) {
  case 'NAVIGATE': {
    return { ...state, path: action.payload.path };
  }
  default: {
    return state;
  }
  }
};

export default route;


