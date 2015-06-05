var gulp   = require('gulp');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');



gulp.task('default', function () {
  return gulp.src('jquery.step.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
    .pipe(notify({
      message: 'Yay! Plugin Minified!',
      onLast: true
    }));
});