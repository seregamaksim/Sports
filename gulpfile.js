const { src, dest, parallel, watch, series } = require("gulp");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const minify = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("imagemin-webp");
const extReplace = require("gulp-ext-replace");
const del = require("del");
const browserSync = require("browser-sync").create();

function browser() {
    browserSync.init({
        server: {
            baseDir: "src"
        },
        notify: false,
    })
}
function html() {
    return src("src/*.html")
    .pipe(dest("build"));
}
function css() {
    return src("src/sass/**/*.scss")
    .pipe(plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit("end");
        }
    }))
    .pipe(sass())
    .pipe(postcss([
        autoprefixer({browsers: ['last 1 version']})
    ]))
    .pipe(dest("src/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(dest("src/css"))
    .pipe(browserSync.stream());
}
function watchFiles() {
    watch("src/sass/**/*.scss", css);
    watch("src/*.html").on("change", browserSync.reload);
}
function images() {
    return src("src/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.jpegtran({progressive: true}),
        imagemin.svgo()
    ]))
    .pipe(dest("src/img"));
}
function exportWebp() {
    return src("src/img/**/*.{png,jpg}")
    .pipe(imagemin([
        webp({
            quality: 75
        })
    ]))
    .pipe(extReplace(".webp"))
    .pipe(dest("src/img"));
}
// function copy() {
//     return src([
//         "src/fonts/**/*.{woff,woff2}",
//         "src/img/**",
//         "src/js/**"
//     ], {
//         base: "src"
//     })
//     .pipe(dest("build"));
// }
// function clean() {
//     return del("build");
// }

exports.images = images;
exports.webp = exportWebp;
exports.html = html;
exports.css = css;
exports.default = series(
    series(css), 
    parallel(browser, watchFiles)
);