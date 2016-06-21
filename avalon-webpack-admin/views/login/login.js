/**
 * Created by flyjennyetn on 2016/5/20.
 */
define([], function () {
    var login = avalon.define({
        $id: "login"
    });
    return avalon.controller(function ($ctrl) {

        $ctrl.$onEnter = function (param, rs, rj) {
        };
        $ctrl.$onRendered = function () {

        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [login];
    });
})