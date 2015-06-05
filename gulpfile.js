var gulp   = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var notify = require('gulp-notify');



gulp.task('default', function () {
  return gulp.src('jquery.step.js')
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('dist'))
    .pipe(notify({
      message: 'Yay! Plugin Minified!',
      onLast: true
    }));
});