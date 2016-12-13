/**
 * Created by aaaa on 2016/11/18.
 */
define(['../../css/aboutUs.scss'], function () {
    var root = avalon.vmodels.root;
    var aboutUs = avalon.define({
        $id: "aboutUs",
        clearLocal: function () {
            localStorage.clear();
        },
        closeBtn: function () {
            jsMethod1();
        },
        alertOpenid: function () {
            var openid = localStorage.getItem('wxds_openid');
            root.alert(openid);
        }
    });

    return avalon.controller(function ($ctrl) {

        $ctrl.$onEnter = function () {

        };
        $ctrl.$onRendered = function () {

        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [aboutUs];
    });
});
