/**
 * Created by LMG on 2016/11/29.
 */
define(['jquery', 'layer_', 'dropload', "droploadCss", "../../css/activeForFri.scss"], function ($, layer_) {
    var root = avalon.vmodels.root;
    var activeForFri = avalon.define({
        $id: "activeForFri",
        imgErQR: '',
        nickName: '',
        amount: '',
        amountFri: '',
        isOkDate: '',
        bouncedStatus : false,
        bouncedIndex: 0,
        helpGet: function () {//朋友帮忙领取
            root.getJsonData(
                "/wxact/friendPull",
                {
                    "openid": localStorage.getItem('wxds_openid'), //被邀请人
                    "fopenid": tools.getUrlString('friOpenId')//邀请人
                },
                function (data) {
                    //1，领取成功；-1，未关注；-2，不在活动时间；-3，已达最大领取次数；-5，朋友尚未关注
                    activeForFri.bouncedStatus = true;
                    if(data.code == 1){
                        activeForFri.bouncedIndex = 2;
                        activeForFri.amountFri = data.amount;
                        getSelfObj();
                    }
                    if(data.code == -1){
                        activeForFri.bouncedIndex = 3;
                    }
                    if(data.code == -5){
                        activeForFri.bouncedIndex = 4;
                    }
                    if(data.code == -3){
                        activeForFri.bouncedIndex = 5;
                    }

                },
                false
            );
        },
        showRule: function () {
            activeForFri.bouncedStatus = true;
            activeForFri.bouncedIndex = 1;
            $('#activeForFri').css('position', 'fixed');
        },
        cancel: function () {
            activeForFri.bouncedStatus = false;
            activeForFri.bouncedIndex = 0;
            $('#activeForFri').css('position', 'relative');
        }
    });

    function getErQR() {
        root.getJsonData(      // 生成二维码
            "/wxact/genQR",
            {
                "openid": tools.getUrlString('friOpenId')
            },
            function (data) {
                activeForFri.imgErQR = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + data;
                getSelfObj()
            },
            false
        );
    }

    function getSelfObj() {
        root.getJsonData(
            "/wxact/detail",
            {
                "openid": tools.getUrlString('friOpenId')
            },
            function (data) {
                activeForFri.nickName = data.nickname;
                activeForFri.amount = data.amount;
                activeForFri.isOkDate = data.isOkDate;
            },
            false
        );
    }

    return avalon.controller(function ($ctrl) {
        $ctrl.$onEnter = function () {
            getErQR();
        };
        $ctrl.$onRendered = function () {
        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [activeForFri];
    });
});