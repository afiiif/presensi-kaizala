const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

// Compile Sass
function css_main() {
	return gulp
		.src('src/scss/main.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'compressed', includePaths: ['./src/scss'] }).on('error', sass.logError))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('assets/css'));
}

// Concat & minify JS
function js_main() {
	return gulp
		.src(['src/js/utilities.js', 'src/js/main/**/*.js'])
		.pipe(sourcemaps.init())
		.pipe(concat('main.js'))
		.pipe(babel({ presets: ['@babel/env'] }).on('error', function (e) { console.log(e) }))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('assets/js'));
}

// Modify libraries
function atlantis_css() {
	return gulp
		.src('lib/atlantis-lite/css/atlantis.mod.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('lib/atlantis-lite/mod'));
}
function atlantis_js() {
	return gulp
		.src(['lib/atlantis-lite/js/atlantis.mod.js', 'lib/atlantis-lite/js/plugin/bootstrap-notify/bootstrap-notify.min.js'])
		.pipe(sourcemaps.init())
		.pipe(concat('atlantis.mod.js'))
		.pipe(babel({ presets: ['@babel/env'] }).on('error', function (e) { console.log(e) }))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('lib/atlantis-lite/mod'));
}

// Watch files
function watchFiles() {
	gulp.watch('src/scss/**/*.scss', gulp.series(css_main));
	gulp.watch('src/js/main/**/*.js', gulp.series(js_main));
	gulp.watch('src/js/utilities.js', gulp.series(js_main));
}

// Export
exports.css_main = css_main;
exports.js_main = js_main;
exports.atlantis = gulp.series(atlantis_css, atlantis_js);
exports.watch = watchFiles;
exports.default = gulp.series(css_main, js_main);
