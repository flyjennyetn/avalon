/**
 * Created by LMG on 2016/10/11.
 */
define(["style!../../../css/compNotice"], function() {
    var roots = avalon.vmodels.root;
    var compNotice = avalon.define({
        $id: "compNotice",
        codeId: '',
        policyId: '',
        goSearch:function(){
            if(!codeIdBlur() || !policyIdBlur()){
                return false
            }
            location.href = '#!/compNotiDeta/1/' + compNotice.codeId + '/' + compNotice.policyId;
            compNotice.codeId = '';
            compNotice.policyId = '';
        }
    });

    //证件号校验
    function codeIdBlur () {
        if (compNotice.codeId == '' || compNotice.codeId == undefined) {
            layer.alert("请您输入证件号");
            return false;
        }
        if (!IdCardValidate(compNotice.codeId)) {
            layer.alert("证件号格式错误");
            return false;
        }
        return true;
    }
    //保单号非空校验
    function policyIdBlur() {
        if (compNotice.policyId == '' || compNotice.policyId == undefined) {
            layer.alert("请您输入保单号");
            return false;
        }
        return true;
    }

    var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];    // 加权因子
    var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];            // 身份证验证位值.10代表X
    function IdCardValidate(idCard) {
        idCard = trim(idCard.replace(/ /g, ""));               //去掉字符串头尾空格
        var a_idCard = idCard.split("");                // 得到身份证数组
        if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) {   //进行18位身份证的基本验证和第18位的验证
            return true;
        } else {
            return false;
        }
    }

    /**
     * 判断身份证号码为18位时最后的验证位是否正确
     * @param a_idCard 身份证号码数组
     * @return
     */
    function isTrueValidateCodeBy18IdCard(a_idCard) {
        var sum = 0;                             // 声明加权求和变量
        if (a_idCard[17].toLowerCase() == 'x') {
            a_idCard[17] = 10;                    // 将最后位为x的验证码替换为10方便后续操作
        }
        for (var i = 0; i < 17; i++) {
            sum += Wi[i] * a_idCard[i];            // 加权求和
        }
        var valCodePosition = sum % 11;                // 得到验证码所位置
        if (a_idCard[17] == ValideCode[valCodePosition]) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 验证18位数身份证号码中的生日是否是有效生日
     * @param idCard 18位书身份证字符串
     * @return
     */
    function isValidityBrithBy18IdCard(idCard18) {
        var year = idCard18.substring(6, 10);
        var month = idCard18.substring(10, 12);
        var day = idCard18.substring(12, 14);
        var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
        // 这里用getFullYear()获取年份，避免千年虫问题
        if (temp_date.getFullYear() != parseFloat(year)
            || temp_date.getMonth() != parseFloat(month) - 1
            || temp_date.getDate() != parseFloat(day)) {
            return false;
        } else {
            return true;
        }
    }

//去掉字符串头尾空格
    function trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }

    /**
     * 通过身份证判断是男是女
     * @param idCard 15/18位身份证号码
     * @return 'female'-女、'male'-男
     */
    function maleOrFemalByIdCard(idCard) {
        if (!idCard) return "";
        idCard = trim(idCard.replace(/ /g, ""));        // 对身份证号码做处理。包括字符间有空格。
        if (idCard.length == 15) {
            if (idCard.substring(14, 15) % 2 == 0) {
                return 'female';
            } else {
                return 'male';
            }
        } else if (idCard.length == 18) {
            if (idCard.substring(14, 17) % 2 == 0) {
                return 'female';
            } else {
                return 'male';
            }
        } else {
            return null;
        }
    }

//----------------------------------------------------------
//    功能：根据身份证号获得出生日期
//  参数：身份证号 psidno
//    返回值：
//    出生日期
//----------------------------------------------------------
    function GetBirthday(psidno) {
        var birthdayno, birthdaytemp;
        if (psidno.length == 18) {
            birthdayno = psidno.substring(6, 14);
        } else if (psidno.length == 15) {
            birthdaytemp = psidno.substring(6, 12);
            birthdayno = "19" + birthdaytemp;
        } else {
            //alert("错误的身份证号码，请核对！")
            return false;
        }
        var birthday = birthdayno.substring(0, 4) + "-" + birthdayno.substring(4, 6) + "-" + birthdayno.substring(6, 8);
        return birthday;
    }

    /*================================================================================================*/


    return avalon.controller(function($ctrl) {
        // 进入视图
        $ctrl.$onEnter = function() {
            $('body,html').animate({scrollTop: 0}, 200);
            roots.headState = "funHall";
        };
        // 视图渲染后，意思是avalon.scan完成
        $ctrl.$onRendered = function() {
        };
        // 对应的视图销毁前
        $ctrl.$onBeforeUnload = function() {

        };
        // 指定一个avalon.scan视图的vmodels，vmodels = $ctrl.$vmodels.concact(DOM树上下文vmodels)
        $ctrl.$vmodels = [compNotice];
    });
});