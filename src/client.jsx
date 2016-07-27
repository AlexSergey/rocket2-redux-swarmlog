require('es6-promise').polyfill();
require('./assets/stylesheets/_include.less');

import { render } from 'react-dom';
import App from './app.jsx';

let root = document.getElementById('root');

render(
    App()
, root);