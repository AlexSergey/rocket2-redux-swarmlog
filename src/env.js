import _ from 'lodash';

var defaultRoute = 'http://default.route';

var environments = [
    {
        developer: 'Sergey',
        client: 'http://localhost:8000',
        backend: 'http://localhost:3005'
    }
];
var currentEnv;
if (typeof window !== 'undefined') {
    var origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port: '');

    currentEnv = _.find(environments, {
        client: origin
    });
}

var backend = currentEnv ? currentEnv.backend : defaultRoute;

export default backend;
