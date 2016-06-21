/**
 * Created by aaaa on 2016/6/14.
 */
define(['../../js/avalon/tree/avalon.tree.check', '../../js/avalon/tree/avalon.tree.edit'], function () {

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

    var menuManage = avalon.define({
        $id: "menuManage",
        menuData: {
            id: "",
            name: "",
            myUrl: "",
            icon: ""
        },
        tree: {
            children: child,
            edit: {
                showRemoveBtn: function (leaf) {
                    return leaf.level > 0
                }
            },
            data: {
                keep: {
                    leaf: false,
                    parent: true
                }
            },
            view: {
                editNameSelectAll: true,
                showLine: function (leaf) {
                    return true
                    return leaf.level > 1 || 1
                }
            },
            callback: {
                onCheck: function (arg) {
                    console.log(arg)
                },
                onClick: function (arg) {
                    menuManage.menuData.name = arg.leaf.name;
                    menuManage.menuData.id = arg.leaf.id;
                    menuManage.menuData.myUrl = arg.leaf.myUrl;
                    menuManage.menuData.icon = arg.leaf.icon;
                    return false;
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
        $skipArray: ["tree"]


    });
    return avalon.controller(function ($ctrl) {

        $ctrl.$onEnter = function (param, rs, rj) {

        };
        $ctrl.$onRendered = function () {

        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [menuManage];
    });
})