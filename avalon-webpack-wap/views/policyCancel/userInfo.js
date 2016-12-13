/**
 * Created by cui on 2016/11/29.
 */
define(['jquery','layer_', "../../css/userInfo.scss"], function ($,layer) {
    var root = avalon.vmodels.root;
    var userInfo = avalon.define({
        $id: "userInfo",
        state:false,
        mobile:'',      //投保人手机
        Info:{},
        policyNo:'',    //保单号
        consent:function(){
            userInfo.state  =!userInfo.state;
        },
        next:function(){
            if(userInfo.state){
                window.location.href = '!#/phone/'+userInfo.policyNo+'/'+userInfo.mobile;
            }else{
                root.hint('请勾选客户须知');
            }
        }
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
                userInfo.Info = data.result.result;
                console.log(userInfo.Info)
            },false
        )
    }
    return avalon.controller(function ($ctrl) {
        $ctrl.$onEnter = function (param) {
            userInfo.mobile = param.mobile;
            userInfo.policyNo = param.policyNo;
            getorderInfo();
        };
        $ctrl.$onRendered = function () {
        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [userInfo];
    });
});