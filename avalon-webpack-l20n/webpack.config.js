var path = require('path');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //将组件中的样式乖乖提取出来

var HtmlWebpackPlugin = require('html-webpack-plugin'); //html模板插入代码
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;


//编译输出路径
module.exports = {
    debug: true,
    cache: true,
    //devtool: "source-map",  //生成sourcemap,便于开发调试
    entry: ['./js/main'],   //获取项目入口js文件
    output: {
        path:__dirname + "/dist/",
        filename: 'js/build.js',
        publicPath: '',
        chunkFilename: "js/[name].chunk.[chunkhash:8].js" //给require.ensure用
    },
    module: {
        loaders: [
            //{
            //    test: /\.scss$/,
            //    loaders: ["style", "css", "sass"]
            //},
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: "url-loader?limit=50000&name=images/[name].[hash].[ext]"
            },
            {
                test: /\.(woff(2)|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=50000&name=[path][name].[ext]'
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ],
        preLoaders: [{
            test: /\.js$/,
            loader: "require-css-preloader"
        }]
    },
    //配置别名，在项目中可缩减引用路径
    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extension: ['', '.js', '.css'],
        //别名
        alias: {
            avalon: path.join(__dirname, './js/avalon/avalon.modern.shim'),   //1.4.6
            //avalon: path.join(__dirname, './js/avalon/avalon.mobile.shim'),   //1.5.5
            msl20n: path.join(__dirname, './js/msl20n/avalon.l20n'), //1.4.6
            //msl20n: path.join(__dirname, './js/msl20n/avalon.l20n_1'),   //1.5.5
            meld: path.join(__dirname, './js/msl20n/meld')
        }
    },
    plugins: [
        //提公用js到common.js文件中
        new CommonsChunkPlugin('js/common.js'),

        new HtmlWebpackPlugin({
            title: "国际化",
            template: "tpl.html",
            filename: "index.html",
            hash: true
        }),
        //将样式统一发布到style.css中
        new ExtractTextPlugin("css/style.css", {
            allChunks: true,
            disable: false
        }),
        // 使用 ProvidePlugin 加载使用率高的依赖库
        //new webpack.ProvidePlugin({
        //    $: 'jquery',
        //    jQuery:'jquery'
        //}),
        //js文件的压缩
        new uglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
  //devtool: '#source-map'
};