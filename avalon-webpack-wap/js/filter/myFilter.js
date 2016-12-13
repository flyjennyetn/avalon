/**
 * Created by Alex on 2016/10/18.
 */
avalon.filters.orderState = function (code) {         //订单状态
    var result = "";
    if (code == 1) {
        result = '待支付';
    } else if (code == 2) {
        result = '支付中';
    } else if (code == 3) {
        result = '支付成功';
    } else if (code == 4) {
        result = '订单完成';
    } else if (code == 5) {
        result = '退款中';
    } else if (code == 6) {
        result = '已关闭';
    }
    return result;
};
avalon.filters.ordernav = function (code) {         //订单状态
    var result = "";
    if (code == '') {
        result = '';
    } else if (code == 1) {
        result = '待处理';
    } else if (code == 2) {
        result = '支付中';
    } else if (code == 4) {
        result = '已完成';
    } else if (code == 5) {
        result = '退款中';
    } else if (code == 6) {
        result = '逾期';
    }
    return result;
};
avalon.filters.poliyState = function (code) {         //订单状态
    var result = "";
    if (code == 1) {
        result = '待核保';
    } else if (code == 2) {
        result = '已成功';
    } else if (code == 3) {
        result = '已失败';
    } else if (code == 4) {
        result = '出单中';
    } else if (code == 5) {
        result = '保障中';
    } else if (code == 6) {
        result = '已失败';
    } else if (code == 7) {
        result = '退保中';
    } else if (code == 8) {
        result = '已退保';
    } else if (code == 9) {
        result = '保障中';
    }
    return result;
};
avalon.filters.busiType = function (code) {
    var result = "";
    if (code == 0) {
        result = '新契约';
    } else if (code == 1) {
        result = '犹豫期退保';
    } else if (code == 2) {
        result = '退保';
    } else if (code == 3) {
        result = '追加';
    } else if (code == 4) {
        result = '部分领取';
    }
    return result;
};


// 1:本人，9:配偶,10:父母,11:子女 ,14:其他
avalon.filters.relationType = function (code) {
    var result = "";
    if (code == 0) {
        result = '本人';
    } else if (code == 1) {
        result = '配偶';
    } else if (code == 2) {
        result = '父母';
    } else if (code == 3) {
        result = '子女';
    } else if (code == 99) {
        result = '其他';
    }
    return result;
};
avalon.filters.nationality = function (code) {
    var result = "";
    if (code == 'AUS') {
        result = '澳大利亚';
    } else if (code == 'CAN') {
        result = '加拿大';
    } else if (code == 'CHN') {
        result = '中国';
    } else if (code == 'FRA') {
        result = '法国';
    } else if (code == 'GBR') {
        result = '英国';
    } else if (code == 'GER') {
        result = '德国';
    } else if (code == 'HK') {
        result = '中国香港';
    } else if (code == 'INA') {
        result = '印尼';
    } else if (code == 'ITA') {
        result = '意大利';
    } else if (code == 'JPN') {
        result = '日本';
    } else if (code == 'KOR') {
        result = '韩国';
    } else if (code == 'MAS') {
        result = '马来西亚';
    } else if (code == 'MC') {
        result = '中国澳门';
    } else if (code == 'OTH') {
        result = '其他';
    } else if (code == 'PHI') {
        result = '菲律宾';
    } else if (code == 'RUS') {
        result = '俄罗斯';
    } else if (code == 'SIN') {
        result = '新加坡';
    } else if (code == 'THA') {
        result = '泰国';
    } else if (code == 'TW') {
        result = '中国台湾';
    } else if (code == 'USA') {
        result = '美国';
    }else if (code == 'VIE') {
        result = '越南';
    }
    return result;
};
avalon.filters.codeNum = function (code) {
    var result = "";
    if (code == 0) {
        result = '身份证';
    } else if (code == 1) {
        result = '护照';
    } else if (code == 2) {
        result = '军官证';
    } else if (code == 3) {
        result = '驾照';
    } else if (code == 4) {
        result = '户口本';
    }else if (code == 5) {
        result = '学生证';
    }else if (code == 6) {
        result = '工作证';
    }else if (code == 7) {
        result = '无证件';
    }
    return result;
};

//  保障周期转换
avalon.filters.getPeriodName = function (code) {
    if (code) {
        var result = "";
        if (code.indexOf('Y') > -1) {
            result = code.replace(/Y/g, "年");
        } else if (code.indexOf('M') > -1) {
            result = code.replace(/M/g, "月");
        } else if (code.indexOf('D') > -1) {
            result = code.replace(/D/g, "天");
        } else if (code.indexOf('ZS') > -1) {
            result = code.replace(/ZS/g, "终身");
        }
        return result;
    }
};