/**
 * Created by flyjennyetn on 2016/2/1.
 */
/*scss*/
require("./../css/app.scss");
require("./../css/normalize.scss");
require("./../css/public.scss");
require("./swiper/swiper.min.scss");
/*插件scss*/
require("css!./layer/need/layer.css");
//require("css!./dropload/dropload.css");
/*js*/
var jquery = require('./jquery/jquery.min.js');
var layer_ = require('./layer/layer.js');
var avalon = require('./avalon/avalon.mobile.shim.js'); //在正常情况下我们以CommonJS风格引用avalon,以require('avalon')
//var drag = require('./avalon/touch.drag');
var getModel = require('./avalon/avalon.getModel.js');
require("./avalon/mmRequest");
require("./avalon/mmPromise");
require("./avalon/mmHistory");
require("./avalon/mmRouter");
require("./avalon/mmState");
require('./filter/myFilter.js');
require('./filter/commonUtil.js');
avalon.config({
    debug: false
});

// 定义一个顶层的vmodel，用来放置全局共享数据
var root = avalon.define({
        $id: "root",
        page: "",
        directoryState: "",
        activeStatus: '',//菜单状态
        isLogin: '',//登录状态
        userInfo: null,
        grade: null,
        menuStatus: false,
        menuState: null,
        cathetMenu: null,
        ticklingLayer: null,
        beginLoadLayer: null,
        hiddenState: true,
        baiduCount: false, //百度统计
        developState: true,     // 开发状态
        imgAddress: 'http://****/01image/',//图片服务器地址
        IPLocation: 'http://****/jkds', //后台服务接口地址
        IPLocationPay: 'http://****/isp', //支付后台服务接口地址
        payURL: "http://****/accounting/web/unifiedorder",//支付地址  测试地址
        pSuccessUrl: "http://****/jkbx/shop/%23!/paySuccess",//个险支付回调地址
        key: 'MiN2SHeNg0DiAnS1S6Tb', /* 数据加密解密begin */
        encryptByDES: function (message, key) {  //  加密处理
            var keyHex = CryptoJS.enc.Utf8.parse(key);
            var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            return encrypted.toString();
        },
        //   不显示遮罩层
        getJsonDatas: function (url, param, callback, state,salesChannel) {
            if (state) {
                infoData = root.encryptByDES(param, root.key).replace(/\+/g, '%2B');
            }
            if(salesChannel){
                var infoData = {
                    'header': {
                        "salesChannel": salesChannel
                    },
                    "info": param
                };
            }else{
                var infoData = {
                    'header': {
                        "salesChannel": "sc-02"
                    },
                    "info": param
                };
            }
            //   将请求参数转换为字符串
            infoData = 'header=' + JSON.stringify(infoData.header) + '&' + 'info=' + JSON.stringify(infoData.info);
            $.ajax({
                type: 'get',
                url: root.IPLocation + url,
                data: infoData,
                dataType: "jsonp",
                jsonp: "callback",
                context: this,
                success: function (data) {
                    if (data.resultCode == '10') {
                        if (data.result) {
                            callback(data.result);
                        } else {
                            callback(data);
                        }
                    } else {
                        layer_.alert(data.resultMsg);
                    }
                }
            });
        },
        getJsonPayDatas: function (url, param, callback, state,salesChannel) {
            if (state) {
                infoData = root.encryptByDES(param, root.key).replace(/\+/g, '%2B');
            }
            if(salesChannel){
                var infoData = {
                    'header': {
                        "salesChannel": salesChannel
                    },
                    "info": param
                };
            }else{
                var infoData = {
                    'header': {
                        "salesChannel": "sc-02"
                    },
                    "info": param
                };
            }
            //   将请求参数转换为字符串
            infoData = 'header=' + JSON.stringify(infoData.header) + '&' + 'info=' + JSON.stringify(infoData.info);
            $.ajax({
                type: 'get',
                url: root.IPLocationPay + url,
                data: infoData,
                dataType: "jsonp",
                jsonp: "callback",
                context: this,
                success: function (data) {
                    if (data.resultCode == '10') {
                        if (data.result) {
                            callback(data.result);
                        } else {
                            callback(data);
                        }
                    } else {
                        layer_.alert(data.resultMsg);
                    }
                }
            });
        },
        getJsonData: function (url, param, callback, state,salesChannel) {
            if (state) {
                infoData = root.encryptByDES(param, root.key).replace(/\+/g, '%2B');
            }
            if(salesChannel){
                var infoData = {
                    'header': {
                        "salesChannel": salesChannel
                    },
                    "info": param
                };
            }else{
                var infoData = {
                    'header': {
                        "salesChannel": "sc-02"
                    },
                    "info": param
                };
            }
            //   将请求参数转换为字符串
            infoData = 'header=' + JSON.stringify(infoData.header) + '&' + 'info=' + JSON.stringify(infoData.info);
            var loadScore = layer_.open({type: 2, content: '加载测试中…'});
            $.ajax({
                type: 'get',
                url: root.IPLocation + url,
                data: infoData,
                dataType: "jsonp",
                jsonp: "callback",
                context: this,
                success: function (data) {
                    layer_.close(loadScore);
                    if (data.resultCode == '10') {
                        if (data.result) {
                            callback(data.result);
                        } else {
                            callback(data);
                        }
                    } else {
                        root.hint(data.resultMsg);
                    }
                }
            });
        },
        alert: function (str, btn, fun) {  //询问框
            layer.open({
                content: str,
                skin: 'msg',
                btn: [btn],
                yes: fun
            })
        },
        hint: function (str) {  //两秒提示框
            layer.open({
                content: str,
                skin: 'msg',
                time: 2 //2秒后自动关闭
            })
        },
        loginStatus: function(){
            if(!root.isLogin){
                localStorage.setItem('goUrl',window.location.href);
                root.alert('请您先进行用户登录！', '去登录', function () {
                    location.href = '#!/login';
                    layer.closeAll();
                });
                return false;
            }else{
                return true;
            }
        }
    }
);

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
        }
    }
}).state("app.login", {    //登录
    url: "login",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/login/login.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/login/login.js"))
                    })
                })
            }
        }
    }
}).state("app.register", {    //注册
    url: "register",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/register/register.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/register/register.js"))
                    })
                })
            }
        }
    }
}).state("app.registerPro", {    //注册协议
    url: "registerPro",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/registerPro/registerPro.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/registerPro/registerPro.js"))
                    })
                })
            }
        }
    }
}).state("app.pwdFind", {//忘记密码
    url: "pwdFind",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/pwdFind/pwdFind.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/pwdFind/pwdFind.js"))
                    })
                })
            }
        }
    }
}).state("app.pwdChange", {//重置密码
    url: "pwdChange/{userName}",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/pwdChange/pwdChange.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/pwdChange/pwdChange.js"))
                    })
                })
            }
        }
    }
}).state("app.lcList", {//理财产品列表页
    url: "lcList",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/lcList/lcList.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/lcList/lcList.js"))
                    })
                })
            }
        }
    }
}).state("app.lcProDetail", {//理财产品详情页
    url: "lcProDetail/{productId}",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/lcList/lcProDetail.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/lcList/lcProDetail.js"))
                    })
                })
            }
        }
    }
}).state("app.hotProductList", {    //热销产品列表页
    url: "hotProductList",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/hotProductList/hotProductList.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/hotProductList/hotProductList.js"))
                    })
                })
            }
        }
    }
}).state("app.healthInsure", {    //健康产品列表页
    url: "healthInsure",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/healthInsure/healthInsure.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/healthInsure/healthInsure.js"))
                    })
                })
            }
        }
    }
}).state("app.accidentInsure", {    //意外产品列表页
    url: "accidentInsure",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/accidentInsure/accidentInsure.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/accidentInsure/accidentInsure.js"))
                    })
                })
            }
        }
    }
}).state("app.insuredDetail", {    //保障类产品详情页
    url: "insuredDetail/{productId}",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/insuredDetail/insuredDetail.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/insuredDetail/insuredDetail.js"))
                    })
                })
            }
        }
    }
}).state("app.healthTold", {    //保障类产品详情页
    url: "healthTold/{productId}/{parameters}/{premiums}",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/healthTold/healthTold.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/healthTold/healthTold.js"))
                    })
                })
            }
        }
    }
}).state("app.showDetail", {    //保障类产品详情展示
    url: "showDetail",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/showDetail/showDetail.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/showDetail/showDetail.js"))
                    })
                })
            }
        }
    }
}).state("app.assessment", {    //健康测评
    url: "assessment",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/assessment/assessment.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/assessment/assessment.js"))
                    })
                })
            }
        }
    }
}).state("app.article", {    //聚焦健康
    url: "article",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/article/article.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/article/article.js"))
                    })
                })
            }
        }
    }
}).state("app.orderList", {    //订单列表
    url: "orderList",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/orderList/orderList.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/orderList/orderList.js"))
                    })
                })
            }
        }
    }
}).state("app.orderDetail", {    //订单详情
    url: "orderDetail/{orderId}",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/orderDetail/orderDetail.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/orderDetail/orderDetail.js"))
                    })
                })
            }
        }
    }
}).state("app.policyList", {    //订单列表
    url: "policyList",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/policyList/policyList.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/policyList/policyList.js"))
                    })
                })
            }
        }
    }
}).state("app.policyDetail", {
    url: "policyDetail/{policyNo}",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/policyDetail/policyDetail.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/policyDetail/policyDetail.js"))
                    })
                })
            }
        }
    }
}).state("app.policyCancel",{           //保单信息确认
    url: "policyCancel/{policyNo}/{mobile}",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/policyCancel/policyCancel.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/policyCancel/policyCancel.js"))
                    })
                })
            }
        }
    }
}).state("app.userInfo",{           //用户信息确认
    url: "userInfo/{policyNo}/{mobile}",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/policyCancel/userInfo.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/policyCancel/userInfo.js"))
                    })
                })
            }
        }
    }
}).state("app.phone",{              //手机验证码校验
    url: "phone/{policyNo}/{mobile}",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/policyCancel/phone.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/policyCancel/phone.js"))
                    })
                })
            }
        }
    }
}).state("app.result",{             //退保结果
    url: "result/{policyNo}/{mobile}",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/policyCancel/result.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/policyCancel/result.js"))
                    })
                })
            }
        }
    }
}).state("app.customer",{           //客户须知
    url: "customer",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/customer/customer.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/customer/customer.js"))
                    })
                })
            }
        }
    }
}).state("app.inputInfo", {    //核保录入页面
    url: "inputInfo/{productId}/{parameters}/{premiums}",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/inputInfo/inputInfo.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/inputInfo/inputInfo.js"))
                    })
                })
            }
        }
    }
}).state("app.finInputInfo", {    //核保录入页面
    url: "finInputInfo/{productId}/{premiums}",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/finInputInfo/finInputInfo.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/finInputInfo/finInputInfo.js"))
                    })
                })
            }
        }
    }
}).state("app.payResult", {    //支付结果
    url: "payResult",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/payResult/payResult.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/payResult/payResult.js"))
                    })
                })
            }
        }
    }
}).state("app.certification", {    //实名认证
    url: "certification",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/certification/certification.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/certification/certification.js"))
                    })
                })
            }
        }
    }
}).state("app.success", {    //实名认证第二步
    url: "success",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/certification/success.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/certification/success.js"))
                    })
                })
            }
        }
    }
}).state("app.confirmInfo", {    //购买确认
    url: "confirmInfo/{orderId}/{productType}",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/confirmInfo/confirmInfo.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/confirmInfo/confirmInfo.js"))
                    })
                })
            }
        }
    }
}).state("app.myIncome", {    //我的收益
    url: "myIncome",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/myIncome/myIncome.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/myIncome/myIncome.js"))
                    })
                })
            }
        }
    }
}).state("app.myIncomeD", {    //我的收益明细
    url: "myIncomeD/{policyNo}/{productName}/{totalIncome}",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/myIncomeD/myIncomeD.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/myIncomeD/myIncomeD.js"))
                    })
                })
            }
        }
    }
}).state("app.active", {    //活动
    url: "active",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/active/active.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/active/active.js"))
                    })
                })
            }
        }
    }
}).state("app.activeForFri", {    //活动给好友
    url: "activeForFri",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/activeForFri/activeForFri.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/activeForFri/activeForFri.js"))
                    })
                })
            }
        }
    }
}).state("app.aboutUs", {    //活动给好友
    url: "aboutUs",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/aboutUs/aboutUs.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/aboutUs/aboutUs.js"))
                    })
                })
            }
        }
    }
}).state("app.payOnLine", {    //在线支付
    url: "payOnLine/{orderId}",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/payOnLine/payOnLine.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/payOnLine/payOnLine.js"))
                    })
                })
            }
        }
    }
}).state("app.payStatus", {
    url: "payStatus/{status}",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/payOnLine/payStatus.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/payOnLine/payStatus.js"))
                    })
                })
            }
        }
    }
}).state("app.bankList", {
    url: "bankList",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/payOnLine/bankList.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/payOnLine/bankList.js"))
                    })
                })
            }
        }
    }
}).state("app.impState", {
    url: "impState",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/payOnLine/impState.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/payOnLine/impState.js"))
                    })
                })
            }
        }
    }
})
    /************************************  多利产品 路由起*************************************/
        .state("app.inputInfoDL", {    //多利信息填写页
            url: "inputInfoDL/{productId}/{share}",
            views: {
                "": {
                    templateProvider: function () {
                        return new Promise(function (rs) {
                            require.ensure([], function (tt) {
                                rs(require("text!./../views/ADLProduct/inputInfoDL/inputInfoDL.html"))
                            })
                        })
                    },
                    controllerProvider: function () {
                        return new Promise(function (rs) {
                            require.ensure([], function () {
                                rs(require("./../views/ADLProduct/inputInfoDL/inputInfoDL.js"))
                            })
                        })
                    }
                }
            }
        })  .state("app.inputInfoDL", {    //多利信息填写页
            url: "confirmation/{orderId}",
            views: {
                "": {
                    templateProvider: function () {
                        return new Promise(function (rs) {
                            require.ensure([], function (tt) {
                                rs(require("text!./../views/ADLProduct/inputInfoDL/confirmation.html"))
                            })
                        })
                    },
                    controllerProvider: function () {
                        return new Promise(function (rs) {
                            require.ensure([], function () {
                                rs(require("./../views/ADLProduct/inputInfoDL/confirmation.js"))
                            })
                        })
                    }
                }
            }
        }).state("app.proDetailDL", {
        url: "proDetailDL/{productId}",
        views: {
            "": {
                templateProvider: function () {
                    return new Promise(function (rs) {
                        require.ensure([], function (tt) {
                            rs(require("text!./../views/ADLProduct/proDetailDL/proDetailDL.html"))
                        })
                    })
                },
                controllerProvider: function () {
                    return new Promise(function (rs) {
                        require.ensure([], function () {
                            rs(require("./../views/ADLProduct/proDetailDL/proDetailDL.js"))
                        })
                    })
                }
            }
        }
    }).state("app.healthTold", {
        url: "healthTold/{orderId}",
        views: {
            "": {
                templateProvider: function () {
                    return new Promise(function (rs) {
                        require.ensure([], function (tt) {
                            rs(require("text!./../views/ADLProduct/healthTold/healthTold.html"))
                        })
                    })
                },
                controllerProvider: function () {
                    return new Promise(function (rs) {
                        require.ensure([], function () {
                            rs(require("./../views/ADLProduct/healthTold/healthTold.js"))
                        })
                    })
                }
            }
        }
    }).state("app.healthTold", {
        url: "tipBook",
        views: {
            "": {
                templateProvider: function () {
                    return new Promise(function (rs) {
                        require.ensure([], function (tt) {
                            rs(require("text!./../views/ADLProduct/tipBook/tipBook.html"))
                        })
                    })
                },
                controllerProvider: function () {
                    return new Promise(function (rs) {
                        require.ensure([], function () {
                            rs(require("./../views/ADLProduct/tipBook/tipBook.js"))
                        })
                    })
                }
            }
        }
    }).state("app.proDetailImg", {
        url: "proDetailImg",
        views: {
            "": {
                templateProvider: function () {
                    return new Promise(function (rs) {
                        require.ensure([], function (tt) {
                            rs(require("text!./../views/ADLProduct/proDetailImg/proDetailImg.html"))
                        })
                    })
                },
                controllerProvider: function () {
                    return new Promise(function (rs) {
                        require.ensure([], function () {
                            rs(require("./../views/ADLProduct/proDetailImg/proDetailImg.js"))
                        })
                    })
                }
            }
        }
    });
    /**************************************多利产品 路由至***********************************/

