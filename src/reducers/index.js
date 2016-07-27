import { combineReducers } from 'redux';
import todolist from './todolist.js';
import datafetch from './datafetch.js';
import { routerReducer } from 'react-router-redux';

export default combineReducers(Object.assign({}, {
    datafetch,
    todolist,
    routing: routerReducer
}));