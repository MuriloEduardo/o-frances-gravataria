const gulp        = require('gulp');
const sass        = require('gulp-sass');
const concat      = require('gulp-concat');
const minify      = require('gulp-minify');
const uglify      = require('gulp-uglify');
const babel       = require('gulp-babel');
const replace     = require('gulp-replace');
const cleanCss    = require('gulp-clean-css');
const imagemin    = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

gulp.task('build', ['fonts', 'imagemin'], () => {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', ['libs:scripts'], () => {
    return gulp.src('src/js/**/*.js')
        .pipe(concat('main.min.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('libs:styles', () => {
    return gulp.src([
            'node_modules/jquery.mmenu/dist/jquery.mmenu.all.css',
            'node_modules/jquery.mhead/dist/jquery.mhead.css',
            'node_modules/animate.css/animate.min.css'
        ])
        .pipe(gulp.dest('dist/css'));
});

gulp.task('libs:scripts', () => {
    return gulp.src([
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/jquery.mmenu/dist/jquery.mmenu.all.js',
            'node_modules/jquery.mhead/dist/jquery.mhead.js',
            'node_modules/wowjs/dist/wow.min.js'
        ])
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('sass', ['libs:styles'], () => {
    return gulp.src([
            'src/scss/**/*.scss',
            'node_modules/font-awesome/scss/*.scss'
        ])
        .pipe(sass())
        .pipe(cleanCss({level: {1: {specialComments: 0}}}))
        .pipe(concat('style.min.css'))
        .pipe(minify())
        .pipe(replace('../../node_modules/font-awesome/fonts', '../fonts'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('imagemin', () => {
    return gulp.src('src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.stream());
});

gulp.task('fonts', () => {
    return gulp.src([
            'node_modules/font-awesome/fonts/**/*',
            'src/fonts/**/*'
        ])
        .pipe(gulp.dest('dist/fonts'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['build', 'scripts', 'sass'], () => {
    browserSync.init({
        server: 'dist'
    });

    gulp.watch(['src/*.html'], ['build']);
    gulp.watch(['src/js/**/*.js'], ['scripts']);
    gulp.watch(['src/scss/**/*.scss'], ['sass']);
    gulp.watch(['src/fonts/**/*'], ['fonts']);
    gulp.watch(['src/images/**/*'], ['imagemin']);
});
