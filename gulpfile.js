var gulp = require('gulp');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var minifyHTML = require('gulp-minify-html');
var purify = require('gulp-purifycss');

 
gulp.task('bundleJS', function() {
  return gulp.src(['./src/js/words.js', './src/js/utilities.js', './src/js/distanceCalculator.js','./src/js/app.js'])
    .pipe(concat('js.js'))
    .pipe(minify({mangle:true}))
    .pipe(gulp.dest('./public/dist'));
});

gulp.task('minifyHTML', function(){
 return gulp.src('./src/html/*.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('./public'));
});


gulp.task('purifyCSS', function(){
  return gulp.src('./src/css/styles.css')
    .pipe(purify(['./src/js/**/*.js', './src/html/**/*.html']))
    .pipe(gulp.dest('./public/'));
});


gulp.task('dist', ['bundleJS', 'minifyHTML', 'purifyCSS']);
