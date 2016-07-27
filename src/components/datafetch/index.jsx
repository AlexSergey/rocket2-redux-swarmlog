import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {ISSUES_LOAD_FAILURE, ISSUES_LOADING, ISSUES_LOADED} from '../../actions/datafetch';
import {getIssues} from '../../services/datafetch';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.props.getIssues();
    }
    render() {
        var data = this.props.error ? '' : (this.props.issues.length > 0 ? <ul>{this.props.issues.map((item, index) => <li key={index}>--- {item.name}</li>)}</ul> : 'LOADING');
        var error  = this.props.error ? 'ERROR LOAD ISSUES' : '';
        return (
            <div>
                <h1 className="title">Datafetch example by "restcountries.eu"</h1>
                <p>In this example we use custom promises midleware for connect store to async actions</p>
                <h2>Async data: </h2>
                {data}
                {error}
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            issues: state.datafetch.issues,
            error: state.datafetch.error
        };
    },
    (dispatch) => {
        return {
            getIssues: () => dispatch({promise: getIssues(), actions: [ISSUES_LOADING, ISSUES_LOADED, ISSUES_LOAD_FAILURE]})
        };
    }
)(TodoList);
