/**
 * Created by cui on 2016/11/14.
 */
define(['../../css/success.scss'], function() {
    var root = avalon.vmodels.root;
    var success = avalon.define({
        $id:"success",
        partyNames: "",//姓名
        certyCode: "",//身份证号
        userInfo:'',    //用户信息
        gender:'',          //性别
        Birthday:'',           //生日
        postMsg:function(){
            var isCheck = checkFrom();
            if(isCheck.status){
                formPost();
            }else{
                if (isCheck.msg != '') {
                    root.hint(isCheck.msg);//弹出错误提示
                }
            }
        },
        Inputblur:function(cardNoVul){
            console.log(cardNoVul)
            if(typeof cardNoVul!=''&&cardNoVul!=''){
                success.Birthday = tools.GetBirthday(cardNoVul);   //获取出生日期
                success.gender = tools.maleOrFemalByIdCard(cardNoVul); //性别
            }
        }
    });
    function checkFrom(){
        var res = {};
        res['status'] = true;
        res['msg'] = '';
        if(!(/^[\u4e00-\u9fa5]{2,10}$|^[a-zA-Z]{2,25}$/).test(success.partyNames)){
            res['status'] = false;
            res['msg'] = '姓名只能为2-10位汉字或2-25位英文字母，请更正！';
        }else if(!tools.validCredNum("1",success.certyCode)){
            res['status'] = false;
            res['msg'] = '请填写正确格式的身份证号';
        }
        return res;
    };
    function formPost(){
        root.getJsonData(
            "/user/userValidate",
            {
                "regCode":success.userInfo.regCode,
                "partyName": success.partyNames,
                "certyCode": success.certyCode,
                "gender":success.gender,
                "birthday":success.Birthday,
                "certyType": "0",
                "method": "0"
            },
            function (data) {
                console.log(data);
                if(data.resultCode =='10'){
                    var userInfo = eval('(' + localStorage.getItem('userInfo') + ')');
                    userInfo.isApproved = 1;
                    userInfo.partyName = success.partyNames;
                    userInfo.certyCode = success.certyCode;
                    localStorage.setItem("userInfo", JSON.stringify(userInfo));
                    root.alert("实名认证成功",'确定',function(index){
                        location.href = '#!/certification';
                        layer.close(index);
                    });
                }
            },
            false
        )
    }
    return avalon.controller(function($ctrl) {
        $ctrl.$onEnter = function() {
            success.userInfo = JSON.parse(localStorage.getItem('userInfo'))
        };
        $ctrl.$onRendered = function() {};
        $ctrl.$onBeforeUnload = function() {};
        $ctrl.$vmodels = [success];
    });
});