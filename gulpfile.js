const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();


const paths = {
  scss: 'src/scss/**/*.scss',
  html: 'src/*.html',
  dist: 'dist'
};


function styles() {
  return gulp.src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist + '/css'))
    .pipe(browserSync.stream());
}


function html() {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.stream());
}


function serve() {
  browserSync.init({
    server: {
      baseDir: paths.dist
    }
  });

  gulp.watch(paths.scss, styles);
  gulp.watch(paths.html, html).on('change', browserSync.reload);
}


exports.styles = styles;
exports.html = html;
exports.serve = gulp.series(styles, html, serve);
exports.default = gulp.series(styles, html, serve);
