/**
 * Created by TR on 2016/11/8.
 */
define(['jquery', 'layer_', "../../css/accidentInsure.scss"], function ($, layer_) {
    var root = avalon.vmodels.root;
    var accidentInsure = avalon.define({
        $id: "accidentInsure",
        accidentInsureArr: [],
        pageNum: 1,//默认请求第一页数据
        rows: 5,//每页加载条数
        loadStatus: false,//可加载更多状态
        getDetail: function(id){
            location.href = '#!/insuredDetail/'+id;
        },
        getMore: function () {
            getAccidentInsureList();
        }
    });

    function getAccidentInsureList() {
        root.getJsonData('/newProduct/productByCategor',
            {
                "parentId": "10",
                "categoryCode": "",
                "pageNum": accidentInsure.pageNum,
                "rows": accidentInsure.rows,
                "orderType": ""
            },
            function (data) {
                if(data){
                    accidentInsure.accidentInsureArr = accidentInsure.accidentInsureArr.concat(data.pageVo.list);//追加数据
                    if(data.pageVo.list.length > accidentInsure.rows - 1){
                        accidentInsure.pageNum ++;
                        accidentInsure.loadStatus = true;//可再加载更多
                    }else {
                        accidentInsure.loadStatus = false;//不能再加载更多
                    }
                }
            }, false
        )
    }
    //$(function(){
    //    $(window).scroll(
    //        function(){
    //            if ((document.documentElement.scrollHeight) == (document.documentElement.scrollTop | document.body.scrollTop) + document.documentElement.clientHeight){
    //                if(accidentInsure.loadStatus){
    //                    getAccidentInsureList();
    //                }
    //            }
    //        }
    //    );
    //});
    return avalon.controller(function ($ctrl) {
        $ctrl.$onEnter = function () {
            root.activeStatus = 4;
            getAccidentInsureList();
        };
        $ctrl.$onRendered = function () {
        };
        $ctrl.$onBeforeUnload = function () {
            accidentInsure.pageNum = 1;
            accidentInsure.accidentInsureArr = [];
        };
        $ctrl.$vmodels = [accidentInsure];
    });
});