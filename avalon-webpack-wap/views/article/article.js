/**
 * Created by cui on 2016/11/8.
 */
define(['jquery', '../../js/filter/wx_share.js', '../../js/filter/sha1.js', "../../css/article.scss"], function () {
    var roots = avalon.vmodels.root;
    var article = avalon.define({
        $id: "article",
        quit: function () {
            roots.getJsonData(
                '/thirdLogin/exit',
                {
                    "thirdId": localStorage.getItem('wxds_openid')
                },
                function (data) {
                }, false
            )
        },
        shareFriend: function () {
            var locUrl = window.location.href;
            var param = {
                imgUrl: 'http://xxx/share_ico.png',  // 分享后展示的一张图片
                lineLink: 'http://xxx', // 点击分享后跳转的页面地址
                descContent: "xx！",  // 分享后的描述信息
                shareTitle: 'xx', // 分享后的标题
                appid: ''  // 应用id,如果有可以填，没有就留空
            };
            common_wx_share(locUrl,param);
        }
    });

    /*************************************  以下 ********************************************/

    function common_wx_share(locUrl,param){
        var appid = 'wx56b138d07022146e';
        var secret = '83b5447dd547e6c42ca269bba0222a8b';

        /**
         * 获取token
         * */
        function getToken() {
            $.ajax({
                type: 'get',
                url: 'https://api.weixin.qq.com/cgi-bin/token?',
                data: 'grant_type=client_credential&appid=' + appid + '&secret=' + secret,
                dataType: "jsonp",
                context: this,
                success: function (data) {
                    console.log(data);
                    //var tokenObj = data;
                    //tokenObj = {
                    //    access_token : "-PQXaWpgwL7G51Icslr7ubzgSgoVsTMSWb93kVd9agl6WFC5oTGMjGWM_Rt8lGIRm8sgr5BfLz8PwjL3pjOWBIpvHtO8yQuQj0fPHztXwOm6aWc_xSLz_lZpzJ9xgF1XGEJdAAACAF",
                    //    expires_in : 7200
                    //};
                    //getTicket(tokenObj.access_token)
                }
            });
        }

        /**
         * 获取ticket
         * */
        function getTicket(tokenVul) {
            $.ajax({
                type: 'get',
                url: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?',
                data: 'access_token=' + tokenVul + '&type=jsapi',
                dataType: "jsonp",
                context: this,
                success: function (data) {
                    console.log(data);
                    var ticketObj = data;
                    ticketObj = {
                        errcode: 0,
                        errmsg: "ok",
                        expires_in: 7200,
                        ticket: "kgt8ON7yVITDhtdwci0qeXBBGq21y1DCnQTKWIU1p8vREQM6Vap252MkUPOtk_nzhYfEPqq8rPcK6VRGYx1d8Q"
                    };
                    getConfig(ticketObj.ticket);
                }
            });
        }

        /**
         * 获取随机字符串
         * */
        function createNonceStr() {
            return Math.random().toString(36).substr(2, 15);
        }

        /**
         * 获取时间戳
         * */
        function createTimestamp() {
            return parseInt(new Date().getTime() / 1000) + '';
        }

        /**
         * 获取config信息
         * */
        function getConfig(ticketVul) {
            var noncestr = createNonceStr();
            var jsapi_ticket = ticketVul;
            var timestamp = createTimestamp();
            var url = locUrl.split('/#')[0];
            var syntheticStr = 'jsapi_ticket=' + jsapi_ticket + '&noncestr=' + noncestr + '&timestamp=' + timestamp + '&url=' + url;
            //var signature = shaFun.hex_sha1(syntheticStr);
            var signature = '7cc66914e09a337e7a5ccf4b22fbc23413eb212b';
            wx.config({
                debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看参数，可以在pc端打开。
                appId: appid, // 必填，公众号的唯一标识
                timestamp: timestamp, // 必填，生成签名的时间戳
                nonceStr: noncestr, // 必填，生成签名的随机串
                signature: signature,// 必填，签名，见附录1
                jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        }


        wx.ready(function () {
            //分享到朋友圈
            wx.onMenuShareTimeline({
                title: param.shareTitle, // 分享标题
                link: param.lineLink, // 分享链接
                imgUrl: param.imgUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });

            //分享给朋友
            wx.onMenuShareAppMessage({
                title: param.shareTitle, // 分享标题
                desc: param.descContent, // 分享描述
                link: param.lineLink, // 分享链接
                imgUrl: param.imgUrl, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
        });
        wx.error(function (res) {
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            //alert("errorMSG:"+JSON.stringify(res));
        });
    }

    /*************************************  以上  ********************************************/
    return avalon.controller(function ($ctrl) {

        $ctrl.$onEnter = function () {
            //getToken();


            //var tokenObj = {
            //    access_token: "-PQXaWpgwL7G51Icslr7ubzgSgoVsTMSWb93kVd9agl6WFC5oTGMjGWM_Rt8lGIRm8sgr5BfLz8PwjL3pjOWBIpvHtO8yQuQj0fPHztXwOm6aWc_xSLz_lZpzJ9xgF1XGEJdAAACAF",
            //    expires_in: 7200
            //};
            //getTicket(tokenObj.access_token)

            //var ticketObj = {
            //    errcode: 0,
            //    errmsg: "ok",
            //    expires_in: 7200,
            //    ticket: "kgt8ON7yVITDhtdwci0qeXBBGq21y1DCnQTKWIU1p8vREQM6Vap252MkUPOtk_nzhYfEPqq8rPcK6VRGYx1d8Q"
            //};
            //getConfig(ticketObj.ticket);

        };
        $ctrl.$onRendered = function () {

        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [article];
    });
});