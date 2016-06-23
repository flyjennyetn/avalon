/**
 * Created by flyjennyetn on 2016/6/22.
 */
define(["avalon", "lib/oniui/mmRouter/mmState"], function() {

    avalon.state("blog", {
        url: "/",
        abstract: true, // 抽象状态，不会对应到url上
        // onEnter: function(rs, rj) {
        // return false // 中断
        // 可以在这里做一些权限判断
        // },
        stateUrl: "pages/stateBlog"
    }).state("blog.list", { // 定义一个子状态，对应url是 /{pageId}，比如/1，/2
        url: "list",
        stateUrl: "pages/stateList"
    }).state("blog.detail", { // 定义一个子状态，对应url是 /detail/{blogId}，比如/detail/1。/detail/2
        url: "detail",
        stateUrl: "pages/stateDetail"
    }).state("blog.detail.comment", {
        views: {
            "": {
                template: "text!pages/comment/comment.html"
            }
        }
    })

})