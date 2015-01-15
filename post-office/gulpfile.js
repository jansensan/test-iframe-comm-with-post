//include gulp
var gulp = require('gulp');


// include plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


// Grabs the current dir full path from filesystem
var rootPath = process.env.PWD = process.cwd();


// Concatenate & Minify JS
gulp.task('minify-js', function() {
  return gulp.src(['src/*.js'])
    .pipe(concat('postoffice.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('postoffice.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

// Tasks
gulp.task('default', ['minify-js']);