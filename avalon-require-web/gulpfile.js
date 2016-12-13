/**
 * Created by hejing on 15/11/12.
 */
var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    sass = require('gulp-ruby-sass'),  //sass的编译（gulp-ruby-sass）
    autoprefixer = require('gulp-autoprefixer'), //自动添加css前缀（gulp-autoprefixer）
    copy = require('gulp-copy'), //自动添加css前缀（gulp-autoprefixer）
    requirejsOptimize = require('gulp-requirejs-optimize'),  //建立依赖关系
    rev = require('gulp-rev'),   //对文件名加MD5后缀
    revReplace = require('gulp-rev-replace'), // 路径替换
    minifycss = require('gulp-minify-css'), //压缩css（gulp-minify-css）
    jshint = require('gulp-jshint'),  //js代码校验（gulp-jshint）
    uglify = require('gulp-uglify'),   //压缩js代码（gulp-uglify）
    imagemin = require('gulp-imagemin'),  //压缩图片（gulp-imagemin）
    rename = require('gulp-rename'),  //重复名
    concat = require('gulp-concat'), //合并js文件（gulp-concat）
    notify = require('gulp-notify'), //更改提醒（gulp-notify）
    cache = require('gulp-cache'),  //图片缓存，只有图片替换了才压缩（gulp-cache）
    livereload = require('gulp-livereload'),  //自动刷新页面（gulp-livereload）
    del = require('del');  //清除文件（del）


gulp.task('sass', function() {
    return sass('css/global.scss', { style: 'expanded' })
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('css'))
        //.pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('css'))
        .pipe(notify({ message: 'sass生成成功' }));
});

//Gulp也可以实现当文件修改时自动刷新页面，我们要修改watch任务，配置LiveReload：
gulp.task('watch', function() {
    //要使这个能够工作，还需要在浏览器上安装LiveReload插件，除此之外还能这样做
    //创建LiveReload服务器
    livereload.listen();
    gulp.watch(['./']).on('change', livereload.changed);
});


//gulp.task('js', function() {
//    return gulp.src('src/js/*.js')
//        .pipe(concat('all.js'))
//        .pipe(gulp.dest('dest/js'))
//        .pipe(rename({ suffix: '.min' }))
//        .pipe(uglify())
//        .pipe(gulp.dest('dest/js'))
//        .pipe(notify({ message: '合并压缩js' }));
//});

// gulp.task('css', function() {
//     gulp.src(['css/*.css','js/libs/layer/skin/layer.css','js/libs/laypage/skin/laypage.css','js/libs/icheck/skins/square/_all.css'])
//         //.pipe(concat('main.css'))                            //- 合并后的文件名
//         //.pipe(minifycss())                                      //- 压缩处理成一行
//         .pipe(gulp.dest('.temp/css'))                               //- 输出文件本地
//         .pipe(notify({ message: 'css合并压缩' }));
// });


//压缩图片mian
gulp.task('images', function() {
    return gulp.src('images/*')
        // .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }).on('error', function(e){
        //    console.log(e);
        // }))
        .pipe(gulp.dest('dist/images'))
    // .pipe(notify({ message: 'Images压缩生成成功' }));

});


gulp.task('rjs', function () {
    return gulp.src('js/main.js')
        .pipe(requirejsOptimize({
            baseUrl: './',
            name: 'js/main',
            exclude:['js/require/normalize'] ,
            mainConfigFile: './js/main.js',
            findNestedDependencies: true,
            optimize: 'none',
            include: ['requireLib']
        }))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('.temp/js'))
        //.pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('.temp/js'))
    // .pipe(notify({ message: 'js关联成功' }));

});
//
// gulp.task('concat', function () {
//     return gulp.src(['.temp/js/main.js','js/libs/tongji.js'])
//         .pipe(jshint.reporter('default'))
//         .pipe(concat('main.js'))
//         .pipe(gulp.dest('.temp/js'))
//         //.pipe(rename({suffix: '.min'}))
//         .pipe(uglify())
//         .pipe(gulp.dest('.temp/js'))
//         .pipe(notify({ message: 'js合并成功' })
//     );
// });

gulp.task('dev', function () {
    return gulp.src(['.temp/js/*.js'],{ base:'.temp'})
        .pipe(rev())
        .pipe(gulp.dest('dist/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('.temp/'))
    // .pipe(notify({ message: '添加版本号' }))
});

gulp.task('html5shiv', function(){
    return gulp.src([
        'js/html5shiv.min.js'
    ])
        .pipe(gulp.dest('dist/js'))
    // .pipe(notify({message : 'copy成功'}))
});

gulp.task('doc', function(){
    return gulp.src('doc/*')
        .pipe(gulp.dest('dist/doc/'))
    // .pipe(notify({message : 'copy成功'}))
});

gulp.task('ttf', function(){
    return gulp.src('Fonts/*')
        .pipe(copy('dist/'))
        .pipe(notify({message : 'Fonts copy成功'}))
});



gulp.task('layer', function(){
    return gulp.src('js/layer/skin/default/*').pipe(copy('dist/js',{prefix: 1}))
    // .pipe(notify({message : 'copy成功'}))
});

gulp.task('laydate', function(){
    return gulp.src('js/laydate/skins/default/icon.*').pipe(copy('dist/js',{prefix: 1}))
    // .pipe(notify({message : 'copy成功'}))
});

gulp.task('ueditor', function(){
    return gulp.src('js/ueditor/**/*').pipe(copy('dist/js',{prefix: 1}))
    // .pipe(notify({message : 'copy成功'}))
});


gulp.task('html', function(){
    return gulp.src("build.html")
        .pipe(revReplace({
            manifest: gulp.src('.temp/rev-manifest.json')
        }))
        .pipe(rename('index.html'))
        // .pipe(notify({message : '替换版本号移动成功'}))
        .pipe(gulp.dest('dist/'))
});

gulp.task('clean', function() {
    del('dist/*')
    del('.temp')
});

gulp.task('temp', function() {
    del('.temp')
});

//正式构建
gulp.task('build', function () {
    runSequence(
        'clean',
        ['images','html5shiv','ueditor','layer'],
        'rjs',
        'ttf',
        'dev',
        'html',
        'temp'
    );
});
