import { FETCH_JOBS } from '../actions/types';

const INITIAL_STATE = {
  jobs: []
};

export default function (state = INITIAL_STATE, action) {
  console.log(INITIAL_STATE);
  switch (action.type) {
    case FETCH_JOBS:
    console.log('Action payload', action.payload);
      return action.payload;
    default:
      return state;
  }
}
