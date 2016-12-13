/**
 * Created by acer on 2016/10/22.
 */
avalon.filters.orderState= function(code){         //订单状态
    var result = "";
    if (code == 01) {
        result = '有效';
    } else if (code == 02){
        result = '中止';
    }else if (code == 03){
        result = '终止';
    }
    return result;
};

avalon.filters.flitership= function(code){
    var result = "";
    if (code == 0) {
        result = '本人';
    } else if (code == 1){
        result = '配偶';
    }else if (code == 2){
        result = '父母';
    }else if (code == 3){
        result = '子女';
    }else if (code == 99){
        result = '其他';
    }
    return result;
};