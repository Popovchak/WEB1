var gulp=require('gulp'),
	browserSync=require('browser-sync').create(),
	sass=require('gulp-sass'),
	cssnano=require('gulp-cssnano'),
	autoprefixer=require('gulp-autoprefixer'),
	imagemin=require('gulp-imagemin'),
	concat=require('gulp-concat'),
	uglify=require('gulp-uglify'),
	rename=require('gulp-rename');

gulp.task('hello',function(done){
	console.log('Helloworld!')
	done();
});

gulp.task('browserSync',function(){
	browserSync.init({
		watch:true,
		injectChanges:true,
		server:{
			baseDir:'app'
			},
	})
});

gulp.task('sass',function(){
	return gulp.src('app/sass/**/*.sсss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
});

gulp.task('appipts',function(){
	return gulp.src('app/js/*.js')
	.pipe(concat('appipts.js'))
	.pipe(uglify())
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('dist'));
});

gulp.task('imgs',function(){
	return gulp.src('app/images/*.+(jpg|jpeg|png|gif)')
	.pipe(imagemin({
		progressive:true,
		svgoPlugins:[{removeViewBox:false}],
		interlaced:true
	}))
	.pipe(gulp.dest('dist'));
});

gulp.task('reload',function(){
	browserSync.reload()
})

gulp.task('watch',function(){
	gulp.watch('app/*.html',gulp.series('reload'));
	gulp.watch('app/js/*.js',gulp.series('reload'));
	gulp.watch('app/sass/**/*.sсss',gulp.parallel('sass','reload'));
	gulp.watch('app/images/*.+(jpg|jpeg|png|gif)',gulp.series('reload'));
});

gulp.task('default',gulp.series('sass',gulp.parallel('watch','browserSync')));