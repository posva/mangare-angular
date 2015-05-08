var gulp = require('gulp');
var watch = require('gulp-watch');
var runSequence = require('run-sequence').use(gulp);
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var debug = require('gulp-debug');
var templateCache = require('gulp-angular-templatecache');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var nodemon = require('gulp-nodemon');
var deploy = require('gulp-gh-pages');

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

var jsFiles = params.js.map(function(file, index, files) {
  return params.app_dir + files[index];
});

gulp.task('js', function() {
  gulp.src(jsFiles)
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

gulp.task('production', function() {
  params.build_dir = './www/' + params.build_dir;
  gulp.start('build');
});

gulp.task('build', ['js', 'jade', 'templates', 'style']);

gulp.task('nodemon', function() {
  nodemon({
    script: 'server.js',
    watch: 'server.js',
    debug: true,
    env: {
      NODE_ENV: "development"
    },
  });
});

gulp.task('deploy', ['production'], function() {
  return gulp.src([
    'www/**/*',
    'server.js',
    'package.json'
    ])
    .pipe(deploy({
      branch: 'build',
      force: true,
      push: false,
      message: 'Update ' + new Date().toISOString() + ' --skip-ci'
    }));
});

gulp.task('watch', ['build', 'nodemon'], function() {
  watch(params.app_dir + params.jade, function() {
    gulp.start('jade');
  });
  watch(params.app_dir + params.templates, function() {
    gulp.start('templates');
  });
  watch(jsFiles, function() {
    gulp.start('js');
  });
  watch(params.app_dir + params.scss, function() {
    gulp.start('style');
  });
});
