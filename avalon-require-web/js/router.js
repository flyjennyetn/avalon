/**
 * Created by flyjennyetn on 2016/2/1.
 */
define(["jquery", "layer_", "avalon", 'cookie', "mmState", 'style!../css/global'], function ($, layer_, avalon, JQcookie) {

    // 定义一个顶层的vmodel，用来放置全局共享数据
    var root = avalon.define({
        $id: "root",
        headState: "",  //head产品类型状态
        nickName: '',//昵称
        loginState: false,//登录状态
        userInfo: null,//存放用户信息
        //上海测试服务器地址
        IPLocation: 'http://******/jkgw/', //后台服务接口地址
        Location: 'http://******',
        IPLocationFun: 'http://******/jkds', //后台服务接口地址   功能大厅
        imgAddress: 'http://******/jkgwimage/', //图片服务器地址

        getJsonData: function (url, param, callback) {
            var loadScore = layer_.load(1, {shade: [0.8, '#393D49']});
            $.ajax({
                type: 'get',
                url: root.IPLocation + url,
                data: param,
                dataType: "jsonp",
                jsonp: "callback",
                context: this,
                success: function (data) {
                    layer_.close(loadScore);
                    if (data.result) {
                        callback(data.t);
                    } else {
                        layer_.alert(data.resultMsg);
                    }
                }
            });
        },
        getJsonDatas: function (url, param, callback, state) {
            if (state) {
                infoData = root.encryptByDES(param, root.key).replace(/\+/g, '%2B');
            }
            var infoData = {
                'header': {
                    "salesChannel": "01"
                },
                "info": param
            };
            //   将请求参数转换为字符串
            infoData = 'header=' + JSON.stringify(infoData.header) + '&' + 'info=' + JSON.stringify(infoData.info);
            var loadScore = layer_.load(1, {shade: [0.8, '#393D49']});
            $.ajax({
                type: 'get',
                url: root.IPLocationFun + url,
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
                        layer_.alert(data.resultMsg);
                    }
                }
            });
        },
        getJsonFunData: function (url, param, callback) {  //功能大厅请求数据方法
            var loadScore = layer_.load(1, {shade: [0.8, '#393D49']});
            var info = JSON.stringify(param);
            $.ajax({
                type: 'get',
                url: root.IPLocationFun + url,
                data: "info=" + info,
                dataType: "jsonp",
                jsonp: "callback",
                context: this,
                success: function (data) {
                    layer_.close(loadScore);
                    if (data.result) {
                        callback(data.result);
                    } else {
                        layer_.alert(data.resultMsg);
                    }
                }
            });
        },
        //获取URl中的参数
        getUrlString: function (val) {
            var uri = window.location.href;
            var re = new RegExp("" + val + "=([^&?]*)", "ig");
            return ((uri.match(re)) ? (uri.match(re)[0].substr(val.length + 1)) : null);
        }
    });

    avalon.state("app", {
        url: "/",
        abstract: true, // 抽象状态，不会对应到url上
        views: {
            "": {
                templateProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["text!views/header/header.html"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                },
                controllerProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["views/header/header.js"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                }
            },
            "footer@": {
                templateProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["text!views/footer/footer.html"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                },
                controllerProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["views/footer/footer.js"], function ($ctrl) {
                            rs($ctrl)
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
                    return new Promise(function (rs, rj) {
                        requirejs(["text!views/home/home.html"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                },
                controllerProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["views/home/home.js"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                }
            }
        }
    }).state("app.newsC", {
        url: "newsC",
        views: {
            "": {
                templateProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["text!views/newsC/newsC.html"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                },
                controllerProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["views/newsC/newsC.js"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                }
            }
        }
    }).state("app.newsD", {
        url: "newsD/{articleId}/{folderId}",
        views: {
            "": {
                templateProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["text!views/newsC/newsD.html"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                },
                controllerProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["views/newsC/newsD.js"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                }
            }
        }
    }).state("app.inforDisc", {
        url: "inforDisc",
        views: {
            "": {
                templateProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["text!views/inforDisc/inforDisc.html"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                },
                controllerProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["views/inforDisc/inforDisc.js"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                }
            }
        }
    }).state("app.aboutUs", {
        url: "aboutUs/{num}",
        views: {
            "": {
                templateProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["text!views/aboutUs/aboutUs.html"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                },
                controllerProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["views/aboutUs/aboutUs.js"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                }
            }
        }
    }).state("app.joinUs", {
        url: "joinUs",
        views: {
            "": {
                templateProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["text!views/joinUs/joinUs.html"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                },
                controllerProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["views/joinUs/joinUs.js"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                }
            }
        }
    }).state("app.joinUs01", {
        url: "joinUs01/{name}",
        views: {
            "": {
                templateProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["text!views/joinUs/joinUs01.html"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                },
                controllerProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["views/joinUs/joinUs01.js"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                }
            }
        }
    }).state("app.inquire", {
        url: "inquire/{type}",
        views: {
            "": {
                templateProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["text!views/inquire/inquire.html"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                },
                controllerProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["views/inquire/inquire.js"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                }
            }
        }
    }).state("app.interest", {
        url: "interest",
        views: {
            "": {
                templateProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["text!views/funHall/interest/interest.html"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                },
                controllerProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["views/funHall/interest/interest.js"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                }
            }
        }
    }).state("app.myPolicy", {
        url: "myPolicy",
        views: {
            "": {
                templateProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["text!views/funHall/myPolicy/myPolicy.html"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                },
                controllerProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["views/funHall/myPolicy/myPolicy.js"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                }
            }
        }
    }).state("app.policyList", {                  //保单列表
        url: "policyList/{certiCode}/{name}/{codeNum}/{mobile}",
        views: {
            "": {
                templateProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["text!views/funHall/myPolicy/policyList.html"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                },
                controllerProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["views/funHall/myPolicy/policyList.js"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                }
            }
        }
    }).state("app.policyResult", {
        url: "policyResult/{policyId}/{submitChannel}",
        views: {
            "": {
                templateProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["text!views/funHall/myPolicy/policyResult.html"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                },
                controllerProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["views/funHall/myPolicy/policyResult.js"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                }
            }
        }
    }).state("app.LPInstruction", {
        url: "LPInstruction",
        views: {
            "": {
                templateProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["text!views/funHall/LPInstruction/LPInstruction.html"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                },
                controllerProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["views/funHall/LPInstruction/LPInstruction.js"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                }
            }
        }
    }).state("app.docDownload", {
        url: "docDownload",
        views: {
            "": {
                templateProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["text!views/funHall/docDownload/docDownload.html"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                },
                controllerProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["views/funHall/docDownload/docDownload.js"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                }
            }
        }
    }).state("app.compNotice", {
        url: "compNotice",
        views: {
            "": {
                templateProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["text!views/funHall/compNotice/compNotice.html"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                },
                controllerProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["views/funHall/compNotice/compNotice.js"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                }
            }
        }
    }).state("app.compNotiDeta", {
        url: "compNotiDeta/{codeType}/{codeId}/{policyId}",
        views: {
            "": {
                templateProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["text!views/funHall/compNotiDeta/compNotiDeta.html"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                },
                controllerProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["views/funHall/compNotiDeta/compNotiDeta.js"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                }
            }
        }
    }).state("app.funHall", {
        url: "funHall",
        views: {
            "": {
                templateProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["text!views/funHall/funHall.html"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                },
                controllerProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["views/funHall/funHall.js"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                }
            }
        }
    }).state("app.cancellation", {          //退保
        url: "cancellation/{policyId}/{payAccount}/{mobile}/{submitChannel}",
        views: {
            "": {
                templateProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["text!views/funHall/cancellation/cancellation.html"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                },
                controllerProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["views/funHall/cancellation/cancellation.js"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                }
            }
        }
    }).state("app.cancellResult", {          //退保结果页
        url: "cancellResult/{policyId}/{mobile}/{submitChannel}",
        views: {
            "": {
                templateProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["text!views/funHall/cancellation/cancellResult.html"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                },
                controllerProvider: function () {
                    return new Promise(function (rs, rj) {
                        requirejs(["views/funHall/cancellation/cancellResult.js"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                }
            }
        }
    });


    /**
     * 路由全局配置
     */
    avalon.state.config({
        onError: function () {
        },
        onLoad: function (from, go) {

        },
        onBegin: function (from, go) {
            if (from.path == undefined || from.path == "" || from.path == null) {
                var userId = root.getUrlString('userId');
                if (userId == undefined || userId == "" || userId == null) {
                    root.loginState = false;
                } else {
                    root.getJsonDatas(
                        "/login/noPwdLogin",//初始化查询用户基本信息
                        {
                            "regCode": userId
                        },
                        function (data) {
                            root.userInfo = data;
                            root.nickName = root.userInfo.nickName;
                            root.partyImgPath = root.userInfo.partyImgPath;
                            root.loginState = true;
                            $.cookie("userInfo", JSON.stringify(data));
                        },
                        false
                    );
                }
            }
            if ($.cookie('userInfo') == undefined || $.cookie('userInfo') == "" || $.cookie('userInfo') == null) {
                root.loginState = false;
            } else {
                root.userInfo = eval('(' + $.cookie('userInfo') + ')');
                root.nickName = root.userInfo.nickName;
                root.partyImgPath = root.userInfo.partyImgPath;
                root.loginState = true;
            }
        },
        onViewEnter: function (newNode, oldNode) {
        }

    });
    avalon.router.error(function () {
        avalon.router.navigate('home')
    });
    avalon.history.start({
        fireAnchor: false
    });
    //开始扫描编译
    avalon.scan();
});