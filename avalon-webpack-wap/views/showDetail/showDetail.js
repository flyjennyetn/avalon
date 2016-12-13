/**
 * Created by Smart on 2016/11/30.
 */
define(["jquery",'cookie','layer_', '../../css/showDetail.scss'], function ($,cookie,layer) {
    var root = avalon.vmodels.root;
    var showDetail = avalon.define({
        $id: "showDetail",
        productData: [],
        showIndex: ''
    });

    return avalon.controller(function ($ctrl) {

        $ctrl.$onEnter = function () {
            showDetail.showIndex = tools.getUrlString('nameId');
            showDetail.productData = eval('(' + $.cookie('productData') + ')');
        };
        $ctrl.$onRendered = function () {
        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [showDetail];
    });
});