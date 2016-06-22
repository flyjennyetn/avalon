/**
 * Created by flyjennyetn on 2016/1/21.
 */
define(['jquery','layer_'], function($,layer_) {
    var common = avalon.define({
        $id: "common",
        ticklingLayer:null,
        backToTop:function(){
            $('body,html').animate({scrollTop:0},500);
        }
    });

    $(window).scroll(function(){
        if ($(window).scrollTop()>150){
            $("#cathetFloat").fadeIn(1500);
        }else{
            $("#cathetFloat").fadeOut(1500);
        }
    });

    return avalon.controller(function($ctrl) {

        $ctrl.$onEnter = function() {};
        $ctrl.$onRendered = function() {};
        $ctrl.$onBeforeUnload = function() {};
        $ctrl.$vmodels = [common];
    });
})
