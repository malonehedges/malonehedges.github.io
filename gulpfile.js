var gulp = require('gulp');
var path = require('path');
var ghpages = require('gh-pages');
var runSequence = require('gulp-run-sequence');
var bower = require('gulp-bower');
var shell = require('gulp-shell');
var clean = require('gulp-clean');
var revision = require('git-rev');

// Default Task - set to fail to avoid accidental publishing

gulp.task('default', function() {
  console.log('Use gulp deploy to deploy to master.');
});

// Building Tasks

gulp.task('bower', function() {
  return bower();
});

gulp.task('clean', function() {
  gulp.src(['.build', 'static/vendor'], { read: false })
    .pipe(clean());
});

gulp.task('cactus', shell.task([
  'cactus build'
]));

// Github Pages

gulp.task('github', function(cb) {
  revision.short(function (rev) {
    ghpages.publish(path.join(__dirname, '.build'), {
      branch: 'master',
      tag: 'update-' + rev,
      message: 'Updated to ' + rev + '.'
    }, cb);
  });
});

// Main Task

gulp.task('deploy', function(cb) {
  runSequence('clean', 'bower', 'cactus', 'github', cb);
});
