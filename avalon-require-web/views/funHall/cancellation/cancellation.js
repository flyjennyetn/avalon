/**
 * Created by cui on 2016/10/20.
 */
define(['layer_',"style!../../../css/cancellation"], function (layer_) {
    var roots = avalon.vmodels.root;
    var cancellation = avalon.define({
        $id: "cancellation",
        'cancellationInfo':{},    //退保信息
        'policyNo':'',               //保单号
        'payAccount':'',
        'mobile':'',
        'wait':'',
        'status':'',
        'Verification':'',
        'submitChannel':'',
         goResult:function(){
            if(cancellation.Verification ==''){
                layer_.alert("请输入验证码");
                return false;
            }
             postMobile();
         },
        waitTime: function(){                 //短信验证时间
            cancellation.wait = 60;
            var waitFun = setInterval(function () {
                if (cancellation.wait == 0) {
                    cancellation.status = 0;
                    cancellation.wait = 60;
                    clearInterval(waitFun);
                } else {
                    cancellation.status = 1;
                    cancellation.wait--;
                }
            }, 1000);
            getMobile();
        }
    });
    function getPolicyInfo(){
        //退保
        roots.getJsonFunData('/gw/refundApply/refundTrial',
            {
                "policyNo": cancellation.policyNo,
                "submitChannel":cancellation.submitChannel,
                "transType": "1004"
            },
            function (data) {
                console.log(data);
                //console.log(dataInfo);
                if(data.status=='0'){
                    cancellation.cancellationInfo = data.result;
                    if(cancellation.cancellationInfo.handlingFee ==''||cancellation.cancellationInfo.handlingFee==null){
                        cancellation.cancellationInfo.handlingFee = '0';
                    }
                }else if(data.status=='99'){
                    layer_.alert("系统繁忙");
                } else{
                    layer_.open({
                        content: data.message,
                        btn: ['确认'],
                        yes: function (index) {
                            layer_.closeAll();
                            location.href=history.go(-1);
                        },cancel: function(){
                            location.href=history.go(-1);
                        }
                    });
                }
            }
        )
    };
    function getMobile(){
        roots.getJsonFunData('/insurance/sendSms',
            {
                "mobile":cancellation.mobile,
                "transCode":"1000032"
            },
            function (data) {
                if(data.sendResult){
                    layer.alert("发送成功");
                }else{
                    layer.alert(data.resultMsg);
                }
            }
        )
    };
    function postMobile(){
        roots.getJsonFunData('/insurance/checkSms',
            {
                "mobile":cancellation.mobile,
                "transCode":"1000032",
                "smsCode":cancellation.Verification
            },
            function (data){
                if(data.sendResult == true){
                    window.location.href='#!/cancellResult/'+cancellation.policyNo+'/'+cancellation.mobile+'/'+cancellation.submitChannel;
                }else{
                    layer.alert("输入验证码错误");
                };
            }
        )
    }
    return avalon.controller(function ($ctrl) {
        // 进入视图
        $ctrl.$onEnter = function (param) {
            cancellation.policyNo = param.policyId;
            cancellation.payAccount = param.payAccount;
            cancellation.mobile = param.mobile;
            cancellation.submitChannel = param.submitChannel;
            getPolicyInfo();
        };
        // 视图渲染后，意思是avalon.scan完成
        $ctrl.$onRendered = function () {

        };
        // 对应的视图销毁前
        $ctrl.$onBeforeUnload = function () {

        };
        // 指定一个avalon.scan视图的vmodels，vmodels = $ctrl.$vmodels.concact(DOM树上下文vmodels)
        $ctrl.$vmodels = [cancellation];
    });
});