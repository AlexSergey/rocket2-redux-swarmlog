var fs = require('fs');
var rucksack = require('rucksack-css');
var webpack = require('webpack');
var path = path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var argv = require('yargs').argv;
var customCofig = fs.existsSync('./config.js') ? require('./config') : {};
var CleanWebpackPlugin = require('clean-webpack-plugin');

var config = Object.assign({}, {
    server: {
        hostname: 'http://localhost',
        port: 8000
    },
    serverForTest: {
        hostname: 'http://localhost',
        port: 8001
    },
    isomorphic: {
        port: 8888
    }
}, customCofig);


var plugins = [
    new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    }),
    new webpack.ProvidePlugin({
        React: "react"
    })
];

if (process.env.NODE_ENV === 'production') {
    plugins.unshift(
        new CleanWebpackPlugin(['./dist'])
    );
    plugins.unshift(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                sequences: true,
                dead_code: true,
                conditionals: true,
                booleans: true,
                unused: true,
                if_return: true,
                join_vars: true,
                drop_console: true
            },
            minimize: true
        })
    );
    plugins.push(new ExtractTextPlugin("styles.css"));
}

var port = argv.tests ? config.serverForTest.port : config.server.port;

var sass = process.env.NODE_ENV === 'production' ?
    ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!sass") :
    "style-loader!css-loader?sourceMap&root=.!postcss-loader!sass?sourceMap";

var css = process.env.NODE_ENV === 'production' ?
    ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader") :
    "style-loader!css-loader?sourceMap&root=.!postcss-loader";

var less = process.env.NODE_ENV === 'production' ?
    ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!less") :
    "style-loader!css-loader?sourceMap&root=.!postcss-loader!less?sourceMap";

var webpackConfig = {
    devtool: 'cheap-module-eval-source-map',
    context: argv.tests ? path.join(__dirname, './tests') : path.join(__dirname, './src'),
    entry: argv.tests ? {js: ['babel-polyfill', './tests.runner.js'], html: './index.html'} : {js: ['babel-polyfill', './client.jsx'], html: './index.html'},
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js',
        publicPath: config.server.hostname + ':' + config.server.port + '/'
    },
    module: {
        preLoaders: [
            {test: /\.(js|jsx)$/, loader: "eslint-loader", exclude: /node_modules/}
        ],
        loaders: [
            { test: require.resolve("react"), loader: "expose?React" },
            {
                test: /\.html$/,
                loader: 'file?name=[name].[ext]'
            },
            {
                test: /\.scss$/,
                loader: sass
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loaders: [
                    'url?limit=10000&name=images/[name].[ext]'
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|otf|svg)(\?.*$|$)$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },
            {
                test: /\.md$/,
                loader: "html!markdown"
            },
            {
                test: /\.css$/,
                loader: css
            },
            {
                test: /\.less$/,
                loader: less
            },
            {
                test: /\.json/,
                loader: "json"
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            },
        ],
        noParse: [
            /acorn\/dist\/acorn\.js$/,
            /underscore\/underscore\.js$/,
            /react-with-addons\.js$/,
        ]
    },
    eslint: {
        emitErrors: true,
        failOnError: true,
        failOnWarning: true
    },
    resolve: {
        root: [path.join(__dirname, './src/vendors/bower'), path.join(__dirname, "node_modules"), __dirname + "/src/vendors/others"],
        extensions: ['', '.js', '.jsx'],
        loaderExtensions: ['.js', ''],
        loaderPostfixes: [''],
        unsafeCache: true,
        postfixes: [''],
        alias: {
            '_setAction': __dirname + '/src/setAction.js'
        },
    },
    profile: true,
    stats: {
        hash: true,
        version: true,
        timings: true,
        assets: true,
        chunks: true,
        modules: true,
        reasons: true,
        children: true,
        source: false,
        errors: true,
        errorDetails: true,
        warnings: true,
        publicPath: true
    },
    postcss: [
        rucksack({
            autoprefixer: true
        })
    ],
    plugins: plugins,
    devServer: {
        contentBase: argv.tests ? './tests' : './src',
        port: port
    }
};

var finalConfig = Object.assign({}, webpackConfig, customCofig.webpack, {
    isomorphic: config.isomorphic
});

finalConfig.devtool = process.env.NODE_ENV !== 'production' ? finalConfig.devtool: null;

if (argv.tests) {
    finalConfig.externals = {
        'jsdom': 'window',
        'cheerio': 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
        'react/addons': true
    }
}

module.exports = finalConfig;
