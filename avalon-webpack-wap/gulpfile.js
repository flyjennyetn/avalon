/**
 * Created by WangMing on 15/12/9.
 */
var gulp=require('gulp');
var webpack = require('webpack');
var runSequence = require('run-sequence');
var del=require('del');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var notify = require('gulp-notify'); //更改提醒（gulp-notify）
var imagemin = require('gulp-imagemin');  //压缩图片（gulp-imagemin）
var webpackconfig = require('./webpack.config');
/**
 *  清理生产目录文件
 */
gulp.task('clean', function(cb) {
    del('dist/*')
});

/**
 *  执行webpack打包
 */
gulp.task('webpack', function(cb) {
    webpack(webpackconfig, cb)
});

//压缩图片mian
gulp.task('images', function() {
    return gulp.src('images/*')
        //.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }).on('error', function(e){
        //    console.log(e);
        //}))
        .pipe(gulp.dest('dist/images'))
        .pipe(notify({ message: 'Images压缩生成成功' })
    );
});

gulp.task('weixin', function(){
    return gulp.src('weixin.html')
        .pipe(gulp.dest('dist/'))
        .pipe(notify({message : 'copy weixin成功'}))
});

gulp.task('openId', function(){
    return gulp.src('js/openId.js')
        .pipe(gulp.dest('dist/js/'))
        .pipe(notify({message : 'copy openId成功'}))
});

//正式构建
gulp.task('build', function () {
    runSequence(
        //'clean',
        'webpack',
        ['images','weixin','openId']
    );
});