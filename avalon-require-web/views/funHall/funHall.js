/**
 * Created by LMG on 2016/10/12.
 */
define(["style!../../css/funHall"], function() {
    var roots = avalon.vmodels.root;
    var funHall = avalon.define({
        $id: "funHall",
        goSearch:function(){
            location.href='#!/compNotiDeta'
        }
    });

    return avalon.controller(function($ctrl) {
        $ctrl.$onEnter = function() {
            $('body,html').animate({scrollTop: 0}, 200);
            roots.headState = "funHall";
        };
        $ctrl.$onRendered = function() {
        };
        $ctrl.$onBeforeUnload = function() {};
        $ctrl.$vmodels = [funHall];
    });
});