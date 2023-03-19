import pkd from 'gulp';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';
import concat from 'gulp-concat';
import autoprefix from 'gulp-autoprefixer';

import cleancss from 'gulp-clean-css';

import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import newer from 'gulp-newer';
import {deleteAsync} from 'del';
import csso from 'gulp-csso';







const {src, dest, parallel, series, watch} = pkd;

const browsersync = () => {
    browserSync.init({
        server: { baseDir: 'app/' },
        notify: false,
        online: true
    })
}

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
     	.pipe(cleancss({
         level: {
             1: { specialComments: 0}
         },
     	}))
		.pipe(dest('app/css/'))
}

const scripts = () => {
    return src([
		'app/js/main.js'
    ])
        .pipe(concat('main.min.js'))
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
        .pipe(cleancss({
            level: {
                1: { specialComments: 0}
            },
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
    return deleteAsync('app/img/dest/**/*', { force: true })
}
const cleandist = () => {
    return deleteAsync('app/dist/**/*', { force: true })
}


const startWatch = () => {
    watch(['app/**/*.sass'], styles);
    watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
    watch('app/**/*.html').on('change', browserSync.reload);
    watch('app/img/src/**/*', images);
}

export {browsersync, scripts, styles, images, cleanimg, libsCSS};


export const build = series(cleandist, styles, images, scripts, buildcopy)

export default parallel(styles, scripts, browsersync, startWatch);