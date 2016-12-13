/**
 * Created by TR on 2016/11/14.
 */
define(['../../css/payResult.scss'], function() {
    var root = avalon.vmodels.root;
    var payResult = avalon.define({
        $id: "payResult",
        shareStatus: false,
        shareFun:function(){
            payResult.shareStatus = !payResult.shareStatus;
        },
        unShareFun:function(){
            payResult.shareStatus = !payResult.shareStatus;
        }
    });

    return avalon.controller(function($ctrl) {
        $ctrl.$onEnter = function() {};
        $ctrl.$onRendered = function() {};
        $ctrl.$onBeforeUnload = function() {};
        $ctrl.$vmodels = [payResult];
    });
});