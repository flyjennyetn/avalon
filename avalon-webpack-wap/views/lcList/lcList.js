/**
 * Created by LMG on 2016/11/7.
 */
define(['../../css/lcList.scss'], function() {
    var root = avalon.vmodels.root;
    var lcList = avalon.define({
        $id: "lcList",
        listArr: [],
        pageNum: 1,//默认请求第一页数据
        rows: 5,//每页加载条数
        loadStatus: false,//可加载更多状态
        goProDetail: function(productId){
            location.href = '#!/lcProDetail/'+productId;
        },
        getMore: function () {
            getProductList();
        }
    });
    function getProductList(){

        root.getJsonData('/newProduct/productByCategor',
            {
                "parentId": "3",
                "categoryCode": "",
                "pageNum": lcList.pageNum,
                "rows": lcList.rows,
                "orderType": ""
            },
            function (data) {
                if(data){
                    lcList.listArr =  lcList.listArr.concat(data.pageVo.list);//追加数据
                    if(data.pageVo.list.length > lcList.rows - 1){
                        lcList.pageNum ++;
                        lcList.loadStatus = true;//可再加载更多
                    }else {
                        lcList.loadStatus = false;//不能再加载更多
                    }
                }
            }, false
        )
    }
    //$(function(){
    //    $(window).scroll(
    //        function(){
    //            if ((document.documentElement.scrollHeight) == (document.documentElement.scrollTop | document.body.scrollTop) + document.documentElement.clientHeight){
    //                if(lcList.loadStatus){
    //                    getProductList();
    //                }
    //            }
    //        }
    //    );
    //});
    return avalon.controller(function($ctrl) {

        $ctrl.$onEnter = function() {
            root.activeStatus = 2;
            getProductList();
        };
        $ctrl.$onRendered = function() {};
        $ctrl.$onBeforeUnload = function() {
            lcList.pageNum = 1;
            lcList.listArr = [];
        };
        $ctrl.$vmodels = [lcList];
    });
});