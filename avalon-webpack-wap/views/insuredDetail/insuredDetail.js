/**
 * Created by TR on 2016/11/9.
 */
define(["jquery",'cookie','../../css/healthInsure.scss'], function ($,cookie) {
    var root = avalon.vmodels.root;
    var insuredDetail = avalon.define({
        $id: "insuredDetail",
        birthday: '',
        premiums: 0,
        ageInterval: '',//成保年龄区间
        codeArr: [],     // 存放试算因子的数组
        parameters: '',  //存放试算因子的字符串
        productId: '',
        btnStatus: true,
        checkBoxStatus:false,
        productComments:[],//产品详细信息
        dutyProduct:[],//保障说明
        productRemarkImg: '',//说明图
        productInfo: {},//存放产品信息
        isHealthInformed:'0',//是否存在健康告知  1-不存在   0-存在
        agreeFun: function (){
            insuredDetail.checkBoxStatus = !insuredDetail.checkBoxStatus;
        },
        choose_1: function (index, code) {
            $(this).parent('.li_ul_el').find('.li_ul_li').removeClass('active');
            $(this).addClass('active');
            if (insuredDetail.productInfo.premiumCalcMethod == '1') {
                insuredDetail.codeArr[index] = code;
                var str = insuredDetail.productInfo.productId;
                insuredDetail.codeArr.forEach(function (value) {
                    str += value;
                });
                insuredDetail.productInfo.productRates.forEach(function (v, k) {
                    if (v.productRateId == str) {
                        insuredDetail.premiums = (v.premiums / 100).toFixed(2) + '';
                    }
                });
            }
            if (insuredDetail.productInfo.premiumCalcMethod == '2') {
                var keyName = insuredDetail.productInfo.productMetas[index].metaId;
                var keyValue = '';
                insuredDetail.productInfo.productMetas[index].mateOptions.forEach(function (v, k) {
                    if (v.metaOptionCode == code) {
                        keyValue = insuredDetail.productInfo.productMetas[index].mateOptions[k].metaOptionValue
                    }
                });
                insuredDetail.codeArr[index] = keyName + '=' + keyValue;
                var num = 0;
                for (var i = 0; i < insuredDetail.codeArr.length; i++) {
                    if (insuredDetail.codeArr[i] == undefined) {
                        num++;
                    }
                }
                if (num < 2) {
                    getPremiums();
                }
            }
        },
        payFor: function () {
            if(!insuredDetail.checkBoxStatus){
                root.hint('请确认相关资料已阅读');
                return false;
            }
            if(insuredDetail.premiums == 0 && insuredDetail.productId != 200001){
                root.hint('请先进行保费试算');
                return false;
            }
            //if (root.isLogin) {
            //    if(insuredDetail.isHealthInformed == 1){
            //        location.href = '#!/inputInfo/' + insuredDetail.productInfo.productId + "/" + insuredDetail.parameters + "/" + insuredDetail.premiums;
            //    }else{
            //        var str  = insuredDetail.productInfo.productId + "/" + insuredDetail.parameters + "/" + insuredDetail.premiums;
            //        location.href = '#!/healthTold/' + str;
            //    }
            //} else {
            //    localStorage.setItem('goUrl',window.location.href);
            //    root.alert('请您先进行用户登录！', '去登录', function () {
            //        location.href = '#!/login';
            //        layer.closeAll();
            //    });
            //}
            //if(root.loginStatus()){
                if(insuredDetail.isHealthInformed != 1){
                    location.href = '#!/inputInfo/' + insuredDetail.productInfo.productId + "/" + insuredDetail.parameters + "/" + insuredDetail.premiums;
                }else{
                    if(insuredDetail.productId == 200001){
                        var str  = insuredDetail.productInfo.productId + "/" + insuredDetail.parameters + "/0";
                    }else{
                        var str  = insuredDetail.productInfo.productId + "/" + insuredDetail.parameters + "/" + insuredDetail.premiums;
                    }
                    location.href = '#!/healthTold/' + str;
                }
            //}
        },
        turnTo: function(nameId){
            location.href = '#!/showDetail?nameId=' + nameId;
        }
    });
    //保费试算
    function getPremiums() {
        if (insuredDetail.birthday == '') {
            root.hint('请选择出生日期');
            return false;
        }
        if (!tools.calculateAge(insuredDetail.birthday, insuredDetail.productInfo.beginAge, insuredDetail.productInfo.endAge, null)) {
            var premiums = 0;
            insuredDetail.premiums = premiums.toFixed(2) + '';
            insuredDetail.btnStatus = false;
            return false;
        }
        if (insuredDetail.codeArr.length == insuredDetail.productInfo.productMetas.length) {
            if (insuredDetail.birthday) {
                insuredDetail.parameters = '';
                for (var i = 0; i < insuredDetail.codeArr.length; i++) {
                    if (insuredDetail.codeArr[i] == undefined) {
                        insuredDetail.codeArr[i] = 'birthday=' + tools.getTurnDate(insuredDetail.birthday);
                    }
                    if (i == 0) {
                        insuredDetail.parameters += insuredDetail.codeArr[i]
                    } else {
                        insuredDetail.parameters += ';' + insuredDetail.codeArr[i]
                    }
                }
                root.getJsonDatas('/json/premCalc', {
                    "trialProductList": [
                        {
                            "productId": insuredDetail.productInfo.productId,
                            "parameters": insuredDetail.parameters
                        }
                    ]
                }, function (data) {
                    insuredDetail.premiums = (data.trialProductList[0].premium / 100).toFixed(2) + '';
                    insuredDetail.btnStatus = true;
                }, false);
            }
        }
    }

    function getProInfo(productId) {
        insuredDetail.isSelected = 0;
        insuredDetail.premiums = 0;
        insuredDetail.productInfo = {};
        root.getJsonData(
            "/newProduct/productInfo",
            {
                "productId": productId
            },
            function (data) {
                console.log(data);
                insuredDetail.productInfo = data;
                insuredDetail.isHealthInformed = data.isHealthInformed;
                insuredDetail.productComments = data.productComments;
                if(data.dutyProduct.length != 0){
                    insuredDetail.dutyProduct = data.dutyProduct;
                }
                $.cookie("productData", JSON.stringify(data.productComments));
                insuredDetail.productRemarkImg = data.productComments[0].proCommDetailList[0].productCommentFilePath;
                insuredDetail.ageInterval = tools.getAgeInterval(insuredDetail.productInfo.beginAge, insuredDetail.productInfo.endAge);
                if (data.premiumCalcMethod == '1') {
                    insuredDetail.btnStatus = true;
                    var str = data.productRates[0].productRateId;
                    data.productRates.forEach(function (v, k) {
                        if (v.productRateId == str) {
                            insuredDetail.premiums = (v.premiums / 100).toFixed(2) + '';
                        }
                    });
                }
                if (data.premiumCalcMethod == '2') {
                    insuredDetail.btnStatus = false;
                    insuredDetail.birthday = '';
                    insuredDetail.codeArr = new Array(data.productMetas.length);
                    insuredDetail.premiums = insuredDetail.premiums.toFixed(2) + ''
                }
            },
            false
        );
    }

    //当生日发生变化时试算保费
    insuredDetail.$watch("birthday", function (newVul, oldVul, c) {
        if (!tools.calculateAge(newVul, insuredDetail.productInfo.beginAge, insuredDetail.productInfo.endAge, null)) {
            insuredDetail.birthday = '';
            root.hint('年龄需在' + insuredDetail.ageInterval);
            var premiums = 0;
            insuredDetail.premiums = premiums.toFixed(2) + '';
            insuredDetail.btnStatus = false;
            return false;
        }
        var num = 0;
        for (var i = 0; i < insuredDetail.codeArr.length; i++) {
            if (insuredDetail.codeArr[i] == undefined) {
                num++;
            }
        }
        if (num < 2) {
            insuredDetail.birthday = newVul;
            insuredDetail.codeArr.forEach(function (v, k) {
                if (v == undefined || v.indexOf('birthday') > -1) {
                    insuredDetail.codeArr[2] = 'birthday=' + tools.getTurnDate(insuredDetail.birthday)
                }
            });
            getPremiums();
        }
    });
    return avalon.controller(function ($ctrl) {
        $ctrl.$onEnter = function (param) {
            $.cookie("productData", '');
            insuredDetail.productId = param.productId;
            getProInfo(param.productId);
        };
        $ctrl.$onRendered = function () {
        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [insuredDetail];
    });
});