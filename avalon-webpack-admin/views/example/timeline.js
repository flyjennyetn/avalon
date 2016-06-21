/**
 * Created by flyjennyetn on 2016/5/25.
 */
define([], function () {
    var timeline = avalon.define({
        $id: "timeline"
    });

    return avalon.controller(function ($ctrl) {

        $ctrl.$onEnter = function (param, rs, rj) {
        };
        $ctrl.$onRendered = function () {
        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [timeline];
    });
})