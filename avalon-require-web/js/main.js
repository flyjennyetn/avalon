/**
 * Created by flyjennyetn on 2016/2/1.
 */
requirejs.config({
    waitSeconds: 0,
    map:{
        '*':{
            'style':'js/require/css'
        }
    },
    baseUrl: "./",
    paths: {
        'requireLib':'js/require/require',
        "text": 'js/require/text',
        "jquery": "js/jquery/jquery",
        "jquery_form":'js/jquery/jquery.form',
        "md5": "js/jquery/jquery.md5",
        "cookie": "js/jquery/jquery.cookie",
        "layer_": "js/layer/layer",
        "laydate": "js/laydate/laydate",
        "laypage": "js/laypage/laypage",
        "slide": "js/jquery/jquery.SuperSlide.2.1.1",
        "avalon": "js/avalon/avalon.shim",
        "avalonGetModel": "js/avalon/avalon.getModel",
        "mmRequest": "js/avalon/mmRequest",
        "mmPromise": "js/avalon/mmPromise",
        "mmHistory": "js/avalon/mmHistory",
        "mmRouter": "js/avalon/mmRouter",
        "mmState": "js/avalon/mmState",
        "myfilter":"js/filter/myfilter"
    },
    shim: {
        avalon: {
            exports: "avalon"
        },
        md5:{
            deps: ['jquery'],
            exports: 'md5'
        },
        cookie:{
            deps: ['jquery'],
            exports: 'cookie'
        },
        laydate:{
            deps: ['jquery','style!js/laydate/need/laydate.css'],
            exports: 'laydate'
        },
        layer_:{
            deps: ['jquery','style!js/layer/skin/layer'],
            exports: 'layer_'
        },
        laypage:{
            deps: ['jquery','style!js/laypage/skin/laypage'],
            exports: 'laypage'
        },
        slide:{
            deps: ['jquery'],
            exports: 'slide'
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
        avalonGetModel:{
            deps: ['avalon'],
            exports: 'avalonGetModel'
        }
    }
});
//为了可以预览，直接在这里requirejs，而不是通过include
requirejs(["avalon", "avalonGetModel", "mmState"], function (avalon) {
    avalon.require = requirejs;
    // 重写模板加载器，改为用text插件加载
    avalon.state.templateLoader = function(url, resolve, reject, reason) {
        avalon.require(["text!" + url], function(tpl) {
            resolve(avalon.templateCache[url] = tpl)
        })
    }
    requirejs(["js/router"])
});
