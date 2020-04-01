const gulp = require('gulp');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');



/*-----------------------------------------------------------------------
|  SASS
|------------------------------------------------------------------------
*/
gulp.task('sass', function () {
	gulp.src('assets.src/scss/main.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'compressed', includePaths: ['./assets.src/scss'] }).on('error', sass.logError))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('assets/css'));
});



/*-----------------------------------------------------------------------
|  JS
|------------------------------------------------------------------------
*/
gulp.task('main.js', function(){
	gulp.src(['assets.src/js/utilities.js', 'assets.src/js/main/**/*.js'])
		.pipe(sourcemaps.init())
		.pipe(concat('main.js'))
		.pipe(babel({ presets: ['@babel/env'] }).on('error', function(e) { console.log(e) }))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('assets/js'));
});



/*-----------------------------------------------------------------------
|  MODIFIED LIBRARIES
|------------------------------------------------------------------------
*/
gulp.task('atlantis', function () {
	gulp.src('lib/atlantis-lite/css/atlantis.mod.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('lib/atlantis-lite/mod'));
	gulp.src(['lib/atlantis-lite/js/atlantis.mod.js', 'lib/atlantis-lite/js/plugin/bootstrap-notify/bootstrap-notify.min.js'])
		.pipe(sourcemaps.init())
		.pipe(concat('atlantis.mod.js'))
		.pipe(babel({ presets: ['@babel/env'] }).on('error', function(e) { console.log(e) }))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('lib/atlantis-lite/mod'));
});



/*-----------------------------------------------------------------------
|  WATCH
|------------------------------------------------------------------------
*/
gulp.task('watch', function(){
	gulp.watch('assets.src/scss/**/*.scss', ['sass']);
	gulp.watch('assets.src/js/main/**/*.js', ['main.js']);
	gulp.watch('assets.src/js/utilities.js', ['main.js']);
});



/*-----------------------------------------------------------------------
|  DEFAULT
|------------------------------------------------------------------------
*/
gulp.task('default', ['sass', 'main.js']);
