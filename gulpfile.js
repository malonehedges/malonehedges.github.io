var gulp = require('gulp')
var del = require('del')
var path = require('path')
var ghpages = require('gh-pages')
var runSequence = require('run-sequence')
var revision = require('git-rev')
var minify = require('gulp-minifier')

// Default Task - set to fail to avoid accidental publishing
gulp.task('default', function () {
  console.log('Use gulp deploy to deploy to master.')
})

gulp.task('build', function () {
  return gulp.src(['src/**/*'])
    .pipe(minify({
      minify: true,
      collapseWhitespace: true,
      // conservativeCollapse: true,
      minifyJS: true,
      minifyCSS: true,
    }))
    .pipe(gulp.dest('build'))
})

gulp.task('clean', function () {
  return del(['build'])
})

gulp.task('github', function (cb) {
  revision.short(function (rev) {
    ghpages.publish(path.join(__dirname, 'build'), {
      branch: 'master',
      message: 'Update to ' + rev + '.',
    }, cb)
  })
})

gulp.task('deploy', function (cb) {
  runSequence('clean', 'build', 'github', cb)
})
