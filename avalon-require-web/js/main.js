/**
 * Created by flyjennyetn on 2016/2/1.
 */
requirejs.config({
    baseUrl: "./",
    paths: {
        "text": 'js/libs/text',             //用于requirejs导入html类型的依赖
        "jquery": "js/libs/jquery/jquery",
        "jqm":"js/libs/jquery/jquery.mobile-1.4.5",
        "md5": "js/libs/jquery/jquery.md5",
        "cookie": "js/libs/jquery/jquery.cookie",
        "layer_": "js/libs/layer/layer",
        "laypage": "js/libs/laypage/laypage",
        "glide": "js/libs/jquery.glide.min",
        "slide": "js/libs/jquery.SuperSlide.2.1.1",
        "unslider":'js/libs/unslider.min',
        "avalon": "js/libs/avalon/avalon.mobile.shim",
        "animation": "js/libs/avalon/avalon.animation",
        "avalonGetModel": "js/libs/avalon/avalon.getModel",
        "mmRequest": "js/libs/avalon/mmRequest",
        "mmPromise": "js/libs/avalon/mmPromise",
        "mmHistory": "js/libs/avalon/mmHistory",
        "mmRouter": "js/libs/avalon/mmRouter",
        "mmState": "js/libs/avalon/mmState"
    },
    shim: {
        avalon: {
            exports: "avalon"
        },
        jqm:{
            deps: ['jquery'],
            exports: 'jqm'
        },
        md5:{
            deps: ['jquery'],
            exports: 'md5'
        },
        cookie:{
            deps: ['jquery'],
            exports: 'cookie'
        },
        layer_:{
            deps: ['jquery'],
            exports: 'layer_'
        },
        glide:{
            deps: ['jquery'],
            exports: 'glide'
        },
        slide:{
            deps: ['jquery'],
            exports: 'slide'
        },
        unslider:{
            deps: ['jquery'],
            exports: 'unslider'
        },
        animation:{
            deps: ['avalon'],
            exports: 'animation'
        },
        mmRequest:{
            deps: ['avalon','mmPromise'],
            exports: 'mmRequest'
        },
        mmPromise:{
            deps: ['avalon'],
            exports: 'mmPromise'
        },
        mmHistory:{
            deps: ['avalon'],
            exports: 'mmHistory'
        },
        mmRouter:{
            deps: ['mmHistory'],
            exports: 'mmRouter'
        },
        mmState:{
            deps: ['mmPromise','mmRouter'],
            exports: 'mmState'
        },
        avalonGetModel:{
            deps: ['avalon'],
            exports: 'avalonGetModel'
        }
    }
});
// 为了可以预览，直接在这里requirejs，而不是通过include
requirejs(["avalon", "avalonGetModel", "mmState", "mmRequest","animation"], function (avalon,avalonGetModel,mmState,mmRequest,animation) {
    avalon.require = requirejs;
    // 重写模板加载器，改为用text插件加载
    avalon.state.templateLoader = function(url, resolve, reject, reason) {
        avalon.require(["text!" + url], function(tpl) {
            resolve(avalon.templateCache[url] = tpl)
        })
    }
    requirejs(["js/router"])
});
