/**
 * Created by Smart on 2016/11/30.
 */
define(["jquery", 'cookie', 'layer_', '../../css/showDetail.scss'], function ($, cookie, layer) {
    var root = avalon.vmodels.root;
    var healthTold = avalon.define({
        $id: "healthTold",
        parameter: '',
        healthList: [],
        unGet:function(){
            root.hint('您的健康状况不符合本产品的投保条件，无法购买');
        },
        buy: function () {
            location.href = '#!/inputInfo/' + healthTold.productId + '/' + healthTold.parameters + '/' + healthTold.premiums;
        }
    });

    function getHealthCon(productId){
        root.getJsonData(
            "/property/query",
            {
                "productId":productId,
                "propertyType":"5"
            },
            function (data) {
                console.log(data);
                healthTold.healthList = data.propertyList;
            },
            false
        );
    }

    return avalon.controller(function ($ctrl) {

        $ctrl.$onEnter = function (param) {
            console.log(param);
            healthTold.parameters = param.parameters;
            healthTold.premiums = param.premiums;
            healthTold.productId = param.productId;
            getHealthCon(param.productId)
        };
        $ctrl.$onRendered = function () {
        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [healthTold];
    });
});