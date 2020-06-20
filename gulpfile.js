var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({browsers: ['last 2 versions']});

// Static server
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
    gulp.watch('./less/**/*.less', gulp.parallel('less'));
});

gulp.task('less', function () {
    return gulp.src('./less/main.less')
        .pipe(sourcemaps.init())
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.reload({stream: true}));
});


gulp.task('default', gulp.parallel('server'));