/**
 * Created by flyjennyetn on 2016/1/14.
 */
define([], function () {

    // 定义所有相关的vmodel
    var subjectList = avalon.define({
        $id: "subjectList",
        getThematicPageList:[]
    });
    return avalon.controller(function ($ctrl) {
        // 视图渲染后，意思是avalon.scan完成
        $ctrl.$onRendered = function () {
        };
        // 进入视图
        $ctrl.$onEnter = function (param, rs, rj) {
            var root = avalon.vmodels.root;
            root.menuState = 'home';
            //root.getJsonData('interface/getThematicPageList.json',{startNum:0,endNum:2},function(data){
            //    for(var i =0;i<data.length;i++){
            //        data[i].thematicFname = data[i].thematicFname.split('|');
            //    }
            //    subjectList.getThematicPageList = data;
            //});
        };
        // 对应的视图销毁前
        $ctrl.$onBeforeUnload = function () {

        };
        $ctrl.$vmodels = [subjectList];
    })
});