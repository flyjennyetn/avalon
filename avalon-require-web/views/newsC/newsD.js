/**
 * Created by rong on 2016/9/22.
 */
define(['jquery',"style!../../css/newsC"], function ($) {
    var roots=avalon.vmodels.root;
    var newsD = avalon.define({
        $id: "newsD",
        articleDetail:'',
        doubleData:[],
        detail:function(articleId,folderId){
            getArticleDetail(articleId,folderId);
            $('body,html').animate({scrollTop: 0}, 200);
        }
    });

    function getArticleDetail(articleId,folderId){
        roots.getJsonData("gwInterface/getArticleDetail.json",{articleId:articleId},function(data){
            newsD.articleDetail=data;
            newsD.doubleData=[];
            newsD.doubleData=newsD.articleDetail.doubleData;
        })
    }

    return avalon.controller(function ($ctrl) {

        $ctrl.$onRendered = function () {

        };
        $ctrl.$onEnter = function (prame) {
            $('body,html').animate({scrollTop: 0}, 200);
            var articleId=prame.articleId;
            var folderId=prame.folderId;
            getArticleDetail(articleId,folderId);
            roots.headState = "newsC";
        };
        // 对应的视图销毁前
        $ctrl.$onBeforeUnload = function () {
        };
        // 指定一个avalon.scan视图的vmodels，vmodels = $ctrl.$vmodels.concact(DOM树上下文vmodels)
        $ctrl.$vmodels = [newsD];
    });
})