/**
 * Created by flyjennyetn on 2016/5/26.
 */
define(['colorbox','colorboxCss'], function (colorbox) {
    var gallery = avalon.define({
        $id: "gallery",
        show_box:function(id) {
            $('.widget-box.visible').removeClass('visible');
            $('#'+id).addClass('visible');
        }
    });
    return avalon.controller(function ($ctrl) {

        $ctrl.$onEnter = function (param, rs, rj) {
        };
        $ctrl.$onRendered = function () {
                $('.ace-thumbnails [data-rel="colorbox"]').colorbox({
                    rel:'group1',
                    //transition:"none",
                    //width:"75%",
                    //height:"75%",
                    slideshow:false,
                    iframe:false,
                    //innerWidth:640,
                    //innerHeight:390,
                    onOpen:function(){ console.log('onOpen: colorbox is about to open'); },
                    onLoad:function(){ console.log('onLoad: colorbox has started to load the targeted content'); },
                    onComplete:function(){ console.log('onComplete: colorbox has displayed the loaded content'); },
                    onCleanup:function(){ console.log('onCleanup: colorbox has begun the close process'); },
                    onClosed:function(){ console.log('onClosed: colorbox has completely closed'); }
                });
        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [gallery];
    });
})