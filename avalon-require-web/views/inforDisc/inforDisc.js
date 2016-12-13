/**
 * Created by rong on 2016/9/22.
 */
define(['jquery','layer_','laypage',"style!../../css/inforDisc"], function ($,layer_,laypage) {
    var roots=avalon.vmodels.root;
    var inforDisc = avalon.define({
        $id: "inforDisc",
        contentNameList:[],//控制搜索框是否显示
        contentshlw:[],//互联网信息披露
        contentsjbxx:[],//基本信息披露
        getFileTitle:[],//附件数据
        titleList:[],//履职情况披露列表
        situation:[],//详细履职情况
        hybt:[],//主要会议标题
        name:'',
        type:'',
        content:'',
        huiyibt:'',
        lvzhiqk:'',
        right_name:'基本信息披露', //右侧标题显示内容
        state:false,
        exist:false,
        zwnr:false, //暂无内容显示与否
        arrows:false,//箭头默认状态
        totalNum:1,
        resume:'',  //简历
        sta:false,
        jl:false,
        //conventData:['公司概况','互联网信息披露'],//通用数据
        accessory:['经营产品条款','临时信息披露','年度信息披露','保险资金运用信息披露','偿付能力信息披露','经营产品条款',],//附件
        id:'',
        cont:function(name){
            //判断是否显示搜索框
            inforDisc.right_name=name;
            if(inforDisc.accessory.indexOf(name) >= 0){
                inforDisc.exist=true;
            }
            else{
                inforDisc.exist=false;
            }
            inforDisc.content='';
            contentsList(name)
        },
        cont1:function(name){
            inforDisc.right_name=name;
            inforDisc.name=name;
            titleList();
        },

        //详细履职情况
        lzqk:function(name){
            inforDisc.state = false;
            inforDisc.jl = !inforDisc.jl;
            inforDisc.lvzhiqk=name;
            roots.getJsonData("gwInterface/getSituationList.json",{title:name},function(data){
                inforDisc.situation=data;
            })
        },
        //决议内容
        jynr:function(name){
            inforDisc.huiyibt=name;
            inforDisc.sta=!inforDisc.sta;
        },
        //查看简历
        ckjl:function(name,resume){
            //inforDisc.sta=!inforDisc.sta;
            if(inforDisc.name=name){
                inforDisc.state = true;
                inforDisc.resume=resume;
            }else{
                inforDisc.state = false;
            }
        },
        pager:function (){
            laypage({
                cont: $('#pager'), //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                pages: Math.ceil(inforDisc.totalNum /8), //通过后台拿到的总页数
                jump: function(obj, first){ //触发分页后的回调
                    if(!first){
                        getFileTitle(inforDisc.name,obj.curr);
                    }
                }
            });
        },
        search:function(type,pageNum,state,content){
            if(content==''){
                inforDisc.zwnr=false;
                layer_.alert("请输入内容")
            }else{
                inforDisc.zwnr=true;
                inforDisc.content=content;
                getFileTitle(inforDisc.name,1,'init',content);
            }
        },
        keyUp:function(event){
            if(event.keyCode=='13'){
                if(inforDisc.content==''){
                    inforDisc.zwnr=false;
                    layer_.alert("请输入内容")
                }else{
                    getFileTitle(inforDisc.name,1,'init',inforDisc.name);
                }
            }
        },
        clean:function(){
            if(inforDisc.content==''){
                inforDisc.zwnr=false;
                getFileTitle(inforDisc.name,1,'init',inforDisc.name);
            }
        }
    });

    //通用数据内容
    function contentsList(name){
        inforDisc.name=name;
        if(name=='基本信息披露' || name=='互联网信息披露'){
            roots.getJsonData("gwInterface/getContentsList.json",{type:'信息披露',name:name},function(data){
                inforDisc.getFileTitle=[];
                inforDisc.hybt=[];
                inforDisc.situation=[];
                inforDisc.contentNameList=[];
                inforDisc.titleList=[];
                if(name=='基本信息披露'){
                    inforDisc.contentshlw=[];
                    inforDisc.contentsjbxx=data;
                }else{
                    inforDisc.contentsjbxx=[];
                    inforDisc.contentshlw=data;
                }
            })
        }else if(name=='主要决议'){
            roots.getJsonData("gwInterface/getContentsList.json",{type:inforDisc.name,name:''},function(data){
                inforDisc.getFileTitle=[];
                inforDisc.situation=[];
                inforDisc.contentNameList=[];
                inforDisc.titleList=[];
                inforDisc.contentshlw=[];
                inforDisc.contentsjbxx=[];
                inforDisc.hybt=data;
                //inforDisc.jynr('','');
                //console.log(inforDisc.hybt);
            })
        }else{
            inforDisc.getFileTitle=[];
            inforDisc.situation=[];
            inforDisc.contentNameList=[];
            inforDisc.titleList=[];
            inforDisc.hybt=[];
            inforDisc.contentshlw=[];
            inforDisc.contentsjbxx=[];
            getFileTitle(name,1,'init',inforDisc.content);
        }
    }
    //附件数据
    function getFileTitle(name,pageNum,state,title){
        roots.getJsonData("gwInterface/getFilePageList.json",
            {type:name,pageNum:pageNum,title:inforDisc.content,rows:8},
            function(data){
                if(data.list==[]){
                    inforDisc.zwnr=true;
                }else{
                    inforDisc.zwnr=false;
                }
                inforDisc.contentshlw=[];
                inforDisc.contentsjbxx=[];
                inforDisc.getFileTitle=data.list;
                inforDisc.totalNum=data.totalNum;
                if(state=='init'){
                    inforDisc.pager()
                }
            }
        );
    }

    //履职情况
    function titleList(){
        roots.getJsonData("gwInterface/getSituationTitleList.json",
            {},
            function(data){
                inforDisc.getFileTitle=[];
                inforDisc.situation=[];
                inforDisc.contentNameList=[];
                inforDisc.hybt=[];
                inforDisc.contentshlw=[];
                inforDisc.contentsjbxx=[];
                inforDisc.lvzhiqk='';
                inforDisc.titleList=data;
            }
        );
    }


    return avalon.controller(function ($ctrl) {

        $ctrl.$onRendered = function () {

        };
        $ctrl.$onEnter = function () {
            contentsList("基本信息披露");
            roots.headState = "inforDisc";
        };
        // 对应的视图销毁前
        $ctrl.$onBeforeUnload = function () {
        };
        // 指定一个avalon.scan视图的vmodels，vmodels = $ctrl.$vmodels.concact(DOM树上下文vmodels)
        $ctrl.$vmodels = [inforDisc];
    });
})