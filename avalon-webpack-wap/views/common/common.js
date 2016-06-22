/**
 * Created by flyjennyetn on 2016/1/21.
 */
define([], function() {
    var common = avalon.define({
        $id: "common"
    });

    return avalon.controller(function($ctrl) {

        $ctrl.$onEnter = function() {};
        $ctrl.$onRendered = function() {};
        $ctrl.$onBeforeUnload = function() {};
        $ctrl.$vmodels = [common];
    });
});
