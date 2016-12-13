/**
 * Created by rong on 2016/9/23.
 */
define(["style!../../css/footer"], function() {
    var roots=avalon.vmodels.root;
    var inquire = avalon.define({
        $id: "inquire",
        name:'',
        contentsList:[],
        navStatus: 0
    });
    function getContentsList(type){
        roots.getJsonData("gwInterface/getContentsList.json",{type:type},
            function(data){
                inquire.contentsList=data;
            }
        )
    }
    return avalon.controller(function($ctrl) {
        // ������ͼ
        $ctrl.$onEnter = function(parme) {
            $('body,html').animate({scrollTop: 0}, 200);
            inquire.name=parme.type;
            if(parme.type == '理赔须知' || parme.type == '客户服务指南'){
                inquire.navStatus = 1;
                roots.headState = "funHall";
            }else{
                roots.headState = "home";
            }
            getContentsList(inquire.name);
        };
        // ��ͼ��Ⱦ����˼��avalon.scan���
        $ctrl.$onRendered = function() {
        };
        // ��Ӧ����ͼ����ǰ
        $ctrl.$onBeforeUnload = function() {};
        // ָ��һ��avalon.scan��ͼ��vmodels��vmodels = $ctrl.$vmodels.concact(DOM��������vmodels)
        $ctrl.$vmodels = [inquire];
    });
});
