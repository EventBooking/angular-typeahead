/* global require, __dirname */
var gulp = require('gulp'),
    debug = require('gulp-debug'),
    concat = require('gulp-concat'),
    project = require('./package.json'),
    dest = 'dist';

gulp.task('clean', clean);
gulp.task('default', ['clean'], build);
gulp.task('build', build);
gulp.task('styles', styles);
gulp.task('html', html);
gulp.task('watch', ['build'], watch);

function clean() {
    var del = require('del');
    return del(dest);
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

function build() {
    styles();
    html();
}

function watch() {
    gulp.watch(['src/**/*.less'], styles);
    gulp.watch(['src/**/*.html'], html);
}