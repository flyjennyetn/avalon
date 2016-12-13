/**
 * Created by rong on 2016/9/23.
 */
define(['jquery','layer_','laypage',"style!../../css/joinUs"], function ($,layer_,laypage) {
    var roots=avalon.vmodels.root;
    var joinUs = avalon.define({
        $id: "joinUs",
        nameList:[],
        totalNum:5,
        content:'',
        Disflag:'',
        rczp:function(name){
            location.href='#!/joinUs01/'+name;
        },
        pager:function (){
            laypage({
                cont: $('#pager'), //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                pages: Math.ceil(joinUs.totalNum / 5), //通过后台拿到的总页数
                jump: function(obj, first){ //触发分页后的回调
                    if(!first){
                        getContentNameList(obj.curr);
                    }
                }
            });
        },
        search:function(pageNum,state,content){
            if(content==''){
                layer_.alert("请输入内容")
            }else{
                joinUs.content=content;
                getContentNameList(1,'init',content)
            }
        },
        keyUp:function(event){
            if(event.keyCode=='13'){
                if(joinUs.content==''){
                    layer_.alert("请输入内容")
                }else{
                    getContentNameList(1,'init',joinUs.content);
                }
            }
        },
        clean:function(){
            if(joinUs.content==''){
                getContentNameList(1,'init',joinUs.content);
            }
        }
    });
    function getContentNameList(pageNum,state,content){
        roots.getJsonData("gwInterface/getContentNameList.json",
            {type:'人才招聘',pageNum:pageNum,rows:5,name:joinUs.content},
            function(data){
                joinUs.nameList=data.menuVo;
                joinUs.totalNum=data.totalNum;
                //console.log(isEmpty(joinUs.nameList));
                if(joinUs.nameList.length==0){
                    joinUs.Disflag = true;
                }else{
                    joinUs.Disflag = false;
                }
                if(state=='init'){
                    joinUs.pager()
                }
            }
        );
    }
    //function isEmpty(obj){           //判断对象是否为空
    //    for (var name in obj) {
    //        return false;
    //    }
    //    return true;
    //};
    return avalon.controller(function ($ctrl) {

        $ctrl.$onRendered = function () {

        };
        $ctrl.$onEnter = function () {
            getContentNameList(1,'init','');
            roots.headState = "joinUs";
        };
        // 对应的视图销毁前
        $ctrl.$onBeforeUnload = function () {
        };
        // 指定一个avalon.scan视图的vmodels，vmodels = $ctrl.$vmodels.concact(DOM树上下文vmodels)
        $ctrl.$vmodels = [joinUs];
    });
})