/**
 * Created by cui on 2016/11/14.
 */
define(['../../css/certification.scss'], function() {
    var root = avalon.vmodels.root;
    var certification = avalon.define({
        $id:"certification",
        mobile:'',      //手机号
        userInfo:'',    //用户信息
        vCode: '',//图片验证码
        vCodeImg: '',//验证码图片路径
        phoneVCode: '',//短信校验码
        status: 0,
        mobNum:function(mobile){
            //userJson=localStorage.getItem("user"),
            if(mobile==null||mobile==''){
                return '';
            }
            //return mobile.replace(mobile.substr(3,4), "****");
            return mobile.substr(0,3)+"****"+mobile.substr(7,10);
        },
        waitTime: function (obj, wait) {                //倒计时
            var wait = wait;
            var waitFun = setInterval(function () {
                if (wait == 0) {
                    certification.status = 0;
                    obj.val("获取校验码");
                    obj.css({'border': '1px solid #e4393c', "color": "#e4393c"});
                    wait = 60;
                    clearInterval(waitFun);
                } else {
                    certification.status = 1;
                    wait--;
                    obj.val("获取校验码" + " [ " + wait + "s ] ");
                    obj.css({"color": "#e4393c", 'border': '1px solid #e4393c'});
                }
            }, 1000);
        },
        //获取手机校验码
        sendMes: function () {
            root.getJsonData(
                "/insurance/sendSms",
                {
                    "mobile": certification.userInfo.mobile,
                    "transCode": "1000032"
                },
                function (data) {
                    if (data.sendResult == true) {
                        certification.waitTime($(".per-getMessage"), 60);
                        root.hint("短信已发送")
                    }

                }, false
            )
        },
        changeImg: function () {
            certification.vCodeImg = root.IPLocation + "/login/captcha.htm?a=" + Math.random();
        },
        changeStepStatus:function(){
            if(certification.phoneVCode == ''|| typeof certification.phoneVCode=='undefined'){
                root.hint("请输入验证码")
                return false;
            }else{
                postInfo();
            }

        }
    });
    function postInfo(){
        root.getJsonData(
            "/user/checkMobile",
            {
                "userId": 'Liu_aj',
                "mobile": certification.userInfo.mobile,
                "transCode": "1000032",
                "smsCode": certification.phoneVCode
            },
            function (data) {
                console.log(data)
                if(data.resultCode == '10'){
                    window.location.href = '#!/success';
                }
            }, false
        );
    }
    return avalon.controller(function($ctrl) {

        $ctrl.$onEnter = function() {
            if(root.loginStatus()){
                certification.userInfo= JSON.parse(localStorage.getItem('userInfo'));
            }

        };
        $ctrl.$onRendered = function() {
            certification.mobile = certification.mobNum(certification.userInfo.mobile);
        };
        $ctrl.$onBeforeUnload = function() {};
        $ctrl.$vmodels = [certification];
    });
});