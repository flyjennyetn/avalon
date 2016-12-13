/**
 * Created by LMG on 2016/12/5.
 */
define(["jquery",'cookie','../../../css/healthTold.scss'], function ($,cookie) {
    var root = avalon.vmodels.root;
    var healthTold = avalon.define({
        $id: "healthTold",
        orderId: '',
        status1:0,
        status2:0,
        status3:0,
        status4:0,
        changeStatus: function(num){
            if(Math.abs(num)==1){
                healthTold.status1 = num;
            }
            if(Math.abs(num)==2){
                healthTold.status2 = num;
            }
            if(Math.abs(num)==3){
                healthTold.status3 = num;
            }
            if(Math.abs(num)==4){
                healthTold.status4 = num;
            }
        },
        next: function(){
            if(healthTold.status1==0||healthTold.status2==0||healthTold.status3==0||healthTold.status4==0){
                root.hint("您还没有全部选择");
                return false;
            }
            if(healthTold.status1!=1||healthTold.status2!=2||healthTold.status3!=3||healthTold.status4!=4){
                root.hint("您不符合投保要求");
                return false;
            }
            location.href = '#!/confirmation/' + healthTold.orderId;
        }
    });
    return avalon.controller(function ($ctrl) {

        $ctrl.$onEnter = function (param) {
            healthTold.orderId = param.orderId;
        };
        $ctrl.$onRendered = function () {
        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [healthTold];
    });
});