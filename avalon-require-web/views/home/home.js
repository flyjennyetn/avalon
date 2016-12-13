/**
 * Created by hejing on 15/12/9.
 */
define(['jquery','layer_','slide','style!../../css/home'], function ($,layer_,slide) {
    var roots = avalon.vmodels.root;
    // 和视图交互的变量和方法
    var home = avalon.define({
        $id: "home",
        getHeadLine:[],  //首页轮播
        rateListForHome:[], //产品利率
        productList:[], //热销产品
        articleList:[],  //新闻中心
        getUnitList:[],  //合作伙伴
        num:1,
        xxxw:function(articleId,folderId){

            location.href="#!/newsD/"+articleId+'/'+folderId
        }
    });


    home.$watch('getHeadLine', function (a,b) {
        var t=setInterval (function(){
            //if($("div").hasClass("tempWrap")){
                setTimeout(function () {
                    $("#slideBox").slide({
                        mainCell: ".bd ul",
                        autoPlay: true,
                        effect:"leftLoop",
                        trigger: "click",
                        delayTime: 1000
                    });
                },100);
            if(home.getHeadLine.length>1){
                clearTimeout(t)
            }
            //}
        },1);
    });
    home.$watch('getUnitList', function (a,b) {
        setTimeout(function () {
            $(".slide_Box").slide({
                mainCell: ".bd ul",
                autoPlay: false,
                effect:"leftLoop",
                trigger: "click",
                delayTime: 1000
            });
        },100);
        setTimeout(function () {
            $("#home_rx").slide({
                mainCell:".bd ul",
                effect:"left",
                autoPlay:false,
                vis:3,
                scroll:1,
                delayTime: 500
            });
        },1000)
    });

    return avalon.controller(function ($ctrl) {
        // 视图渲染后，意思是avalon.scan完成
        $ctrl.$onRendered = function () {
        };
        // 进入视图
        $ctrl.$onEnter = function (param, rs, rj) {
            $('body,html').animate({scrollTop: 0}, 200);
            //首页轮播
            roots.getJsonData('gwInterface/getHeadLine.json', {}, function (data) {
                home.getHeadLine=data;
            });
            //利率展示
            roots.getJsonData('gwInterface/getRateListForHome.json', {}, function (data) {
                home.rateListForHome=data;
            });
            //热销产品
            roots.getJsonData('gwInterface/getProductList.json', {}, function (data) {
                home.productList=data;
            });
            //新闻中心
            roots.getJsonData('gwInterface/getArticleListForHome.json', {}, function (data) {
                home.articleList=data.articleList
            });
            //合作伙伴
            roots.getJsonData('gwInterface/getUnitList.json', {}, function (data) {
                home.getUnitList=data;
            });
            roots.headState = "home";
        };
        // 对应的视图销毁前
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [home];
    })

});
