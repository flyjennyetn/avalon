/**
 * Created by LMG on 2016/10/12.
 */
define(["style!../../../css/compNotiDeta"], function() {
    var roots = avalon.vmodels.root;
    var compNotiDeta = avalon.define({
        $id: "compNotiDeta",
        claimsData: []
    });

    return avalon.controller(function($ctrl) {
        // 进入视图
        $ctrl.$onEnter = function (param) {
            $('body,html').animate({scrollTop: 0}, 200);
            roots.headState = "funHall";
            roots.getJsonFunData('claims/getClaimsInfo',
                {
                    "policyNo": param.policyId
                },
                function (data) {
                    compNotiDeta.claimsData = data.claimsList;
                }
            );
        };
        // 视图渲染后，意思是avalon.scan完成
        $ctrl.$onRendered = function (aaaa) {

        };
        // 对应的视图销毁前
        $ctrl.$onBeforeUnload = function () {

        };
        // 指定一个avalon.scan视图的vmodels，vmodels = $ctrl.$vmodels.concact(DOM树上下文vmodels)
        $ctrl.$vmodels = [compNotiDeta];

    });
});