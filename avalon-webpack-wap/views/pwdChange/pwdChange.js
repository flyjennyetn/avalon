/**
 * Created by LMG on 2016/11/9.
 */
define(['../../css/pwdChange.scss'], function() {
    var root = avalon.vmodels.root;
    var pwdChange = avalon.define({
        $id: "pwdChange",
        userName: '',
        newPwd: '',
        confirmPwd: '',
        pwdType: 'password',//密码显示状态
        isEyeShow: true,//密码是否显示
        isEyeShowFun: function () {
            pwdChange.isEyeShow = !pwdChange.isEyeShow;
            if(pwdChange.isEyeShow==true){
                pwdChange.pwdType='password';
            }else{
                pwdChange.pwdType='text';
            }
        },
        save: function(){
            if (!(/^[a-zA-Z0-9_]{5,17}$/).test(pwdChange.newPwd)) {
                root.hint('密码长度在6~18之间，只能包含字母、数字和下划线')
                return false;
            } else if (pwdChange.newPwd != pwdChange.confirmPwd) {
                root.hint('两次密码不一致');
                return false;
            }
            root.getJsonData(
                '/user/userModify',
                {
                    regCode: pwdChange.userName,      //用户名
                    method: 1,
                    reLoginPwd: pwdChange.newPwd
                },
                function (data) {
                    root.hint('密码重置成功')
                }, false
            )
        }
    });

    return avalon.controller(function($ctrl) {

        $ctrl.$onEnter = function(param) {
            pwdChange.userName = param.userName;
        };
        $ctrl.$onRendered = function() {};
        $ctrl.$onBeforeUnload = function() {};
        $ctrl.$vmodels = [pwdChange];
    });
});