/**
 * Created by Smart on 2016/12/5.
 */
define(["../../../css/inputInfoDL.scss"], function (swiper) {
    var root = avalon.vmodels.root;
    var confirmation = avalon.define({
        $id: "confirmation",
        checkBoxStatus: false,
        orderId:'',
        productName:'',
        premium:'',
        insuranceBeginDate:'',//保单生效日期
        holderInfo:{},
        insuredInfo:{},
        benefitInfoType:'',
        benefitInfo:{},
        orderInfo:{},
        arr1: [{             //省份
            code: "110000",
            name: "北京市"
        }],
        arr2: [{
            "code": "110100",
            "parentCode": "110000",
            "name": "北京市市辖区",

        }, {
            "code": "110200",
            "parentCode": "110000",
            "name": "北京市县",

        }],       //市区
        arr3: [{
            "code": "110101",
            "parentCode": "110100",
            "name": "北京市东城区",

        }, {
            "code": "110102",
            "parentCode": "110100",
            "name": "北京市西城区",

        }, {
            "code": "110103",
            "parentCode": "110100",
            "name": "北京市崇文区",

        }, {
            "code": "110104",
            "parentCode": "110100",
            "name": "北京市宣武区",

        }, {
            "code": "110105",
            "parentCode": "110100",
            "name": "北京市朝阳区",

        }, {
            "code": "110106",
            "parentCode": "110100",
            "name": "北京市丰台区",

        }, {
            "code": "110107",
            "parentCode": "110100",
            "name": "北京市石景山区",

        }, {
            "code": "110108",
            "parentCode": "110100",
            "name": "北京市海淀区",

        }, {
            "code": "110109",
            "parentCode": "110100",
            "name": "北京市门头沟区",

        }, {
            "code": "110111",
            "parentCode": "110100",
            "name": "北京市房山区",

        }, {
            "code": "110112",
            "parentCode": "110100",
            "name": "北京市通州区",

        }, {
            "code": "110113",
            "parentCode": "110100",
            "name": "北京市顺义区",

        }, {
            "code": "110114",
            "parentCode": "110100",
            "name": "北京市昌平区",

        }, {
            "code": "110115",
            "parentCode": "110100",
            "name": "北京市大兴区",

        }, {
            "code": "110116",
            "parentCode": "110100",
            "name": "北京市怀柔区",

        }, {
            "code": "110117",
            "parentCode": "110100",
            "name": "北京市平谷区",

        }, {
            "code": "110228",
            "parentCode": "110200",
            "name": "北京市密云县",

        }, {
            "code": "110229",
            "parentCode": "110200",
            "name": "北京市延庆县"
         }
        ],      //区域
        agreeFun: function (){
            confirmation.checkBoxStatus = !confirmation.checkBoxStatus;
        },
        submitInfo:function(){
            if(!confirmation.checkBoxStatus){
                root.hint('请确认相关资料已阅读');
                return false;
            }
            window.location.href = '#!/payOnLine/'+confirmation.orderId;
        }
    });
    function getOrderDetail(){//getJsonData
        root.getJsonData(
            "/newOrder/orderConfirm",
            {
                "orderId": confirmation.orderId
            },
            function (data) {
                console.log(data)
                confirmation.productName = data.product.productName;
                confirmation.premium = data.item.premium;
                confirmation.insuranceBeginDate = data.item.insuranceBeginDate;
                confirmation.holderInfo = data.holderInfo;
                confirmation.insuredInfo = data.insuredInfoList[0];
                confirmation.orderInfo = data.orderInfo;
                if(data.insuredInfoList[0].isLegal == 1){
                    confirmation.benefitInfoType = '法定';
                }else{
                    confirmation.benefitInfoType = '指定';
                    if(data.benefitinfoList.length>=1){
                        confirmation.benefitInfo = data.benefitinfoList[0];
                    };
                }
            }, false
        )
    }
    return avalon.controller(function ($ctrl) {
        $ctrl.$onEnter = function (param) {
            confirmation.orderId =  param.orderId;
            getOrderDetail();
        };
        $ctrl.$onRendered = function () {

        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [confirmation];
    });
});