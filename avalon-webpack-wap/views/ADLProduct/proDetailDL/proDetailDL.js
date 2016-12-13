/**
 * Created by LMG on 2016/12/5.
 */
define(["jquery", 'cookie', '../../../css/proDetailDL.scss'], function ($, cookie) {
    var root = avalon.vmodels.root;
    var proDetailDL = avalon.define({
        $id: "proDetailDL",
        volume: '',
        share: '',
        premiums: 0,
        productId: '',
        productInfo: {},
        productComments: [],
        checkBoxStatus: false,
        subtract: function () {//减少份数
            proDetailDL.volume--;
        },
        add: function () {//增加份数
            proDetailDL.volume++;
        },
        selectShare: function (vul) {
            proDetailDL.volume = vul;
            proDetailDL.share = vul;
        },
        goDetailImg:function(){
            location.href = '#!/proDetailImg'
        },
        agreeFun: function () {
            proDetailDL.checkBoxStatus = !proDetailDL.checkBoxStatus;
        },
        payFor: function () {
            location.href = '#!/inputInfoDL/'+proDetailDL.productId+'/'+proDetailDL.volume;
        },
        turnTo: function (nameId) {
            location.href = '#!/showDetail?nameId=' + nameId;
        }
    });


    proDetailDL.$watch('volume', function (newVul, oldVul) {
        if (newVul < 1 && proDetailDL.productId == '100003') {
            proDetailDL.volume = 1;
            root.hint("至少购买1份");
        }
        if (newVul < 10 && proDetailDL.productId == '100004') {
            proDetailDL.volume = 10;
            root.hint("至少购买10份");
        }
        if(newVul != '50'||newVul != '100'||newVul != '150'||newVul != '200'){
            proDetailDL.share = '';
        }
        if(newVul == '50'||newVul == '100'||newVul == '150'||newVul == '200'){
            proDetailDL.share = newVul;
        }
        proDetailDL.premiums = (1000 * proDetailDL.volume).toFixed(2)
    });
    return avalon.controller(function ($ctrl) {

        $ctrl.$onEnter = function (param) {
            proDetailDL.productId = param.productId;
            if(proDetailDL.productId == '100003'){
                proDetailDL.volume = 1;
            }else{
                proDetailDL.volume = 10;
            }
        };
        $ctrl.$onRendered = function () {
        };
        $ctrl.$onBeforeUnload = function () {
            if(localStorage.getItem('orderId')){
                localStorage.removeItem('orderId');
            };
        };
        $ctrl.$vmodels = [proDetailDL];
    });
});