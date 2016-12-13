/**
 * Created by rong on 2016/9/26.
 */
define(['jquery','laypage',"style!../../../css/newsC"], function ($,laypage) {
    var roots=avalon.vmodels.root;
    var interest = avalon.define({
        $id: "interest",
        typeName:'按月公布利率的产品',
        rateMonth:'',
        productName:'',
        totalNum:1,
        state:false,
        getRateList:[], //所有数据列表
        getBetweenTimeList:[], //时间列表
        getProductNameList:[] ,//产品名称
        Disflag:'',
        //离开改变事件
        typeN:function(num,type){
            if(num==1){
                interest.typeName=type;
            }else if(num==2){
                interest.rateMonth=type;
            }else{
                interest.productName=type;
            }
            getRateList(1,'init');
            getBetweenTimeList()
        },
        pager:function (){
            laypage({
                cont: $('#pager'), //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                pages: Math.ceil(interest.totalNum / 5), //通过后台拿到的总页数
                jump: function(obj, first){ //触发分页后的回调
                    if(!first){
                        getRateList(obj.curr);
                    }
                }
            });
        }
    });
    //利率时段
    function getBetweenTimeList(){
        roots.getJsonData('gwInterface/getBetweenTimeList.json',{typeName:interest.typeName},function(data){
            interest.getBetweenTimeList=data;
            if(interest.state==false){
                interest.rateMonth=interest.getBetweenTimeList[0];
                interest.state=true;
            }
            getProductNameList();
            getRateList(1,interest.rateMonth,'init');
        })
    }
    //产品名称
    function getProductNameList(typeName){
        roots.getJsonData('gwInterface/getProductNameList.json',{typeName:interest.typeName,rateMonth:interest.rateMonth},function(data){
            interest.getProductNameList=data;
        })
    }
    //利率公告列表
    function getRateList(pageNum,d,state){
        var jsonData={
            typeName:interest.typeName,
            //rateMonth:d,
            rateMonth:interest.rateMonth,
            productName:interest.productName,
            pageNum:pageNum,
            rows:5
        };
        roots.getJsonData('gwInterface/getRateList.json',jsonData,function(data){
            interest.getRateList=data.list;
            interest.totalNum=data.totalNum;
            if(isEmpty(interest.getRateList)){
                interest.Disflag = true;
            }else{
                interest.Disflag = false;
            }
            if(state=='init'){
                interest.pager()
            }
        })
    };

    function isEmpty(obj){           //判断对象是否为空
        for (var name in obj) {
            return false;
        }
        return true;
    };

    return avalon.controller(function ($ctrl) {

        $ctrl.$onRendered = function () {

        };
        $ctrl.$onEnter = function () {
            $('body,html').animate({scrollTop: 0}, 200);
            getBetweenTimeList();
            roots.headState = "funHall";
        };
        // 对应的视图销毁前
        $ctrl.$onBeforeUnload = function () {
        };
        // 指定一个avalon.scan视图的vmodels，vmodels = $ctrl.$vmodels.concact(DOM树上下文vmodels)
        $ctrl.$vmodels = [interest];
    });
})