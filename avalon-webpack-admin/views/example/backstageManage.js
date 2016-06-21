/**
 * Created by aaaa on 2016/6/14.
 */
define(['../../js/avalon/tree/avalon.tree.check'], function () {
    var child = [
        {
            name: "框架介绍", open: false, icon: "icon-dashboard", myUrl: "#!/typography"
        },
        {
            name: "使用规范和示例", open: false, icon: "icon-dashboard", myUrl: "#!/list"
        },
        {
            name: "表单", open: false, icon: "icon-text-width", myUrl: "#!/form"
        },
        {
            name: "其他例子", open: false, icon: "icon-double-angle-right",
            children: [
                {
                    name: "信息列表", myUrl: "#!/tableData"
                },
                {
                    name: "时间轴", myUrl: "#!/timeline"
                },
                {
                    name: "文件上传", myUrl: "#!/dropzone"
                },
                {
                    name: "相册", myUrl: "#!/gallery"
                },
                {
                    name: "信件", myUrl: "#!/inbox"
                },
                {
                    name: "表格", myUrl: "#!/tables"
                },
                {
                    name: "向导验证", myUrl: "#!/formWizard"
                },
                {
                    name: "图表统计", myUrl: "#!/chart"
                },
                {
                    name: "404错误页面", myUrl: "#!/error404"
                },
                {
                    name: "500错误页面", myUrl: "#!/error505"
                },
                {
                    name: "三级菜单",
                    children: [
                        {name: "三级菜单1"},
                        {name: "三级菜单2"}
                    ]
                }
            ]
        },
        {
            name: "系统管理", open: false, icon: "icon-double-angle-right",
            children: [
                {
                    name: "后台管理", open: false, myUrl: "#!/backstageManage"
                },
                {
                    name: "菜单管理", open: false, myUrl: "#!/menuManage"
                },
                {
                    name: "用户管理", open: false, myUrl: "#!/userManage"
                },
                {
                    name: "修改密码", open: false, myUrl: "#!/changePwd"
                }
            ]
        }
    ];
    var backstageManage = avalon.define({
        $id: "backstageManage",
        rolename: '',
        roleData: [
            {
                roleid: "1",
                rolename: "系统管理员"
            },
            {
                roleid: "2",
                rolename: "普通用户"
            },
            {
                roleid: "3",
                rolename: "eqb"
            },
            {
                roleid: "4",
                rolename: "入驻审核员"
            },
            {
                roleid: "5",
                rolename: "产品发布人员"
            },
            {
                roleid: "6",
                rolename: "竞标管理人员"
            },
            {
                roleid: "7",
                rolename: "eqb业务管理员"
            }
        ],
        tree: {
            children: child,
            view: {
                showLine: function(leaf) {
                    return true
                    return leaf.level > 1 || 1
                }
            },
            callback: {
                onExpand: function(data) {
                },
                onClick: function(data) {
                    console.log(data)
                },
                onContextmenu: function(data) {
                    console.log(data)
                    // data.e.preventDefault()
                }
            }

        },
        $treeOpt: {
            children: [child[0]],
            check: {
                chkStyle: "radio",
                enable: true
            },
            callback: {
                onCheck: function (arg) {
                    avalon.log("radio checked")
                }
            }
        },
        //$skipArray: ["tree"],


        roleEdit: function (roleid, rolename) {
            backstageManage.rolename = rolename;
            layer.open({
                type: 1,
                title: "增加用户",
                closeBtn: 0,
                shadeClose: true,
                skin: 'yourclass',
                shade: 0.6,
                area: ['450px', '40%'],
                content: $("#loginLayer")
            });

        },
        permissionsLayer: function () {
            layer.open({
                type: 1,
                title: "权限修改",
                closeBtn: 0,
                shadeClose: true,
                skin: 'yourclass',
                shade: 0.6,
                area: ['600px', '60%'],
                content: $("#permissionsLayer")
            });

        },
        addrole: function () {
            layer.open({
                type: 1,
                title: "增加用户",
                closeBtn: 0,
                shadeClose: true,
                skin: 'yourclass',
                shade: 0.6,
                area: ['450px', '40%'],
                content: $("#addrole")
            });

        },
        deleterole: function (roleid) {
            var that = $(this);
            layer.confirm('您确定要删除？', {
                btn: ['yes','no'] //按钮
            }, function(){

                layer.closeAll('dialog');
            }, function(){
            });
        }

    });
    return avalon.controller(function ($ctrl) {

        $ctrl.$onEnter = function (param, rs, rj) {
        };
        $ctrl.$onRendered = function () {

        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [backstageManage];
    });
})