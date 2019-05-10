const gulp = require('gulp'),
      htmlmin = require('gulp-htmlmin'),
      minifyCss = require('gulp-minify-css'),
      sass = require('gulp-sass'),
      uglify = require('gulp-uglify'),
      babel = require('gulp-babel'),
      connect = require('gulp-connect');
//制定任务
gulp.task('html',()=>{
    gulp.src('src/**/*.html')
        .pipe(htmlmin({
            removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
            collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: false,//不删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
            minifyJS: true,//压缩页面JS
            minifyCSS: true//压缩页面CSS  
        }))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
})

gulp.task('css',()=>{
    gulp.src(['src/css/**/*.scss'])
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
})

gulp.task('js',()=>{
    gulp.src('src/js/**/*.js')
    .pipe(babel({
        presets:['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
})

gulp.task('libs',()=>{
    gulp.src('src/libs/**/*').pipe(gulp.dest('dist/libs'));
})

gulp.task('images', () => {
    // 移动
    gulp.src('src/img/*').pipe(gulp.dest('dist/img'));
  })


gulp.task('watch', () => {
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/css/**/*.scss', ['css']);
    gulp.watch('src/js/**/*.js', ['js']);
})

gulp.task('server', () => {
    connect.server({
        root: 'dist',
        port: 1996,
        livereload: true
    });
})
  
gulp.task('default', ['html', 'css', 'js', 'libs', 'images', 'server', 'watch']);