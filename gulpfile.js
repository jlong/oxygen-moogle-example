var gulp = require('gulp')
,   shell = require('gulp-shell')
,   runSequence = require('run-sequence')
,   plumber = require('gulp-plumber')
,   sass = require('gulp-sass')
,   autoprefixer = require('gulp-autoprefixer')
,   ext = require('gulp-ext-replace')
,   webserver = require('gulp-webserver')
,   options = {}
;

options.sass = {
  outputStyle: 'compact'
};


gulp.task('clean', shell.task('rm -Rf ./site/css/**/*.css'));


gulp.task('styles', function () {
  return gulp.src('./site/sass/**/*.scss')
    .pipe(plumber())
    .pipe(sass(options.sass))
    .pipe(autoprefixer())
    .pipe(ext('.css'))
    .pipe(gulp.dest('./site/css'))
  ;
});


gulp.task('build', function(done) {
  runSequence('clean', 'styles', done);
});


gulp.task('watch', ['build'], function() {
  gulp.watch('./site/sass/**/*.scss', ['clean', 'styles']);
});


gulp.task('server', ['watch'], function() {
  return gulp.src('./site')
    .pipe(webserver({
      livereload: true,
      port: 5000
    }))
  ;
});
