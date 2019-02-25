import { combineReducers } from 'redux';
import auth from './AuthReducer';
import jobs from './jobs_reducer';
import likedJobs from './likes_reducer';

export default combineReducers({
  auth, jobs, likedJobs
});
