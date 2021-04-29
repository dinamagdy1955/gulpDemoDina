const gulp = require("gulp");
const { src, dest, watch, parallel, series } = require("gulp")



const html = require('gulp-htmlmin');
function Html() {
  return src('src/*.html')
    .pipe(html({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest('dist'))
}

exports.html = Html

const img = require('gulp-imagemin');
function imgMin() {
  return src('src/media/pics/*')
    .pipe(img())
    .pipe(gulp.dest('dist/pics'));
}
exports.img = imgMin

const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const babel = require("gulp-babel")
function jsMin() {
  return src('src/js/**/*.js')


    .pipe(concat('all.min.js'))
    .pipe(
      babel()
    )
    .pipe(terser())
    .pipe(dest('dist/assets/js'))
}
exports.js = jsMin

var cleanCss = require('gulp-clean-css');
var sass = require('gulp-sass');
function sassMinify() {
  return src(["src/sass/**/*.scss", "src/css/**/*.css"], { sourcemaps: true })
    .pipe(concat('style.sass.min.css'))
    .pipe(sass())
    .pipe(cleanCss())
    .pipe(dest('dist/assets/css', { sourcemaps: '.' }))
}



var browserSync = require('browser-sync');
function serve(cb) {
  browserSync({
    server: {
      baseDir: 'dist/'
    }
  });
  cb()
}
function reloadSync(cb) {
  browserSync.reload()
  cb()
}


function watchTask() {
  watch('src/*.html', series(Html, reloadSync))
  watch(['src/js/**/*.js', "src/css/**/*.css", "src/sass/**/*.scss"], { interval: 1000 }, parallel(jsMin, sassMinify, reloadSync));
}
exports.default = series(parallel(imgMin, jsMin, sassMinify, Html), serve, watchTask)




