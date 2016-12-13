/**
 * Created by rong on 2016/9/23.
 */
define(['jquery','layer_',"style!../../css/aboutUs"], function ($,layer_) {
    var roots= avalon.vmodels.root;
    var aboutUs = avalon.define({
        $id: "aboutUs",
        state:false,
        id:'',
        name:'',
        zwxx:false,
        getContentsList:[],
        getOrgList1:[],//总公司
        getOrgList2:[],//二级分公司
        getOrgList3:[],//三级子公司
        getOrgListName:[],
        gsjs:function(){
            aboutUs.state=false;
            contentsList("公司介绍");
        },
        fzjg:function(menuLv,num){
            aboutUs.name='';
            if(num==1){
                aboutUs.id='';
                aboutUs.getOrgList3=[];
                aboutUs.getOrgListName=[];
                getOrgList(1,aboutUs.id,aboutUs.name,'');
            }else{
                getOrgList(menuLv,aboutUs.id,aboutUs.name,'');
            }
            aboutUs.state = true;
            aboutUs.getContentsList=[];
        },
        search:function(menuLv,parentId,name,noMenuLv){
            if(name==''){
                aboutUs.zwxx=false;
                layer_.alert("请输入内容")
            }else{
                aboutUs.zwxx=true;
                aboutUs.name=name;
                //aboutUs.getOrgList2=[];
                aboutUs.getOrgList3=[];
                aboutUs.getOrgListName=[];
                getOrgList('','',name,1);
            }
        },
        clean:function(){
            if(aboutUs.name==''){
                aboutUs.zwxx=false;
            }
        },
        keyUp:function(event){
            if(event.keyCode=='13'){
                if(aboutUs.name==''){
                    aboutUs.zwxx=false;
                    layer_.alert("请输入内容")
                }else{
                    //aboutUs.getOrgList2=[];
                    aboutUs.getOrgList3=[];
                    aboutUs.getOrgListName=[];
                    getOrgList('','',aboutUs.name,1);
                }
            }
        }
    });
    //关于我们名称列表
    function contentsList(name){
        roots.getJsonData("gwInterface/getContentsList.json",{type:name,name:name},
            function(data){
                aboutUs.getContentsList=data;
            });
    }
    //分支机构
    function getOrgList(menuLv,parentId,name,noMenuLv){
        roots.getJsonData("gwInterface/getOrgList.json",{menuLv:menuLv,parentId:parentId,name:name,noMenuLv:noMenuLv},
            function(data){
                if(menuLv==1){
                    aboutUs.getOrgList1=data;
                } else if(menuLv==2){
                    aboutUs.getOrgList2=data;
                }else if(menuLv==3){
                    aboutUs.getOrgList3=data;
                }else{
                    aboutUs.getOrgList3=[];
                    aboutUs.getOrgListName=data;
                }
            }
        );
    }
    return avalon.controller(function ($ctrl) {

        $ctrl.$onRendered = function () {

        };
        $ctrl.$onEnter = function (parme) {
            //if(parme.num==1){
            //    contentsList("公司介绍");
            //    $('body,html').animate({ scrollTop: 1000}, 200);
            //}else
            if(parme.num==3){
                aboutUs.state = true;
                aboutUs.fzjg(1,1);
                $(".left").remove("class",'left');
            }else{
                aboutUs.gsjs();
                contentsList("公司介绍");
            }
            roots.headState = "aboutUs";
            getOrgList(2);
            $('body,html').animate({ scrollTop: 0}, 200);
        };
        // 对应的视图销毁前
        $ctrl.$onBeforeUnload = function () {
        };
        // 指定一个avalon.scan视图的vmodels，vmodels = $ctrl.$vmodels.concact(DOM树上下文vmodels)
        $ctrl.$vmodels = [aboutUs];
    });
})