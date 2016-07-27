import React, {Component} from 'react';
import Todolist from '../todolist/index.jsx';

export default class TodolistPage extends Component {
    render() {
        return <div className="main">
            <Todolist />
        </div>;
    }
}