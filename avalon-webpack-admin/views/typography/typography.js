/**
 * Created by flyjennyetn on 2016/5/20.
 */
define([ 'layer_','echarts',
    '../../js/echarts/chart/tree'], function (layer_,echarts) {
    var typography = avalon.define({
        $id: "typography",

    });
    return avalon.controller(function ($ctrl) {
        // 进入视图
        $ctrl.$onEnter = function (param, rs, rj) {
        };
        // 视图渲染后，意思是avalon.scan完成
        $ctrl.$onRendered = function () {
            echarts.init(document.getElementById('treeChart')).setOption({
                title : {
                    text: '为什么要统一前后端开发',
                    //subtext: '线、节点样式'
                },
                tooltip : {
                    //trigger: 'item',
                    show:"false",
                    formatter: "{b}: {c}"
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        restore : {show: true},
                        saveAsImage : {show: true},
                        itemGap:100,
                    }
                },
                calculable : false,

                series : [
                    {
                        name:'树图',
                        type:'tree',
                        orient: 'horizontal',  // vertical horizontal
                        rootLocation: {x: 160, y: '45%'}, // 根节点位置  {x: 'center',y: 10}
                        layerPadding: 210,//横向
                        nodePadding: 35,//纵向
                        symbol: 'circle',
                        symbolSize: 30,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: 'relative',
                                    textStyle: {
                                        color: '#cc9999',
                                        fontSize: 16,
                                        fontWeight:  '700'
                                    }
                                },
                                lineStyle: {
                                    color: '#000',
                                    width: 1,
                                    type: 'solid' // 'curve'|'broken'|'solid'|'dotted'|'dashed'
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
                                name: '前后端统一开发',
                                symbolSize: 25,
                                itemStyle: {
                                    normal: {
                                        color: '#fa6900',
                                        label: {
                                            show: true,
                                            position: 'left'
                                        },

                                    },
                                    emphasis: {
                                        label: {
                                            show: false
                                        },
                                        borderWidth: 0
                                    }
                                },
                                children: [
                                    {
                                        name: '节约人力成本',
                                        symbolSize: 20,
                                        itemStyle: {
                                            normal: {
                                                color: '#fa6900',
                                                label: {
                                                    show: true,
                                                    position: 'right'}
                                                }
                                            },
                                        children: [
                                            {
                                                name: '技术能力统一，资源可互相调配',
                                                //value: 4,
                                                symbol: 'circle',
                                                symbolSize: 15,
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
                                                name: '释放后台人员开发工作',
                                                symbol: 'circle',
                                                symbolSize: 15,
                                                //value: 4,
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
                                        ]
                                    },
                                    {
                                        name: '降低学习成本',
                                        symbolSize: 20,
                                        itemStyle: {
                                            normal: {
                                                color: '#fa6900',
                                                label: {
                                                    show: true,
                                                    position: 'right'
                                                }
                                            }
                                        },
                                        //value: 4,
                                        children: [
                                            {
                                                name: '学习成本低，进入角色快',
                                                symbol: 'circle',
                                                symbolSize: 15,
                                                //value: 4,
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
                                                },
                                                children: [
                                                    {
                                                        name: '一套架构满足前后台功能',
                                                        symbol: 'circle',
                                                        symbolSize: 15,
                                                        //value: 4,
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
                                                        name: '不用考虑页面效果怎么写',
                                                        //value: 4,
                                                        symbol: 'circle',
                                                        symbolSize: 15,
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
                                                        name: '不用考虑样式问题',
                                                        //value: 4,
                                                        symbol: 'circle',
                                                        symbolSize: 15,
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
                                                ]
                                            },
                                            {
                                                name: '丰富的学习资料库',
                                                //value: 4,
                                                symbol: 'circle',
                                                symbolSize: 15,
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
                                                },
                                                children: [
                                                    {
                                                        name: '已经集成所有UI框架',
                                                        symbol: 'circle',
                                                        symbolSize: 15,
                                                        //value: 4,
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
                                                        name: '完整的开发文档',
                                                        //value: 4,
                                                        symbol: 'circle',
                                                        symbolSize: 15,
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
                                                        name: '不断完善的实例',
                                                        //value: 4,
                                                        symbol: 'circle',
                                                        symbolSize: 15,
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
                                                        name: '完整的接口系统',
                                                        //value: 4,
                                                        symbol: 'circle',
                                                        symbolSize: 15,
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
                                                ]
                                            },
                                        ]
                                    },
                                    {
                                        name: '提升框架能力',
                                        symbolSize: 20,
                                        itemStyle: {
                                            normal: {
                                                color: '#fa6900',
                                                label: {
                                                    show: true,
                                                    position: 'right'
                                                }
                                            }
                                        },
                                        //value: 2,
                                        children: [
                                            {
                                                name: '减少请求次数',
                                                symbol: 'circle',
                                                symbolSize: 15,
                                                //value: 4,
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
                                                name: '减少刷新次数',
                                                //value: 4,
                                                symbol: 'circle',
                                                symbolSize: 15,
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
                                                name: '所有逻辑计算在前端，不用后台处理',
                                                //value: 4,
                                                symbol: 'circle',
                                                symbolSize: 15,
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
                                        ]
                                    },
                                ]
                            }
                        ]
                    }
                ]
            })
        };
        // 对应的视图销毁前
        $ctrl.$onBeforeUnload = function () {
        };
        // 指定一个avalon.scan视图的vmodels，vmodels = $ctrl.$vmodels.concact(DOM树上下文vmodels)
        $ctrl.$vmodels = [typography];
    });
})