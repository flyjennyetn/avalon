/**
 * Created by flyjennyetn on 2016/6/22.
 */
define(["avalon", "lib/oniui/mmRouter/mmState"], function() {

    avalon.state("blog.test2", {
        url: "test2",
        views: {
            "": {
                templateUrl: "./script/pages/routeMore/test2.html",
                controllerUrl: "./pages/routeMore/test2"
            }
        }
    })

})