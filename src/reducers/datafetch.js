import { handleActions } from 'redux-actions';

/**
 * Datafetch reducer
 * @module reducers/DATAFETCH
 * @default {Object} issues collection and error state
 */
export default handleActions({
    /**
     * Error server connect
     * @method
     * @param {object} state state of store
     * @param {object} action action object of store
     * @returns {object} state of store
     * @listens actions:ISSUES_LOAD_FAILURE
     */
    ISSUES_LOAD_FAILURE: (state, action) => {
        return {...state, error: true};
    },
    /**
     * Loading progress
     * @method
     * @param {object} state state of store
     * @param {object} action action object of store
     * @returns {object} state of store
     * @listens actions:ISSUES_LOADING
     */
    ISSUES_LOADING: (state, action) => {
        return state;
    },
    /**
     * Issues load completed
     * @method
     * @param {object} state state of store
     * @param {object} action action object of store
     * @returns {object} state of store
     * @listens actions:ISSUES_LOADED
     */
    ISSUES_LOADED: (state, action) => {
        return {
            issues: action.payload,
            error: false
        };
    }
}, {
    issues: [],
    error: false
});