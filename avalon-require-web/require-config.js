/**
 * Created by flyjennyetn on 2015/12/23.
 */
require.config({
    baseUrl: './',           //依赖相对路径
    paths: {
        "requireLib": 'js/libs/require',
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
        "avalon": "js/libs/avalon/avalon.shim",
        "animation": "js/libs/avalon/avalon.animation",
        "avalonGetModel": "js/libs/avalon/avalon.getModel",
        "mmRequest": "js/libs/avalon/mmRequest",
        "mmPromise": "js/libs/avalon/mmPromise",
        "mmHistory": "js/libs/avalon/mmHistory",
        "mmRouter": "js/libs/avalon/mmRouter",
        "mmState": "js/libs/avalon/mmState"
    }
});