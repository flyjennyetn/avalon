/**
 * Created by flyjennyetn on 2016/1/29.
 */
define(['jquery','layer_'], function($,layer_) {
    var tickling = avalon.define({
        $id: "tickling",
        ticklingLayer:null,
        aaa:123
    });

    return avalon.controller(function($ctrl) {

        $ctrl.$onEnter = function() {};
        $ctrl.$onRendered = function() {};
        $ctrl.$onBeforeUnload = function() {};
        $ctrl.$vmodels = [tickling];
    });
})
