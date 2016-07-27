import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

export default class Header extends Component {
    render() {
        return (
            <div id="header-frame">
                <header id="header" className="header-bg">
                    <div className="header-holder">
                        <h1 className="logo logo-bg"><IndexLink to="/">Index</IndexLink></h1>
                        <div className="btn-wrapper">
                            <Link className="btn btn-primary" to="/todolist">Todolist</Link>
                            <Link className="btn btn-primary" to="/datafetch">Datafetch</Link>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}