const gulp = require('gulp');
const rename = require('gulp-rename');
const stylus = require('gulp-stylus');
const cleanCSS = require('gulp-clean-css');

function cssBuild() {
    return gulp
        .src('./css/index.styl')
        .pipe(stylus({ compress: true }))
        .pipe(cleanCSS({
            level: {
                1: {
                    normalizeUrls: false
                }
            }
        }))
        .pipe(rename('jari-01.css'))
        .pipe(gulp.dest('./html/theme/'));
}

module.exports = {
    build: cssBuild
};