/**
 * 路由全局配置
 */
avalon.state.config({
    onError: function () {
    },
    onLoad: function (from, go) {
        layer_.close(root.beginLoadLayer);
    },
    onBegin: function (from, go) {
        root.beginLoadLayer = layer_.open({type: 2, content: '加载测试中…'});
        if (go.path == '/hotProductList' || go.path == '/lcList' || go.path == '/healthInsure' || go.path == '/accidentInsure') {
            root.menuStatus = true;
        } else {
            root.menuStatus = false;
        }
        //if(localStorage.getItem('wxds_openid') && !localStorage.getItem('userInfo')){
        if (localStorage.getItem('wxds_openid')) {
            root.getJsonData('/thirdLogin/isLogin',
                {
                    "thirdId": localStorage.getItem('wxds_openid')
                },
                function (data) {
                    if (data.loginStatus == 0) {
                        localStorage.setItem('userInfo', JSON.stringify(data));
                        root.isLogin = true;
                    } else {
                        root.isLogin = false;
                    }
                }, false
            );
        }
    },
    onViewEnter: function (newNode, oldNode) {
    } // 不建议使用动画，因此实际使用的时候，最好去掉onViewEnter和ms-view元素上的oni-mmRouter-slide

});
avalon.router.error(function () {
    avalon.router.navigate('hotProductList');
});
avalon.history.start({
    fireAnchor: false
});
//开始扫描编译
avalon.scan();
