/**
 * Created by LMG on 2016/12/5.
 */
define(["jquery",'cookie','../../css/payStatus.scss'], function ($,cookie) {
    var root = avalon.vmodels.root;
    var payStatus = avalon.define({
        $id: "payStatus",
        payResult: ''
    });
    return avalon.controller(function ($ctrl) {

        $ctrl.$onEnter = function (param) {
            payStatus.payResult = param.status;
        };
        $ctrl.$onRendered = function () {
        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [payStatus];
    });
});