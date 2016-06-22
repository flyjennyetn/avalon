/**
 * Created by flyjennyetn on 2016/2/1.
 */
/*scss*/
require("./../css/typo.css");  //布局用

/*js*/
var avalon = require('./avalon/avalon.modern.shim');
var getModel = require('./avalon/avalon.getModel.js');
require("./avalon/mmRequest");
require("./avalon/mmPromise");
require("./avalon/mmHistory");
require("./avalon/mmRouter");
require("./avalon/mmState");
avalon.config({
    debug: false
})

// 定义一个顶层的vmodel，用来放置全局共享数据
var root = avalon.define({
    $id: "root",
    loginState:false,
    userInfo: {}
    // 开发
    //baiduCount:false,
    //imgAddress: 'http://*.*.*.*/eqbImage/',//图片服务器地址
    //IPLocation: 'http://*.*.*.*/eqb-insurance/',//后台服务接口地址
});

avalon.state("app", {
    url: "/",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/examples/examples.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/examples/examples.js"))
                    })
                })
            }
        }
    }
})



/**
 * 路由全局配置
 */
avalon.state.config({
    onError: function () {
    },
    onLoad: function (from, go) {
    },
    onBegin: function (from, go) {

    },
    onViewEnter: function (newNode, oldNode) {
    } // 不建议使用动画，因此实际使用的时候，最好去掉onViewEnter和ms-view元素上的oni-mmRouter-slide

});
avalon.router.error(function () {
    console.log(11111111);
    avalon.router.navigate('/')
});
avalon.history.start({
    fireAnchor: false
});
//开始扫描编译
avalon.scan();
