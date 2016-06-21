/**
 * Created by flyjennyetn on 2016/5/27.
 */
define([
    'echarts',
    '../../js/echarts/chart/bar',
    '../../js/echarts/chart/tree',
    '../../js/echarts/chart/pie'
], function (echarts) {

    var chart = avalon.define({
        $id: "chart"
    });
    return avalon.controller(function ($ctrl) {

        $ctrl.$onEnter = function (param, rs, rj) {
        };
        $ctrl.$onRendered = function () {
            echarts.init(document.getElementById('container1')).setOption({
                tooltip: {
                    show: true
                },
                legend: {
                    data:['销量']
                },
                xAxis : [
                    {
                        type : 'category',
                        data : ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        "name":"销量",
                        "type":"bar",
                        "data":[5, 20, 40, 10, 10, 20]
                    }
                ]
            });


            echarts.init(document.getElementById('container2')).setOption({
                title : {
                    text: '某站点用户访问来源',
                    subtext: '纯属虚构',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                },
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:[
                            {value:335, name:'直接访问'},
                            {value:310, name:'邮件营销'},
                            {value:234, name:'联盟广告'},
                            {value:135, name:'视频广告'},
                            {value:1548, name:'搜索引擎'}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            });


            echarts.init(document.getElementById('container3')).setOption({
                title : {
                    text: '手机品牌',
                    subtext: '线、节点样式'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{b}: {c}"
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : false,

                series : [
                    {
                        name:'树图',
                        type:'tree',
                        orient: 'horizontal',  // vertical horizontal
                        rootLocation: {x: 100, y: '60%'}, // 根节点位置  {x: 'center',y: 10}
                        nodePadding: 20,
                        symbol: 'circle',
                        symbolSize: 40,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: 'inside',
                                    textStyle: {
                                        color: '#cc9999',
                                        fontSize: 15,
                                        fontWeight:  'bolder'
                                    }
                                },
                                lineStyle: {
                                    color: '#000',
                                    width: 1,
                                    type: 'broken' // 'curve'|'broken'|'solid'|'dotted'|'dashed'
                                }
                            },
                            emphasis: {
                                label: {
                                    show: true
                                }
                            }
                        },
                        data: [
                            {
                                name: '手机',
                                value: 6,
                                symbolSize: [90, 70],
                                symbol: 'image://http://www.iconpng.com/png/ecommerce-business/iphone.png',
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: false
                                        }
                                    }
                                },
                                children: [
                                    {
                                        name: '小米',
                                        value: 4,
                                        symbol: 'image://http://pic.58pic.com/58pic/12/36/51/66d58PICMUV.jpg',
                                        itemStyle: {
                                            normal: {
                                                label: {
                                                    show: false
                                                }
                                            }
                                        },
                                        symbolSize: [60, 60],
                                        children: [
                                            {
                                                name: '小米1',
                                                symbol: 'circle',
                                                symbolSize: 20,
                                                value: 4,
                                                itemStyle: {
                                                    normal: {
                                                        color: '#fa6900',
                                                        label: {
                                                            show: true,
                                                            position: 'right'
                                                        },

                                                    },
                                                    emphasis: {
                                                        label: {
                                                            show: false
                                                        },
                                                        borderWidth: 0
                                                    }
                                                }
                                            },
                                            {
                                                name: '小米2',
                                                value: 4,
                                                symbol: 'circle',
                                                symbolSize: 20,
                                                itemStyle: {
                                                    normal: {
                                                        label: {
                                                            show: true,
                                                            position: 'right',
                                                            formatter: "{b}"
                                                        },
                                                        color: '#fa6900',
                                                        borderWidth: 2,
                                                        borderColor: '#cc66ff'

                                                    },
                                                    emphasis: {
                                                        borderWidth: 0
                                                    }
                                                }
                                            },
                                            {
                                                name: '小米3',
                                                value: 2,
                                                symbol: 'circle',
                                                symbolSize: 20,
                                                itemStyle: {
                                                    normal: {
                                                        label: {
                                                            position: 'right'
                                                        },
                                                        color: '#fa6900',
                                                        brushType: 'stroke',
                                                        borderWidth: 1,
                                                        borderColor: '#999966',
                                                    },
                                                    emphasis: {
                                                        borderWidth: 0
                                                    }
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        name: '苹果',
                                        symbol: 'image://http://www.viastreaming.com/images/apple_logo2.png',
                                        symbolSize: [60, 60],
                                        itemStyle: {
                                            normal: {
                                                label: {
                                                    show: false
                                                }

                                            }
                                        },
                                        value: 4
                                    },
                                    {
                                        name: '华为',
                                        symbol: 'image://http://market.huawei.com/hwgg/logo_cn/download/logo.jpg',
                                        symbolSize: [60, 60],
                                        itemStyle: {
                                            normal: {
                                                label: {
                                                    show: false
                                                }

                                            }
                                        },
                                        value: 2
                                    },
                                    {
                                        name: '联想',
                                        symbol: 'image://http://www.lenovo.com.cn/HomeUpload/Home001/6d94ee9a20140714.jpg',
                                        symbolSize: [100, 40],
                                        itemStyle: {
                                            normal: {
                                                label: {
                                                    show: false
                                                }

                                            }
                                        },
                                        value: 2
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });


        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [chart];
    });
})