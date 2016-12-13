/**
 * Created by cui on 2016/10/20.
 */
define(['layer_',"style!../../../css/canceResult"], function (layer_) {
    var roots = avalon.vmodels.root;
    var canceResult = avalon.define({
        $id: "canceResult",
        'policyNo':'',               //保单号
        'status':'',                 //退保状态
        'message':'',                //退保错误提示
        //'Verification':'',
        'mobile':'',
        'submitChannel':''
    });
    function getPolicyResult(){
        //退保
        roots.getJsonFunData('/gw/refundApply/refundApply',
            {
                "policyNo":canceResult.policyNo,
                "transType":"surrend",
                "mobile":canceResult.mobile,
                'submitChannel':canceResult.submitChannel
                //"smsCode":canceResult.Verification,
                //"transCode":'1000032'
            },
            function (data) {

                if(data.status=='0'){
                    canceResult.status = data.status;
                }else{
                    canceResult.message = data.message;
                    layer_.alert(data.message);
                }
            },
            function(err){
                //错误
                //console.log(err);
            }
        )
    }
    return avalon.controller(function ($ctrl) {
        // 进入视图
        $ctrl.$onEnter = function (param) {
            canceResult.policyNo = param.policyId;
            canceResult.mobile = param.mobile;                   //角色
            canceResult.submitChannel = param.submitChannel;                   //角色
            //canceResult.Verification = param.Verification;                   //验证码
            getPolicyResult();
        };
        // 视图渲染后，意思是avalon.scan完成
        $ctrl.$onRendered = function () {

        };
        // 对应的视图销毁前
        $ctrl.$onBeforeUnload = function () {

        };
        // 指定一个avalon.scan视图的vmodels，vmodels = $ctrl.$vmodels.concact(DOM树上下文vmodels)
        $ctrl.$vmodels = [canceResult];
    });
});