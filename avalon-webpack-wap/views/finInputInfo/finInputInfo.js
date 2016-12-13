/**
 * Created by cui on 2016/11/14.
 */
define(['jquery','layer_', "../../css/finInputInfo.scss"], function ($,layer_) {
    var root = avalon.vmodels.root;
    var finInputInfo = avalon.define({
        $id: "finInputInfo",
        productName:'',
        effectiveDateFlag: '0',//起保日期是否支持自选  0-否，  1-是
        productType: '',//产品类别
        price:'',
        chineseName: '',
        holderProvinceList: [],
        holderCityList: [],
        holderAreaList: [],
        getRelationArr: [],
        holderRelationId:'',
        isSaveInsured: "0",//是否保存被保人信息0否1是
        product: {
            productId: "",//产品id
            insProductCode: ""//保险公司险种代码
        },
        item: {
            insuranceBeginDate: tools.genTomorrowDate(),//保障开始时间
            insuranceEndDate: "",//保障结束时间
            insurancePeriod: "",//保障期限
            insuranceNum: "1"//保险份数
        },
        order: {
            userId:JSON.parse(localStorage.getItem('userInfo')).regCode,//用户Id
            premiums: "",//保费
            busiType: "0"//交易类型（0新契约）
        },
        holderInfo: {
            holderName: "",//投保人姓名
            holderCardType: "1",//证件类型
            holderCardNo: "",//证件号
            holderSex: "",//性别
            holderBirthday: "",//投保人生日
            holderPhone: "",//投保人手机号
            holderEmail: "",//投保人邮箱
            holderZip: "",//邮编
            residentProvince: "-1",//常住省份代码
            residentCity: "-1",//投保人常住城市代码
            residentAddress: "-1",//投保人常住区县代码
            holderAddress: "",//投保人详细地址
            holderFullAddress: "",//投保人详细地址
            lbsProvince: "",//定位省份代码
            lbsCity: ""//定位城市代码
        },
        insuredList: [
            {
                insuredName: "",//被保人姓名
                insuredCardType: "",//证件类型
                insuredCardNo: "",//被保人证件号
                insuredSex: "",//被保人性别
                insuredBirthday: "",//被保人生日
                insuredPhone: "",//被保人手机号
                insuredEmail: "",//被保人邮箱
                insuredZip: "",//被保人邮编
                residentProvince: "-1",//被保人常住省份代码
                residentCity: "-1",//被保人常住城市代码
                residentAddress: "-1",//被保人常住区县代码
                insuredAddress: "",//被保人地址
                insuredFullAddress: "",//被保人地址
                isLegal: "1",//是否法定受益人（1是0否）
                insuredRelation: "0",//投被保险人关系
                benefitList: [
                    {
                        benefitName: "",//受益人姓名
                        benefitCardType: "",//受益人证件类型
                        benefitCardNo: "",//受益人证件号
                        benefitSex: "",//受益人性别
                        benefitBirthday: "",//受益人生日
                        benefitPhone: "",//受益人手机号
                        benefitEmail: "",//受益人邮箱
                        benefitZip: "",//受益人邮编
                        residentProvince: "-1",//受益人常住省份代码
                        residentCity: "-1",//受益人常住城市代码
                        residentAddress: "-1",//受益人常住区县代码
                        benefitAddress: "",//受益人地址
                        benefitFullAddress: "",//受益人地址
                        benefitOrder: "",//受益顺序（默认1）
                        benefitRelation: ""//受益人被保人关系

                    }
                ]
            }
        ],
        submitInfo:function(){
            var isCheck = checkFrom();
            if(isCheck.status){
                finInputInfo.holderInfo.holderFullAddress = finInputInfo.chineseName + finInputInfo.holderInfo.holderAddress;
                finInputInfo.cardNoBlur(finInputInfo.holderInfo.holderCardNo,'1')
                postInfo();
            }else{
                if (isCheck.msg != '') {
                    root.hint(isCheck.msg);//弹出错误提示
                }
            }
        },
        areaChange: function (level, code) {
            getAreaList(level, code);
        },
        changePerson: function (id, type) {
            if(id == '-1'&&type == 'holder'||typeof id == 'undefined'){
                finInputInfo.holderInfo.holderName = '';
                finInputInfo.holderInfo.holderCardNo = '';
                finInputInfo.holderInfo.holderPhone = '';
                finInputInfo.holderInfo.holderEmail = '';
                finInputInfo.holderInfo.holderZip = '';
                finInputInfo.holderInfo.holderAddress = '';
                finInputInfo.holderInfo.residentProvince = '-1';
                finInputInfo.holderInfo.residentCity = '-1';
                finInputInfo.holderInfo.residentAddress = '-1';
            };
            console.log(finInputInfo.getRelationArr)
            finInputInfo.getRelationArr.forEach(function (v, k) {
                if (v.id == id) {
                    if (type == 'holder') {
                        finInputInfo.holderInfo.holderName = v.partyName;
                        finInputInfo.holderInfo.holderCardNo = v.certyCode;
                        finInputInfo.holderInfo.holderPhone = v.mobile;
                        finInputInfo.holderInfo.holderEmail = v.email;
                        finInputInfo.holderInfo.holderZip = v.postCode;
                        finInputInfo.holderInfo.holderAddress = v.address;
                        finInputInfo.holderInfo.residentProvince = v.provinceId;
                        getAreaList('2', v.provinceId);
                        finInputInfo.holderInfo.residentCity = v.cityId;
                        getAreaList('3', v.cityId);
                        finInputInfo.holderInfo.residentAddress = v.countyId;
                        finInputInfo.cardNoBlur(finInputInfo.holderInfo.holderCardNo,'1')
                    }
                }
            });
        },
        cardNoBlur:function(cardNoVul,type){
            if (type == '1') {
                finInputInfo.holderInfo.holderBirthday = tools.GetBirthday(cardNoVul);   //获取出生日期
                finInputInfo.holderInfo.holderSex = tools.maleOrFemalByIdCard(cardNoVul); //性别
            }
        }
    });
    function postInfo(){
        var inputtedInfo = {
            isSaveInsured: finInputInfo.isSaveInsured,
            order: finInputInfo.order,//JSON.parse(JSON.stringify(finInputInfo.order.$model)),
            item: finInputInfo.item,//JSON.parse(JSON.stringify(finInputInfo.item.$model)),
            product:finInputInfo.product,//JSON.parse(JSON.stringify(finInputInfo.product.$model)),
            holderInfo:finInputInfo.holderInfo, //JSON.parse(JSON.stringify(finInputInfo.holderInfo.$model)),
            insuredList:finInputInfo.insuredList //JSON.parse(JSON.stringify(finInputInfo.insuredList.$model))
        };
        root.getJsonData(
            "/insure/newUnderwriting",
            inputtedInfo,
            function (data) {
                if (data) {
                    var orderId = data.orderId;
                    location.href = "#!/confirmInfo/" + orderId + '/' + finInputInfo.productType;
                }
            },
            false
        )
    };
    finInputInfo.item.$watch("insuranceBeginDate", function (newVul, oldVul) {
        if (newVul != tools.genTomorrowDate()) {
            if (new Date(newVul) < new Date(tools.genTomorrowDate())) {
                root.hint('起保日期不能早于次日日期');
                finInputInfo.item.insuranceBeginDate = tools.genTomorrowDate();
                return false;
            }
            finInputInfo.item.insuranceBeginDate = newVul;
            finInputInfo.item.insuranceEndDate = tools.getEndDate(finInputInfo.item.insuranceBeginDate, finInputInfo.item.insurancePeriod);
        }
    });
    finInputInfo.holderInfo.$watch("residentAddress", function (a, b) {
        if(a != '-1') {
            getAreaName('3', finInputInfo.holderInfo.residentAddress);
        }
    });
    function checkFrom(){
        var res = {};
        res['status'] = true;
        res['msg'] = '';
        if(!tools.validCredNum("name",finInputInfo.holderInfo.holderName)){
            res['status'] = false;
            res['msg'] = '请输入投保人姓名，2~10位汉字';
        }else if(!tools.validCredNum("1",finInputInfo.holderInfo.holderCardNo)){
            res['status'] = false;
            res['msg'] = '请填写正确格式的投保人身份证号';
        }else if(!tools.validCredNum("",finInputInfo.holderInfo.residentProvince)||!tools.validCredNum("",finInputInfo.holderInfo.residentCity)||!tools.validCredNum("",finInputInfo.holderInfo.residentAddress)){
            res['status'] = false;
            res['msg'] = '投保人地址填写有误，请完善';
        }else if(!tools.validCredNum("",finInputInfo.holderInfo.holderAddress)){
            res['status'] = false;
            res['msg'] = '请输入投保人详细地址';
        }else if(!tools.validCredNum("postCode",finInputInfo.holderInfo.holderZip)){
            res['status'] = false;
            res['msg'] = '请填写正确格式的投保人邮编';
        }else if(!tools.validCredNum("mobile",finInputInfo.holderInfo.holderPhone)){
            res['status'] = false;
            res['msg'] = '请填写正确格式的投保人手机号';
        }else if(!tools.validCredNum("email",finInputInfo.holderInfo.holderEmail)){
            res['status'] = false;
            res['msg'] = '请填写正确格式的投保人邮箱';
        }
        return res;
    };
    //获取省市区
    function getAreaList(level, code) {
        root.getJsonDatas(
            "/province/getProvince",
            {
                "provinces": level,
                "parentCode": code
            },
            function (data) {
                if (level == 1) {
                    finInputInfo.holderProvinceList = data.provinceList;
                    finInputInfo.holderCityList = [];
                    finInputInfo.holderAreaList = [];
                }
                if (level == 2) {
                    finInputInfo.holderCityList = data.provinceList;
                    finInputInfo.holderAreaList = [];
                }
                if (level == 3) {
                    finInputInfo.holderAreaList = data.provinceList;
                }
            },
            false
        )
    };

    function getAreaName(areaType, code) {      //获取地区中文名
        root.getJsonDatas(
            "/province/getProvinceName",
            {
                "provinces": areaType,
                "code": code
            },
            function (data) {
                finInputInfo.chineseName = data.name;
            },
            false
        );
    };
    function getRelationList() {        //获取常用联系人
        root.getJsonDatas(
            "/cust/queryCustomer",
            {
                "userId":JSON.parse(localStorage.getItem('userInfo')).regCode
            },
            function (data) {
                finInputInfo.getRelationArr = data.custList;
            },
            false
        );
    };
    function getProductInfo(productId){
        root.getJsonData(
            "/newProduct/productInfo",
            {
                "productId":productId
            },
            function (data) {
                finInputInfo.productName = data.productName;
                finInputInfo.effectiveDateFlag = data.effectiveDateFlag;
                finInputInfo.productType = data.productType;
                finInputInfo.product.productId = data.productId;
                finInputInfo.item.insurancePeriod = data.guaranteePeriod;
                finInputInfo.item.insuranceEndDate = tools.getEndDate(finInputInfo.item.insuranceBeginDate, data.guaranteePeriod);
            },
            false
        );
    }
    return avalon.controller(function ($ctrl) {
        $ctrl.$onEnter = function (param) {
            $('body,html').animate({scrollTop: 0}, 200);
            finInputInfo.order.premiums = param.premiums * 100;
            getAreaList(1, '');
            getProductInfo('100001');
            getRelationList();
        };
        $ctrl.$onRendered = function () {
        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [finInputInfo];
    });
});