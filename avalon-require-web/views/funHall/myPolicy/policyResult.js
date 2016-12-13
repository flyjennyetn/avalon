/**
 * Created by Alex on 2016/10/12.
 */
define(['layer_','myfilter',"style!../../../css/myPolicy"], function (layer_,myfilter) {
    var roots = avalon.vmodels.root;
    var policyResult = avalon.define({
        $id: "policyResult",
        policyData: [],//保单信息
        policyHolder:{},                //投保人信息},
        insureds:{}, //被保人信息
        benfits:[],  //受益人信息
        dividendData: [], //分红信息
        address:'',
        postCode:'', //投保人邮编
        ElectronicPolicy:'',
        policyId:'',                //保单ID
        policyInfo:'',            //保单信息
        accountCode:'',         //银行卡号
        relationship:'',        //投被保险人关系
        disflag:'',
        Pdf:'',
        submitChannel:'',
        display:false,
        display1:false,
        display2:'',
        display3:'',
        policyCount:[],
        goPolicy:function(){
            window.location.href = "#!/cancellation/"+policyResult.policyId+'/'+policyResult.accountCode+'/'+policyResult.policyHolder.mobile+'/'+policyResult.submitChannel;
        },
        //downPdf:function(){
        //    window.location.href = roots.IPLocationFun+'/gw/policy/getElePolicy?info={"policyNo":'+param.policyId+',"printType":"3"}';
        //}
    });
    return avalon.controller(function ($ctrl) {
        // 进入视图
        $ctrl.$onEnter = function (param) {
            policyResult.Pdf = roots.IPLocationFun+'/gw/policy/getElePolicy?info={"policyNo":'+param.policyId+',"printType":"3"}';  //PDF地址
            $('body,html').animate({scrollTop: 0}, 200);
            roots.headState = "funHall";
            policyResult.policyId=param.policyId;
            policyResult.submitChannel = param.submitChannel;
            //保单详情查询
            roots.getJsonFunData('/gw/policy/getPolicyInfo',
                {
                    "policyNo": param.policyId,
                    "queryMethod": "001",
                    "queryTarget": "2",
                    'submitChannel':param.submitChannel
                },
                function (data) {
                    //var jsonData=JSON.parse(data);
                    console.log(data);
                    if(data.status==0){
                        policyResult.policyData = data.result.policy[0].products;//保障方案
                        policyResult.policyHolder = data.result.policy[0].policyHolder.holderbaseInfo;//投保人信息
                        policyResult.insureds = data.result.policy[0].insureds[0].insuredCustInfo;//被保人信息
                        policyResult.policyInfo = data.result.policy[0].policy;                 //保单信息
                        policyResult.policyCount = data.result.policy[0].policyAccount;
                        policyResult.benfits = data.result.policy[0].benfits;//受益人信息
                        if(policyResult.benfits.length == 0){
                            policyResult.display = true;
                        }else{
                            policyResult.display1 = true;
                        }
                        //policyResult.dividendData = jsonData.result.policy.;//分红信息
                        policyResult.relationship = data.result.policy[0].insureds[0].relationship; //投被保人关系 0：本人，1：配偶 ，2父母 ，3子女，99其他
                        if(data.result.policy[0].policyHolder.holderbaseInfo.addressInfo.addressFormatType =='1'){
                            policyResult.address = data.result.policy[0].policyHolder.holderbaseInfo.addressInfo.addressFormat4;
                        }else if(data.result.policy[0].policyHolder.holderbaseInfo.addressInfo.addressFormatType =='2'){
                            policyResult.address = data.result.policy[0].policyHolder.holderbaseInfo.addressInfo.address1;
                        };
                        //policyResult.address=policyResult.policyHolder.addressInfo.addressFormat4; //投保人详细地址
                        policyResult.postCode=policyResult.policyHolder.addressInfo.postCode; //投保人邮编
                        //for(var i = 0;i<policyResult.policyCount.length;i++){
                        //    if(policyResult.policyCount[i].accouontType == '1'){
                        //        policyResult.accountCode = policyResult.policyCount[i].accountCode;
                        //}
                        //};
                        for(var i = 0;i<policyResult.policyCount.length;i++){
                            if(policyResult.policyCount[i].accouontType == '1'){
                                if(policyResult.policyCount[i].accountCode == ''){
                                    policyResult.display2 = false;
                                }else{
                                    policyResult.display2 = true;
                                    policyResult.accountCode = policyResult.policyCount[i].accountCode;
                                }
                            }
                        };
                        if(policyResult.policyHolder.mobile == null||policyResult.policyHolder.mobile==''){
                            policyResult.display3 = false;
                        }else{
                            policyResult.display3 = true;
                        };
                    }else{
                        layer_.alert(data.message);
                    }
                }
            );
            ////保单 分红信息
            //roots.getJsonFunData('/gw/policy/getDividendInfo',
            //    {
            //        "cardNo": param.codeId,
            //        "policyNo": param.policyId
            //    },
            //    function (data) {
            //        policyResult.dividendData = data.dividendList
            //    }
            //);
            //下载电子保单
            //roots.getJsonFunData('/gw/policy/getElePolicy',
            //    {
            //        "policyNo": param.policyId
            //    },
            //    function (data) {
            //        console.log(data);
            //        //var dataInfo = JSON.parse(data);
            //        //console.log(dataInfo)
            //        //if(dataInfo.status = '0'){
            //        //    policyResult.ElectronicPolicy = dataInfo.result.policyUrl;
            //        //}
            //    }
            //)
        };
        // 视图渲染后，意思是avalon.scan完成
        $ctrl.$onRendered = function () {

        };
        // 对应的视图销毁前
        $ctrl.$onBeforeUnload = function () {

        };
        // 指定一个avalon.scan视图的vmodels，vmodels = $ctrl.$vmodels.concact(DOM树上下文vmodels)
        $ctrl.$vmodels = [policyResult];
    });
});