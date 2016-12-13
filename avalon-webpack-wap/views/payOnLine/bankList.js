/**
 * Created by LMG on 2016/12/5.
 */
define(["jquery",'cookie','../../css/bankList.scss'], function ($,cookie) {
    var root = avalon.vmodels.root;
    var bankList = avalon.define({
        $id: "bankList"
    });
    return avalon.controller(function ($ctrl) {
        $ctrl.$onEnter = function () {
        };
        $ctrl.$onRendered = function () {
        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [bankList];
    });
});