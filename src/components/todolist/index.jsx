import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {TODO_FILTER, COMPLETE_TODO, REMOVE_TODO, ADD_TODO} from '../../actions/todolist.js';

import List    from './list.jsx';
import AddTodo from './add.todo.jsx';
import Sort    from './sort.jsx';

import setAction from '_setAction';

@connect(mapStateToProps, mapDispatchToProps)
export default class Inner extends Component {
    render() {
        return <div className="todo">
            <AddTodo
                addTodo={this.props.addTodo}
                />
            <List
                todos={this.props.todos}
                onRemoveTodo={this.props.onRemoveTodo}
                onCompletedTodo={this.props.onCompletedTodo}
                />
            <Sort
                filter={this.props.filter}
                filterApply={this.props.filterApply}
                />
        </div>;
    }
}


const getVisibilityFilter = (state) => state.filter;
const getTodos = (state) => state.todos;

export const getVisibleTodos = createSelector(
    [ getVisibilityFilter, getTodos ],
    (filters, todos) => {
        switch (filters) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed);
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed);
        }
    }
);

function mapStateToProps(state) {
    return {
        todos: getVisibleTodos(state.todolist),
        filter: state.todolist.filter
    };
}

function mapDispatchToProps(dispatch) {
    return {
        filterApply:     (filter) => dispatch(setAction(TODO_FILTER(filter))),
        onCompletedTodo: (index)  => dispatch(setAction(COMPLETE_TODO(index))),
        onRemoveTodo:    (index)  => dispatch(setAction(REMOVE_TODO(index))),
        addTodo:         (text)   => dispatch(setAction(ADD_TODO(text)))
    };
}