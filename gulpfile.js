/* global require, __dirname */
var gulp = require('gulp'),
    debug = require('gulp-debug'),
    concat = require('gulp-concat'),
    project = require('./package.json'),
    dest = 'dist';

gulp.task('clean', clean);
gulp.task('styles', styles);
gulp.task('html', html);
gulp.task('server', ['watch'], function (callback) {
    exec("npm run server", callback);
});
gulp.task('watch', watch);
gulp.task('tsd:install', tsdInstall);
gulp.task('default', ['clean'], build);
gulp.task('typescript', ['tsd:install'], function (callback) {
    typescript(callback);
});

gulp.task('typescript', typescript);


function exec(cmd, fn, options) {
    var proc = require('child_process').exec,
        child = proc(cmd, options, fn);

    child.stdout.on('data', function (data) {
        console.log(data);
    });

    child.stderr.on('data', function (data) {
        console.log(data);
    });
}

function clean() {
    var del = require('del');
    return del(dest);
}

function tsdInstall(callback) {
    var bundle = require('./tsd.json').bundle,
        del = require('del');

    del(bundle, function () {
        exec('npm run tsd', callback);
    });
}

function typescript(callback, watch) {
    if (watch) {
        exec("npm run tsc:w", function (error) {
            if (error) callback(error);
            exec("npm run tsc:w", callback);
        });

        return;
    }

    exec("npm run tsc", function (error) {
        if (error) callback(error);
        exec("npm run tsc", callback);
    });
}

function styles() {
    var less = require('gulp-less'),
        autoprefixer = require('gulp-autoprefixer');

    gulp.src(['src/assets.less'])
        .pipe(less({
            plugins: [require('less-plugin-glob')]
        }))
        .pipe(autoprefixer())
        .pipe(concat('angular-typeahead.css'))
        .pipe(gulp.dest(dest));
        
    gulp.src([
            '!src/variables.less',
            '!src/mixins.less',
            '!src/assets.less',
            'src/**/*.less'
        ])
        .pipe(concat('angular-typeahead.less'))
        .pipe(gulp.dest(dest));

    gulp.src(['src/variables.less'])
        .pipe(concat('angular-typeahead-variables.less'))
        .pipe(gulp.dest(dest));

    gulp.src(['src/mixins.less'])
        .pipe(concat('angular-typeahead-mixins.less'))
        .pipe(gulp.dest(dest));
}

function html() {
    var html2js = require('gulp-ng-html2js');

    var options = {
        moduleName: 'ngTypeahead',
        stripPrefix: 'directives'
    };

    gulp.src(['src/**/*.html'])
        .pipe(html2js(options))
        .pipe(concat('angular-typeahead.templates.js'))
        .pipe(gulp.dest(dest));
}

function watch() {
    gulp.watch(['src/**/*.less'], ['styles']);
    gulp.watch(['src/**/*.html'], ['html']);
    typescript(null, true);
}

function build() {
    styles();
    html();
    typescript();
}