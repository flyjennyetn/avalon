/**
 * Created by cui on 2016/10/21.
 */
define(['laypage','layer_','myfilter',"style!../../../css/policyList"], function (laypage,layer_,myfilter) {
    var roots= avalon.vmodels.root;
    var policyList = avalon.define({
        $id: "policyList",
        'policyInfo':[],        //保单列表
        'policyList':[],
        "nums":5,
        'pages':0,
        'name':'',
        'certiCode':'',
        //'cp':'',
        'codeNum':'',
        //'Verification':'',
        'mobile':'',
        //'display11':false,
        goResult:function(policyId,submitChannel){
            window.location.href='#!/policyResult/'+policyId+'/'+submitChannel;
        }
    });
    function getPolicyList(curr,state){
        roots.getJsonFunData('/gw/policy/getPolicyInfo',
            {
                "name":policyList.name,
                "certiType":policyList.codeNum,
                "certiCode":policyList.certiCode,
                "customerRole":'1',
                "queryMethod": "002",
                "bankCode": null,
                "queryTarget": "2",
                "mobile":policyList.mobile,
                //"smsCode":'',
                //"transCode":''
            }, function (data){
                    if(data.status == '0'){
                        policyList.pages =  data.result.policy.length;              //总页数
                        policyList.policyList = data.result.policy;
                        console.log(policyList.policyList)
                        policyList.policyInfo = gopage(1,policyList.nums,policyList.policyList);
                        if(state=='init'){
                            pagenation();
                        };
                    }
                    //else{
                    //    console.log(data.result)
                    //    if(data.result ==null){
                    //        policyList.display11 = true;
                    //    }
                    //}
            }
        );
    };
    //*******************分页处理开始******************************
    //分页处理入口方法
    function pagenation(){
        policyList.pages = Math.ceil(policyList.pages /policyList.nums); //得到总页数
        //调用分页
        laypage({
            cont: 'page',
            pages: policyList.pages,
            jump: function(obj,first){
               if(!first){
                   if(policyList.policyInfo.length>=0){
                       policyList.policyInfo = [];
                   }
                   policyList.policyInfo = gopage(obj.curr,policyList.nums,policyList.policyList);
               }
            }
        })
    };
    function gopage(pageNo, pageSize, array){          //对数组进行分页操作
        var offset = (pageNo - 1) * pageSize;
        return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);
    };
    //*******************分页处理结束******************************
    return avalon.controller(function($ctrl) {
        // 进入视图
        $ctrl.$onEnter = function(param) {
            //policyList.policyInfo = [];
            policyList.name = param.name;           //姓名
            policyList.certiCode = param.certiCode;    //身份证号
            policyList.mobile = param.mobile;                   //角色
            //policyList.Verification = param.Verification;                   //验证码
            policyList.codeNum = param.codeNum;         //证件类型
            getPolicyList(1,'init');
        };
        // 视图渲染后，意思是avalon.scan完成
        $ctrl.$onRendered = function() {
        };
        // 对应的视图销毁前
        $ctrl.$onBeforeUnload = function() {

        };
        // 指定一个avalon.scan视图的vmodels，vmodels = $ctrl.$vmodels.concact(DOM树上下文vmodels)
        $ctrl.$vmodels = [policyList];
    });
});