require('babel-polyfill');
require('mocha!mocha/mocha.css');
require('mocha!mocha/mocha.js');

mocha.setup('bdd');
mocha.setup({ timeout: 5000 });

var testsContext = require.context('./specs', true, /_spec$/);

testsContext.keys().forEach(testsContext);

document.body.addEventListener('click', function(e) {
    if (e.target.tagName.toLowerCase() === 'a') {
        e.preventDefault();
    }
});
