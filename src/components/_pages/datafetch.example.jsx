import React, {Component} from 'react';
import Datafetch from '../datafetch/index.jsx';

export default class Inner extends Component {
    render() {
        return <div className="main">
            <Datafetch />
        </div>;
    }
}