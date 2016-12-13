/**
 * Created by LMG on 2016/11/9.
 */
define(['../../css/pwdFind.scss'], function () {
    var root = avalon.vmodels.root;
    var pwdFind = avalon.define({
        $id: "pwdFind",
        status: 0,
        userName: '',
        userPhone: '',//手机号
        phoneVCode: '',//手机短信校验码
        vCode: '',//图片验证码
        vCodeImg: "",//验证码图片
        updateCodeImg: function(){
            pwdFind.vCodeImg = root.IPLocation + "/login/captcha.htm?a=" + Math.random();
        },
        sendMes: function() {
            if (pwdFind.userPhone == '') {
                root.hint('手机号码不能为空');
                return false;
            }
            if (!(/1[3|5|7|8][0-9]{9}/).test(pwdFind.userPhone)) {
                root.hint('手机号码格式错误');
                return false;
            }
            root.getJsonData(
                "/insurance/sendSms",
                {
                    "mobile": pwdFind.userPhone,
                    "transCode": "1000032"
                },
                function (data) {
                    if (data.sendResult == true) {
                        pwdFind.waitTime($(".getMessage"), 60);
                        root.hint('短信已发送');
                    }

                }, false
            )
        },
        waitTime: function (obj, wait) {
            var wait = wait;
            var waitFun = setInterval(function () {
                if (wait == 0) {
                    pwdFind.status = 0;
                    obj.val("获取校验码");
                    obj.css({'border': '1px solid #969696', "color": "#969696"});
                    wait = 60;
                    clearInterval(waitFun);
                } else {
                    pwdFind.status = 1;
                    wait--;
                    obj.val("获取校验码" + " [ " + wait + "s ] ");
                    obj.css({"color": "#969696", 'border': '1px solid #969696'});
                }
            }, 1000);
        },
        save: function() {
            if (pwdFind.userPhone == '') {
                root.hint('手机号码不能为空');
                return false;
            }
            if (!(/1[3|5|7|8][0-9]{9}/).test(pwdFind.userPhone)) {
                root.hint('手机号码格式错误');
                return false;
            }
            if (!(/^\d{6}$/).test(pwdFind.phoneVCode)) {
                root.hint('请输入6位手机验证码');
                return false;
            }
            //if (!(/^[a-zA-Z0-9]{4}$/).test(pwdFind.vCode)) {
            //    root.hint('请输入4位图片验证码');
            //    return false;
            //}
            root.getJsonData('/user/userModify',
                {
                    regCode: pwdFind.userName,      //用户名
                    method: 0,
                    reLoginPwd: '',
                    mobile: pwdFind.userPhone,
                    transCode: "1000032",
                    smsCode: pwdFind.phoneVCode,
                    validateCode: pwdFind.vCode
                },
                function (data) {
                    location.href='#!/pwdChange/'+pwdFind.userName
                }, false
            )
        }

    });
    return avalon.controller(function ($ctrl) {

        $ctrl.$onEnter = function () {
            pwdFind.updateCodeImg();
        };
        $ctrl.$onRendered = function () {

        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [pwdFind];
    });
});
