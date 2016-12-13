/**
 * Created by LMG on 2016/12/5.
 */

define(["jquery",'cookie','../../../css/proDetailImg.scss'], function ($,cookie) {
    var root = avalon.vmodels.root;
    var proDetailImg = avalon.define({
        $id: "proDetailImg"
    });

    return avalon.controller(function ($ctrl) {

        $ctrl.$onEnter = function (param) {
        };
        $ctrl.$onRendered = function () {
        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [proDetailImg];
    });
});