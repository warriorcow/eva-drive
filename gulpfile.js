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
const babel = require('gulp-babel');

let jsLibs = [
  'node_modules/jquery/dist/jquery.js', // Jquery
  'node_modules/swiper/js/swiper.min.js', // Swiper
  'node_modules/pikaday/pikaday.js', // Pikaday
  'node_modules/slick-slider/slick/slick.min.js', // Slick
  // 'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js' // Fancybox
  'node_modules/jquery-mask-plugin/dist/jquery.mask.min.js' // Mask
]

let cssLibs = [
  'node_modules/swiper/css/swiper.min.css', // Swiper
  'node_modules/slick-slider/slick/slick.css', // Slick
  'node_modules/pikaday/css/pikaday.css', // Pikaday
  // 'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.css' // Fancybox
]

function clean() {
  return del('docs');
}

function style() {
  return gulp.src(cssLibs)
    .pipe(sourcemaps.init())
    .pipe(concat('libs.css'))
    .pipe(csso())
    .pipe(gulp.dest('docs/css')),

  gulp.src('app/blocks/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(csso())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('docs/css'))
    .pipe(browserSync.stream())
}

function html() {
  return gulp.src('app/pages/**/*.pug')
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
    .pipe(gulp.dest('docs/'))
    .pipe(browserSync.stream())
}

function fontsTransfer() {
  return gulp.src('app/static/fonts/**/*.*')
    .pipe(gulp.dest('docs/fonts'))
}

function polifill() {
  return gulp.src('node_modules/@babel/polyfill/dist/polyfill.js')
      .pipe(rename({
          suffix: '.min'
      }))
      .pipe(gulp.dest('docs/js'));
}

function bundleJS() {
  return gulp.src(jsLibs)
    .pipe(concat('libs.js'))
    .pipe(uglify())
    .pipe(gulp.dest('docs/js')),

  gulp.src('app/blocks/**/*.js')
    .pipe(concat('scripts.js'))
    .pipe(babel({
			presets: ['@babel/env']
		}))
    .pipe(gulp.dest('docs/js'));
}

function imageTransfer() {
  return gulp.src('app/static/img/*.*')
    .pipe(gulp.dest('docs/img')),

  gulp.src('app/static/icons/favicon/favicon.ico')
    .pipe(gulp.dest('docs/'))
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
              namespaceClassnames: false,
              // xmlDeclaration: false,
              // doctypeDeclaration: false,
              dimensionAttributes: true,
              // namespaceIDs: false,
          }
      }))
      .pipe(gulp.dest('docs/img/icons/'));
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

gulp.task('build', gulp.series(clean, icons, style, imageTransfer, fontsTransfer, bundleJS, polifill, html, function (done) {
    done();
  })
);

gulp.task('watch:dev', gulp.series('build',  gulp.parallel(watch)));

exports.style = style
exports.polypolifill = polifill
exports.babel = babel
exports.html = html
exports.bundleJS = bundleJS
exports.icons = icons
exports.fontsTransfer = fontsTransfer
exports.imageTransfer = imageTransfer
exports.watch = watch
exports.clean = clean