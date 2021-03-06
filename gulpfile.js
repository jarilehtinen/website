// Gulp
const gulp = require('gulp');

// Tasks
const browsersync = require('./gulp-tasks/browsersync.js');
const css = require('./gulp-tasks/css.js');
const images = require('./gulp-tasks/images.js');
const eleventy = require("./gulp-tasks/eleventy.js");
const clean = require("./gulp-tasks/clean.js");

// Watch files
function watchFiles()
{
    gulp.watch('./src/assets/css/**/*.styl', css.build);
    gulp.watch('./src/assets/images/**/*', images.copy);

    gulp.watch(
        [
            "./.eleventy.js",
            "./src/**/*[.md, .njk]",
        ],
        eleventy.build
    );
}

// Define tasks
const watch = gulp.parallel(watchFiles, browsersync.init);

// Build
const build = gulp.series(
    clean.dist,
    gulp.parallel(css.build, images.copy, eleventy.build)
);

// Exports
exports.build = build;
exports.default = watch;
