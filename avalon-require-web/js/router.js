/**
 * Created by flyjennyetn on 2016/2/1.
 */
define(["avalon", "mmState","mmRequest","jquery","layer_"], function(avalon,mmState,mmRequest,$,layer_) {

    // 定义一个顶层的vmodel，用来放置全局共享数据
    var root = avalon.define({
        $id: "root",
        page:"",
        userInfo:null,
        menuState:null,
        cathetMenu:null,
        ticklingLayer:null,
        // 开发
        imgAddress : 'http://*.*.*.*/01image/',//图片服务器地址
        IPLocation : 'http://*.*.*.*/cms/',//后台服务接口地址
        sendURL : "http://*.*.*.*/bzpt/",//登陆地址
        teacherSendURL:"http://*.*.*.*/tredu/"//老师登陆地址
        ,getJsonData : function(url,param,callback){
            var loadScore = layer_.load(1,{shade: [0.8,'#393D49']});
            $.ajax({
                type: 'get',
                url:root.IPLocation+url,
                data: param,
                dataType:"jsonp",
                jsonp: "callback",
                context: this,
                success:function(data) {
                    layer_.close(loadScore);
                    if(data.result == true){
                        callback(data.t);
                    }else{
                        layer_.alert(data.msg);
                    }
                }
            });
        }
    });

    avalon.state("app", {
        url: "/",
        abstract: true, // 抽象状态，不会对应到url上
        views: {
            "": {
                templateProvider:function(){
                    return new Promise(function (rs, rj) {
                        requirejs(["text!views/header/header.html"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                },
                controllerProvider: function() {
                    return new Promise(function (rs, rj) {
                        requirejs(["views/header/header.js"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                }
            },
            "footer@": {
                templateProvider:function(){
                    return new Promise(function (rs, rj) {
                        requirejs(["text!views/footer/footer.html"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                },
                controllerProvider: function() {
                    return new Promise(function (rs, rj) {
                        requirejs(["views/footer/footer.js"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                }
            },
            "common@": {
                templateProvider:function(){
                    return new Promise(function (rs, rj) {
                        requirejs(["text!views/common/common.html"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                },
                controllerProvider: function() {
                    return new Promise(function (rs, rj) {
                        requirejs(["views/common/common.js"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                }
            },
            "courseLine@": {
                templateProvider:function(){
                    return new Promise(function (rs, rj) {
                        requirejs(["text!views/course/courseLine.html"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                },
                controllerProvider: function() {
                    return new Promise(function (rs, rj) {
                        requirejs(["views/course/courseLine.js"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                }
            },
            "subjectList@": {
                templateProvider:function(){
                    return new Promise(function (rs, rj) {
                        requirejs(["text!views/subject/subjectList.html"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                },
                controllerProvider: function() {
                    return new Promise(function (rs, rj) {
                        requirejs(["views/subject/subjectList.js"], function ($ctrl) {
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
                templateProvider:function(){
                    return new Promise(function (rs, rj) {
                        requirejs(["text!views/home/home.html"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                },
                controllerProvider: function() {
                    return new Promise(function (rs, rj) {
                        requirejs(["views/home/home.js"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                }
            }
        }
    }).state("app.home.zi", {
        url: "/zi",
        views: {
            "": {
                templateProvider:function(){
                    return new Promise(function (rs, rj) {
                        requirejs(["text!views/home/homezi.html"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                },
                controllerProvider: function() {
                    return new Promise(function (rs, rj) {
                        requirejs(["views/home/homezi.js"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                }
            }
        }
    }).state("app.home.zi2", {
        url: "/zi2",
        views: {
            "": {
                templateProvider:function(){
                    return new Promise(function (rs, rj) {
                        requirejs(["text!views/home/homezi2.html"], function ($ctrl) {
                            rs($ctrl)
                        })
                    })
                },
                controllerProvider: function() {
                    return new Promise(function (rs, rj) {
                        requirejs(["views/home/homezi2.js"], function ($ctrl) {
                            rs($ctrl)
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
        onError: function () {},
        onLoad: function() {
        },
        onBegin: function () {},
        onViewEnter: function (newNode, oldNode) { } // 不建议使用动画，因此实际使用的时候，最好去掉onViewEnter和ms-view元素上的oni-mmRouter-slide

    });
    avalon.router.error(function() {
        avalon.router.navigate('home')
    });
    avalon.history.start({
        fireAnchor: false
    });
    //开始扫描编译
    avalon.scan();
})