/**
 * Created by LMG on 2016/12/1.
 */
define(['jquery', 'layer_', 'dropload', "droploadCss", "../../css/myIncomeD.scss"], function ($, layer_) {
    var root = avalon.vmodels.root;
    var myIncomeD = avalon.define({
        $id: "myIncomeD",
        "pageNum": 1,
        "rows": 15,
        productName: '',
        policyNo: '',
        totalIncome: 0,//�ۼ�����
        count: '',//��������
        list: [],//ÿ������
        loadStatus: false//�ɼ��ظ���״̬

    });

    function getInfo(policyNo){
        root.getJsonData(       //��ȡ�����б���Ϣ
            '/policyAcc/accClQuery',
            {
                "pageNum": myIncomeD.pageNum,
                "policyNo": policyNo,
                "rows": myIncomeD.rows
            },
            function (data) {
                myIncomeD.count = data.orderAssetsList.count;
                myIncomeD.list =  myIncomeD.list.concat(data.orderAssetsList.list);//׷������
                if(data.orderAssetsList.list.length > myIncomeD.rows - 1){
                    myIncomeD.pageNum ++;
                    myIncomeD.loadStatus = true;//���ټ��ظ���
                }else {
                    myIncomeD.loadStatus = false;//�����ټ��ظ���
                }
            }, false
        )
    }

    return avalon.controller(function ($ctrl) {
        $ctrl.$onEnter = function (param) {
            getInfo(param.policyNo);
            myIncomeD.policyNo = param.policyNo;
            myIncomeD.productName = param.productName;
            myIncomeD.totalIncome = param.totalIncome;
        };
        $ctrl.$onRendered = function () {
        };
        $ctrl.$onBeforeUnload = function () {
            myIncomeD.list = [];
        };
        $ctrl.$vmodels = [myIncomeD];
    });
});