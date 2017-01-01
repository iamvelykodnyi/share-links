/**
 * @file
 *
 * Use 'npm start' for development.
 * Use 'npm run build' for build assets.
 * Use 'npm run test' for visual testing.
 */

'use strict';

import autoprefixer from 'autoprefixer';
import babel from 'gulp-babel';
import bs from 'browser-sync';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import cssnano from 'gulp-cssnano';
import data from 'gulp-data';
import del from 'del';
import environments from 'gulp-environments';
import eyeglass from 'eyeglass';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import source from 'vinyl-source-stream';
import postcss from 'gulp-postcss';
import pug from 'gulp-pug';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import gutil from 'gulp-util';

const development = environments.development;
const production = environments.production;

// Data.
import { site } from './config/data.json';

// Paths to the source folder.
const sourceDir = 'source';
// Path to the build folder.
const buildDir = development() ? 'app' : 'build';
// Path to the source files.
const sourcePaths = {
  html: `${sourceDir}/html/*.{pug,html,md}`,
  images: `${sourceDir}/images/**/*.{png,jpg,svg}`,
  scripts: `${sourceDir}/scripts/**/*.js`,
  mainScript: `${sourceDir}/scripts/main.js`,
  styles: `${sourceDir}/styles/**/*.scss`
};

// Options
const autoprefixerOption = {
  browsers: ['last 2 versions']
};

// Sass options.
const sassOptions = {
  outputStyle: development() ? 'expanded' : 'compressed'
};

const bsOptions = {
  files: [
    `${buildDir}/**/*.html`,
    `${buildDir}/**/*.js`
  ],
  server: buildDir
};

// Task: HTML. =================================================================
gulp.task('html', () =>
  gulp.src(sourcePaths.html)
    .pipe(data(() => site))
    .pipe(pug({
      pretty: development() ? true : false
    }))
    .pipe(gulp.dest(buildDir))
);

// Task: styles. ===============================================================
gulp.task('styles', () =>
  gulp.src(sourcePaths.styles)
    .pipe(development(sourcemaps.init()))
    .pipe(sass(eyeglass(sassOptions)).on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(autoprefixerOption)
    ]))
    .pipe(development(sourcemaps.write()))
    .pipe(production(cssnano()))
    .pipe(gulp.dest(`${buildDir}/styles`))
    .pipe(bs.stream())
);

// Task: scripts. ==============================================================
gulp.task('scripts', () =>
  browserify({
    entries: sourcePaths.mainScript,
    debug: true
  })
  .bundle()
  .pipe(source('main.js'))
  .pipe(buffer())
  .pipe(development(sourcemaps.init()))
  .pipe(babel({ presets: ['es2015'] }))
  .pipe(production(uglify()))
  .on('error', gutil.log)
  .pipe(development(sourcemaps.write()))
  .pipe(gulp.dest(`${buildDir}/scripts`))
);

// Task: scripts. ==============================================================
gulp.task('images', () =>
  gulp.src(sourcePaths.images)
    .pipe(imagemin())
    .pipe(gulp.dest(`${buildDir}/images`))
    .pipe(bs.stream())
);

// Task: Clean. ================================================================
gulp.task('clean', () => del(buildDir));

// Task: watch. ================================================================
gulp.task('watch', ['default'], () => {
  bs.init(bsOptions);
  gulp.watch(sourcePaths.styles, ['styles']);
  gulp.watch(sourcePaths.images, ['images']);
  gulp.watch(sourcePaths.scripts, ['scripts']);
  gulp.watch(`${sourceDir}/html/**/*.pug`, ['html']);
});

// Task: server. ===============================================================
gulp.task('server', () => bs.init(bsOptions));

// Task: default. ==============================================================
gulp.task('default', ['html', 'scripts', 'styles', 'images']);
