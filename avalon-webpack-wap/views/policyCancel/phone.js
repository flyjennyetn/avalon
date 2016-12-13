/**
 * Created by cui on 2016/11/29.
 */
define(['jquery','layer_', "../../css/phone.scss"], function ($,layer) {
    var root = avalon.vmodels.root;
    var phone = avalon.define({
        $id: "phone",
        wait:'',                 //倒计时描述
        display:'',            //验证码状态
        mobile:'',      //投保人手机
        Verification:'',    //手机验证码
        policyNo:'',    //保单号
        waitTime: function(){                 //短信验证时间
            phone.wait = 60;
            var waitFun = setInterval(function () {
                if (phone.wait == 0) {
                    phone.display = 0;
                    phone.wait = 60;
                    clearInterval(waitFun);
                } else {
                    phone.display = 1;
                    phone.wait--;
                }
            }, 1000);
            getMobile();
        },
        goResult:function(){
            if(phone.Verification ==''){
                root.hint("请输入验证码");
                return false;
            }
            postMobile();
        }
    });
    function getMobile(){              //发送手机验证码
        root.getJsonData('/insurance/sendSms',
            {
                "mobile":phone.mobile,
                "transCode":"1000032"
            },
            function (data) {
                if(data.sendResult){
                    root.hint("发送成功");
                }else{
                    root.hint(data.resultMsg);
                }
            }
        )
    };
    function postMobile(){              //验证手机验证码
        root.getJsonDatas('/insurance/checkSms',
            {
                "mobile":phone.mobile,
                "transCode":"1000032",
                "smsCode":phone.Verification
            },
            function (data){
                if(data.sendResult == true){
                    window.location.href='#!/result/'+phone.mobile+'/'+phone.policyNo;
                }else{
                    layer.alert("输入验证码错误");
                };
            }
        )
    };
    return avalon.controller(function ($ctrl) {
        $ctrl.$onEnter = function (param) {
            phone.mobile = param.mobile;
            phone.policyNo = param.policyNo;
        };
        $ctrl.$onRendered = function () {
        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [phone];
    });
});