/**
 * Created by flyjennyetn on 2016/1/14.
 */
define(['jquery','slide'], function ($,slide) {

    // 定义所有相关的vmodel
    var courseLine = avalon.define({
        $id: "courseLine",
        pSchool:[],
        jSchool:[],
        sSchool:[]
    });

    courseLine.$watch("sSchool", function(value, oldValue) {
        setTimeout(function(){
            $('[name="safety"]').slide({
                titCell:'.row .tab li',
                mainCell:'.plate',
                effect:"left",
                trigger:"click",
                autoPlay:true
            });
            // 图片悬停
            $('[name="hint"]').hover(function(){
                $(this).children('.prompt').slideDown("slow");
            },function(){
                $(this).children('.prompt').slideUp("slow");
            });
        },600)
    })

    return avalon.controller(function ($ctrl) {
        // 视图渲染后，意思是avalon.scan完成
        $ctrl.$onRendered = function () {
        };
        // 进入视图
        $ctrl.$onEnter = function (param, rs, rj) {
            var root = avalon.vmodels.root;
            //root.getJsonData('interface/queryLessonGradeStage.json',{},function(data){
            //    courseLine.pSchool = data.pSchool;
            //    courseLine.jSchool = data.jSchool;
            //    courseLine.sSchool = data.sSchool;
            //});
        };
        // 对应的视图销毁前
        $ctrl.$onBeforeUnload = function () {

        };
        $ctrl.$vmodels = [courseLine];
    })

});