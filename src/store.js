import { createStore } from 'redux';
import tasksListReducer from './features/tasksList/tasksListReducer';
export default createStore(tasksListReducer);