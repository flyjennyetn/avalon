/**
 * Created by flyjennyetn on 2016/2/1.
 */
/*scss*/
require("./../css/global.scss");
require("./../css/home.scss");
/*插件scss*/
require("./layer/need/layer.scss");
require("./swiper/swiper.min.scss");

/*js*/
var jquery = require('./jquery/jquery.min.js');
var layer_ = require('./layer/layer');
var avalon = require('./avalon/avalon.mobile.shim.js'); //在正常情况下我们以CommonJS风格引用avalon,以require('avalon')
//var drag = require('./avalon/touch.drag');
var getModel = require('./avalon/avalon.getModel.js');
require("./avalon/mmRequest");
require("./avalon/mmPromise");
require("./avalon/mmHistory");
require("./avalon/mmRouter");
require("./avalon/mmState");

avalon.config({
    debug: false
});

// 定义一个顶层的vmodel，用来放置全局共享数据
var root = avalon.define({
    $id: "root",
    page: "",
    directoryState: "",
    userInfo: null,
    grade: null,
    menuState: null,
    cathetMenu: null,
    ticklingLayer: null,
    beginLoadLayer: null,
    hiddenState:true,
    // 开发
    baiduCount:false, //百度统计
    developState: true,     // 开发状态
    imgAddress: 'http://****/01image/',//图片服务器地址
    IPLocation: 'http://****/cms/',//后台服务接口地址
    alert: function (str) {
        layer_.open({
            content: str,
            shift: -1,
            anim:false,
            btn: ['OK']
        });
    },
    isLogin: function (state) { // state是否必须登录状态 1必须  0非必须
        var userData = localStorage.getItem("userData");
        if (userData == undefined || userData == "undefined" || userData == null || userData == "") {
            if (state == 1) {
                layer_.open({
                    content: '请先登陆',
                    btn: ['确认', '取消'],
                    shift: -1,
                    anim:false,
                    shadeClose: false,
                    yes: function () {
                        location.href = "#!/login";
                    }, no: function () {
                        return false
                    }
                });
                return false
            }
            if (state == 0) {
                root.grade = 0
            }
        } else {
            root.userInfo = eval('(' + userData + ')');
        }
        return true;
    },
    getUrlPara: function (strName) {
        var strHref = location.href;
        var intPos = strHref.indexOf("?");
        var strRight = strHref.substr(intPos + 1);
        var arrTmp = strRight.split("&");
        for (var i = 0; i < arrTmp.length; i++) {
            var arrTemp = arrTmp[i].split("=");
            if (arrTemp[0].toUpperCase() == strName.toUpperCase()) {
                if (arrTemp[1].indexOf('#') > 0) {
                    arrTemp[1] = arrTemp[1].substring(0, arrTemp[1].length - 1);
                } else {
                    return arrTemp[1];
                }
            }
        }
        return null;
    }
    , polyvObject: function () { //渲染视频的
        var width = "100%";
        var height = "11rem";
        var banSeekByLimitTime = 'off';
        var autoplay = '1';
        if (arguments.length > 1) {
            width = arguments[1];
            height = arguments[2];
            banSeekByLimitTime = 'on';
            autoplay = '0';
        }
        var player = polyvObject('#plv_' + arguments[0]).videoPlayer({
            'width': width,
            'height': height,
            'vid': arguments[0],
            'flashvars': {"ban_seek_by_limit_time": banSeekByLimitTime, "autoplay": autoplay}
        });
    }
    , getJsonData: function (url, param, callback) {
        var loadScore = layer_.open({type: 2, content: '加载测试中…'});
        avalon.ajax({
            url: root.IPLocation + url,
            data: param,
            dataType: 'jsonp',
            cache: false
        }).done(function (data) {
            layer_.close(loadScore);
            if (data.result == true) {
                callback(data.t);
            } else {
                layer_.open({
                    content: data.msg,
                    btn: ['OK']
                });
            }
        });
    },
    getIsCode: function (url, mobile, num, businessId, callback) {
        // BZ0003 注册使用
        // BZ0004 登陆
        var params = {"phone": mobile, businessId: businessId, "studentNumber": ''};
        if (num != null) {
            params.content = num;
        }
        $.ajax({
            type: 'get',
            url: 'http://****/' + url,
            data: params,
            dataType: "jsonp",
            jsonp: "callback",
            context: this,
            success: function (data) {
                callback(data);
            }
        });
    }
});

avalon.state("app", {
    url: "/",
    abstract: true, // 抽象状态，不会对应到url上
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/common/common.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/common/common.js"))
                    })
                })
            }
        },
        "footer@": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/footer/footer.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/footer/footer.js"))
                    })
                })
            }
        }
    }
}).state("app.home", {
    url: "home",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/home/home.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/home/home.js"))
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
    onLoad: function (from,go) {
        layer_.close(root.beginLoadLayer);
    },
    onBegin: function () {

        // 如果 微信里面 openid 存在 就自动登录
        //if (localStorage.getItem('openid') != null) {
        //    var openid = localStorage.getItem('openid');
        //    avalon.ajax({
        //        url: root.IPLocation + '/checkOpenId/login.json',
        //        data: {openId:openid},
        //        dataType: 'jsonp',
        //        cache: false
        //    }).done(function (data) {
        //        if (data.result == true) {
        //            localStorage.setItem('userData', data.t);
        //            var userData = eval('(' + data.t + ')');
        //            localStorage.setItem('token', userData.token);
        //        }
        //    });
        //}

        layer_.closeAll();
        root.beginLoadLayer = layer_.open({type: 2, content: '加载测试中…'});
    },
    onViewEnter: function (newNode, oldNode) {
    } // 不建议使用动画，因此实际使用的时候，最好去掉onViewEnter和ms-view元素上的oni-mmRouter-slide

});
avalon.router.error(function () {
    avalon.router.navigate('home')
});
avalon.history.start({
    fireAnchor: false
});
//开始扫描编译
avalon.scan();
