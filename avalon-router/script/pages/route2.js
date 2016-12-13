/**
 * Created by flyjennyetn on 2016/6/22.
 */
define(["avalon", "lib/oniui/mmRouter/mmState"], function() {

    avalon.state("blog.test1", {
        url: "test1",
        views: {
            "": {
                templateUrl: "./script/pages/routeMore/test1.html",
                controllerUrl: "./pages/routeMore/test1"
            }
        }
    })

})