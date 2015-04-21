var gulp = require('gulp');
var watch = require('gulp-watch');
var runSequence = require('run-sequence').use(gulp);
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var debug = require('gulp-debug');
var templateCache = require('gulp-angular-templatecache');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var params = require('./parameters');

gulp.task('jade', function() {
  gulp.src(params.app_dir + params.jade)
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(params.build_dir));
});

gulp.task('templates', function() {
  gulp.src(params.app_dir + params.templates)
    .pipe(plumber())
    .pipe(jade({
      doctype: 'html'
    }))
    .pipe(templateCache({
      filename: params.templates_file,
      module: params.templates_module,
      standalone: true
    }))
    .pipe(gulp.dest(params.build_dir));
});

gulp.task('connect', function() {
  connect.server({
    root: params.build_dir
  });
});

gulp.task('js', function() {
  gulp.src(params.app_dir + params.js)
    .pipe(sourcemaps.init())
    .pipe(concat(params.build_file))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(params.build_dir));
});

gulp.task('style', function() {
  gulp.src(params.app_dir + params.scss)
    .pipe(sourcemaps.init())
    .pipe(concat(params.build_css))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(params.build_dir));
});

gulp.task('dev', ['js', 'jade', 'templates', 'style']);

gulp.task('watch', ['dev', 'connect'], function() {
  watch(params.app_dir + params.jade, function() {
    gulp.start('jade');
  });
  watch(params.app_dir + params.templates, function() {
    gulp.start('templates');
  });
  watch(params.app_dir + params.js, function() {
    gulp.start('js');
  });
  watch(params.app_dir + params.scss, function() {
    gulp.start('style');
  });
});

