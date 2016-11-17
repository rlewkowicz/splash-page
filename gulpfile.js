var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer'),
    poststylus = require('poststylus'),
    lost = require('lost'),
    livereload = require('gulp-livereload'),
    eslint = require('gulp-eslint'),
    concat = require('gulp-concat');


gulp.task('stylus', function () {
    gulp.src('resources/stylus/app.stylus')
        .pipe(stylus({
            use: [
                poststylus(['autoprefixer', 'lost'])
            ]
        }))
        .pipe(concat('app.css'))
        .pipe(gulp.dest('public/css/'))
        .pipe(livereload())
});

gulp.task('scripts', function() {
    return gulp.src([
            'bower_components/jquery/dist/jquery.js',
            'bower_components/jquery-ui/jquery-ui.js',
            'resources/assets/js/**/*.js'
        ])
        .pipe(concat('app.js'))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public/js/'))
});

gulp.task('lint', ['scripts'], function () {
    return gulp.src(['resources/assets/**/*.js','!node_modules/**', '!bower_components/**'])
        .pipe(eslint({
            extends: 'eslint:recommended',
            ecmaFeatures: {
                'modules': true
            },
            globals: {
                'jQuery':false,
                '$':true
            },
            envs: [
                'browser'
            ]
        }))
        .pipe(eslint.formatEach('compact', process.stderr));
});

gulp.task('default', ['stylus', 'lint']);
gulp.task('watch', function(){
    livereload.listen();
    gulp.watch('resources/stylus/*.stylus', ['stylus']);
    gulp.watch('resources/assets/js/**/*.js', ['scripts'])
});