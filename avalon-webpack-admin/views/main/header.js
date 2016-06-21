/**
 * Created by flyjennyetn on 2016/5/20.
 */
define([], function () {
    var header = avalon.define({
        $id: "header"
    });
    return avalon.controller(function ($ctrl) {

        $ctrl.$onEnter = function (param, rs, rj) {
        };
        $ctrl.$onRendered = function () {
        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [header];
    });
})