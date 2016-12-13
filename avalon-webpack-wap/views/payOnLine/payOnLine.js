/**
 * Created by Smart on 2016/12/5.
 */
define(["jquery",'cookie','../../css/payOnLine.scss'], function ($,cookie) {
    var root = avalon.vmodels.root;
    var payOnLine = avalon.define({
        $id: "payOnLine",
        checkBoxStatus: false,
        productName :'',
        premium :'',
        holderName :'',
        status: 0,
        isPass: true,//确认并支付状态
        bankMaxValue: '',//银行限额
        payThirdType: '',
        orderNo: '',
        cardNum: '',//银行卡账号
        mobile: '',//银行预留手机号
        vCode: '',//短信验证码
        bankList: [],//银行列表
        bankCode: '-1',//银行卡
        agreeFun: function (){
            payOnLine.checkBoxStatus = !payOnLine.checkBoxStatus;
        },
        //getBankList:function(){
        //    location.href = "#!/bankList"
        //},
        //发送短信验证码
        sendMes: function() {
            if (payOnLine.mobile == '') {
                root.hint('手机号码不能为空');
                return false;
            }
            if (!(/1[3|5|7|8][0-9]{9}/).test(payOnLine.mobile)) {
                root.hint('手机号码格式错误');
                return false;
            }
            root.getJsonPayDatas(
                "/paySms/vCode",
                {
                    "payThirdType": payOnLine.payThirdType,
                    "accountId":"",
                    "orderNo": payOnLine.orderNo,
                    "operateType":"3"
                },
                function (data) {
                    payOnLine.waitTime($(".code"), 60);
                    root.hint('短信已发送');
                }, false
            )

        },
        waitTime: function (obj, wait) {
            var wait = wait;
            var waitFun = setInterval(function () {
                if (wait == 0) {
                    payOnLine.status = 0;
                    obj.html("获取校验码");
                    obj.css({'border': '1px solid #268ec2', "color": "#fff"});
                    wait = 60;
                    clearInterval(waitFun);
                } else {
                    payOnLine.status = 1;
                    wait--;
                    obj.html(wait + "s后获取");
                    obj.css({"color": "#ffffff", 'border': '1px solid #969696'});
                }
            }, 1000);
        },
        check:function(str){
            if(str=='cardNum'){
                if(payOnLine.cardNum==''||payOnLine.cardNum==null||payOnLine.cardNum==undefined){
                    root.hint('请输入银行卡号');
                }
            }
            if(str=='mobile'){
                if(!tools.validCredNum("mobile",payOnLine.mobile)){
                    root.hint('请输入正确的手机号码');
                    return false;
                }
            }
            if(str=='vCode'){
                if(!(/^[0-9]{6}$/).test(payOnLine.vCode)){
                    root.hint("验证码格式错误");
                    return false;
                }
            }
            if(str=='checkBoxStatus'){
                if(!payOnLine.checkBoxStatus){
                    root.hint('请确认您已经阅读相关说明')
                }
            }
        },
        //最后的支付
        pay:function(){
            if(payOnLine.bankCode=='-1'){
                root.hint('请选择开户银行');
                return false;
            }
            payOnLine.check('cardNum');
            payOnLine.check('vCode');
            payOnLine.check('mobile');
            payOnLine.check('checkBoxStatus');
            if(payOnLine.bankMaxValue < payOnLine.premium){
               root.hint('保费超过该银行最大限额，请您更换银行');
                return false;
            }
            root.getJsonPayDatas(
                "/paySms/checkVCode",
                {
                    "orderNo": payOnLine.orderNo,
                    "operateType": "3",//支付传'3'
                    "validateCode": payOnLine.vCode
                },
                function (data) {
                    console.log(data);
                    if(data.flag==0){
                        root.hint('验证码错误');
                        return false;
                    }else{
                        root.getJsonPayDatas(
                            "/submitPay/ajaxSubmitPay",
                            {
                                "orderNo": payOnLine.orderNo,
                                "vcode": payOnLine.vcode,
                                "payThirdType": payOnLine.payThirdType,
                                "customerId": "",
                                "bankCode": payOnLine.bankCode,
                                "cardBookType": "01",
                                "cardBookCode": payOnLine.cardNum,
                                "accountId":""
                            },
                            function (data) {
                                if(data.tradeState == '0003' || data.tradeState == '0001' ){ //支付失败
                                    root.hint(data.errorMessage);
                                }
                                if(data.tradeState == '0002' ){   // 支付成功
                                    location.href = '#!/payStatus/0002';
                                }
                                if(data.tradeState == '0007' ){ //交易成功
                                    location.href = '#!/payStatus/0007';
                                }
                                if(data.tradeState == '0009' ){ //支付中
                                    location.href = '#!/payStatus/0009';
                                }
                            }, false
                        )
                    }
                }, false
            )

        }
    });
    //获取银行卡列表
    function getBankList(){
        console.log({
            'orderAmount': payOnLine.premium,
            'customerId': ''
        });
        root.getJsonPayDatas(
            "/pay/toPayInit/toPayInit",
            {
                'orderAmount': payOnLine.premium,
                'customerId':''
            },
            function (data) {
                payOnLine.bankList = data.payBankList;
            }, false
        )

    }
    //获取银行信息
    function getBankInfo(bankCode){
        root.getJsonPayDatas(
            "/payBank/bankInfo",
            {
                "bankCode": bankCode,
                "orderAmount": payOnLine.premium
            },
            function (data) {
                payOnLine.bankMaxValue = data.maxValue;
                payOnLine.payThirdType = data.payThirdType;
                payOnLine.bankCode = data.bankCode;
            }, false
        )
    }
    //获取用户绑定银行卡信息
    function getCardInfo(){
        root.getJsonPayDatas(
            "/customerAccount/bankCard",
            {
                //"customerId": "8390"
                "customerId": ""
            },
            function (data) {
                console.info(data)
            }, false
        )
    }

    function getOrderDetail(){//getJsonData
        root.getJsonData(
            "/newOrder/orderConfirm",
            {
                "orderId": payOnLine.orderNo
            },
            function (data) {
                payOnLine.productName = data.product.productName;
                payOnLine.premium = data.orderInfo.premiums;
                payOnLine.holderName = data.holderInfo.holderName;
                getBankList();
                getCardInfo();
            }, false
        )
    }
    //监听客户选择银行卡操作
    payOnLine.$watch("bankCode", function (newVul, oldVul) {
        getBankInfo(payOnLine.bankCode);
    });
    return avalon.controller(function ($ctrl) {
        $ctrl.$onEnter = function (param) {
            payOnLine.orderNo = param.orderId;
            getOrderDetail();
        };
        $ctrl.$onRendered = function () {
        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [payOnLine];
    });
});