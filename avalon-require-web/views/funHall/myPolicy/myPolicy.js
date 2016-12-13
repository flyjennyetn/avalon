/**
 * Created by Alex on 2016/10/11.
 */
define(['layer_',"style!../../../css/myPolicy"], function(layer) {
    var roots= avalon.vmodels.root;
    var myPolicy = avalon.define({
        $id: "myPolicy",
        codeId: '',         //身份证号
        name: '',           //名字
        'codeNum':'0',      //证件类型
        'wait':'',
        'status':'',
        'mobile':'',        //手机号
        'Verification':'',  //验证码
        submit: function(){
            if( !policyIdBlur() || !codeIdBlur()){
                return false
            }
            //location.href = '#!/policyResult/1/' + myPolicy.codeId + '/' + myPolicy.policyId;
            //location.href = '#!/policyList/'+myPolicy.codeId+'/'+myPolicy.name+'/'+myPolicy.codeNum;
            postMobile();
            //myPolicy.codeId = '';
            //myPolicy.name = '';
        },
        waitTime: function(){                 //短信验证时间
            if(myPolicy.mobile==''){
                layer.alert("请输入手机号");
                return false
            }
            myPolicy.wait = 60;
            var waitFun = setInterval(function () {
                if (myPolicy.wait == 0) {
                    myPolicy.status = 0;
                    myPolicy.wait = 60;
                    clearInterval(waitFun);
                } else {
                    myPolicy.status = 1;
                    myPolicy.wait--;
                }
            }, 1000);
            getMobile();
        }
    });
    /*================================================================================================*/
    function getMobile(){                   //手机验证码发送
        roots.getJsonFunData('/insurance/sendSms',
            {
                "mobile":myPolicy.mobile,
                "transCode":"1000032"
            },
            function (data) {
                console.log(data);
                if(data.sendResult){
                    layer.alert("发送成功");
                }else{
                    layer.alert(data.resultMsg);
                }
            }
        )
    };
    function postMobile(){
        roots.getJsonFunData('/insurance/checkSms',
            {
                "mobile":myPolicy.mobile,
                "transCode":"1000032",
                "smsCode":myPolicy.Verification
            },
            function (data){
                 if(data.sendResult == true){
                     location.href = '#!/policyList/'+myPolicy.codeId+'/'+myPolicy.name+'/'+myPolicy.codeNum+'/'+myPolicy.mobile;
                 }else{
                     layer.alert("输入验证码错误");
                 };
            }
        )
    }
    //保单号非空校验
    function policyIdBlur() {
        if (myPolicy.name == '' || myPolicy.name == undefined) {
            layer.alert("请您输入姓名");
            return false;
        }
        return true;
    }
    //证件号校验
    function codeIdBlur () {
        //var hz=/^1[45][0-9]{7}|G[0-9]{8}|P[0-9]{7}|S[0-9]{7,8}|D[0-9]+$/; //护照
        var hz=/^[a-zA-Z0-9]{3,21}$/||/^(P\d{7})|(G\d{8})$/; //护照
        var jgz=/^[a-zA-Z0-9]{7,21}$/;  //军官证
        var hkb= /^[a-zA-Z0-9]{3,21}$/;  //户口本
        var xsz= /^[0-9]{10}$/;  //学生证
        if (myPolicy.codeId == '' || myPolicy.codeId == undefined) {
            layer.alert("请您输入证件号");
            return false;
        }
        if (myPolicy.codeNum=='0'|| myPolicy.codeNum=='3') {
            if(!IdCardValidate(myPolicy.codeId)){
                layer.alert("证件号格式错误");
                return false;
            }
        }
        if (myPolicy.codeNum=='1') {
            if( !hz.test(myPolicy.codeId)){
                layer.alert("证件号格式错误");
                return false;
            }
        }
        if (myPolicy.codeNum=='2') {
            if(!jgz.test(myPolicy.codeId)){
                layer.alert("证件号格式错误");
                return false;
            }
        }
        if (myPolicy.codeNum=='4') {
            if(!hkb.test(myPolicy.codeId)){
                layer.alert("证件号格式错误");
                return false;
            }
        }
        if (myPolicy.codeNum=='5') {
            if(!xsz.test(myPolicy.codeId)){
                layer.alert("证件号格式错误");
                return false;
            }
        }
        if (!(/^[\+86|86]?1[3|4|5|7|8]\d{9}$/.test(myPolicy.mobile))||myPolicy.mobile=='') {
            layer.alert("请输入正确的手机号");
            return false;
        }
        if (myPolicy.Verification == '' || myPolicy.Verification == undefined) {
            layer.alert("请您输入验证码");
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
            myPolicy.codeId = '';
            myPolicy.policyId = '';
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
        $ctrl.$vmodels = [myPolicy];
    });
});