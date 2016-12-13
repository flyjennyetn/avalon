/**
 * Created by flyjennyetn on 2016/2/1.
 */
/*scss*/
require("./bootstrap/css/bootstrap.css");  //布局用
require("./fontAwesome/css/font-awesome.css"); //图标
require("./ace/ace.min.css"); //网站样式
require("./ace/ace-skins.min.css"); //网站样式
require("./ace/ace-rtl.min.css"); //网站样式
require("./layer/skin/layer.css"); //弹层插件
require("./laydate/need/laydate.css"); //时间css
require("./laydate/skins/default/laydate.css");//时间css

/*js*/
var jquery = require('./jquery/jquery-2.0.3.min');
require('./bootstrap/js/bootstrap');
require('./ace/ace-extra.min');
require('./ace/ace-elements.min');
require('./ace/ace.min');

var layer_ = require('./layer/layer');
var avalon = require('./avalon/avalon.modern.shim');
var getModel = require('./avalon/mmRouter/avalon.getModel.js');
require("./avalon/mmRouter/mmRequest");
require("./avalon/mmRouter/mmPromise");
require("./avalon/mmRouter/mmHistory");
require("./avalon/mmRouter/mmRouter");
require("./avalon/mmRouter/mmState");
avalon.config({
    debug: false
})

// 定义一个顶层的vmodel，用来放置全局共享数据
var root = avalon.define({
    $id: "root",
    loginState:false,
    userInfo: {},
    // 开发
    //baiduCount:false,
    //imgAddress: 'http://*.*.*.*/eqbImage/',//图片服务器地址
    //IPLocation: 'http://*.*.*.*/eqb-insurance/',//后台服务接口地址
    //获取Ajax
    getJsonData: function (url, param, callback) {
        avalon.ajax({
            url: root.IPLocation + url,
            data: param,
            dataType: 'jsonp',
            cache: false
        }).done(function (data) {
            if (data.result == true) {
                callback(data.t);
            } else {
                alert(data.msg)
            }
        });
    },
    ChildData:[
        {
            name: "框架介绍", open: false,  icon: "icon-dashboard",myUrl:"#!/typography"
        },
        {
            name: "使用规范和示例", open: false, icon: "icon-dashboard",myUrl:"#!/list"
        },
        {
            name: "表单", open: false, icon: "icon-text-width",myUrl:"#!/form"
        },
        {
            name: "其他例子", open: false, icon: "icon-double-angle-right",
            children: [
                {
                    name: "信息列表", myUrl:"#!/tableData"
                },
                {
                    name: "时间轴", myUrl:"#!/timeline"
                },
                {
                    name: "文件上传",myUrl:"#!/dropzone"
                },
                {
                    name: "相册",myUrl:"#!/gallery"
                },
                {
                    name: "信件",myUrl:"#!/inbox"
                },
                {
                    name: "表格",myUrl:"#!/tables"
                },
                {
                    name: "向导验证",myUrl:"#!/formWizard"
                },
                {
                    name: "图表统计",myUrl:"#!/chart"
                },
                {
                    name: "404错误页面",myUrl:"#!/error404"
                },
                {
                    name: "500错误页面",myUrl:"#!/error505"
                },
                {
                    name: "三级菜单",
                    children:[
                        {name: "三级菜单1"},
                        {name: "三级菜单2"}
                    ]
                }
            ]
        },
        {
            name: "系统管理", open: false, icon: "icon-double-angle-right",
            children: [
                {
                    name: "后台管理", open: false, myUrl:"#!/backstageManage"
                },
                {
                    name: "菜单管理", open: false, myUrl: "#!/menuManage"
                },
                {
                    name: "用户管理", open: false, myUrl: "#!/userManage"
                },
                {
                    name: "修改密码", open: false, myUrl: "#!/changePwd"
                }
            ]
        }
    ]

});

