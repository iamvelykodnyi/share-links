/**
 * @file
 *
 * Use 'npm start' for development.
 * Use 'npm run build' for build assets.
 * Use 'npm run test' for visual testing.
 */

'use strict';

import autoprefixer from 'autoprefixer';
import browserify from 'browserify';
import bs from 'browser-sync';
import buffer from 'vinyl-buffer';
import cssnano from 'gulp-cssnano';
import del from 'del';
import environments from 'gulp-environments';
import eyeglass from 'eyeglass';
import gulp from 'gulp';
import gutil from 'gulp-util';
import hb from 'gulp-hb';
import imagemin from 'gulp-imagemin';
import postcss from 'gulp-postcss';
import sass from 'gulp-sass';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';

const development = environments.development;
const production = environments.production;

// Paths to the source folder.
const sourceDir = 'source';
// Path to the build folder.
const buildDir = development() ? 'app' : 'build';
// Path to the source files.
const sourcePaths = {
  html: `${sourceDir}/html/**/*.html`,
  images: `${sourceDir}/images/**/*.{png,jpg,svg}`,
  scripts: `${sourceDir}/scripts/**/*.js`,
  mainScript: `${sourceDir}/scripts/share.js`,
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
    .pipe(hb({
      partials: `${sourceDir}/html/parts/*.hbs`,
      data: 'data/*.json'
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
  .transform(
    'babelify',
    { presets: ['es2015'] }
  )
  .bundle()
  .pipe(source('main.js'))
  .pipe(buffer())
  .pipe(development(sourcemaps.init()))
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
  gulp.watch(`${sourceDir}/html/**/*.{html,hbs}`, ['html']);
});

// Task: server. ===============================================================
gulp.task('server', () => bs.init(bsOptions));

// Task: default. ==============================================================
gulp.task('default', ['html', 'scripts', 'styles', 'images']);
