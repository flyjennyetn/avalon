/**
 * Created by cui on 2016/11/9.
 */
define(['../../css/inputInfo.scss'], function() {
    var root = avalon.vmodels.root;
    var inputInfo = avalon.define({
        $id: "inputInfo",
        productName: '',        //产品名称
        price:'',               //价格
        effectiveDateFlag: '0', //起保日期是否支持自选  0-否，  1-是
        holderProvinceList: [], //省份
        holderCityList:[],      //市
        holderAreaList:[],      //区
        productType: '',//产品类别
        insuredProvinceList: [],
        insuredCityList: [],
        insuredAreaList: [],
        ageInterval: '',        //成保年龄区间
        minAge: '',             //最小年龄
        maxAge: '',             //最大年龄
        isSaveInsured: "1",//是否保存被保人信息0否1是
        insuredRelationId:'',
        holderRelationId: '',
        getRelationArr: [],//常用联系人
        showAsHiddenStatus: false,
        isSelf: '',//是否限制本人购买 0——否  1——是
        flag:'',    //是否为本人
        holderChineseName: '',
        insuredChineseName: '',
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
            userId:JSON.parse(localStorage.getItem('userInfo')).regCode,//用户Id
            premiums: "",//保费
            busiType: "0",//交易类型（0新契约）
            salesChannel: "sc-04",
            insCode: "20160001",
            underwriteDate: "",
        },
        item: {
            insuranceBeginDate: tools.genTomorrowDate(),//保障开始时间
            insuranceEndDate: "",//保障结束时间
            insurancePeriod: "",//保障期限
            mult: "1",//保险份数
            isFree: "1"
        },
        product: {
            productId: "",//产品id
            insProductCode: ""//保险公司险种代码
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
            jobCateId: "",//职业类别
            citizenship: "CHN",//国籍
            orderId: "",//
            insuranceServicesCode: "",//
            serviceArea: "",//
            cardEndDate: "",//
            cardStartDate: "",//
            income:''           //年收入
        },
        insuredList: [
            {
                "insuredBirthday": "",//被保人生日
                "isLegal": "1",//是否法定受益人（1是0否）
                "insuredName": "",//被保人姓名
                "insuredSex": "",//被保人性别
                "insuredEmail": "",//被保人邮箱
                "residentAddress": "-1",//被保人常住区县代码
                "insuredZip": "",//被保人邮箱
                "residentCity": "-1",//被保人常住城市代码
                "insuredRelation": "0",//投被保险人关系
                "insuredPhone": "",//被保人手机号
                "insuredCardNo": "",//被保人证件号
                "insuredCardType": "1",//证件类型
                "residentProvince": "-1",//被保人常住省份代码
                "insuredAddress": "",//页面填写地址
                "insuredFullAddress": "",//  被保人地址
                "citizenship": "CHN",//国籍
                "income": "",//被保人年收入
                "maritalStatus": "",//
                "cardStartDate": "",//
                "height": "",//
                "industry": "",//
                "orderId": "",//
                "work": "",//
                "cardEndDate": "",//
                "weightl": "",//
                benefitList: [
                    {
                        "benType": "",//受益人类别
                        "benefitEmail": "",//受益人邮箱
                        "benefitName": "",//受益人姓名
                        "benefitZip": "",//受益人邮箱
                        "benefitSex": "",//受益人性别
                        "benefitBirthday": "",//受益人生日
                        "residentProvince": "",//受益人常住省份代码
                        "benefitRelation": "",//受益人被保人关系
                        "benefitCardNo": "",//受益人证件号
                        "benefitPhone": "",//受益人手机号
                        "benefitCardType": "",//受益人证件类型
                        "residentCity": "",//受益人常住城市代码
                        "benefitOrder": "",//受益顺序（默认1）
                        "residentAddress": "",//常住地区代码
                        "benefitAddress": "",//页面填写地址
                        "benefitFullAddress": "",//受益人地址
                        "benefitScale": "",//
                        "orderId": ""//
                    }
                ]
            }
        ],
        areaChange: function (level, type, code) {
            getAreaList(level, type, code);
        },
        //通过身份证号获取生日与性别
        cardNoBlur: function (cardNoVul, type) {     //type：1为投保人，2为被保人
                if (type == '1') {
                    inputInfo.holderInfo.holderBirthday = tools.GetBirthday(cardNoVul);   //获取出生日期
                    inputInfo.holderInfo.holderSex = tools.maleOrFemalByIdCard(cardNoVul); //性别
                } else if (type == '2') {
                    if (inputInfo.insuredList[0].insuredBirthday == '') {
                        inputInfo.insuredList[0].insuredBirthday = tools.GetBirthday(cardNoVul);
                        tools.calculateAge(tools.GetBirthday(cardNoVul), inputInfo.minAge, inputInfo.maxAge, null)
                    } else {
                        if (inputInfo.insuredList[0].insuredBirthday == tools.GetBirthday(cardNoVul)) {
                            inputInfo.insuredList[0].insuredBirthday = tools.GetBirthday(cardNoVul);   //获取出生日期
                        } else {
                            root.hint("您输入的身份证号与试算出生日期不匹配");
                            inputInfo.insuredList[0].insuredCardNo = '';
                            return false;
                        }
                    }
                    inputInfo.insuredList[0].insuredSex = tools.maleOrFemalByIdCard(cardNoVul); //性别
                }
        },
        submitInfo:function(){
            var isCheck = checkFrom();
            var isCheck1 = checkFrom1();
            if (inputInfo.insuredList[0].insuredRelation == 0) {

                if(isCheck.status){
                    if (!tools.calculateAge(inputInfo.holderInfo.holderBirthday,inputInfo.minAge,inputInfo.maxAge, null)) {
                        root.hint("被保人年龄需在" + inputInfo.ageInterval);
                        return false;
                    }
                    if (inputInfo.insuredList[0].insuredRelation == 0 && inputInfo.insuredList[0].insuredBirthday && inputInfo.holderInfo.holderBirthday != inputInfo.insuredList[0].insuredBirthday) {
                        root.hint("您输入的身份证号与试算出生日期不匹配");
                        return false;
                    };
                    postInfo();
                }else{
                    if (isCheck.msg != '') {
                        root.hint(isCheck.msg);//弹出错误提示
                    }else if(isCheck1.msg != ''){
                        root.hint(isCheck1.msg);//弹出错误提示
                    }
                    return false;
                }

            }else{
                if(isCheck.status&&isCheck1.status){
                    if (!tools.calculateAge(inputInfo.holderInfo.holderBirthday,inputInfo.minAge,inputInfo.maxAge, null)) {
                        root.hint("被保人年龄需在" + inputInfo.ageInterval);
                        return false;
                    }
                    if (inputInfo.insuredList[0].insuredRelation == 0 && inputInfo.insuredList[0].insuredBirthday && inputInfo.holderInfo.holderBirthday != inputInfo.insuredList[0].insuredBirthday) {
                        root.hint("您输入的身份证号与试算出生日期不匹配");
                        return false;
                    };
                    postInfo();
                }else{
                    if (isCheck.msg != '') {
                        root.hint(isCheck.msg);//弹出错误提示
                    }else if(isCheck1.msg != ''){
                        root.hint(isCheck1.msg);//弹出错误提示
                    }
                    return false;
                }
            };
        },
        changePerson: function (id, type) {
            if(id == '-1'&&type == 'holder'){
                inputInfo.holderInfo.holderName = '';
                inputInfo.holderInfo.holderCardNo = '';
                inputInfo.holderInfo.holderPhone = '';
                inputInfo.holderInfo.holderEmail = '';
                inputInfo.holderInfo.holderZip = '';
                inputInfo.holderInfo.holderAddress = '';
                inputInfo.holderInfo.residentProvince = '-1';
                inputInfo.holderInfo.residentCity = '-1';
                inputInfo.holderInfo.residentAddress = '-1';
            }else if(id == '-1'&&type == 'insured'){
                inputInfo.insuredList[0].insuredName = '';
                inputInfo.insuredList[0].insuredCardNo = '';
                inputInfo.insuredList[0].insuredPhone = '';
                inputInfo.insuredList[0].insuredEmail = '';
                inputInfo.insuredList[0].insuredZip = '';
                inputInfo.insuredList[0].insuredAddress = '';
                inputInfo.insuredList[0].residentProvince = '-1';
                inputInfo.insuredList[0].residentCity = '-1';
                inputInfo.insuredList[0].residentAddress = '-1';
            }
            inputInfo.getRelationArr.forEach(function (v, k) {
                if (v.id == id) {
                    if (type == 'holder') {
                        inputInfo.holderInfo.holderName = v.partyName;
                        inputInfo.holderInfo.holderCardNo = v.certyCode;
                        inputInfo.holderInfo.holderPhone = v.mobile;
                        inputInfo.holderInfo.holderEmail = v.email;
                        inputInfo.holderInfo.holderZip = v.postCode;
                        inputInfo.holderInfo.residentProvince = v.provinceId;
                        getAreaList('1', '2', v.provinceId);
                        inputInfo.holderInfo.residentCity = v.cityId;
                        getAreaList('1', '3', v.cityId);
                        inputInfo.holderInfo.residentAddress = v.countyId;
                        inputInfo.holderInfo.holderAddress = v.address;
                        inputInfo.cardNoBlur(inputInfo.holderInfo.holderCardNo,'1');
                    }
                    if (type == 'insured') {
                        inputInfo.insuredList[0].insuredName = v.partyName;
                        inputInfo.insuredList[0].insuredCardNo = v.certyCode;
                        inputInfo.insuredList[0].insuredPhone = v.mobile;
                        inputInfo.insuredList[0].insuredEmail = v.email;
                        inputInfo.insuredList[0].insuredZip = v.postCode;
                        inputInfo.insuredList[0].residentProvince = v.provinceId;
                        getAreaList('2', '2', v.provinceId);
                        inputInfo.insuredList[0].residentCity = v.cityId;
                        getAreaList('2', '3', v.cityId);
                        inputInfo.insuredList[0].residentAddress = v.countyId;
                        inputInfo.insuredList[0].insuredAddress = v.address;
                        inputInfo.cardNoBlur(inputInfo.insuredList[0].insuredCardNo,'2');
                    }
                }
            });
        }
    });
    inputInfo.item.$watch("insuranceBeginDate", function (newVul, oldVul) {
        if (newVul != tools.genTomorrowDate()){
            if (new Date(newVul) < new Date(tools.genTomorrowDate())) {
                root.hint('起保日期不能早于次日日期');
                inputInfo.item.insuranceBeginDate = tools.genTomorrowDate();
                return false;
            }
            inputInfo.item.insuranceBeginDate = newVul;
            inputInfo.item.insuranceEndDate = tools.getEndDate(inputInfo.item.insuranceBeginDate, inputInfo.item.insurancePeriod);
        }
    });
    inputInfo.insuredList[0].$watch("insuredRelation", function (a, b) {
        if (inputInfo.insuredList[0].insuredRelation != 0) {
            inputInfo.showAsHiddenStatus = true;
        } else {
            inputInfo.showAsHiddenStatus = false;
        }
    });
    inputInfo.$watch("checkedStatus", function (a, b) {                 //是否保存常用联系人
        if(a){
            inputInfo.isSaveInsured = 1;
        } else {
            inputInfo.isSaveInsured = 0;
        }
    });
    inputInfo.insuredList[0].$watch("residentAddress", function (a, b) {
        if(a!='-1'){
            getAreaName('3', inputInfo.insuredList[0].residentAddress, 'insured');
        }
    });
    inputInfo.holderInfo.$watch("residentAddress", function (a, b) {
       if(a!='-1'){
           getAreaName('3', inputInfo.holderInfo.residentAddress, 'holder');
       }
    });
    function getAreaName(areaType, code, type) {
        root.getJsonDatas(
            "/province/getProvinceName",
            {
                "provinces": areaType,
                "code": code
            },
            function (data) {
                //console.log(data);
                if (type == 'holder') {
                    inputInfo.holderChineseName = data.name;
                } else {
                    inputInfo.insuredChineseName = data.name;
                }
            },
            false
        );
    }
    function postInfo(){                    //提交表单信息
        inputInfo.holderInfo.holderFullAddress = inputInfo.holderChineseName + inputInfo.holderInfo.holderAddress;
        inputInfo.insuredList[0].insuredFullAddress = inputInfo.insuredChineseName + inputInfo.insuredList[0].insuredAddress;
        var inputtedInfo = {
            isSaveInsured: inputInfo.isSaveInsured,
            coreNeedVar: inputInfo.coreNeedVar,//代理人
            order:inputInfo.order,
            item: inputInfo.item,
            product:inputInfo.product,
            holderInfo:inputInfo.holderInfo,
            insuredList:inputInfo.insuredList
        };
        root.getJsonData(
            "/insure/newUnderwriting", inputtedInfo,
            function (data) {
                console.log(data);
                if (data.resultCode == '10') {
                    var orderId = data.orderId;
                    location.href = "#!/confirmInfo/" + orderId + '/' + inputInfo.productType;
                }
            },
            false
        )
    }
    function checkFrom(){
        var res = {};
        res['status'] = true;
        res['msg'] = '';
        if(!tools.validCredNum("name",inputInfo.holderInfo.holderName)){
            res['status'] = false;
            res['msg'] = '请输入投保人姓名，2~10位汉字';
        }else if(!tools.validCredNum("1",inputInfo.holderInfo.holderCardNo)){
            res['status'] = false;
            res['msg'] = '请填写正确格式的投保人身份证号';
        }else if(!tools.validCredNum("",inputInfo.holderInfo.residentProvince)||!tools.validCredNum("",inputInfo.holderInfo.residentCity)||!tools.validCredNum("",inputInfo.holderInfo.residentAddress)){
            res['status'] = false;
            res['msg'] = '投保人地址填写有误，请完善';
        }else if(!tools.validCredNum("",inputInfo.holderInfo.holderAddress)){
            res['status'] = false;
            res['msg'] = '请输入投保人详细地址';
        }else if(!tools.validCredNum("postCode",inputInfo.holderInfo.holderZip)){
            res['status'] = false;
            res['msg'] = '请填写正确格式的投保人邮编';
        }else if(!tools.validCredNum("mobile",inputInfo.holderInfo.holderPhone)){
            res['status'] = false;
            res['msg'] = '请填写正确格式的投保人手机号';
        }else if(!tools.validCredNum("email",inputInfo.holderInfo.holderEmail)){
            res['status'] = false;
            res['msg'] = '请填写正确格式的投保人邮箱';
        }
        return res;
    }

    function checkFrom1(){
        var res = {};
        res['status'] = true;
        res['msg'] = '';
        if(!tools.validCredNum("name",inputInfo.insuredList[0].insuredName)){
            res['status'] = false;
            res['msg'] = '请输入被保人2~10位汉字';
        }else if(!tools.validCredNum("1",inputInfo.insuredList[0].insuredCardNo)){
            res['status'] = false;
            res['msg'] = '请填写正确格式的被保人身份证号';
        }else if(!tools.validCredNum("",inputInfo.insuredList[0].residentProvince)||!tools.validCredNum("",inputInfo.insuredList[0].residentCity)||!tools.validCredNum("",inputInfo.insuredList[0].residentAddress)){
            res['status'] = false;
            res['msg'] = '被保人地址填写有误，请完善';
        }else if(!tools.validCredNum("",inputInfo.insuredList[0].insuredAddress)){
            res['status'] = false;
            res['msg'] = '请输入被保人详细地址';
        }else if(!tools.validCredNum("postCode",inputInfo.insuredList[0].insuredZip)){
            res['status'] = false;
            res['msg'] = '请填写正确格式的被保人邮编';
        }else if(!tools.validCredNum("mobile",inputInfo.insuredList[0].insuredPhone)){
            res['status'] = false;
            res['msg'] = '请填写正确格式的被保人手机号';
        }else if(!tools.validCredNum("email",inputInfo.insuredList[0].insuredEmail)){
            res['status'] = false;
            res['msg'] = '请填写正确格式的被保人邮箱';
        }
        return res;
    }
    //获取省市区
    function getAreaList(level, type, code) {
        root.getJsonDatas(
            "/province/getProvince",
            {
                "provinces": type,
                "parentCode": code
            },
            function (data) {
                if (type == 1) {
                    if (level == 1) {
                        inputInfo.holderProvinceList = data.provinceList;
                        inputInfo.holderCityList = [];
                        inputInfo.holderAreaList = [];
                    } else {
                        inputInfo.insuredProvinceList = data.provinceList;
                        inputInfo.insuredCityList = [];
                        inputInfo.insuredAreaList = [];
                    }
                }
                if (type == 2) {
                    if (level == 1) {
                        inputInfo.holderCityList = data.provinceList;
                        inputInfo.holderAreaList = [];
                    } else {
                        inputInfo.insuredCityList = data.provinceList;
                        inputInfo.insuredAreaList = [];
                    }
                }
                if (type == 3) {
                    if (level == 1) {
                        inputInfo.holderAreaList = data.provinceList;
                    } else {
                        inputInfo.insuredAreaList = data.provinceList;
                    }
                }
            },
            false
        )
    }
    //获取产品详情
    function getInfo(productId) {
        root.getJsonData(
            "/newProduct/productInfo",
            {
                "productId": productId
            },
            function (data) {
                inputInfo.productName = data.productName;
                //inputInfo.price = data.price;
                inputInfo.isSelf = data.isSelf;
                inputInfo.productType = data.productType;
                inputInfo.effectiveDateFlag = data.effectiveDateFlag;
                inputInfo.minAge = data.beginAge;
                inputInfo.maxAge = data.endAge;
                inputInfo.ageInterval = tools.getAgeInterval(data.beginAge, data.endAge);
                inputInfo.product.productId = data.productId;
                inputInfo.item.insurancePeriod = data.guaranteePeriod;
                inputInfo.item.insuranceEndDate = tools.getEndDate(inputInfo.item.insuranceBeginDate, data.guaranteePeriod);
            },
            false
        );
    }
    //获取常用联系人
    function getRelationList() {
        root.getJsonDatas(
            "/cust/queryCustomer",
            {
                "userId":JSON.parse(localStorage.getItem('userInfo')).regCode
            },
            function (data) {
                inputInfo.getRelationArr = data.custList;
            },
            false
        );
    }
    return avalon.controller(function($ctrl) {
        $ctrl.$onEnter = function(param) {
            $('body,html').animate({scrollTop: 0}, 200);
            inputInfo.order.premiums = param.premiums * 100;
            param.parameters.split(';').forEach(function (v, k) {
                if (v.indexOf('coverage') > -1) {
                    inputInfo.item.insurancePeriod = v.split('=')[1];
                }
                if (v.indexOf('birthday') > -1) {
                    var birthday = v.split('=')[1];
                    inputInfo.insuredList[0].insuredBirthday = birthday.substring(0, 4) + '-' + birthday.substring(4, 6) + '-' + birthday.substring(6, 8);
                }
            });
            getInfo(param.productId);
            getAreaList(1, 1,'');
            getAreaList(0, 1,'' );
            getRelationList();
        };
        $ctrl.$onRendered = function() {};
        $ctrl.$onBeforeUnload = function() {

        };
        $ctrl.$vmodels = [inputInfo];
    });
});