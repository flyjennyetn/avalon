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
            jquery: path.join(__dirname, './js/jquery/jquery-2.0.3.min'),
            gridLocaleEn: path.join(__dirname, './js/jqGrid/i18n/grid.locale-en'),
            jqGrid: path.join(__dirname, './js/jqGrid/jquery.jqGrid.min'),
            jqGridCss: path.join(__dirname, './js/jqGrid/css/ui.jqgrid.css'),
            echarts: path.join(__dirname, './js/echarts/echarts'),
            validate: path.join(__dirname, './js/jquery/jquery.validate.min'),
            slimscroll: path.join(__dirname, './js/jquery/jquery.slimscroll.min'),
            wizard: path.join(__dirname, './js/fuelux/fuelux.wizard.min'),
            colorbox: path.join(__dirname, './js/colorbox/jquery.colorbox'),   //图片查看
            colorboxCss: path.join(__dirname, './js/colorbox/example1/colorbox.css'),
            select2: path.join(__dirname, './js/select2/select2.min'),     //下拉框搜索
            select2Css: path.join(__dirname, './js/select2/select2.css'),
            avalon: path.join(__dirname, './js/avalon/avalon.modern.shim'),
            layer_: path.join(__dirname, './js/layer/layer'),
            laydate: path.join(__dirname, './js/laydate/laydate')
        }
    },
    plugins: [
        //提公用js到common.js文件中
        new CommonsChunkPlugin('js/common.js'),

        new HtmlWebpackPlugin({
            title: "后台管理系统",
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
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery:'jquery'
        }),
        //js文件的压缩
        new uglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
  //devtool: '#source-map'
};