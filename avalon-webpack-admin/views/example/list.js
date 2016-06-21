/**
 * Created by flyjennyetn on 2016/5/23.
 */
define(['layer_'], function (layer_) {
    var list = avalon.define({
        $id: "list",
        bind_event:"", //双向绑定
        getProductList: [], //存放循环数组

        //点击事件
        click_btn:function(){
            layer_.alert("我是点击触发的弹窗");
            var root = avalon.vmodels.root;
            root.getJsonData('productTypes/getProductList', {}, function (datas) {
                //接口调成功之后要执行的方法，在这里定义
            })
        },



    });


    return avalon.controller(function ($ctrl) {
     // 进入视图
        $ctrl.$onEnter = function (param, rs, rj) {
            //进入视图就调用的接口，不用事件触发
            var root = avalon.vmodels.root;
            //root.getJsonData('productTypes/getProductList', {}, function (datas) {
            //    //接口调成功之后要执行的方法，在这里定义
            //})
        };
        $ctrl.$onRendered = function () {
        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [list];
    });
})