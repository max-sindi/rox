const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const gutil = require('gutil');
const plumber = require('gulp-plumber');
const cssmin = require('gulp-cssnano');
const prefix = require('gulp-autoprefixer');
const rename = require('gulp-rename');

gulp.task('html', () => {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
})

gulp.task('sass', () => {
  return gulp.src('./src/scss/**/*.scss')
    .pipe( sourcemaps.init() )
    .pipe( plumber() )
    .pipe( sass() )
    .pipe( sourcemaps.write() )
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
})

gulp.task('img', () => {
    return gulp.src('src/img/*.{png, jpg, svg}')
    .pipe(gulp.dest('dist/img'));
})

gulp.task('serve', ['sass', 'img', 'html'], function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch("src/scss/*.scss", ['sass']);
    gulp.watch('src/*.html',      ['html']);
    gulp.watch('src/img/*.*',     ['img']);
    gulp.watch("dist/*.*").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);

gulp.task('build', () => {
    gulp.src('dist/css/index.css')
      .pipe(prefix( {browsers: ['last 2 versions']} ))
      .pipe( cssmin() )
      .pipe( rename({ suffix: '.min' }) )
      .pipe( gulp.dest('dist/css/') );

})