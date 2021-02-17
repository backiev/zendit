const
    { src, dest, parallel, series, watch } = require('gulp'),
    browserSync = require('browser-sync').create(),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify-es').default,
    sass        = require('gulp-sass'),
    autoprefix  = require('gulp-autoprefixer'),
    cleancss    = require('gulp-clean-css'),
    imagemin    = require('gulp-imagemin'),
    newer       = require('gulp-newer'),
    del         = require('del'),
    csso        = require('gulp-csso');
// npm i browser-sync gulp-concat gulp-uglify-es gulp-sass del gulp-newer gulp-imagemin gulp-clean-css gulp-autoprefixer

const browsersync = () => {
    browserSync.init({
        server: { baseDir: 'app/' },
        notify: false,
        online: true
    })
}

// const libsJS = () => {
// 	return src([
// 		])
// 		.pipe(concat('libs.min.js'))
// 		// .pipe(uglify())
// 		.pipe(dest('app/js/'))
// }

const libsCSS = () => {
	return src([
    	'node_modules/normalize.css/normalize.css',
        // 'node_modules/bootstrap/dist/css/bootstrap-grid.min.css',
		])
		.pipe(concat('libs.min.css'))
      .pipe(autoprefix({ 
		   overrideBrowserslist: ['Last 10 versions'],
		   grid: true
     	}))
     	// .pipe(sass({includePaths: require('node-normalize-scss').includePaths)})
     	.pipe(cleancss({
         level: {
             1: { specialComments: 0}
         },
         // format: 'beautify'
     	}))
		.pipe(dest('app/css/'))
}

const scripts = () => {
    return src([
		'app/js/main.js'
    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js/'))
        .pipe(browserSync.stream())
}

const styles = () => {
    return src([
    	'app/sass/main.sass'
    	])
        .pipe(sass())
        .pipe(concat('style.min.css'))
        .pipe(autoprefix({ 
            overrideBrowserslist: ['Last 10 versions'],
            grid: true
        }))
        // .pipe(sass({includePaths: require('node-normalize-scss').includePaths)})
        .pipe(cleancss({
            level: {
                1: { specialComments: 0}
            },
            // format: 'beautify'
        }))
        .pipe(csso({
        	debug: true
        }))
        .pipe(dest('app/css/'))
        .pipe(browserSync.stream())
}


const images = () => {
    return src('app/img/src/**/*')
        .pipe(newer('app/img/dest/'))
        .pipe(imagemin())
        .pipe(dest('app/img/dest/'))
}

const cleanimg = () => {
    return del('app/img/dest/**/*', { force: true })
}
const cleandist = () => {
    return del('app/dist/**/*', { force: true })
}

const buildcopy = async () => {
    // return src([
    //     'app/css/**/*.min.css',
    //     'app/js/**/*.min.js',
    //     'app/img/dest/**/*',
    //     'app/**/*.html',
    // ])
    //     .pipe(dest('dist'))
    const 
    		buildCSS 	= src('app/css/**/*.min.css').pipe(dest('dist/css')),
		   buildJS 		= src('app/js/**/*.min.js').pipe(dest('dist/js')),
		   buildIMG 	= src('app/img/**/*').pipe(dest('dist/img')),
		   buildHTML	= src('app/**/*.html').pipe(dest('dist/'));
}

const startWatch = () => {
    watch(['app/**/*.sass'], styles);
    watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
    watch('app/**/*.html').on('change', browserSync.reload);
    watch('app/img/src/**/*', images);
    // watch(['app/**/*.js', '!app/**/libs.min.js'], libsJS)
}

exports.browsersync = browsersync;
exports.scripts     = scripts;
exports.styles      = styles;
exports.images      = images;
exports.cleanimg    = cleanimg;
// exports.libsJS 	  = libsJS;
exports.libsCSS     = libsCSS;

exports.build       = series(cleandist, styles, scripts, images, buildcopy)

exports.default     = parallel(styles, scripts, browsersync, startWatch);