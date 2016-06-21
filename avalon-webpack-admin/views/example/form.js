/**
 * Created by flyjennyetn on 2016/5/23.
 */
define([
    "../../js/avalon/colorpicker/avalon.colorpicker", //颜色取值
    "../../js/avalon/datepicker/avalon.datepicker", //日历
    "../../js/avalon/flipswitch/avalon.flipswitch", //滑动开关
    "../../js/avalon/tooltip/avalon.tooltip", //气泡提示
    "../../js/avalon/dialog/avalon.dialog", //对话框
    "../../js/avalon/miniswitch/avalon.miniswitch",
    "../../js/avalon/miniswitch/avalon.miniswitch",
    "../../js/avalon/kindeditor/avalon.kindeditor",
    "../../js/avalon/kindeditor/themes/default/default.css",
    "laydate"
], function () {
    var form = avalon.define({
        $id: "form",
        show : function( id ){
            avalon.vmodels[id].toggle = true;
        },
        $kindeditor: {
            $options: {
                themesPath: 'js/avalon/kindeditor/themes/',
                langPath: 'js/avalon/kindeditor/lang/',
                pluginsPath: 'js/avalon/kindeditor/plugins/',
                //resizeType : 1,
                //allowPreviewEmoticons : false,
                //allowImageUpload : false,
                //items : [
                //    'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
                //    'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
                //    'insertunorderedlist', '|', 'emoticons', 'image', 'link']
            }
        },
        $qqOpt : {
            "contentGetter": function(elem) {
                if(elem && elem.tagName && (elem.tagName.toLowerCase() == 'input' || elem.getAttribute("tp"))){
                    var str = '请输入';
                    return str + str + str + str + str + str + str + str + str + str + str;
                }
            }
            , autohide: !true
        },
        dropdownOpts : {
            data: [
                {
                    value: '1',
                    label: '1'
                }, {
                    value: 2,
                    label: '2'
                }, {
                    label: 'group1',
                    options: [
                        {
                            value: false,
                            label: 'false'
                        },
                        {
                            value: null,
                            label: 'null'
                        }
                    ]
                }, {
                    label: 'group2',
                    options: [
                        {
                            value: 'disabled',
                            label: 'disabled',
                            enable: false
                        }
                    ]
                }
            ]
        },
        $skipArray : ['dropdownOpts']

});
    return avalon.controller(function ($ctrl) {

        $ctrl.$onEnter = function (param, rs, rj) {

        };
        $ctrl.$onRendered = function () {
        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [form];
    });
})