const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const del = require('del')
const path = require('path')
const ghpages = require('gh-pages')
const runSequence = require('run-sequence')
const revision = require('git-rev')
const minify = require('gulp-minifier')
const replace = require('gulp-replace')
const revSync = require('git-rev-sync')

// Default Task - set to fail to avoid accidental publishing
gulp.task('default', () => {
  console.log('Use gulp deploy to deploy to master.')
})

gulp.task('build-css', () => {
  return gulp.src(['src/**/*.css'])
    .pipe(autoprefixer(['> 5%']))
    .pipe(cleanCSS())
    .pipe(gulp.dest('build'))
})

gulp.task('build', ['build-css'], () => {
  return gulp.src(['src/**/!(*.css)'])
    .pipe(replace('GIT_REV_HASH', revSync.short()))
    .pipe(minify({
      minify: true,
      collapseWhitespace: true,
      minifyJS: true,
      minifyCSS: true,
    }))
    .pipe(gulp.dest('build'))
})

gulp.task('clean', () => {
  return del(['build'])
})

gulp.task('github', (cb) => {
  revision.short((rev) => {
    ghpages.publish(path.join(__dirname, 'build'), {
      branch: 'master',
      message: 'Update to ' + rev + '.',
    }, cb)
  })
})

gulp.task('dev', () => {
  browserSync.init({
    server: './src',
  })

  gulp.watch("src/**/*").on('change', browserSync.reload)
})

gulp.task('deploy', (cb) => {
  runSequence('clean', 'build', 'github', cb)
})
