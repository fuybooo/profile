const gulp = require('gulp');
const domSrc = require('gulp-dom-src');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');
const cheerio = require('gulp-cheerio');
const imageMin = require('gulp-imagemin');
const minifyHtml = require('gulp-minify-html');

gulp.task('css', function() {
    return domSrc({file:'index.html',selector:'link',attribute:'href'})
        .pipe(concat('app.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('build/'));
});

gulp.task('js', function() {
    return domSrc({file:'index.html',selector:'script',attribute:'src'})
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/'));
});

gulp.task('indexHtml', function() {
    return gulp.src('index.html')
        .pipe(cheerio(function ($) {
            $('script').remove();
            $('link').remove();
            $('body').append('<script src="app.min.js"></script>');
            $('head').append('<link rel="stylesheet" href="app.min.css">');
        }))
        .pipe(minifyHtml())
        .pipe(gulp.dest('build/'));
});

gulp.task('minifyImg', function() {
    return gulp.src('image/*')
        .pipe(imageMin())
        .pipe(gulp.dest('build/image'));
});

gulp.task('default', ['css', 'js', 'indexHtml', 'minifyImg']);