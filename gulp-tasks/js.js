const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

function buildJs() {
    return gulp
        .src([
            './js/highlight.js'
        ])
        .pipe(concat('jari.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./html/js/'))
}

module.exports = {
    build: buildJs
};
