/**
 * Created by aaaa on 2016/6/14.
 */
define(['validate'], function (validate) {
    var changePwd = avalon.define({
        $id: "changePwd"

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
                    password: {
                        required: true,
                        minlength: 5
                    }
                },
                messages: {
                    password: {
                        required: "密码不能为空",
                        minlength: "密码长度不能小于5"
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
        $ctrl.$vmodels = [changePwd];
    });
})