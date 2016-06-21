/**
 * Created by aaaa on 2016/6/14.
 */
define(['validate'], function (validate) {
    var addUser = avalon.define({
        $id: "addUser"
    });
    return avalon.controller(function ($ctrl) {

        $ctrl.$onEnter = function (param, rs, rj) {

        };
        $ctrl.$onRendered = function () {

            //校验信息
            $('#add_user_form').validate({
                errorElement: 'div',
                errorClass: 'help-block',
                focusInvalid: false,
                rules: {
                    loginname: {
                        required: true
                    },
                    password: {
                        required: true,
                        minlength: 5
                    },
                    username: {
                        required: true
                    },
                    roleId: {
                        required: true
                    }
                },
                messages: {
                    loginname: {
                        required: "用户名不能为空"
                    },
                    password: {
                        required: "密码不能为空",
                        minlength: "密码长度不能小于5"
                    },
                    username: {
                        required: "姓名不能为空"
                    },
                    roleId: {
                        required: "角色不能为空"
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit
                    $('.alert-danger', $('.login-form')).show();
                },

                highlight: function (e) {
                    $(e).closest('.form-group').removeClass('has-info').addClass('has-error');
                },

                success: function (e) {
                    $(e).closest('.form-group').removeClass('has-error').addClass('has-info');
                    $(e).remove();
                }


            });

        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [addUser];
    });
});