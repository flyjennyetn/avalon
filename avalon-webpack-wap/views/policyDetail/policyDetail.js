/**
 * Created by cui on 2016/11/9.
 */
define(['../../css/policyDetail.scss'], function() {
    var root = avalon.vmodels.root;
    var policyDetail = avalon.define({
        $id: "policyDetail",
        insuranceId:'',                 //������
        insuranceInfo:{},              //��������
        policyInfo:{},                //��������
        HolderInfo: {},              //Ͷ������Ϣ
        InsuredInfo: {},            //��������Ϣ
        benefitInfo:{},            //��������Ϣ
        productId:'',
    });
    function getorderInfo() {//��ȡͶ���ˣ������ˣ���������Ϣ
        root.getJsonData('/newOrder/policyDetail',
            {

                //"userId": root.userInfo.regCode,
                "userId":localStorage.getItem('wxds_openid'),
                "policyNo": policyDetail.insuranceId
                //"policyNo":'0000462175204493404'
            },
            function (data) {
                console.log(data)
                if(data){
                    policyDetail.policyInfo = data;
                    policyDetail.productId = data.productId;           //��ƷID
                    policyDetail.HolderInfo = data.holderInfo;                   //Ͷ������Ϣ
                    policyDetail.InsuredInfo = data.insuredInfo;            //��������Ϣ
                    if(policyDetail.InsuredInfo.isLegal != '1'&&policyDetail.InsuredInfo.isLegal!= ''){                //�ж��������Ƿ�Ϊ����1Ϊ����
                        insuranceDetails.benefitInfo = data.benefitInfo;
                    }
                    getProductInfo();
                }
            },false
        )
    };
     function getProductInfo(){             //��Ʒ����
         root.getJsonData(
             "/newProduct/productInfo",
             {
                 "productId":policyDetail.productId
             },
             function (data) {
                 console.log(data);
                 policyDetail.insuranceInfo = data;
             },false
         )
     }
    return avalon.controller(function($ctrl){

        $ctrl.$onEnter = function(param) {
            policyDetail.insuranceId = param.policyNo;
            getorderInfo();
        };
        $ctrl.$onRendered = function() {};
        $ctrl.$onBeforeUnload = function() {};
        $ctrl.$vmodels = [policyDetail];
    });
});