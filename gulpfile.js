// Gulp
const gulp = require('gulp');

// Tasks
const browsersync = require('./gulp-tasks/browsersync.js');
const js = require('./gulp-tasks/js.js');
const css = require('./gulp-tasks/css.js');
const images = require('./gulp-tasks/images.js');
const eleventy = require("./gulp-tasks/eleventy.js");

// Watch files
function watchFiles()
{
    gulp.watch('./css/**/*.styl', css.build);
    gulp.watch('./js/**/*.js', js.build);
    gulp.watch('./images/**/*', images.copy);

    gulp.watch(
        [
            "./.eleventy.js",
            "./src/**/*",
        ],
        eleventy.build
    );
}

// Define tasks
const watch = gulp.parallel(watchFiles, browsersync.init);

// Build
const build = gulp.parallel(
    css.build,
    images.copy,
    eleventy.build,
    js.build
);

// Exports
exports.build = build;
exports.default = watch;
