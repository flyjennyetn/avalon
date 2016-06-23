/**
 * Created by flyjennyetn on 2016/6/22.
 */

define(['drag'], function(drag) {
    var list = avalon.define({
        $id: "list",
        a:1,
        tabs:function(num){
            list.a = num;
        },
        drags:function(e){
            console.log(e);
        }
    });

    return avalon.controller(function($ctrl) {

        $ctrl.$onEnter = function() {

        };
        $ctrl.$onRendered = function() {

        };
        $ctrl.$onBeforeUnload = function() {};
        $ctrl.$vmodels = [list];
    });
});
