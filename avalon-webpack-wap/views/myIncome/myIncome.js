/**
 * Created by LMG on 2016/11/29.
 */
define(['jquery', 'layer_', 'dropload', "droploadCss", "../../css/myIncome.scss"], function ($, layer_) {
    var root = avalon.vmodels.root;
    var myIncome = avalon.define({
        $id: "myIncome",
        yIncome: 0,//昨日收益
        totalValue: 0,//总保单价值
        totalIncome: 0,//累计收益
        policyList: [],//用户保单列表
        goDetail: function(policyNo,productName){
            location.href = '#!/myIncomeD/'+policyNo+'/'+productName+'/'+myIncome.totalIncome
        }
    });

    function getInfo(){
        root.getJsonData(       //获取订单列表信息
            '/policyAcc/policyAccList',
            {
                //"userId": JSON.parse(localStorage.getItem('userInfo')).regCode,
                "userId": 'Liu_aj',
                "salesChannel": "sc-01",
                "categoryCode":"0201",
                "pageNum": "1",
                "rows": "5"
            },
            function (data) {
                console.log(data);
                if(data.yesterdayIncome != '' && data.yesterdayIncome != null && data.yesterdayIncome !=undefined){
                    myIncome.yIncome = data.yesterdayIncome;
                }
                if(data.totalEndPrinInt != '' && data.totalEndPrinInt != null && data.totalEndPrinInt != undefined){
                    myIncome.totalValue = data.totalEndPrinInt;
                }
                if(data.totalAsset != '' && data.totalAsset != null && data.totalAsset != undefined){
                    myIncome.totalIncome = data.totalAsset;
                }
                myIncome.policyList = data.policyAccList.list
            }, false
        )
    }

    return avalon.controller(function ($ctrl) {
        $ctrl.$onEnter = function () {
            if(root.loginStatus()){
                getInfo();
            }
        };
        $ctrl.$onRendered = function () {
        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [myIncome];
    });
});