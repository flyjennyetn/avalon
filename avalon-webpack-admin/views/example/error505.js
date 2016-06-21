/**
 * Created by flyjennyetn on 2016/5/26.
 */
define([], function () {
    var error505 = avalon.define({
        $id: "error505",
        show_box:function(id) {
            $('.widget-box.visible').removeClass('visible');
            $('#'+id).addClass('visible');
        }
    });
    return avalon.controller(function ($ctrl) {

        $ctrl.$onEnter = function (param, rs, rj) {
        };
        $ctrl.$onRendered = function () {

        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [error505];
    });
})