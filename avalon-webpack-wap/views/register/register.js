/**
 * Created by LMG on 2016/11/7.
 */
define(['layer_','../../css/register.scss'], function(layer) {
    var root = avalon.vmodels.root;
    var register = avalon.define({
        $id: "register",
        isAgree: true,
        status: 0,
        userPhone: '',//手机号
        phoneVCode: '',//手机短信校验码
        userPwd: '',//密码
        vCode: '',//图片验证码
        vCodeImg: "",//验证码图片
        pwdType: 'password',//密码显示状态
        isEyeShow: true,//密码是否显示
        isEyeShowFun: function () {
            register.isEyeShow = !register.isEyeShow;
            if(register.isEyeShow==true){
                register.pwdType='password';
            }else{
                register.pwdType='text';
            }
        },
        agree: function () {
            register.isAgree = !register.isAgree;
        },
        updateCodeImg: function(){
            register.vCodeImg = root.IPLocation + "/login/captcha.htm?a=" + Math.random();
        },
        sendMes: function() {
            if (register.userPhone == '') {
                root.hint('手机号码不能为空');
                return false;
            }
            if (!(/1[3|5|7|8][0-9]{9}/).test(register.userPhone)) {
                root.hint('手机号码格式错误');
                return false;
            }
            root.getJsonData(
                "/insurance/sendSms",
                {
                    "mobile": register.userPhone,
                    "transCode": "1000032"
                },
                function (data) {
                    if (data.sendResult == true) {
                        register.waitTime($(".getMessage"), 60);
                        root.hint('短信已发送');
                    }

                }, false
            )

        },
        waitTime: function (obj, wait) {
            var wait = wait;
            var waitFun = setInterval(function () {
                if (wait == 0) {
                    register.status = 0;
                    obj.val("获取校验码");
                    obj.css({'border': '1px solid #969696', "color": "#969696"});
                    wait = 60;
                    clearInterval(waitFun);
                } else {
                    register.status = 1;
                    wait--;
                    obj.val("获取校验码" + " [ " + wait + "s ] ");
                    obj.css({"color": "#969696", 'border': '1px solid #969696'});
                }
            }, 1000);
        },
        goRegister: function(){
            if (register.userPhone == '') {
                root.hint('手机号码不能为空');
                return false;
            }
            if (!(/1[3|5|7|8][0-9]{9}/).test(register.userPhone)) {
                root.hint('手机号码格式错误');
                return false;
            }
            if (register.userPwd == '' || register.userPwd == null) {
                root.hint('密码不能为空');
                return false;
            }
            if (!(/^[a-zA-Z0-9_]{5,17}$/).test(register.userPwd)) {
                root.hint('密码长度在6~18之间，只能包含字母、数字和下划线');
                return false;
            }

            if (register.isAgree == false) {
                root.hint('请确认您已阅读注册协议');
                return false;
            }
            //最后的注册

            root.getJsonData(
                "/thirdLogin/thirdRegister",
                {

                    "thirdId":localStorage.getItem('wxds_openid'),
                    "regCode":"0",
                    "loginPwd":register.userPwd,
                    "mobile":register.userPhone,
                    "transCode":"1000032",
                    "smsCode":register.phoneVCode

                },
                function (data) {
                    root.hint("注册成功");
                    location.href = "#!/login";
                }
            )
        }
    });

    return avalon.controller(function($ctrl) {

        $ctrl.$onEnter = function() {
            register.updateCodeImg();
        };
        $ctrl.$onRendered = function() {};
        $ctrl.$onBeforeUnload = function() {};
        $ctrl.$vmodels = [register];
    });
});