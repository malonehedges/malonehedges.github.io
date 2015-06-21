var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var runSequence = require('gulp-run-sequence');
var bower = require('gulp-bower');
var shell = require('gulp-shell');
var revision = require('git-rev');

// Default Task - set to fail to avoid accidental publishing

gulp.task('default', function() {
  console.log('Use gulp deploy to deploy to master.');
});

// Building Tasks

gulp.task('bower', function() {
  return bower();
});

gulp.task('cactus', shell.task([
  'cactus build'
]));

// Github Pages

gulp.task('github', function(cb) {
  revision.short(function (rev) {
    // gulp.src('./.build/**/*')
    //   .pipe(ghPages({
    //     branch: 'master'
    //   })
    // );
    console.log('Updated to ' + rev + '.');

    cb();
  });
});

// Main Task

gulp.task('deploy', function(cb) {
  runSequence('bower', 'cactus', 'github', cb);
});
