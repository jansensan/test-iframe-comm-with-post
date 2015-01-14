//include gulp
var gulp = require('gulp');


// include plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var less = require('gulp-less');
var jshint = require('gulp-jshint');
var webserver = require('gulp-webserver');
var bowerFiles = require('main-bower-files');
var wiredep = require('wiredep').stream;


// grabs the current dir full path from filesystem
var rootPath = process.env.PWD = process.cwd();


// Concatenate & Minify JS
gulp.task('minify-js', function() {
  return gulp.src([
      'src/js/proxies/parent-window-proxy.js',
      'src/js/features/proxy-tester.js',
      'src/js/features/iframe-content.js',
      'src/js/iframe-app.js'
    ])
    .pipe(concat('iframe-content.js'))
    .pipe(gulp.dest('www/static/js'))
    .pipe(rename('iframe-content.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('www/static/js'));
});

// copy vendors files
gulp.task('copy-vendors', function () {
  return gulp.src(bowerFiles(), {base: 'bower_components'})
    .pipe(gulp.dest('www/static/js/vendors'));
});

// Add vendors to index
gulp.task('build-index', function () {
  return gulp.src('src/html/index.html')
    .pipe(wiredep({
      ignorePath: '../../bower_components/',
      fileTypes: {
        html: {
          replace: {
            js: '<script src="static/js/vendors/{{filePath}}"></script>',
          }
        }
      }
    }))
    .pipe(gulp.dest('www'));
});

// Compile LESS
gulp.task('compile-less', function () {
  return gulp.src('src/styles/less/iframe-content.less')
    .pipe(less())
    .pipe(gulp.dest('www/static/css'));
});

// Lint
gulp.task('lint', function() {
  return gulp.src('src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Serve
gulp.task('serve', ['build'], function () {
  return gulp.src(rootPath.concat('/www'))
    .pipe(webserver({
      host: 'content.iframe-test.com',
      port: 1600,
      open: true
    }));
});

// Default Task
gulp.task('default', ['build']);
gulp.task('build', [
  'compile-less',
  'minify-js',
  'copy-vendors',
  'build-index'
]);
gulp.task('dev', ['serve']);