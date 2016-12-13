/**
 * Created by flyjennyetn on 2016/1/21.
 */
define(['swiper', "../../css/common.scss"], function (swiper) {
    var root = avalon.vmodels.root;
    var common = avalon.define({
        $id: "common",
        selectMenu: function (vul) {
            root.activeStatus = vul;
            if (vul == 1) {
                location.href = '#!/hotProductList';
            }
            if (vul == 2) {
                location.href = '#!/lcList';
            }
            if (vul == 3) {
                location.href = '#!/healthInsure';
            }
            if (vul == 4) {
                location.href = '#!/accidentInsure';
            }
            if (vul == 5) {
                location.href = '#!/hotProductList';
            }
        }
    });
    root.$watch('activeStatus', function (newVul,oldVul) {
        var num = 0;
        if(newVul > 3){
            num = 1;
        }
        setTimeout(function () {
            var swiper = new Swiper('.swiper-container', {
                slidesPerView: 4,      //�����ܹ�ͬʱ��ʾ�Ĳ˵���������
                centeredSlides: false,  //�趨Ϊtrueʱ��������У�������Ĭ��״̬�µľ���
                initialSlide :num
            });
        },300)
    });
    return avalon.controller(function ($ctrl) {
        $ctrl.$onEnter = function () {
        };
        $ctrl.$onRendered = function () {

        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [common];
    });
});
