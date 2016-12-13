/**
 * Created by LMG on 2016/12/1.
 */
define(['jquery', 'layer_', 'dropload', "droploadCss", "../../css/myIncomeD.scss"], function ($, layer_) {
    var root = avalon.vmodels.root;
    var myIncomeD = avalon.define({
        $id: "myIncomeD",
        "pageNum": 1,
        "rows": 15,
        productName: '',
        policyNo: '',
        totalIncome: 0,//累计收益
        count: '',//积累天数
        list: [],//每日收益
        loadStatus: false//可加载更多状态

    });

    function getInfo(policyNo){
        root.getJsonData(       //获取订单列表信息
            '/policyAcc/accClQuery',
            {
                "pageNum": myIncomeD.pageNum,
                "policyNo": policyNo,
                "rows": myIncomeD.rows
            },
            function (data) {
                myIncomeD.count = data.orderAssetsList.count;
                myIncomeD.list =  myIncomeD.list.concat(data.orderAssetsList.list);//追加数据
                if(data.orderAssetsList.list.length > myIncomeD.rows - 1){
                    myIncomeD.pageNum ++;
                    myIncomeD.loadStatus = true;//可再加载更多
                }else {
                    myIncomeD.loadStatus = false;//不能再加载更多
                }
            }, false
        )
    }

    return avalon.controller(function ($ctrl) {
        $ctrl.$onEnter = function (param) {
            getInfo(param.policyNo);
            myIncomeD.policyNo = param.policyNo;
            myIncomeD.productName = param.productName;
            myIncomeD.totalIncome = param.totalIncome;
        };
        $ctrl.$onRendered = function () {
        };
        $ctrl.$onBeforeUnload = function () {
            myIncomeD.list = [];
        };
        $ctrl.$vmodels = [myIncomeD];
    });
});