avalon.state("login", {
    url: "/login",
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
}).state("app", {
    url: "/",
    abstract: true,
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/main/main.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/main/main.js"))
                    })
                })
            }
        },
        "header@": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/main/header.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/main/header.js"))
                    })
                })
            }
        }
    }
}).state("app.typography", {
    url: "typography",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/typography/typography.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/typography/typography.js"))
                    })
                })
            }
        }

    }
}).state("app.form", {
    url: "form",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/example/form.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/example/form.js"))
                    })
                })
            }
        }

    }
}).state("app.list", {
    url: "list",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/example/list.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/example/list.js"))
                    })
                })
            }
        }
    }
}).state("app.timeline", {
    url: "timeline",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/example/timeline.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/example/timeline.js"))
                    })
                })
            }
        }
    }
}).state("app.inbox", {
    url: "inbox",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/example/inbox.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/example/inbox.js"))
                    })
                })
            }
        }
    }
}).state("app.gallery", {
    url: "gallery",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/example/gallery.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/example/gallery.js"))
                    })
                })
            }
        }
    }
}).state("app.tables", {
    url: "tables",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/example/tables.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/example/tables.js"))
                    })
                })
            }
        }
    }
}).state("app.formWizard", {
    url: "formWizard",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/example/formWizard.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/example/formWizard.js"))
                    })
                })
            }
        }
    }
}).state("app.chart", {
    url: "chart",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/example/chart.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/example/chart.js"))
                    })
                })
            }
        }
    }
}).state("app.dropzone", {
    url: "dropzone",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/example/dropzone.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/example/dropzone.js"))
                    })
                })
            }
        }
    }
}).state("app.error404", {
    url: "error404",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/example/error404.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/example/error404.js"))
                    })
                })
            }
        }
    }
}).state("app.error505", {
    url: "error505",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/example/error505.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/example/error505.js"))
                    })
                })
            }
        }
    }
}).state("app.inputData", {
    url: "inputData",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/example/inputData.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/example/inputData.js"))
                    })
                })
            }
        }
    }
}).state("app.tableData", {
    url: "tableData",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/example/tableData.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/example/tableData.js"))
                    })
                })
            }
        }
    }
}).state("app.backstageManage", {
    url: "backstageManage",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/example/backstageManage.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/example/backstageManage.js"))
                    })
                })
            }
        }
    }
}).state("app.changePwd", {
    url: "changePwd",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/example/changePwd.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/example/changePwd.js"))
                    })
                })
            }
        }
    }
}).state("app.userManage", {
    url: "userManage",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/example/userManage.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/example/userManage.js"))
                    })
                })
            }
        }
    }
}).state("app.menuManage", {
    url: "menuManage",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/example/menuManage.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/example/menuManage.js"))
                    })
                })
            }
        }
    }
}).state("app.update", {
    url: "update/{i}",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/example/update.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/example/update.js"))
                    })
                })
            }
        }
    }
}).state("app.addUser", {
    url: "addUser",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/example/addUser.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/example/addUser.js"))
                    })
                })
            }
        }
    }
}).state("app.jqGrid", {
    url: "jqGrid",
    views: {
        "": {
            templateProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function (tt) {
                        rs(require("text!./../views/example/jqGrid.html"))
                    })
                })
            },
            controllerProvider: function () {
                return new Promise(function (rs) {
                    require.ensure([], function () {
                        rs(require("./../views/example/jqGrid.js"))
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
        if(go.stateName == 'login'){
            root.loginState = false;
        }else{
            root.loginState = true;
        }
    },
    onViewEnter: function (newNode, oldNode) {
    } // 不建议使用动画，因此实际使用的时候，最好去掉onViewEnter和ms-view元素上的oni-mmRouter-slide

});
avalon.router.error(function () {
    avalon.router.navigate('typography')
});
avalon.history.start({
    fireAnchor: false
});
//开始扫描编译
avalon.scan();
