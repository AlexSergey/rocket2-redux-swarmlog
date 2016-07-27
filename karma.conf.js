var webpack = require('webpack');
var path = require('path');
var rucksack = require('rucksack-css');
var webpackConfig = require('./webpack.config');
var clone = require('clone');
var karmaWebpack = require('karma-webpack');
var cln = clone(webpackConfig);

var newConfig = Object.assign({}, cln, {
    context: path.join(__dirname, './tests'),
    entry: {
        js: './tests.runner.js',
        html: './index.html'
    }
});

newConfig.module.postLoaders = [{
    test: /\.(js|jsx)$/, exclude: /(node_modules|bower_components|tests)/,
    loader: 'istanbul-instrumenter'
}];

newConfig.externals = {
    'jsdom': "window",
    'cheerio': "window",
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'react/addons': true
};

module.exports = function (config) {
    config.set({
        frameworks: [ 'mocha' ],
        files: [
            './node_modules/phantomjs-polyfill/bind-polyfill.js',
            'tests/**/*_spec.js'
        ],
        plugins: [
            karmaWebpack,
            'karma-mocha',
            'karma-htmlfile-reporter',
            'karma-phantomjs-launcher',
            'karma-coverage',
            'karma-spec-reporter'
        ],
        browsers: [ 'PhantomJS' ],
        preprocessors: {
            'tests/**/*_spec.js': ['webpack'],
            'src/**/*.js': ['webpack']
        },
        reporters: [ 'progress', 'spec', 'coverage', 'html' ],
        coverageReporter: {
            dir: 'reports/coverage/',
            reporters: [
                { type: 'html', subdir: 'report-html' },
                { type: 'lcov', subdir: 'report-lcov' },
                { type: 'cobertura', subdir: '.', file: 'cobertura.txt' }
            ]
        },
        htmlReporter: {
            outputFile: 'reports/units.html',


            pageTitle: 'Unit Tests',
            subPageTitle: 'A sample project description'
        },
        webpack: newConfig,
        webpackMiddleware: { noInfo: true }
    });
};
