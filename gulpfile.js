var Gulp = require('gulp'),
  Less = require('gulp-less');

Gulp.task('less', function() {
  return Gulp.src('public/less/app.less')
    .pipe(Less())
    .pipe(Gulp.dest('./public/css'));
});

Gulp.task('watch', ['less'], function() {
  Gulp.watch('public/less/**/*.less').on('change', function () {
    Gulp.run('less');
  });
});

Gulp.task('default', ['less', 'watch']);