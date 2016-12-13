/**
 * Created by cui on 2016/11/29.
 */
define(['jquery','layer_', "../../css/result.scss"], function ($,layer) {
    var root = avalon.vmodels.root;
    var result = avalon.define({
        $id: "result",
        policyNo:'',    //保单号
        mobile:'',      //投保人手机
    });
    function getPolicyResult(){
        //退保
        root.getJsonDatas('/gw/refundApply/refundApply',
            {
                "policyNo":'8088476948186168',
                //"policyNo": result.insuranceId,
                "transType":"surrend",
                "mobile":result.mobile,
                'submitChannel':'03'

            },
            function (data) {
                if(data.status=='0'){
                    result.status = data.status;
                }else{

                }
            }
        )
    }
    return avalon.controller(function ($ctrl) {
        $ctrl.$onEnter = function (param) {
            result.mobile = param.mobile;
            result.policyNo = param.policyNo;
            getPolicyResult();
        };
        $ctrl.$onRendered = function () {
        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [result];
    });
});
