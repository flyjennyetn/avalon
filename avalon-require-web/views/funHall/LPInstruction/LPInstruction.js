/**
 * Created by Alex on 2016/10/14.
 */
define(["style!../../../css/LPInstruction"], function() {
    var roots= avalon.vmodels.root;
    var LPInstruction = avalon.define({
        $id: "LPInstruction"
    });

    return avalon.controller(function($ctrl) {
        // 进入视图
        $ctrl.$onEnter = function() {
            $('body,html').animate({scrollTop: 0}, 200);
            roots.headState = "funHall";
        };
        // 视图渲染后，意思是avalon.scan完成
        $ctrl.$onRendered = function() {
        };
        // 对应的视图销毁前
        $ctrl.$onBeforeUnload = function() {

        };
        // 指定一个avalon.scan视图的vmodels，vmodels = $ctrl.$vmodels.concact(DOM树上下文vmodels)
        $ctrl.$vmodels = [LPInstruction];
    });
});