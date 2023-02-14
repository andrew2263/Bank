import imagemin from "gulp-imagemin";
import gulp from "gulp";
import plumber from "gulp-plumber";
import sourcemap from "gulp-sourcemaps";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import { create as bsCreate } from "browser-sync";
import csso from "gulp-csso";
import rename from "gulp-rename";
import webp from "gulp-webp";
import svgstore from "gulp-svgstore";
import posthtml from "gulp-posthtml";
import include from "posthtml-include";
import del from "del";
import concat from "gulp-concat";
import minify from "gulp-minify";
import webpack from "webpack-stream";
import dartSass from "sass";
import gulpSass from "gulp-sass";

const server = bsCreate();

const sass = gulpSass(dartSass);

gulp.task("css", function () {
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
});

gulp.task("server", function () {
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
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("images", function() {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"));

});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source/img"));
});

gulp.task("sprite", function () {
  return gulp.src("source/img/{icon-*,htmlacademy*}.svg")
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename("sprite_auto.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("js-main", function () {
  return gulp.src("source/js/main/main.js")
    .pipe(webpack({
      mode: 'development',
      output: {
        filename: 'main.min.js',
      }
    }))
    .pipe(gulp.dest("build/js"));
});

gulp.task("js-vendor", function () {
  return gulp.src("source/js/vendor/*.js")
    .pipe(concat("vendor.js"))
    .pipe(minify({
      ext: {
        min: '.min.js'
      },
    }))
    .pipe(gulp.dest("build/js"));
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/node_modules/**",
    "source//*.ico"
    ], {
      base: "source"
    })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("build", gulp.series("clean", "webp", "copy", "js-main", "js-vendor", "css", "sprite", "html"));
gulp.task("start", gulp.series("build", "server"));
