var webpack = require("webpack"),
    webpackConfig = require('./webpack.config'),
    packageJSON = require("./package.json"),
    fs = require('fs'),
    CLIEngine = require("eslint").CLIEngine,
    moment = require('moment'),
    cli = new CLIEngine(),
    KarmaServer = require('karma').Server,
    PATH_TO_FOLDER = '';

makeDir()
    .then(runUnitTests)
    .then(linter)
    .then(build)
    .catch(() => {
        console.log('In the previous steps were errors');
        process.exit(1);
    });

function runUnitTests() {
    return new Promise((resolve, reject) => {
        new KarmaServer({
            configFile: __dirname + '/karma.conf.js',
            singleRun: true
        }, function(karmaExitStatus) {
            //Errors
            if (karmaExitStatus === 1) {
                saveLog('karma.txt', 'Something errors. Check reports/units.html', reject);
                return false;
            }
            //Karma check Without errors
            resolve();
        }).start();
    });
}

function build() {
    return new Promise((resolve, reject) => {
        var compiler = webpack(webpackConfig);
        compiler.run(function(err) {
            if (err) {
                reject(err);
                return false;
            }
            resolve();
            saveLog('webpack.txt', 'Build is complete without errors!');
        });
    });
}

function makeDir() {
    return new Promise((resolve, reject) => {
        fs.mkdir('./logs', (e) => {
            if(!e || (e && e.code === 'EEXIST')){
                var date = moment().format('DD-MM-YY_hh-mm');
                PATH_TO_FOLDER = `./logs/${date}`;

                fs.mkdir(PATH_TO_FOLDER, (e) => {
                    if(!e || (e && e.code === 'EEXIST')){
                        resolve();
                        return false;
                    }
                    reject(e);
                });
                return false;
            } else {
                reject(e);
            }
        });
    });
}

function linter() {
    return new Promise((resolve, reject) => {
        var report = cli.executeOnFiles(["src/**/*.+(js|jsx)"]),
            fileName = 'eslint.txt';

        if (report.results) {
            var errors = report.results.filter((file) => {
                return file.errorCount > 0;
            });
            var rep = '';

            if (errors.length > 0) {
                rep = 'We have now ' + errors.length + ' ERRORS! Please, fix it!' + '\n' + '\n' + '\n';

                errors.forEach((err) => {
                    var partName = err.filePath.replace(__dirname + '\\', '')
                    rep += partName + '\n' + '\n';
                    err.messages.forEach((msg) => {
                        rep += 'Column: '  + msg.column  + ' | '
                            +  'Line: '    + msg.line    + ' | '
                            +  'Source:'   + msg.source  + ' | '
                            +  'Message: ' + msg.message + '\n';
                    });
                    rep += errors.length > 1 ? ('___________________________________________' + '\n') : '\n';
                });

                saveLog(fileName, rep, resolve);
            } else {
                rep = 'Eslint all done!';

                saveLog(fileName, rep, resolve);
            }
        }
    });
}

function saveLog(name, content, cb) {
    fs.writeFile(`${PATH_TO_FOLDER}/${name}.txt`, content, function (err) {
        if (err) {
            return console.log(err);
        };
        if (typeof cb === 'function') {
            cb();
        }
    });
}