/**
 * Created by cui on 2016/11/8.
 */
define(['jquery',"../../css/assessment.scss"], function () {
    var roots = avalon.vmodels.root;
    var assessment = avalon.define({
        $id: "assessment",

    });


    return avalon.controller(function ($ctrl) {

        $ctrl.$onEnter = function () {

        };
        $ctrl.$onRendered = function () {

        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [assessment];
    });
});