/**
 * Created by aaaa on 2016/6/14.
 */
define(["../../js/avalon/pager/avalon.pager"], function () {
    var userManage = avalon.define({
        $id: "userManage",
        data: [],
        allCheck: function () {
            if ($('#allCheck').is(":checked")) {
                $('.ace').attr('checked', true)
            } else {
                $('.ace').attr('checked', false)
            }
        },
        deleteData: function () {
            $(this).parents('tr').remove();
        },
        increase: function () {
            var i = $(this).parents("tr").index() + 1;
            window.location.href = "#!/update/" + i
        },
        pager:{
            totalItems: 150,
            onJump: function(e, data) {
                location.href = "#page=" + data.currentPage
            }

        },
        alertBox: function () {
            //弹出层
            layer.open({
                type: 1,
                title: "增加用户",
                closeBtn: 0,
                shadeClose: true,
                skin: 'yourclass',
                shade: 0.6,
                area: ['600px', '60%'],
                content: $("#loginLayer")
            });

        }
    });
    return avalon.controller(function ($ctrl) {

        $ctrl.$onEnter = function (param, rs, rj) {
            userManage.data = [{
                userId: '123123',
                name: 'aaa',
                role: 'boss',
                CreationTime: '2016-01-01'
            }, {
                userId: '46456',
                name: 'bbb',
                role: 'Npc',
                CreationTime: '2016-06-06'
            }, {
                userId: '123123',
                name: 'aaa',
                role: 'boss',
                CreationTime: '2016-01-01'
            }, {
                userId: '46456',
                name: 'bbb',
                role: 'Npc',
                CreationTime: '2016-06-06'
            }, {
                userId: '123123',
                name: 'aaa',
                role: 'boss',
                CreationTime: '2016-01-01'
            }, {
                userId: '46456',
                name: 'bbb',
                role: 'Npc',
                CreationTime: '2016-06-06'
            }];


        };
        $ctrl.$onRendered = function () {

        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [userManage];
    });
})