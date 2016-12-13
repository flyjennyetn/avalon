/**
 * Created by cui on 2016/11/7.
 */
define(['jquery', 'layer_', "../../css/hotProductList.scss"], function ($, layer_) {
    var root = avalon.vmodels.root;
    var hotProductList = avalon.define({
        $id: "hotProductList",
        hotProductArr: [],
        getDetail: function(type,id){
            if(type == '02'){ //  理财险单独处理
                location.href = '#!/lcProDetail/'+id;
            }else {
                location.href = '#!/insuredDetail/'+id;
            }
        }
    });

    function getHotProList() {
        root.getJsonData('/newProduct/getRecommendProductList',
            {
                "recommendPlateId": "004",
                "categoryParentCode": ""
            },
            function (data) {
                hotProductList.hotProductArr = data.list;
            }, false
        );
    }

    return avalon.controller(function ($ctrl) {
        $ctrl.$onEnter = function () {
            root.activeStatus = 1;
            getHotProList();
        };
        $ctrl.$onRendered = function () {
        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [hotProductList];
    });
});