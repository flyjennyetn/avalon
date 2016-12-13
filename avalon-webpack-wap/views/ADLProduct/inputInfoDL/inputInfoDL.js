/**
 * Created by Smart on 2016/12/5.
 */
define(["../../../css/inputInfoDL.scss"], function (swiper) {
    var root = avalon.vmodels.root;
    var inputInfoDL = avalon.define({
        $id: "inputInfoDL",
        volume: '',//购买份数
        premiums: '',//保费
        share: '',//快速选择份额
        productId: '',//产品ID
        productName: '',//产品名称
        CardNoTime: '0',  //投保人有效期
        LCardNoTime: '0',  //被保人有效期
        BCardNoTime: '0',  //收益人有效期
        flag: false,
        Lflag: false,
        Bflag: false,
        isshow:true,
        Status: false,
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
        subtract: function () {//减少份数
            inputInfoDL.volume--;
        },
        add: function () {//增加份数
            inputInfoDL.volume++;
        },
        selectShare: function (vul) {
            inputInfoDL.volume = vul;
            inputInfoDL.share = vul;
        },
        coreNeedVar: {
            subSalesChannel: "0900",
            policyChannel: "03",
            payMode: "09",
            payFrequency: "S",
            payModeRenew: "09",
            agentCode: '86110077Y000150',//代理人编码  测试先写死
            onlineFlag: "1"
        },
        order: {
            //userId: JSON.parse(localStorage.getItem('userInfo')).regCode,//用户Id
            userId:'',//用户Id
            premiums: "",//保费
            busiType: "0",//交易类型（0新契约）
            salesChannel: "dy-01",
            insCode: "20160001",
            underwriteDate: "",
            orderId:''
        },
        item: {
            insuranceBeginDate: tools.genTomorrowDate(),//保障开始时间
            insuranceEndDate: "",//保障结束时间
            insurancePeriod: "",//保障期限
            mult: "",//保险份数
            isFree: "0"
        },
        product: {
            productId: '',//产品id
            //insProductCode: ""//保险公司险种代码
        },
        holderInfo: {
            lbsProvince: "",//定位省份代码
            holderCardType: "1",//证件类型
            holderCardNo: "",//证件号
            holderZip: "",//邮编
            residentProvince: "-1",//常住省份代码
            holderSex: "",//性别
            holderName: "",//投保人姓名
            holderBirthday: "",//投保人生日
            residentAddress: "-1",//投保人常住区县代码
            residentCity: "-1",//投保人常住城市代码
            lbsCity: "",//定位省份代码
            holderPhone: "",//投保人手机号
            holderEmail: "",//投保人邮箱
            holderAddress: "",//投保人地址页面填写
            holderFullAddress: "",//投保人详细地址
            jobCateId: "1201002",//职业类别
            citizenship: "CHN",//国籍
            insuranceServicesCode: "",//
            serviceArea: "",//
            cardEndDate: "",//
            cardStartDate: "",//
            income:''           //年收入
        },
        insuredList: [
            {
                insuredBirthday: "",//被保人生日
                isLegal: "1",//是否法定受益人（1是0否）
                insuredName: "",//被保人姓名
                insuredSex: "",//被保人性别
                insuredEmail: "",//被保人邮箱
                residentAddress: "-1",//被保人常住区县代码
                insuredZip: "",//被保人邮箱
                residentCity: "-1",//被保人常住城市代码
                insuredRelation: "00",//投被保险人关系
                insuredPhone: "",//被保人手机号
                insuredCardNo: "",//被保人证件号
                insuredCardType: "1",//证件类型
                residentProvince: "-1",//被保人常住省份代码
                insuredAddress: "",//页面填写地址
                insuredFullAddress: "",//  被保人地址
                citizenship: "CHN",//国籍
                income: "",//被保人年收入
                maritalStatus: "",//
                cardStartDate: "",//
                height: "",//
                industry: "",//
                work: "",//
                cardEndDate: "",//
                weightl: "",//
                benefitList: [
                    {
                        benType: "1",//受益人类别
                        benefitEmail: "",//受益人邮箱
                        benefitName: "",//受益人姓名
                        benefitZip: "",//受益人邮箱
                        benefitSex: "",//受益人性别
                        benefitBirthday: "",//受益人生日
                        residentProvince: "",//受益人常住省份代码
                        benefitRelation: "",//受益人被保人关系
                        benefitCardNo: "",//受益人证件号
                        benefitPhone: "",//受益人手机号
                        benefitCardType: "1",//受益人证件类型
                        residentCity: "",//受益人常住城市代码
                        benefitOrder: "1",//受益顺序（默认1）
                        residentAddress: "",//常住地区代码
                        benefitAddress: "",//页面填写地址
                        benefitFullAddress: "",//受益人地址
                        benefitScale: "1",//收益比例
                        cardEndDate:''          //证件到期日
                    }
                ]
            }
        ],
        getDate: function (time, type) {            //证件有效期1:投保人，2:被保人
            if (type == '1') {
                if (time == '' || typeof time == 'undefined') {
                    root.hint('请填写投保人证件有效期');
                    $('#Hdate').focus();
                } else {
                    inputInfoDL.holderInfo.cardEndDate = tools.getNewDate(time);
                }
                if (time != '') {
                    if (new Date(inputInfoDL.holderInfo.cardEndDate) < new Date(tools.genCurrentDate())) {
                        inputInfoDL.holderInfo.cardEndDate = tools.genCurrentDate();
                        root.hint('投保人证件有效期不能早于当日');
                        $('#Hdate').focus();
                    }
                }
            }
            if (type == '2' && time != '') {
                if (time == '' || typeof time == 'undefined') {
                    root.hint('请填写投保人证件有效期');
                    $('#Idate').focus();
                } else {
                    inputInfoDL.insuredList[0].cardEndDate = tools.getNewDate(time);
                }
                if (time != '' && typeof time != 'undefined') {
                    if (new Date(inputInfoDL.insuredList[0].cardEndDate) < new Date(tools.genCurrentDate())) {
                        inputInfoDL.insuredList[0].cardEndDate = tools.genCurrentDate();
                        root.hint('被保人证件有效期不能早于当日');
                        $('#Idate').focus();
                    }
                    ;
                }
            };
            if (type == '3') {
                if (time == '' || typeof time == 'undefined') {
                    root.hint('请填写投保人证件有效期');
                    $('#Bdate').focus();
                } else {
                    inputInfoDL.insuredList[0].benefitList[0].cardEndDate = tools.getNewDate(time);
                }
                if (time != '') {
                    if (new Date(inputInfoDL.insuredList[0].benefitList[0].cardEndDate) < new Date(tools.genCurrentDate())) {
                        inputInfoDL.insuredList[0].benefitList[0].cardEndDate = tools.genCurrentDate();
                        root.hint('投保人证件有效期不能早于当日');
                        $('#Bdate').focus();
                    }
                    ;
                }
            };
        },
        validity: function (e, type) {                  //投保人身份证有效期
            if (type == '1') {
                if (e == '0') {
                    inputInfoDL.flag = false;
                    inputInfoDL.holderInfo.cardEndDate = '';
                } else {
                    inputInfoDL.flag = true;
                }
            }
            ;
            if (type == '2') {
                if (e == '0') {
                    inputInfoDL.Lflag = false;
                    inputInfoDL.insuredList[0].cardEndDate = '';
                } else {
                    inputInfoDL.Lflag = true;
                }
            }
            ;
            if (type == '3') {
                if (e == '0') {
                    inputInfoDL.Bflag = false;
                    inputInfoDL.insuredList[0].benefitList[0].cardEndDate = ''
                } else {
                    inputInfoDL.Bflag = true;
                }
            }
        },
        cardNoBlur: function (cardNoVul, type) {     //type：1为投保人，2为被保人
            if (type == '1' && cardNoVul != '') {
                inputInfoDL.holderInfo.holderBirthday = tools.GetBirthday(cardNoVul);   //获取出生日期
                inputInfoDL.holderInfo.holderSex = tools.maleOrFemalByIdCard(cardNoVul); //性别
            }
            if (type == '2' && cardNoVul != '') {
                inputInfoDL.insuredList[0].insuredBirthday = tools.GetBirthday(cardNoVul);   //获取出生日期
                inputInfoDL.insuredList[0].insuredSex = tools.maleOrFemalByIdCard(cardNoVul); //性别
            }
            if (type == '3' && cardNoVul != '') {
                inputInfoDL.insuredList[0].benefitList[0].benefitBirthday = tools.GetBirthday(cardNoVul);   //获取出生日期
                inputInfoDL.insuredList[0].benefitList[0].benefitSex = tools.maleOrFemalByIdCard(cardNoVul); //性别
            }
        },
        fullInfo:function(code,type){
            getFull(code,type);
        },
        submitInfo: function () {
            init();
            if (inputInfoDL.insuredList[0].insuredRelation == '00' && inputInfoDL.insuredList[0].isLegal == '1') {
                if (checkFrom().status == false) {
                    root.hint(checkFrom().msg);
                    return false;
                }
                if (!tools.validCredNum('', inputInfoDL.insuredList[0].height)) {
                    root.hint('请填写被保人身高');
                    return false;
                } else if (!tools.validCredNum('', inputInfoDL.insuredList[0].weightl)) {
                    root.hint('请填写被保人体重');
                    return false;
                }
            } else if (inputInfoDL.insuredList[0].insuredRelation == '00' && inputInfoDL.insuredList[0].isLegal != '1') {
                if (checkFrom().status == false) {
                    root.hint(checkFrom().msg);
                    return false;
                }
                if (!tools.validCredNum('', inputInfoDL.insuredList[0].height)) {
                    root.hint('请填写被保人身高');
                    return false;
                } else if (!tools.validCredNum('', inputInfoDL.insuredList[0].weightl)) {
                    root.hint('请填写被保人体重');
                    return false;
                }
                if (checkFrom2().status == false) {
                    root.hint(checkFrom2().msg)
                    return false;
                };
            } else if (inputInfoDL.insuredList[0].insuredRelation != '00' && inputInfoDL.insuredList[0].isLegal == '1') {
                if (checkFrom().status == false) {
                    root.hint(checkFrom().msg)
                    return false;
                };
                if (checkFrom1().status == false) {
                    root.hint(checkFrom1().msg)
                    return false;
                };
            } else {

                if (checkFrom().status == false) {
                    root.hint(checkFrom().msg)
                    return false;
                };
                if (checkFrom1().status == false) {
                    root.hint(checkFrom1().msg)
                    return false;
                };
                if (checkFrom2().status == false) {
                    root.hint(checkFrom2().msg)
                    return false;
                };
            }
            if (!tools.validCredNum('', inputInfoDL.coreNeedVar.agentCode)) {
                root.hint('请填写代理人编码');
                return false;
            }
            postInfo();
        }
    })

    function init() {        //初始化
        if (inputInfoDL.productId == '100003') {
            inputInfoDL.item.insurancePeriod = '10Y';            //保障期限
            inputInfoDL.productName = '君康多利1号两全保险（万能型）';
            inputInfoDL.item.insuranceEndDate = tools.getEndDate(inputInfoDL.item.insuranceBeginDate, inputInfoDL.item.insurancePeriod);        //保障结束日
        }
        ;
        if (inputInfoDL.productId == '100004') {
            inputInfoDL.item.insurancePeriod = '10Y';  //保障期限
            inputInfoDL.productName = '君康多利2号两全保险（万能型）';
            inputInfoDL.item.insuranceEndDate = tools.getEndDate(inputInfoDL.item.insuranceBeginDate, inputInfoDL.item.insurancePeriod);      //保障结束日
        };
        if(inputInfoDL.insuredList[0].insuredRelation == '00'&& typeof inputInfoDL.insuredList[0].insuredRelation!='undefined'){
            inputInfoDL.insuredList[0].insuredName = inputInfoDL.holderInfo.holderName;     //姓名
            inputInfoDL.insuredList[0].insuredSex = inputInfoDL.holderInfo.holderSex;     //性别
            inputInfoDL.insuredList[0].insuredBirthday = inputInfoDL.holderInfo.holderBirthday;     //生日
            inputInfoDL.insuredList[0].insuredCardNo = inputInfoDL.holderInfo.holderCardNo; //身份证号
            inputInfoDL.insuredList[0].cardEndDate= inputInfoDL.holderInfo.cardEndDate;     //结束日期
            inputInfoDL.insuredList[0].insuredPhone= inputInfoDL.holderInfo.holderPhone;     //手机号
            inputInfoDL.insuredList[0].insuredEmail= inputInfoDL.holderInfo.holderEmail;     //邮箱
            inputInfoDL.insuredList[0].residentProvince= inputInfoDL.holderInfo.residentProvince;     //省份
            inputInfoDL.insuredList[0].residentCity= inputInfoDL.holderInfo.residentCity;     //城市
            inputInfoDL.insuredList[0].residentAddress= inputInfoDL.holderInfo.residentAddress;     //区域
            inputInfoDL.insuredList[0].insuredAddress= inputInfoDL.holderInfo.holderAddress;     //详细地区
        };
        if(localStorage.getItem('orderId')){
            inputInfoDL.order.orderId = localStorage.getItem('orderId');
        }else{
            inputInfoDL.order.orderId = '';
        };
        inputInfoDL.order.premiums = inputInfoDL.premiums;            //保费
        inputInfoDL.product.productId = inputInfoDL.productId;      //产品ID
        inputInfoDL.item.mult = inputInfoDL.volume;           //购买份数
        inputInfoDL.holderInfo.lbsProvince = inputInfoDL.holderInfo.residentProvince;
        inputInfoDL.holderInfo.lbsCity = inputInfoDL.holderInfo.residentCity;
    }
    function getFull(code,type){
        if(type == 'h'){
            for(var i = 0;i<inputInfoDL.arr3.length;i++){
                if(code == inputInfoDL.arr3[i].code){
                    inputInfoDL.holderInfo.holderFullAddress = inputInfoDL.arr3[i].name+inputInfoDL.holderInfo.holderAddress;
                }
            }
        };
        if(type == 'b'){
            for(var i = 0;i<inputInfoDL.arr3.length;i++){
                if(code == inputInfoDL.arr3[i].code){
                    inputInfoDL.insuredList[0].insuredFullAddress = inputInfoDL.arr3[i].name+inputInfoDL.insuredList[0].insuredAddress;
                }
            }
        }
    }
    function postInfo() {                    //提交表单信息
        var inputtedInfo = {
            isSaveInsured: '1',
            coreNeedVar: inputInfoDL.coreNeedVar,//代理人
            order: inputInfoDL.order,
            item: inputInfoDL.item,
            product: inputInfoDL.product,
            holderInfo: inputInfoDL.holderInfo,
            insuredList: inputInfoDL.insuredList
        };
        root.getJsonData(
            "/insure/newUnderwriting", inputtedInfo,
            function (data) {
                if (data.resultCode !='10'&& typeof data.resultCode!='undefined') {
                    localStorage.setItem('orderId',data.result.orderId);
                }else if(data.resultCode =='10'){
                    window.location.href = '#!/healthTold/'+data.orderId;
                    localStorage.removeItem('orderId');
                }
            },
            false,'dy-01'
        )
    }

    function checkFrom() {
        var res = {};
        res['status'] = true;
        res['msg'] = '';
        if (!tools.validCredNum("name", inputInfoDL.holderInfo.holderName)) {
            res['status'] = false;
            res['msg'] = '请输入投保人姓名，2~10位汉字';
        } else if (!tools.validCredNum("1", inputInfoDL.holderInfo.holderCardNo)) {
            res['status'] = false;
            res['msg'] = '请填写正确格式的投保人身份证号';
        } else if (tools.getCurrentAge(inputInfoDL.holderInfo.holderBirthday) <= 17) {
            res['status'] = false;
            res['msg'] = '投保人年龄必须要大于18岁';
        } else if (!tools.validCredNum("mobile", inputInfoDL.holderInfo.holderPhone)) {
            res['status'] = false;
            res['msg'] = '请填写正确格式的投保人手机号';
        } else if (!tools.validCredNum("email", inputInfoDL.holderInfo.holderEmail)) {
            res['status'] = false;
            res['msg'] = '请填写正确格式的投保人邮箱';
        } else if (!tools.validCredNum("", inputInfoDL.holderInfo.residentProvince) || !tools.validCredNum("", inputInfoDL.holderInfo.residentCity) || !tools.validCredNum("", inputInfoDL.holderInfo.residentAddress)) {
            res['status'] = false;
            res['msg'] = '投保人地址填写有误，请完善';
        } else if (!tools.validCredNum("", inputInfoDL.holderInfo.holderAddress)) {
            res['status'] = false;
            res['msg'] = '请输入投保人详细地址';
        }
        else if (!tools.validCredNum("number", inputInfoDL.holderInfo.income)) {
            res['status'] = false;
            res['msg'] = '请填写正确格式的投保人年收入（万）';
        }
        return res;
    }

    function checkFrom1() {
        var res = {};
        res['status'] = true;
        res['msg'] = '';
        if (!tools.validCredNum("name", inputInfoDL.insuredList[0].insuredName)) {
            res['status'] = false;
            res['msg'] = '请输入被保人2~10位汉字';
        } else if (!tools.validCredNum("1", inputInfoDL.insuredList[0].insuredCardNo)) {
            res['status'] = false;
            res['msg'] = '请填写正确格式的被保人身份证号';
        } else if (tools.getCurrentAge(inputInfoDL.insuredList[0].insuredBirthday) <= 17 || tools.getCurrentAge(inputInfoDL.insuredList[0].insuredBirthday) >= 66) {
            res['status'] = false;
            res['msg'] = '被保人年龄必须在18周岁（含）-65周岁（含）';
        } else if (!tools.validCredNum("mobile", inputInfoDL.insuredList[0].insuredPhone)) {
            res['status'] = false;
            res['msg'] = '请填写正确格式的被保人手机号';
        } else if (!tools.validCredNum("email", inputInfoDL.insuredList[0].insuredEmail)) {
            res['status'] = false;
            res['msg'] = '请填写正确格式的被保人邮箱';
        } else if (!tools.validCredNum("", inputInfoDL.insuredList[0].residentProvince) || !tools.validCredNum("", inputInfoDL.insuredList[0].residentCity) || !tools.validCredNum("", inputInfoDL.insuredList[0].residentAddress)) {
            res['status'] = false;
            res['msg'] = '被保人地址填写有误，请完善';
        } else if (!tools.validCredNum("", inputInfoDL.insuredList[0].insuredAddress)) {
            res['status'] = false;
            res['msg'] = '请输入被保人详细地址';
        } else if (!tools.validCredNum("number", inputInfoDL.insuredList[0].height)) {
            res['status'] = false;
            res['msg'] = '请填写正确格式的被保人身高（cm）';
        } else if (!tools.validCredNum("number", inputInfoDL.insuredList[0].weightl)) {
            res['status'] = false;
            res['msg'] = '请填写正确格式的被保人体重（kg）';
        } else if (!tools.validCredNum("number", inputInfoDL.insuredList[0].income)) {
            res['status'] = false;
            res['msg'] = '请填写正确格式的被保人年收入（万）';
        }
        return res;
    }

    function checkFrom2() {
        var res = {};
        res['status'] = true;
        res['msg'] = '';
        if (!tools.validCredNum("name", inputInfoDL.insuredList[0].benefitList[0].benefitName)) {
            res['status'] = false;
            res['msg'] = '请输入受益人2~10位汉字';
        } else if (!tools.validCredNum("1", inputInfoDL.insuredList[0].benefitList[0].benefitCardNo)) {
            res['status'] = false;
            res['msg'] = '请填写正确格式的受益人身份证号';
        }
        return res;
    }

    inputInfoDL.$watch('volume', function (newVul, oldVul) {
        if (newVul < 1 && inputInfoDL.productId == '100003') {
            inputInfoDL.volume = 1;
            root.hint("至少购买1份");
        }
        if (newVul < 10 && inputInfoDL.productId == '100004') {
            inputInfoDL.volume = 10;
            root.hint("至少购买10份");
        }
        if (newVul != '50' || newVul != '100' || newVul != '150' || newVul != '200') {
            inputInfoDL.share = '';
        }
        if (newVul == '50' || newVul == '100' || newVul == '150' || newVul == '200') {
            inputInfoDL.share = newVul;
        }
        inputInfoDL.premiums = (1000 * inputInfoDL.volume).toFixed(2)
    });
    inputInfoDL.insuredList[0].$watch("insuredRelation", function (a, b) {
        if (a != 0) {
            inputInfoDL.insuredList[0].insuredName = '';     //姓名
            inputInfoDL.insuredList[0].insuredSex = '';     //性别
            inputInfoDL.insuredList[0].insuredBirthday = ''     //生日
            inputInfoDL.insuredList[0].insuredCardNo = ''; //身份证号
            inputInfoDL.insuredList[0].cardEndDate= '';     //结束日期
            inputInfoDL.insuredList[0].insuredPhone= '';     //手机号
            inputInfoDL.insuredList[0].insuredEmail= '';     //邮箱
            inputInfoDL.insuredList[0].residentProvince= '-1';     //省份
            inputInfoDL.insuredList[0].residentCity= '-1';     //城市
            inputInfoDL.insuredList[0].residentAddress= '-1';     //区域
            inputInfoDL.insuredList[0].insuredAddress= '';     //详细地区
            inputInfoDL.Status = true;
        } else {
            inputInfoDL.Status = false;
        }
    });
    inputInfoDL.insuredList[0].$watch("isLegal", function (a, b) {
        if (a != 0) {
            inputInfoDL.isshow = true;
        } else {
            inputInfoDL.insuredList[0].benefitList[0].benefitName = '';
            inputInfoDL.insuredList[0].benefitList[0].benefitCardNo = '';
            inputInfoDL.insuredList[0].benefitList[0].benefitRelation = '';
            inputInfoDL.insuredList[0].benefitList[0].benefitSex = '';
            inputInfoDL.insuredList[0].benefitList[0].benefitBirthday = '';
            inputInfoDL.isshow = false;
        }
    });
    return avalon.controller(function ($ctrl) {
        $ctrl.$onEnter = function (param) {
            inputInfoDL.productId = param.productId;
            inputInfoDL.volume = param.share;
            inputInfoDL.premiums = (1000 * param.share).toFixed(2);
            init();
        };
        $ctrl.$onRendered = function () {

        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [inputInfoDL];
    });
});