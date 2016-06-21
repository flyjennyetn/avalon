/**
 * Created by aaaa on 2016/6/2.
 */
define([], function () {
    var tableData = avalon.define({
        $id: "tableData",
        data:[],
        allCheck: function () {
            if($('#allCheck').is(":checked")){
                $('.ace').attr('checked',true)
            }
        },
        deleteData: function () {
            $(this).parents('tr').remove();
        },
        increase: function () {
            window.location.href = "#!/inputData"
        }
    });
    return avalon.controller(function ($ctrl) {

        $ctrl.$onEnter = function (param, rs, rj) {
            tableData.data =[{
                name:'aaa',
                sex:'男',
                phone:'13132131',
                email:'221892@qq.com',
                img:''
            },{
                name:'bbb',
                sex:'女',
                phone:'131321131',
                email:'a112@qq.com',
                img:''
            },{
                name:'ccc',
                sex:'女',
                phone:'131321131',
                email:'a112@qq.com',
                img:''
            }];
        };
        $ctrl.$onRendered = function () {

        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [tableData];
    });
})