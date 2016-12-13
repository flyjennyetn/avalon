/**
 * Created by Smart on 2016/12/12.
 */
define(["jquery",'cookie','../../../css/healthTold.scss'], function ($,cookie) {
    var root = avalon.vmodels.root;
    var tipBook = avalon.define({
        $id: "tipBook"
    });
    return avalon.controller(function ($ctrl) {

        $ctrl.$onEnter = function (param) {
        };
        $ctrl.$onRendered = function () {
        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [tipBook];
    });
});