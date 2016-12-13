/**
 * Created by cui on 2016/11/9.
 */
define(['jquery', 'layer_', 'swiper', 'dropload', "droploadCss", '../../css/orderList.scss'], function ($, layer, swiper) {
    var root = avalon.vmodels.root;
    var orderList = avalon.define({
        $id: "orderList",
        orderArr: [],
        pageNum: 1,//默认请求第一页数据
        rows: 5,//每页加载条数
        loadStatus: true,//可加载更多状态
        TypeCode: '',
        orderType: [
            {id: '', name: '全部'},
            {id: '1', name: '待处理'},
            {id: '2', name: '支付中'},
            {id: '4', name: '已完成'},
            {id: '5', name: '退款中'},
            {id: '6', name: '逾期'}
        ],
        TypeList: function (Id) {
            orderList.TypeCode = Id;
            orderList.pageNum = 1;
            orderList.loadStatus = true;
            orderList.orderArr = [];
            getOrderList();
        },
        goDetail: function (orderId) {
            window.location.href = "#!/orderDetail/" + orderId;
        },
        getMore: function () {
            getOrderList();
        }
    });

    function getOrderList() {        //获取订单列表
        if (orderList.loadStatus) {
            root.getJsonData(
                '/newOrder/orderList',
                {
                    userId:JSON.parse(localStorage.getItem('userInfo')).regCode,
                    //userId: 'Liu_aj',
                    pageNum: orderList.pageNum,
                    rows: orderList.rows,
                    orderStatus: orderList.TypeCode,
                    productName: '',
                    orderId: ''
                },
                function (data) {
                    if (data) {
                        orderList.orderArr = orderList.orderArr.concat(data.orderList.list);//追加数据
                        if (data.orderList.list.length > orderList.rows - 1) {
                            orderList.pageNum++;
                            orderList.loadStatus = true;//可再加载更多
                        } else {
                            orderList.loadStatus = false;//不能再加载更多
                        }
                    }
                }, false
            );
            //var dropLoad = $('.List').dropload({
            //    scrollArea: window,
            //    loadDownFn: function (me) {
            //        if (orderList.loadStatus) {
            //            root.getJsonData(
            //                '/newOrder/orderList',
            //                {
            //                    //userId:JSON.parse(localStorage.getItem('userInfo')).regCode,
            //                    userId: 'Liu_aj',
            //                    pageNum: orderList.pageNum,
            //                    rows: orderList.rows,
            //                    orderStatus: orderList.TypeCode,
            //                    productName: '',
            //                    orderId: ''
            //                },
            //                function (data) {
            //                    if (data) {
            //                        orderList.orderArr = orderList.orderArr.concat(data.orderList.list);//追加数据
            //                        if (data.orderList.list.length > orderList.rows - 1) {
            //                            orderList.pageNum++;
            //                            orderList.loadStatus = true;//可再加载更多
            //                        } else {
            //                            orderList.loadStatus = false;//不能再加载更多
            //                        }
            //                    }
            //                    //me.resetload();
            //                }, false
            //            )
            //        }
            //    }
            //});
        }
    }
    //$(function(){
    //    $(window).scroll(
    //        function(){
    //            if ((document.documentElement.scrollHeight) == (document.documentElement.scrollTop | document.body.scrollTop) + document.documentElement.clientHeight){
    //                if(orderList.loadStatus){
    //                    getOrderList();
    //                }
    //            }
    //        }
    //    );
    //});
    return avalon.controller(function ($ctrl) {
        $ctrl.$onEnter = function () {
            if(root.loginStatus()){
                getList();
            }

        };
        $ctrl.$onRendered = function () {
            var swiper = new Swiper('.swiper-container', {
                slidesPerView: 3,
                centeredSlides: false
            });
            getOrderList()
        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [orderList];
    });
});