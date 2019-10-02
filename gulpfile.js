const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const svgSprite = require('gulp-svg-sprite');
const browserSync = require('browser-sync').create();
const del = require('del');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const csso = require('gulp-csso');
const uglify = require('gulp-uglify');

let jsLibs = [
  'node_modules/jquery/dist/jquery.js', // Jquery
  'node_modules/slick-slider/slick/slick.min.js', // Slick
  'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js' // Fancybox
]

let cssLibs = [
  'node_modules/slick-slider/slick/slick.css', // Slick
  'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.css' // Fancybox
]

function clean() {
  return del('dist');
}

function style() {
  return gulp.src(cssLibs)
    .pipe(sourcemaps.init())
    .pipe(concat('libs.css'))
    .pipe(csso())
    .pipe(gulp.dest('dist/css')),

  gulp.src('app/blocks/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(csso())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream())
}

function html() {
  return gulp.src('app/pages/**/index.pug')
    .pipe(pug({
      pretty: true,
      basedir: __dirname + '/',
      locals: {
        addClass: function (name, mods, addClass) {
          mods = mods || [];
          addClass = addClass || '';
          let value = '';
  
          mods.forEach(function (element) {
              value += ' ' + name + '_' + element;
          });
  
          return (value + ' ' + addClass).trim();
        }
      }
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream())
}

function fontsTransfer() {
  return gulp.src('app/static/fonts/**/*.*')
    .pipe(gulp.dest('dist/fonts'))
}

function bundleJS() {
  return gulp.src(jsLibs)
    .pipe(concat('libs.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js')),

  gulp.src('app/blocks/**/*.js')
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
};

function imageTransfer() {
  return gulp.src('app/static/img/*.*')
    .pipe(gulp.dest('dist/img')),

  gulp.src('app/static/icons/favicon/favicon.ico')
    .pipe(gulp.dest('dist/'))
}

function icons() {
  return gulp.src('app/static/icons/*.svg')
      .pipe(replace('&gt;', '>'))
      .pipe(rename({prefix: 'icon-'}))
      .pipe(svgSprite({
          mode: {
              symbol: {
                  dest: '',
                  sprite: 'icons.svg'
              }
          },
          svg: {
              xmlDeclaration: false,
              doctypeDeclaration: false,
              namespaceIDs: false,
              dimensionAttributes: false
          }
      }))
      .pipe(gulp.dest('dist/img/icons/'));
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './dist',
    }
  });
  gulp.watch('app/**/*.scss', style);
  gulp.watch('app/**/*.pug', html).on('change', browserSync.reload);
  gulp.watch('app/static/**/*.{png,jpg,jpeg,gif,webp,svg}', gulp.series(icons, imageTransfer));
  gulp.watch('app/**/*.js', gulp.series(bundleJS)).on('change', browserSync.reload);
}

gulp.task('build', gulp.series(clean, icons, style, imageTransfer, fontsTransfer, bundleJS, html, function (done) {
    done();
  })
);

gulp.task('watch:dev', gulp.series('build',  gulp.parallel(watch)));

exports.style = style
exports.html = html
exports.bundleJS = bundleJS
exports.icons = icons
exports.fontsTransfer = fontsTransfer
exports.imageTransfer = imageTransfer
exports.watch = watch
exports.clean = clean