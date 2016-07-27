import React, {Component} from 'react';
import { Route, IndexRoute  }  from 'react-router';
import MainLayout from './components/main.layout.jsx';
import Index      from './components/_pages/index.jsx';
import Todolist   from './components/_pages/todolist.example.jsx';
import Datafetch  from './components/_pages/datafetch.example.jsx';


export default (
    <Route  path="/"  component={MainLayout}>
        <IndexRoute component={Index} />
        <Route path="/todolist"   component={Todolist} />
        <Route path="/datafetch"  component={Datafetch} />
    </Route>
);