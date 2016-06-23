/**
 * Created by flyjennyetn on 2016/6/22.
 */
define(['avalon'], function(avalon) {
    var test1 = avalon.define({
        $id: "test1"
    })



    return avalon.controller(function($ctrl) {
        // 对应的视图销毁前
        $ctrl.$onBeforeUnload = function() {

        }
        // 进入视图
        $ctrl.$onEnter = function(params, rs) {
            console.log(test1)
        }
        // 视图渲染后，意思是avalon.scan完成
        $ctrl.$onRendered = function() {}
        // 指定一个avalon.scan视图的vmodels，vmodels = $ctrl.$vmodels.concact(DOM树上下文vmodels)
        $ctrl.$vmodels = [test1]
    })
})