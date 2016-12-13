define(['../../css/login.scss'], function() {
    var root = avalon.vmodels.root;
    var login = avalon.define({
        $id: "login",
        LoginInfo: {
            LoginName: '',
            LoginPwd: '',
            vCode: ''//图片验证码
        },
        vCodeImg: "",//验证码图片地址
        goLogin: function () {
            if (login.LoginInfo.LoginName == '' || login.LoginInfo.LoginName == null) {
                root.hint('账号不能为空');
                return;
            }
            if (login.LoginInfo.LoginPwd == '' || login.LoginInfo.LoginPwd == null) {
                root.hint('密码不能为空');
                return;
            }
            //调用后台登录接口
            root.getJsonData('/thirdLogin/thirdLogin', {
                    "thirdId": localStorage.getItem('wxds_openid'),
                    "regCode":login.LoginInfo.LoginName,
                    "loginPwd":login.LoginInfo.LoginPwd
                }, function (data) {
                    localStorage.setItem('userInfo',JSON.stringify(data));
                    root.isLogin = true;
                    root.hint('登录成功');
                    if(localStorage.getItem('goUrl')){
                        location.href = localStorage.getItem('goUrl');
                        localStorage.removeItem('goUrl');
                    }else {
                        location.href = '#!/hotProductList'
                    }
                }, false
            );
        },
        //加载验证码
        updateCodeImg: function() {
            login.vCodeImg = root.IPLocation + "/login/captcha.htm?a=" + Math.random();
        }
    });

    return avalon.controller(function($ctrl) {

        $ctrl.$onEnter = function() {
            login.updateCodeImg();
        };
        $ctrl.$onRendered = function() {};
        $ctrl.$onBeforeUnload = function() {};
        $ctrl.$vmodels = [login];
    });
});