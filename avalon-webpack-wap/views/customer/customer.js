/**
 * Created by cui on 2016/11/29.
 */
define(['jquery','layer_', "../../css/customer.scss"], function ($,layer) {
    var root = avalon.vmodels.root;
    var customer = avalon.define({
        $id: "customer",
    });
    return avalon.controller(function ($ctrl) {
        $ctrl.$onEnter = function () {
        };
        $ctrl.$onRendered = function () {
        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [customer];
    });
});