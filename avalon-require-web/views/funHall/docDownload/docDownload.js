/**
 * Created by Alex on 2016/10/14.
 */
define(["style!../../../css/docDownload"], function() {
    var roots= avalon.vmodels.root;
    var docDownload = avalon.define({
        $id: "docDownload",
        contractList: [],
        promptList: [],
        claimsList: []
    });

    return avalon.controller(function($ctrl) {
        // 进入视图
        $ctrl.$onEnter = function() {
            $('body,html').animate({scrollTop: 0}, 200);
            roots.headState = "funHall";
            roots.getJsonData('gwInterface/getFilePageList.json', {
                'type' : '合同单证',
                'pageNum' : '1',
                'rows' : '5',
                'name' : ''
            }, function (data) {
                docDownload.contractList=data.list;
            });
            roots.getJsonData('gwInterface/getFilePageList.json', {
                'type' : '理赔单证',
                'pageNum' : '1',
                'rows' : '5',
                'name' : ''
            }, function (data) {
                docDownload.claimsList=data.list;
            });
            roots.getJsonData('gwInterface/getFilePageList.json', {
                'type' : '提示书',
                'pageNum' : '1',
                'rows' : '5',
                'name' : ''
            }, function (data) {
                docDownload.promptList=data.list;
            });
        };
        // 视图渲染后，意思是avalon.scan完成
        $ctrl.$onRendered = function() {
        };
        // 对应的视图销毁前
        $ctrl.$onBeforeUnload = function() {

        };
        // 指定一个avalon.scan视图的vmodels，vmodels = $ctrl.$vmodels.concact(DOM树上下文vmodels)
        $ctrl.$vmodels = [docDownload];
    });
});