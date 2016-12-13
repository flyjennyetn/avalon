/**
 * Created by LMG on 2016/12/5.
 */
define(['../../css/aboutUs.scss'], function () {
    var root = avalon.vmodels.root;
    var impState = avalon.define({
        $id: "impState"
    });

    return avalon.controller(function ($ctrl) {

        $ctrl.$onEnter = function () {

        };
        $ctrl.$onRendered = function () {

        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [impState];
    });
});