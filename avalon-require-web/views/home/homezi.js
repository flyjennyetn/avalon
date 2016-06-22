/**
 * Created by flyjennyetn on 2016/4/6.
 */
define(['jquery','layer_','glide','slide'], function ($,layer_,glide,slide) {
    // 定义所有相关的vmodel
    var homezi = avalon.define({
        $id: "homezi",
        aaaa:"qqqqqqqqq"
    });



    return avalon.controller(function ($ctrl) {
        // 视图渲染后，意思是avalon.scan完成
        $ctrl.$onRendered = function () {
        };
        // 进入视图
        $ctrl.$onEnter = function (param, rs, rj) {
            console.log(111);

        };
        // 对应的视图销毁前
        $ctrl.$onBeforeUnload = function () {};
        $ctrl.$vmodels = [homezi];
    })

});

