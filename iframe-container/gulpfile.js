//include gulp
var gulp = require('gulp');


// include plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var less = require('gulp-less');
var webserver = require('gulp-webserver');
var bowerFiles = require('main-bower-files');
var wiredep = require('wiredep').stream;


// Grabs the current dir full path from filesystem
var rootPath = process.env.PWD = process.cwd();


// Concatenate & Minify JS
gulp.task('minify-js', function() {
  return gulp.src([
      'src/js/services/post-office-service.js',
      'src/js/features/post-office-tester.js',
      'src/js/features/counter-display.js',
      'src/js/container-app.js'
    ])
    .pipe(concat('icontainer.js'))
    .pipe(gulp.dest('www/static/js'))
    .pipe(rename('icontainer.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('www/static/js'));
});

// copy post office files
gulp.task('copy-post-office', function () {
  return gulp.src(['../post-office/dist/*.js'])
    .pipe(gulp.dest('www/static/js/postoffice'));
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
  return gulp.src('src/styles/less/iframe-container.less')
    .pipe(less())
    .pipe(gulp.dest('www/static/css'));
});

// Serve
gulp.task('serve', ['build'], function () {
  return gulp.src(rootPath.concat('/www'))
    .pipe(webserver({
      host: 'container.iframe-test.com',
      port: 3200,
      livereload: true,
      open: true
    }));
});

// Tasks
gulp.task('default', ['build']);
gulp.task('build', [
  'compile-less',
  'minify-js',
  'copy-vendors',
  'copy-post-office',
  'build-index'
]);
gulp.task('dev', ['serve']);