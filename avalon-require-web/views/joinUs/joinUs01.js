/**
 * Created by rong on 2016/9/23.
 */
define(['jquery',"style!../../css/joinUs"], function ($) {
    var roots=avalon.vmodels.root;
    var joinUs01 = avalon.define({
        $id: "joinUs01",
        name:'',
        contentsList:[]

    });
    function contentsList(name){
        roots.getJsonData("gwInterface/getContentsList.json",{type:'人才招聘',name:name},
            function(data){
                joinUs01.contentsList=data;
                console.log(data)
                //joinUs01.nameList=data;
            });
    }


    return avalon.controller(function ($ctrl) {

        $ctrl.$onRendered = function () {

        };
        $ctrl.$onEnter = function (prame) {
            joinUs01.name=prame.name;
            contentsList(joinUs01.name);
            roots.headState = "joinUs";
        };
        // 对应的视图销毁前
        $ctrl.$onBeforeUnload = function () {
        };
        // 指定一个avalon.scan视图的vmodels，vmodels = $ctrl.$vmodels.concact(DOM树上下文vmodels)
        $ctrl.$vmodels = [joinUs01];
    });
})