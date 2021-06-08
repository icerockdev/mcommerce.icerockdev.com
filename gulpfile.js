/* Copyright (c) 2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const del = require('del');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const autoprefixer = require('gulp-autoprefixer');
const bourbon = require('node-bourbon');
const notify = require("gulp-notify");

// Скрипты проекта
gulp.task('scripts', function () {
  return gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/slick-carousel/slick/slick.min.js',
    'node_modules/jquery-smooth-scroll/jquery.smooth-scroll.min.js',
    'app/js/main.js',
    'node_modules/jquery-localize/dist/jquery.localize.min.js',
  ])
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false,
    // tunnel: true,
    //  tunnel: "site", //Demonstration page: http://projectmane.localtunnel.me
  });
});

gulp.task('sass', function () {
  return gulp.src('app/sass/**/*.scss')
    .pipe(sass({
      includePaths: bourbon.includePaths
    }).on("error", notify.onError()))
    .pipe(rename({suffix: '.min', prefix: ''}))
    .pipe(autoprefixer(['last 15 versions']))
    .pipe(cleanCSS())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'scripts', 'browser-sync'], function () {
  gulp.watch('app/sass/**/*.sass', ['sass']);
  gulp.watch('app/sass/**/*.scss', ['sass']);
  gulp.watch(['app/js/main.js'], ['scripts']);
  gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('imagemin', function () {
  return gulp.src('app/img/**/*')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('build', ['removedist', 'imagemin', 'sass', 'scripts'], function () {
  gulp.src([
    'app/*.html',
    'app/.htaccess',
    'app/*.json',
    'app/*.php',
  ]).pipe(gulp.dest('dist'));

  gulp.src([
    'app/css/main.min.css',
  ]).pipe(gulp.dest('dist/css'));

  gulp.src([
    'app/js/scripts.min.js',
  ]).pipe(gulp.dest('dist/js'));

  gulp.src([
    'app/fonts/**/*',
  ]).pipe(gulp.dest('dist/fonts'));
});


gulp.task('removedist', function () {
  return del.sync('dist');
});
gulp.task('clearcache', function () {
  return cache.clearAll();
});

gulp.task('default', ['watch']);
