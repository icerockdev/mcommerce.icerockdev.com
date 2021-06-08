const gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cleanCSS = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer'),
	bourbon = require('node-bourbon'),
	notify = require("gulp-notify");

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

  var buildFiles = gulp.src([
    'app/*.html',
    'app/.htaccess',
    'app/*.json',
    'app/*.php',
  ]).pipe(gulp.dest('dist'));

  var buildCss = gulp.src([
    'app/css/main.min.css',
  ]).pipe(gulp.dest('dist/css'));

  var buildJs = gulp.src([
    'app/js/scripts.min.js',
  ]).pipe(gulp.dest('dist/js'));

  var buildFonts = gulp.src([
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
