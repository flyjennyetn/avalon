/**
 * Created by flyjennyetn on 2016/1/12.
 */
define(['jquery',"style!../../css/header"], function ($) {
    var roots= avalon.vmodels.root;
    var header = avalon.define({
        $id: "header",
        tabIcon:function(){
            roots.headState = "vipCenter";
            if(roots.loginState){
                //location.href = roots.Location + '/user/#!/userCenter/myCenter/0';
                location.href = 'http://180.168.96.36:8888/user/#!/userCenter/myCenter/0';
            } else {
                layer.confirm('请您先进行用户登录！', {
                    btn: '去登录' //按钮
                }, function(){
                    //location.href = roots.Location + '/user/#!/login';
                    location.href = 'http://180.168.96.36:8888/user/#!/login';
                    layer.closeAll();
                });
            }
        },
        exitSystem: function(){//退出登录
            roots.getJsonDatas(
                "/login/exit",
                {
                    "regCode": roots.userInfo.regCode
                },
                function(data){
                    if(data.resultCode == 10){
                        $.cookie('userInfo', '');
                        roots.loginState = false;
                        location.href = '#!/home';
                    }
                },false
            );
        }
    });


    return avalon.controller(function ($ctrl) {

        $ctrl.$onRendered = function () {

        };
        $ctrl.$onEnter = function () {

        };
        // 对应的视图销毁前
        $ctrl.$onBeforeUnload = function () {
        };
        // 指定一个avalon.scan视图的vmodels，vmodels = $ctrl.$vmodels.concact(DOM树上下文vmodels)
        $ctrl.$vmodels = [header];
    });
});
