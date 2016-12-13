/**
 * Created by cui on 2016/11/14.
 */
define(['jquery', 'layer_', 'dropload', "droploadCss", "../../css/policyList.scss"], function ($, layer_) {
    var root = avalon.vmodels.root;
    var policyList = avalon.define({
        $id: "policyList",
        policyListArr: [],
        pageNum: 1,//默认请求第一页数据
        rows: 5,//每页加载条数
        loadStatus: true,//可加载更多状态
        count: 0,
        goPolicyDetail: function (policyNo) {
            location.href = '#!/policyDetail/' + policyNo
        },
        getMore: function () {
            getList();
        }
    });

    function getList() {
        root.getJsonData(       //获取订单列表信息
            '/newOrder/policyList',
            {
                userId: JSON.parse(localStorage.getItem('userInfo')).regCode,
                //userId: 'Liu_aj',
                pageNum: policyList.pageNum,
                rows: policyList.rows,
                policyStatus: ""
            },
            function (data) {
                policyList.count = data.policyList.count;
                policyList.policyListArr = policyList.policyListArr.concat(data.policyList.list);//追加数据
                if (data.policyList.list.length > policyList.rows - 1) {
                    policyList.pageNum++;
                    policyList.loadStatus = true;//可再加载更多
                } else {
                    policyList.loadStatus = false;//不能再加载更多
                }
            }, false
        );
        //var dropLoad = $('.List').dropload({
        //    scrollArea: window,
        //    loadDownFn: function (me) {
        //        if (policyList.loadStatus) {
        //            root.getJsonData(       //获取订单列表信息
        //                '/newOrder/policyList',
        //                {
        //                    //userId: JSON.parse(localStorage.getItem('userInfo')).regCode,
        //                    userId: 'Liu_aj',
        //                    pageNum: policyList.pageNum,
        //                    rows: policyList.rows,
        //                    policyStatus: ""
        //                },
        //                function (data) {
        //                    policyList.count = data.policyList.count;
        //                    policyList.policyListArr = policyList.policyListArr.concat(data.policyList.list);//追加数据
        //                    if (data.policyList.list.length > policyList.rows - 1) {
        //                        policyList.pageNum++;
        //                        policyList.loadStatus = true;//可再加载更多
        //                    } else {
        //                        policyList.loadStatus = false;//不能再加载更多
        //                    }
        //                    me.resetload();
        //                }, false
        //            )
        //        }
        //    }
        //});
    }

    return avalon.controller(function ($ctrl) {
        $ctrl.$onEnter = function () {
            if(root.loginStatus()){
                getList();
            }
        };
        $ctrl.$onRendered = function () {
        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [policyList];
    });
});