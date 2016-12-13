/**
 * Created by cui on 2016/11/15.
 */
define(['../../css/confirmInfo.scss'], function (){
    var root = avalon.vmodels.root;
    var confirmInfo = avalon.define({
        $id: "confirmInfo",
        orderId: '',//订单号
        productType: '0',
        premiums:'',
        userInfo:'',    //用户信息
        payInfo: {},//存放支付返回数据
        holderInfo: {},//投保人信息
        orderInfo: {},//订单信息
        item: {},//订单详细信息
        product: {},//产品信息
        insuredInfoList: [],//被保人信息
        benefitinfoList: [],//受益人信息
        productComment: [],//存放产品条款
        guaranteePeriodName: '',
        checkBoxStatus: false,//勾选框状态
        agreeFun: function (){
            confirmInfo.checkBoxStatus = !confirmInfo.checkBoxStatus;
        },
        submitPay:function(){
            if (!confirmInfo.checkBoxStatus) {
                root.hint('请确认相关资料已阅读');
                return false;
            }
            var orderData = {
                userId:confirmInfo.userInfo.regCode,
                orderNo: confirmInfo.orderId,    //订单ID
                channelLimit: "",
                successUrl: root.pSuccessUrl,
                pgType3: "1"
            };
            root.getJsonData(
                '/cashier/orderApply',
                orderData,
                function (data) {
                    if (data.resultCode == "10") {
                        confirmInfo.payInfo = data;
                        //关闭浮层
                        $("#payForm").trigger('submit');
                    } else {
                        root.hint(data.resultMsg);
                    }
                }
            );
        }
    });
    return avalon.controller(function ($ctrl){
        $ctrl.$onEnter = function (param) {
            confirmInfo.userInfo= JSON.parse(localStorage.getItem('userInfo'));
            $('body,html').animate({scrollTop: 0}, 200);
            confirmInfo.orderId = param.orderId;
            confirmInfo.productType = param.productType;
            root.getJsonData(
                "/newOrder/orderConfirm",
                {
                    "orderId": param.orderId
                },
                function (data) {
                    console.log(data);
                    confirmInfo.holderInfo = data.holderInfo;//投保人信息
                    confirmInfo.orderInfo = data.orderInfo;//订单信息
                    confirmInfo.item = data.item;//订单详细信息
                    confirmInfo.product = data.product;//订单详细信息
                    confirmInfo.insuredInfoList = data.insuredInfoList;//被保人信息
                    confirmInfo.benefitinfoList = data.benefitinfoList;//受益人信息
                    confirmInfo.premiums = (data.orderInfo.premiums / 100).toFixed(2);
                    confirmInfo.guaranteePeriodName = data.item.insurancePeriod;
                    root.getJsonData(
                        "/newProduct/getProductComment",
                        {
                            "productId": data.product.productId,
                            "position": "2"
                        },
                        function (data) {
                            confirmInfo.productComment = data.productComments
                        },
                        false
                    )
                },
                false
            )
        };
        $ctrl.$onRendered = function () {
        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [confirmInfo];
    });
});