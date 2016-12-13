/**
 * Created by cui on 2016/11/29.
 */
define(['jquery','layer_', "../../css/policyCancel.scss"], function ($,layer) {
    var root = avalon.vmodels.root;
    var policyCancel = avalon.define({
        $id: "policyCancel",
        policyNo:'',    //保单号
        mobile:'',      //投保人手机
        Info:{},        //保单信息
    });
        var dataInfo = {
        "resultCode": "10",
            "resultMsg": "",
            "result": {
            "message": "ok",
                "transDate": null,
                "transType": null,
                "submitChannel": null,
                "status": "0",
                "businessNo": null,
                "transTime": null,
                "resultCode": null,
                "transNo": null,
                "result": {
                    "holderCertiCode": "370181198102180924",
                    "policyStatues": "01",
                    "handlingFee": null,
                    "insName": "宋人人",
                    "resultCode": null,
                    "policyNo": "8088479719553868",
                    "expiryDate": "2026-11-21",
                    "accountBank": "05",
                    "surrendType": "1",
                    "beneName": "",
                    "bonusAmount": "0",
                    "holderCertiType": "0",
                    "mainProdName": "君康龙福宝两全保险B款（万能型）",
                    "resultsMessage": "OK",
                    "accountCode": "6228480010829290815",
                    "holderName": "宋人人",
                    "productId": "10006",
                    "transExeDate": null,
                    "beneMethod": null,
                    "surrendValue": "10000.0",
                    "proposalNo": "123456789373",
                    "transType": null,
                    "transExeTime": null,
                    "tranRefguId": null,
                    "mainProdCode": "3208",
                    "effectiveDate": "2016-11-22",
                    "hesitantPeriodEndDate":"2016-11-22"
            }
        }
    }           //测试假数据
        function getorderInfo(){
            root.getJsonData('/gw/refundApply/refundApply',
                {
                    "policyNo":8088477398829368,
                    "submitChannel":"03",
                    "transType": "1004"
                },
                function (data) {
                    data = dataInfo;
                    policyCancel.Info = data.result.result;
                    console.log(policyCancel.Info)
                },false
            )
        }
        //function getorderInfo() {//获取投保人，被保人，受益人信息
        //
        //};
    return avalon.controller(function ($ctrl){
        $ctrl.$onEnter = function (param){
            console.log(param)
            policyCancel.mobile = param.mobile;
            policyCancel.policyNo = param.policyNo;
            getorderInfo();
        };
        $ctrl.$onRendered = function (){
        };
        $ctrl.$onBeforeUnload = function (){
        };
        $ctrl.$vmodels = [policyCancel];
    });
});