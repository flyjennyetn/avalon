/**
 * Created by TR on 2016/11/8.
 */
define(['jquery', 'layer_', "../../css/healthInsure.scss"], function ($, layer_) {
    var root = avalon.vmodels.root;
    var healthInsure = avalon.define({
        $id: "healthInsure",
        healthInsureArr: [],
        pageNum: 1,//默认请求第一页数据
        rows: 5,//每页加载条数
        loadStatus: false,//可加载更多状态
        getDetail: function(id){
            location.href = '#!/insuredDetail/'+id;
        },
        getMore: function () {
            getHealthInsureList();
        }
    });

    function getHealthInsureList() {
        root.getJsonData('/newProduct/productByCategor',
            {
                "parentId": "5",
                "categoryCode": "",
                "pageNum": healthInsure.pageNum,
                "rows": healthInsure.rows,
                "orderType": ""
            },
            function (data) {
                if(data){
                    healthInsure.healthInsureArr = healthInsure.healthInsureArr.concat(data.pageVo.list);//追加数据
                    if(data.pageVo.list.length > healthInsure.rows - 1){
                        healthInsure.pageNum ++;
                        healthInsure.loadStatus = true;//可再加载更多
                    }else {
                        healthInsure.loadStatus = false;//不能再加载更多
                    }
                }
            }, false
        )
    }
    //$(function(){
    //    $(window).scroll(
    //        function(){
    //            if ((document.documentElement.scrollHeight) == (document.documentElement.scrollTop | document.body.scrollTop) + document.documentElement.clientHeight){
    //                if(healthInsure.loadStatus){
    //                    getHealthInsureList();
    //                }
    //            }
    //        }
    //    );
    //});
    return avalon.controller(function ($ctrl) {
        $ctrl.$onEnter = function () {
            root.activeStatus = 3;
            getHealthInsureList();
        };
        $ctrl.$onRendered = function () {
        };
        $ctrl.$onBeforeUnload = function () {
            healthInsure.pageNum = 1;
            healthInsure.healthInsureArr = [];
        };
        $ctrl.$vmodels = [healthInsure];
    });
});