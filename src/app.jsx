import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import routes from './routes.jsx';
import { Router, browserHistory, RouterContext } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    var keys = require('../keys.json');
    var addReduxSwarmLog = require('@philholden/redux-swarmlog').addReduxSwarmLog;
    var configureReduxSwarmLog = require('@philholden/redux-swarmlog').configureReduxSwarmLog;
    configureReduxSwarmLog({reduxStore: store});
    addReduxSwarmLog({name: 'app', keys});
}



export default function(serverProps) {
    return (
        <Provider store={store} key="provider">
            {getRoutes(serverProps)}
        </Provider>
    );
}

function getRoutes(serverProps) {
    //If we run app in isomorphic env
    //We use this method for render routes
    if (serverProps) {
        return <RouterContext {...serverProps} />;
    }
    const history = syncHistoryWithStore(browserHistory, store);

    return <Router routes={routes} history={history} />;
}