/**
 * Created by TR on 2016/11/9.
 */
define(["jquery",'cookie','../../css/lcList.scss'], function ($,cookie) {
    var root = avalon.vmodels.root;
    var lcProDetail = avalon.define({
        $id: "lcProDetail",
        volume: '1',
        premiums: 0,
        productInfo: {},
        productComments:[],
        checkBoxStatus:false,
        subtract: function () {//减少份数
            lcProDetail.volume--;
        },
        add: function () {//增加份数
            lcProDetail.volume++;
        },
        agreeFun: function (){
            lcProDetail.checkBoxStatus = !lcProDetail.checkBoxStatus;
        },
        payFor: function () {
            if (!lcProDetail.checkBoxStatus) {
                root.hint('请确认相关资料已阅读');
                return false;
            }
            //if (root.isLogin) {
            //    location.href = '#!/finInputInfo/' + lcProDetail.productInfo.productId + "/" + lcProDetail.premiums
            //} else {
            //    localStorage.setItem('goUrl',window.location.href);
            //    root.alert('请您先进行用户登录！', '去登录', function () {
            //        location.href = '#!/login';
            //        layer.closeAll();
            //    });
            //}
            if(root.loginStatus()){
                location.href = '#!/finInputInfo/' + lcProDetail.productInfo.productId + "/" + lcProDetail.premiums
            }
        },
        turnTo: function(nameId){
            location.href = '#!/showDetail?nameId=' + nameId;
        }
    });

    function getProInfo(productId) {
        root.getJsonData(
            "/newProduct/productInfo",
            {
                "productId": productId
            },
            function (data) {
                lcProDetail.productInfo = data;
                lcProDetail.productComments = data.productComments;
                $.cookie("productData", JSON.stringify(data.productComments));
                lcProDetail.premiums = (lcProDetail.volume * data.price / 100).toFixed(2);
            },
            false
        );
    }

    lcProDetail.$watch('volume', function (newVul, oldVul) {
        if (newVul < 1) {
            lcProDetail.volume = 1;
            root.hint("至少购买1份");
        }
        if (newVul > 1 && newVul > lcProDetail.productInfo.personLimitNum) {
            lcProDetail.volume = lcProDetail.productInfo.personLimitNum;
            root.hint("限购" + lcProDetail.productInfo.personLimitNum + "份");
        }
        if (newVul > 0 && newVul <= lcProDetail.productInfo.personLimitNum) {
            lcProDetail.premiums = (lcProDetail.volume * lcProDetail.productInfo.price / 100).toFixed(2)
        }
    });
    return avalon.controller(function ($ctrl) {

        $ctrl.$onEnter = function (param) {
            getProInfo(param.productId);
        };
        $ctrl.$onRendered = function () {
        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [lcProDetail];
    });
});