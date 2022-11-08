import {configureStore} from 'redux';
import allReducers from '../reducers/index';

const store = configureStore(allReducers);

export default store;