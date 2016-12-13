/**
 * Created by LMG on 2016/11/29.
 */
define(['jquery', 'layer_','swiper', 'dropload', "droploadCss", "../../css/active.scss"], function ($, layer_,swiper) {
    var root = avalon.vmodels.root;
    var active = avalon.define({
        $id: "active",
        imgUrl: '../images/activeTitle.png',
        bouncedStatus: false,//是否显示遮罩层
        bouncedIndex: 0,
        rankingArr: [],//存放排行榜数据
        friendArr: [],//朋友领取明细
        locUrl: window.location.href,
        getAmount: '',//每次获得糖果数
        overPlus: 3,//每天可领取剩余次数
        isOkDate: '',//是否在活动期
        minutes: 0,
        seconds: 0,
        amount: 0,//糖果数
        timeVul: '',//倒计时
        friendsAmount: 0,//好友帮忙数
        query:0, //监听
        selfObj: {},

        quit: function () {
            root.getJsonData(
                '/thirdLogin/exit',
                {
                    "thirdId": localStorage.getItem('wxds_openid')
                },
                function (data) {
                }, false
            )
        },
        getFreeInsurance: function (vul) {
            if (vul == 1) {
                root.getJsonData(
                    '/insurance/isReceivedGiftIns',
                    {
                        "userid": JSON.parse(localStorage.getItem('userInfo')).userId,
                        "productid":"200001"
                    },
                    function (data) {
                        if(data.result == true){
                            active.bouncedStatus = false;
                            $('#active').css('position', 'relative');
                            active.bouncedIndex = 0;
                            root.hint("您已领取过赠险");
                        }else{
                            location.href = '#!/insuredDetail/200001';
                        }
                    }, false
                );
                //领取赠险
                root.getJsonData(
                    '/wxact/giftInsReward',
                    {
                        "openid":localStorage.getItem('wxds_openid'),
                        "userid":JSON.parse(localStorage.getItem('userInfo')).userId,
                        "productid":"200001"
                    },
                    function (data) {
                    }, false
                )
            } else {
                location.href = '#!/certification';
            }
        },
        showRule: function () {
            active.bouncedStatus = true;
            active.bouncedIndex = 3;
            $('#active').css('position', 'fixed');
        },
        showFriList: function () {
            active.bouncedStatus = true;
            active.bouncedIndex = 4;
            $('#active').css('position', 'fixed');
            root.getJsonData(
                "/wxact/friends",
                {
                    "openid": localStorage.getItem('wxds_openid'),
                    'limit': '999'
                },
                function (data) {
                    console.info(data)
                    active.friendArr = data;
                },
                false
            );
        },
        showInfo: function () {
            if (root.loginStatus()) {//判断登录状态
                var userInfo = JSON.parse(localStorage.getItem('userInfo'));
                active.bouncedStatus = true;
                $('#active').css('position', 'fixed');
                if (active.overPlus == 0) {
                    active.bouncedIndex = 6
                } else {
                    root.getJsonData(
                        "/wxact/selfPull",
                        {
                            "openid": localStorage.getItem('wxds_openid')
                        },
                        function (data) {
                            active.getAmount = data.amount;
                            if (data.code == 1 || data.code == 2) {
                                if (userInfo.isApproved == 1) {
                                    active.bouncedIndex = 2;
                                } else {
                                    active.bouncedIndex = 1;
                                }
                            }
                            if (data.code == -3) {
                                active.bouncedIndex = 6
                            }
                            if (data.code == -4) {
                                active.bouncedIndex = 5;
                            }
                        },
                        false
                    );
                }
            }
        },
        cancel: function () {
            active.bouncedStatus = false;
            $('#active').css('position', 'relative');
            active.bouncedIndex = 0;
            getSelfObj();
            getList();
        }
    });
    /**
     * 倒计时处理
     * */
    function countdown() {
        var EndTime = new Date(active.timeVul);
        var NowTime = new Date();
        var t = EndTime.getTime() - NowTime.getTime();
        var d = 0;
        var h = 0;
        var m = 0;
        var s = 0;
        if (t >= 0) {
            m = Math.floor(t / 1000 / 60 % 60);
            s = Math.floor(t / 1000 % 60);
        }
        active.minutes = m;
        active.seconds = s;
    }

    function getSelfObj() {
        root.getJsonData(
            "/wxact/detail",
            {
                "openid": localStorage.getItem('wxds_openid')
            },
            function (data) {
                if (data) {
                    active.friendsAmount = data.friendsAmount;
                    active.amount = data.amount;
                    active.overPlus = data.overplus;
                    active.timeVul = data.nextGet;
                    active.isOkDate = data.isOkDate;
                    setInterval(countdown, 0);
                }
            },
            false
        );
    }

    function getList() {//糖果排行榜
        root.getJsonData(
            "/wxact/rank",
            {"limit": 5},
            function (data) {
                active.rankingArr = data;
            },
            false
        );
    }



    function wxConfig() {
        root.getJsonData(
            "/wxact/jssdkconfig",
            {
                "url": encodeURI(window.location.href.split('#')[0])
            },
            function (data) {
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看参数，可以在pc端打开。
                    appId: data.appId, // 必填，公众号的唯一标识
                    timestamp: data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: data.nonceStr, // 必填，生成签名的随机串
                    signature: data.signature,// 必填，签名，见附录1
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
            },
            false
        );

    }

    wx.ready(function () {
        //分享到朋友圈
        wx.onMenuShareTimeline({
            title: '领取圣诞糖果，赢iPhone大礼', // 分享标题
            link: 'http://ybt.e-tianrong.com:8888/wx_shop/weixin.html?jack=activeForFri&friendId='+ localStorage.getItem('wxds_openid'), // 分享链接
            imgUrl: "http://ybt.e-tianrong.com:8888/wx_shop/images/activeBg13.png", // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        //分享给朋友
        wx.onMenuShareAppMessage({
            title: '领取圣诞糖果，赢iPhone大礼', // 分享标题
            desc: '我离一部iPhone7的距离就是你..', // 分享描述
            link: 'http://ybt.e-tianrong.com:8888/wx_shop/weixin.html?jack=activeForFri&friendId='+ localStorage.getItem('wxds_openid'), // 分享链接
            imgUrl: "http://ybt.e-tianrong.com:8888/wx_shop/images/activeBg13.png", // 分享图标
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

    active.$watch('minutes', function (newVul, oldVul) {
        if (active.minutes == 0 && active.seconds == 0) {
            clearInterval(countdown);
        }
    });

    //轮播
    active.$watch("query", function (value, oldValue) {
        setTimeout(function () {
            var mySwiper = new swiper('.swiper-container', {
                autoplay: 500,
                loop: false,
                slidesPerView :'auto',
                paginationClickable: true,
                centeredSlides: true,
                autoplayDisableOnInteraction: false, //手动滑动之后不会禁止滑动效果
                direction: 'vertical'
            });
        }, 100)
    });
    return avalon.controller(function ($ctrl) {
        $ctrl.$onEnter = function () {
            active.bouncedStatus = false;
            getSelfObj();
            wxConfig();
            getList();
        };
        $ctrl.$onRendered = function () {
            setTimeout(function () {
                active.query = new Date();
            },10);
        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [active];
    });
});