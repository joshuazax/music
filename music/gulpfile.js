var gulp = require("gulp");
var htmlClean = require("gulp-htmlclean");
var imageMin = require("gulp-imagemin");
var uglify = require("gulp-uglify");
var strip = require("gulp-strip-debug");
var concat = require("gulp-concat");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoPrefixer = require("autoprefixer");
var cssnano = require("cssnano");
var connect = require("gulp-connect");


var devMode = process.env.NODE_ENV !== "production";

var folder = {
	src: "./src/",
	build:"./build/"
}

gulp.task("html",function(){
	var page = gulp.src(folder.src + "html/*")
		.pipe(connect.reload())
		if(!devMode){
			page.pipe(htmlClean())
		}
			page.pipe(gulp.dest(folder.build + "html/"))
})
gulp.task("js",function(){
	var js = gulp.src(folder.src + "js/*")
			.pipe(connect.reload())
		if(!devMode){
			js.pipe(uglify())
			  .pipe(strip())
		}
			// js.pipe(concat("main.js"))
			js.pipe(gulp.dest(folder.build + "js/"))
})
gulp.task("css",function(){
	var options = [autoPrefixer(),cssnano()];
	var css = gulp.src(folder.src + "css/*")
				.pipe(less())
				.pipe(connect.reload())
		if(!devMode){
			css.pipe(postcss(options))
		}
		css.pipe(gulp.dest(folder.build + "css/"))
})
gulp.task("images",function(){
	gulp.src(folder.src + "images/*")
		.pipe(imageMin())
		.pipe(gulp.dest(folder.build + "images/"))
})
gulp.task("watch",function(){
	gulp.watch(folder.src + "html/*",["html"])
	gulp.watch(folder.src + "js/*",["js"])
	gulp.watch(folder.src + "css/*",["css"])
	gulp.watch(folder.src + "images/*",["images"])
})

gulp.task("server",function(){
	connect.server({
		port:"8080",
		livereload:true
	})
})

gulp.task("default",["html","js","css","images","watch","server"])