/**
 * Created by rong on 2016/9/22.
 */
define(['jquery','laypage',"style!../../css/newsC"], function ($,laypage) {
    var roots=avalon.vmodels.root;
    var newsC = avalon.define({
        $id: "newsC",
        articleTpye:[],
        articleList:[],
        initId:'',
        totalNum:5,
        list:function(pageNum,id,state){
            newsC.initId=id;
            roots.getJsonData("gwInterface/getArticleList.json",{type:id,pageNum:pageNum,rows:5},function(data){
                newsC.articleList=data.articleList;
                newsC.totalNum=data.totalNum;
                if(state=='init'){
                    newsC.pager()
                }
            })
        },
        pager:function (){
            laypage({
                cont: $('#pager'), //������ֵ֧��id����ԭ��dom����jquery���󡣡��������Ϊ����<div id="page1"></div>
                pages: Math.ceil(newsC.totalNum / 5), //ͨ����̨�õ�����ҳ��
                jump: function(obj, first){ //������ҳ��Ļص�
                    newsC.list(obj.curr,newsC.initId);
                }
            });
        },
        title:function(id,folderId){
            location.href="#!/newsD/"+id+'/'+folderId
        }
    });


    return avalon.controller(function ($ctrl) {

        $ctrl.$onRendered = function () {

        };
        $ctrl.$onEnter = function () {
            $('body,html').animate({scrollTop: 0}, 200);
            //�����б�
            roots.getJsonData("gwInterface/getArticleTpye.json",{},function(data){
                newsC.articleTpye=data;
                newsC.initId=data[0].folderId;
                newsC.list(1,newsC.initId,'init')
            });
            roots.headState = "newsC";
        };
        // ��Ӧ����ͼ����ǰ
        $ctrl.$onBeforeUnload = function () {
        };
        // ָ��һ��avalon.scan��ͼ��vmodels��vmodels = $ctrl.$vmodels.concact(DOM��������vmodels)
        $ctrl.$vmodels = [newsC];
    });
})