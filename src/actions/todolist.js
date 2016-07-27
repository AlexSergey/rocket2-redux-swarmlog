import { createAction } from 'redux-actions';

/**
 * @event actions/TODOLIST/ADD_TODO
 * @type {object}
 * @property {object} payload - Add new todo
 * */
const ADD_TODO      = createAction('ADD_TODO');
/**
 * @event actions/TODOLIST/COMPLETE_TODO
 * @type {object}
 * @property {object} payload - set complete todo
 * */
const COMPLETE_TODO = createAction('COMPLETE_TODO');

/**
 * @event actions/TODOLIST/REMOVE_TODO
 * @type {object}
 * @property {object} payload - remove todo by index
 * */
const REMOVE_TODO   = createAction('REMOVE_TODO');

/**
 * @event actions/TODOLIST/TODO_FILTER
 * @type {object}
 * @property {object} payload - filter todo list
 * */
const TODO_FILTER   = createAction('TODO_FILTER');

export {
    ADD_TODO,
    COMPLETE_TODO,
    REMOVE_TODO,
    TODO_FILTER
};