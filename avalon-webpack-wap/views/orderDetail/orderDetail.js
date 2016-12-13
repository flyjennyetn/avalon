/**
 * Created by cui on 2016/11/9.
 */
define(['../../css/orderDetail.scss'], function() {
    var root = avalon.vmodels.root;
    var orderDetail = avalon.define({
        $id: "orderDetail",
        insuranceId:'',
        orderId: '',
        insuranceInfo:{},
        productInfo: {},
        HolderInfo: {},
        InsuredInfo: {},
        benefitInfo:{},
        productId:'',
        goPay:function(){
            location.href = "#!/confirmInfo/" + orderDetail.orderId + '/' + orderDetail.productType;
        }
    });
    function getorderInfo() {//获取投保人，被保人，受益人信息
        root.getJsonData('/newOrder/orderDetail',
            {

                "orderId":orderDetail.orderId
            },
            function (data) {
                console.log(data);
                orderDetail.insuranceInfo = data;
                //if(data){
                //    orderDetail.policyInfo = data;
                //    orderDetail.productId = data.productId;           //产品ID
                //    orderDetail.HolderInfo = data.holderInfo;                   //投保人信息
                //    orderDetail.InsuredInfo = data.insuredInfo;            //被保人信息
                //    if(orderDetail.InsuredInfo.isLegal != '1'&&orderDetail.InsuredInfo.isLegal!= ''){                //判断受益人是否为法定1为法定
                //        insuranceDetails.benefitInfo = data.benefitInfo;
                //    }
                //    getProductInfo();
                //}
            },false
        )
    }
    function getProductInfo(){             //产品详情
        root.getJsonData(
            "/newProduct/productInfo",
            {
                "productId":orderDetail.productId
            },
            function (data) {
                //console.log(data);
                orderDetail.insuranceInfo = data;
            },false
        )
    }
    return avalon.controller(function($ctrl){

        $ctrl.$onEnter = function(param) {
            orderDetail.orderId = param.orderId;
            getorderInfo();
        };
        $ctrl.$onRendered = function() {};
        $ctrl.$onBeforeUnload = function() {};
        $ctrl.$vmodels = [orderDetail];
    });
});