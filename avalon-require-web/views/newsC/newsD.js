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
        // ��Ӧ����ͼ����ǰ
        $ctrl.$onBeforeUnload = function () {
        };
        // ָ��һ��avalon.scan��ͼ��vmodels��vmodels = $ctrl.$vmodels.concact(DOM��������vmodels)
        $ctrl.$vmodels = [newsD];
    });
})