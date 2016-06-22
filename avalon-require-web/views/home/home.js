/**
 * Created by hejing on 15/12/9.
 */
define(['jquery','layer_','glide','slide'], function ($,layer_,glide,slide) {
    // 定义所有相关的vmodel
  var home = avalon.define({
    $id: "home",
    $loadVmodel:null,
    getHeadLine:[],
    hotArticle:[],
      fun:function(){
          avalon.router.go('app.home.zi2');
      }
  });

  home.$watch("getHeadLine", function(value, oldValue) {
      setTimeout(function(){
          if(home.getHeadLine.length > 1){
              $('.slider').glide({
                  arrows:false
              });
              var num = home.getHeadLine.length * 25;
              $('.slider').css('height','auto');
              $('.slider__nav').css('width',num+'px');
          }
      },500)
  })
  home.$watch("hotArticle", function(value, oldValue) {
      setTimeout(function(){
          $('[name="hotspot"]').slide({
              mainCell:'.bd ul',
              autoPage:true,
              effect:"top",
              autoPlay:true
          });
      },500)
  })


  return avalon.controller(function ($ctrl) {
    // 视图渲染后，意思是avalon.scan完成
    $ctrl.$onRendered = function () {
        avalon.router.go('app.home.zi');
    };
    // 进入视图
    $ctrl.$onEnter = function (param, rs, rj) {
        var root = avalon.vmodels.root;
        root.menuState = 'home';
        //root.getJsonData('getHeadLine.json',{},function(data){
        //    home.getHeadLine = data;
        //});
        //root.getJsonData('interface/hotArticle.json',{},function(data){
        //    home.hotArticle = data;
        //});

    };
    // 对应的视图销毁前
    $ctrl.$onBeforeUnload = function () {};
    $ctrl.$vmodels = [home];
  })

});

