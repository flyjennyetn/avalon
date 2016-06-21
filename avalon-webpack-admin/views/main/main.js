/**
 * Created by flyjennyetn on 2016/5/20.
 */
define(['../../js/ace/ace-extra.min'], function () {
    var main = avalon.define({
        $id: "main"
    });
    return avalon.controller(function ($ctrl) {

        $ctrl.$onEnter = function (param, rs, rj) {
        };
        $ctrl.$onRendered = function () {
            ace.handle_side_menu($);
            ace.general_things($);
        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [main];
    });
})