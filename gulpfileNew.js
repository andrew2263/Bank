"use strict";

const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const server = require("browser-sync").create();
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore")
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const del = require("del");
const concat = require("gulp-concat");
const minify = require("gulp-minify");
const gulpPlumber = require("gulp-plumber");

const css = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
};

exports.css = css;

const serv = () => {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
  gulp.watch("source/js/**", gulp.series("js-main", "js-vendor", "refresh"));
};

exports.serv = serv;

const refresh = (done) => {
  server.reload();
  done();
};

exports.refresh = refresh;

const images = () => {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))

    .pipe(gulp.dest("source/img"));

};

exports.images = images;

const webpT = () => {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source/img"));
};

exports.webpT = webpT;

const sprite = () => {
  return gulp.src("source/img/{icon-*,htmlacademy*}.svg")
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename("sprite_auto.svg"))
    .pipe(gulp.dest("build/img"));
};

exports.sprite = sprite;

const html = () => {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
};

exports.html = html;

const jsMain = () => {
  return gulp.src("source/js/main/main.js")
    .pipe(webpack({
      mode: 'development',
      output: {
        filename: 'main.min.js',
      }
    }))
    .pipe(gulp.dest("build/js"));
};

exports.jsMain = jsMain;

const jsVendor = () => {
  return gulp.src("source/js/vendor/*.js")
    .pipe(concat("vendor.js"))
    .pipe(minify({
      ext: {
        min: '.min.js'
      },
    }))
    .pipe(gulp.dest("build/js"));
};

exports.jsVendor = jsVendor;

const copy = () => {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/node_modules/**",
    "source//*.ico"
    ], {
      base: "source"
    })
  .pipe(gulp.dest("build"));
};

exports.copy = copy;

const clean = () => {
  return del("build");
};

exports.clean = clean;

const build = gulp.series(clean, webpT, copy, jsMain, jsVendor, css, sprite, html)

exports.build = build;

const start = gulp.series(build, serv);

exports.start = start;
