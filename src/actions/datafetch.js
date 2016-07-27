import { createAction } from 'redux-actions';

/**
 * @event actions/DATAFETCH/ISSUES_LOAD_FAILURE
 * @type {object}
 * @property {object} payload - Add new todo
 * */
export const ISSUES_LOAD_FAILURE = createAction('ISSUES_LOAD_FAILURE');
/**
 * @event actions/DATAFETCH/ISSUES_LOADING
 * @type {object}
 * @property {object} payload - set complete todo
 * */
export const ISSUES_LOADING = createAction('ISSUES_LOADING');

/**
 * @event actions/DATAFETCH/ISSUES_LOADED
 * @type {object}
 * @property {object} payload - remove todo by index
 * */
export const ISSUES_LOADED   = createAction('ISSUES_LOADED');
