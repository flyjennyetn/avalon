/**
 * Created by Alex on 2016/3/28.
 */
define(["layer_", "jquery", 'swiper'], function (layer_, $, Swiper) {
    var home = avalon.define({
        $id: "home",
        queryLessonGradeStageState: 0,
        queryLessonGradeStage:        {
            "pSchool":[{"lessonId":35,"lessonSname":"小一 行路安全","lessonFname":"小学一年级安全课程视频学习","videoImgUrl":"upload/2015/11/11/894a12234fa44685b462b6719a2c65c2.jpg","isInvalid":"Y","gradeId":1,"stuTerm":"1","beginTime":"","endTime":"","lessonVideoId":"2a7f2d070c131caf05f7d00380d11944_2","extCode1":" 赵丽荣","extCode2":"Y","extCode3":"","extCode4":"","extCode5":"","createId":"","modifyId":"","insertTime":1446054809000,"updateTime":1447178809000},{"lessonId":36,"lessonSname":"小一 家电伤害","lessonFname":"小学一年级安全课程视频学习","videoImgUrl":"upload/2015/11/11/5b63429606244c3fa614afb8d242790d.jpg","isInvalid":"Y","gradeId":1,"stuTerm":"1","beginTime":"","endTime":"","lessonVideoId":"2a7f2d070c474a32b8865add95d5e1a6_2","extCode1":" 郝艳艳","extCode2":"Y","extCode3":"","extCode4":"","extCode5":"","createId":"","modifyId":"","insertTime":1446054907000,"updateTime":1447178752000},{"lessonId":37,"lessonSname":"小二 紧急求救","lessonFname":"小学二年级安全课程视频学习","videoImgUrl":"upload/2015/10/29/827a9c8faae843cab681004a5577b39c.jpg","isInvalid":"Y","gradeId":2,"stuTerm":"1","beginTime":"","endTime":"","lessonVideoId":"2a7f2d070ca7629a9e2c80c45a444438_2","extCode1":"孔晓珊","extCode2":"Y","extCode3":"","extCode4":"","extCode5":"","createId":"","modifyId":"","insertTime":1446081456000,"updateTime":1446173481000},{"lessonId":53,"lessonSname":"小二 乘车安全","lessonFname":"小二 乘车安全","videoImgUrl":"upload/2015/11/11/5eff0699ff564e3fa467eaf434cc4d2c.jpg","isInvalid":"Y","gradeId":2,"stuTerm":"1","beginTime":"","endTime":"","lessonVideoId":"2a7f2d070c3c35e907889247fe76321a_2","extCode1":"周唯","extCode2":"Y","extCode3":"","extCode4":"","extCode5":"","createId":"","modifyId":"","insertTime":1447178883000,"updateTime":1447179336000},{"lessonId":103,"lessonSname":"二年级 文具伤害","lessonFname":"正确使用文具，避免文具给我们带来伤害","videoImgUrl":"upload/2016/02/29/343519367aba4dfebba6e5de65e3481d.jpg","isInvalid":"Y","gradeId":2,"stuTerm":"2","beginTime":"","endTime":"","lessonVideoId":"2a7f2d070c27874495ce46fb669552d6_2","extCode1":" ","extCode2":"Y","extCode3":"","extCode4":"","extCode5":"","createId":"","modifyId":"","insertTime":1456732442000,"updateTime":1459388515000}],
            "jSchool":[{"lessonId":54,"lessonSname":"初中一年级骑车安全","lessonFname":"骑车安全描述","videoImgUrl":"upload/2015/12/01/bd8af62f92e04c768a4e5677093ed09d.jpg","isInvalid":"Y","gradeId":7,"stuTerm":"1","beginTime":"","endTime":"","lessonVideoId":"111111111111","extCode1":"哈哈哈","extCode2":"Y","extCode3":"","extCode4":"","extCode5":"","createId":"","modifyId":"","insertTime":1448940777000,"updateTime":1448940777000},{"lessonId":113,"lessonSname":"初一 猫狗咬伤","lessonFname":"和猫、狗相处时要遵守安全规范，保护自身安全","videoImgUrl":"upload/2016/02/29/803a1e45bb4b4310a26ef8c9eceaff0a.jpg","isInvalid":"Y","gradeId":7,"stuTerm":"2","beginTime":"","endTime":"","lessonVideoId":"2a7f2d070c81c47794933f7aa7c874ba_2","extCode1":" ","extCode2":"Y","extCode3":"","extCode4":"","extCode5":"","createId":"","modifyId":"","insertTime":1456733751000,"updateTime":1459304236000},{"lessonId":38,"lessonSname":"胜多负少","lessonFname":"似的发射点","videoImgUrl":"upload/2015/10/29/1b7be3d5acc642f299327b899b02586f.jpg","isInvalid":"Y","gradeId":8,"stuTerm":"1","beginTime":"","endTime":"","lessonVideoId":"2a7f2d070c741b3bb35deffd1fedf782_2","extCode1":"试试","extCode2":"Y","extCode3":"","extCode4":"","extCode5":"","createId":"","modifyId":"","insertTime":1446087852000,"updateTime":1446087852000},{"lessonId":115,"lessonSname":"初二 学校火灾","lessonFname":"帮助大家提高防火意识，免受火灾带来的损失","videoImgUrl":"upload/2016/02/29/f0582d69353448bc958278bc2d3dc7b2.jpg","isInvalid":"Y","gradeId":8,"stuTerm":"2","beginTime":"","endTime":"","lessonVideoId":"2a7f2d070cc9d5d92cdb2c71be1ecb4b_2","extCode1":" ","extCode2":"Y","extCode3":"","extCode4":"","extCode5":"","createId":"","modifyId":"","insertTime":1456733838000,"updateTime":1459303869000},{"lessonId":116,"lessonSname":"初二 暴雪冰雹","lessonFname":"面对突发灾害天气，要懂得如何躲避和应对","videoImgUrl":"upload/2016/02/29/828bf12a49c84acbb7c96e98210f5bbb.jpg","isInvalid":"Y","gradeId":8,"stuTerm":"2","beginTime":"","endTime":"","lessonVideoId":"2a7f2d070cb98e2d8cf80b0170544957_2","extCode1":" ","extCode2":"Y","extCode3":"","extCode4":"","extCode5":"","createId":"","modifyId":"","insertTime":1456733876000,"updateTime":1459303683000}],
            "sSchool":[{"lessonId":119,"lessonSname":"高一 传染病的预防","lessonFname":"你将学会如何保护自己免受病毒的侵害","videoImgUrl":"upload/2016/02/29/5d7016c8044240719d31884aed03accb.jpg","isInvalid":"Y","gradeId":10,"stuTerm":"2","beginTime":"","endTime":"","lessonVideoId":"2a7f2d070c59fe05733ea149d4834623_2","extCode1":" ","extCode2":"Y","extCode3":"","extCode4":"","extCode5":"","createId":"","modifyId":"","insertTime":1456733979000,"updateTime":1459303055000},{"lessonId":120,"lessonSname":"高一 学校火灾","lessonFname":"谨记校园的火灾安全隐患，运用所学知识排除隐患，保护好我们的生命财产","videoImgUrl":"upload/2016/02/29/225698d80e5041f9a59b1487a6ba0ebc.jpg","isInvalid":"Y","gradeId":10,"stuTerm":"2","beginTime":"","endTime":"","lessonVideoId":"2a7f2d070c2c5bfec0390d6a11bb038b_2","extCode1":" ","extCode2":"Y","extCode3":"","extCode4":"","extCode5":"","createId":"","modifyId":"","insertTime":1456734003000,"updateTime":1459302960000},{"lessonId":57,"lessonSname":"11年级  恐怖暴力","lessonFname":"11年级  恐怖暴力","videoImgUrl":"upload/2015/12/16/7fa84cc9050742048f3cb5463093ee8f.jpg","isInvalid":"Y","gradeId":11,"stuTerm":"1","beginTime":"","endTime":"","lessonVideoId":"2a7f2d070c79215342a86312744ee38a_2","extCode1":"mm","extCode2":"Y","extCode3":"","extCode4":"","extCode5":"","createId":"","modifyId":"","insertTime":1450201240000,"updateTime":1450201240000},{"lessonId":121,"lessonSname":"高二 台风灾害","lessonFname":"掌握台风的基本知识，保护生命财产安全","videoImgUrl":"upload/2016/02/29/301e720ea7bf4f1393112ba856290d0d.jpg","isInvalid":"Y","gradeId":11,"stuTerm":"2","beginTime":"","endTime":"","lessonVideoId":"2a7f2d070cb054a68ac8c80ac5980b2e_2","extCode1":" ","extCode2":"Y","extCode3":"","extCode4":"","extCode5":"","createId":"","modifyId":"","insertTime":1456734040000,"updateTime":1459302882000}, {"lessonId":122,"lessonSname":"高二 家庭火灾","lessonFname":"学会正确预防和处理家庭火灾的措施，提高防范与应急意识","videoImgUrl":"upload/2016/03/02/08c04ab19f9c47798de845c9668768ae.jpg","isInvalid":"Y","gradeId":11,"stuTerm":"2","beginTime":"","endTime":"","lessonVideoId":"2a7f2d070c86bd51ca8863fb4837ed6a_2","extCode1":" ","extCode2":"Y","extCode3":"","extCode4":"","extCode5":"","createId":"","modifyId":"","insertTime":1456734127000,"updateTime":1459302852000}]
        },
        lessonScore: "",  //课程分数
        lessonId: "",    //课程id
        grade: "",        //当前账户的年级 grade
        state: 0,        //是否必要登录
        getHeadLine: [
            'images/subject4_jTop.jpg',
            'images/subject4_jTop.jpg',
            'images/subject4_jTop.jpg'
        ],
        //已学习状态
        learningLesson: function (gradeId, lessonId) {
            var root = avalon.vmodels.root;
            var state = 1;
            if (root.isLogin(state)) {
                if (home.grade == gradeId) {
                    //root.getJsonData(
                    //    'interface/learningLesson.json',
                    //    {'lessonId': lessonId, stuCode: localStorage.getItem("token")},
                    //    function (datas) {
                    //    }
                    //);
                    root.getJsonData(
                        'interface/queryIfExam.json',
                        {token: localStorage.getItem("token"), lessonId: lessonId},
                        function (datas) {
                            if (datas.isPassStudy == 1) {
                                if (datas.isPassExam != 0) {
                                    home.lessonScore = datas.lessonScore;
                                    window.location.href = '#!/quizzes/' + gradeId + '/' + lessonId + '/' + datas.lessonScore;
                                } else {
                                    window.location.href = '#!/quizzes/' + gradeId + '/' + lessonId + '/no';
                                }
                            } else {
                                root.alert("请先学习课程！")
                            }
                        }
                    );
                }
            }
        },

        studyVideo: function (lessonVideoId, lessonId) {
            var root = avalon.vmodels.root;
            var state = 1;
            if (root.isLogin(state)) {
                home.learningLesson();
                layer_.open({
                    type: 1,
                    title: false,
                    shade: true,
                    shadeClose: true,
                    style: 'width:100%;',
                    content: "<div id='plv_" + lessonVideoId + "'></div>",
                    success: function () {
                        avalon.vmodels.root.polyvObject(lessonVideoId);
                    }
                });
            }
            root.getJsonData(
                'interface/learningLesson.json',
                {'lessonId': lessonId, stuCode: localStorage.getItem("token")},
                function (datas) {
                }
            );

        },
        primaryCourse: function () {
            $('.primaryCourse').css({display: 'block'});
            $('.primary').css({color: "#a0df77"});
            $('.juniorCourse').css({display: 'none'});
            $('.junior').css({color: "#000000"});
            $('.highCourse').css({display: 'none'});
            $('.high').css({color: "#000000"});
        },
        juniorCourse: function () {
            $('.primaryCourse').css({display: 'none'});
            $('.primary').css({color: "#000000"});
            $('.juniorCourse').css({display: 'block'});
            $('.junior').css({color: "#7385eb"});
            $('.highCourse').css({display: 'none'});
            $('.high').css({color: "#000000"});
        },
        highCourse: function () {
            $('.primaryCourse').css({display: 'none'});
            $('.primary').css({color: "#000000"});
            $('.juniorCourse').css({display: 'none'});
            $('.junior').css({color: "#000000"});
            $('.highCourse').css({display: 'block'});
            $('.high').css({color: "#ff8487"})
        },
        project: function () {
            window.location.href = '#!/projectCourese';
        },
        mine: function () {
            window.location.href = '#!/userCenter';
        },
        setTime: function () {
            setTimeout(function () {
                var mySwiper = new Swiper('.swiper-container', {
                    autoplay: 5000,
                    visibilityFullFit: true,
                    loop: true,
                    pagination: '.swiper-pagination'
                })
            }, 10)

        }
    });

    //home.$watch("queryLessonGradeStageState", function (value, oldValue) {
    //    home.setTime();
    //});

    return avalon.controller(function ($ctrl) {

        $ctrl.$onEnter = function () {
            //var root = avalon.vmodels.root;
            //root.directoryState = "home";
            //if (root.isLogin(home.state)) {
            //    if (root.userInfo != null) {
            //        home.grade = root.userInfo.grade;
            //    } else {
            //        home.grade = 0;
            //    }
            //}
        };
        $ctrl.$onRendered = function () {
<<<<<<< HEAD
            //var root = avalon.vmodels.root;
            //root.getJsonData('interface/queryLessonGradeStage.json', {}, function (data) {
            //    home.queryLessonGradeStage = avalon.mix(home.queryLessonGradeStage, data);
            //});
=======
            var root = avalon.vmodels.root;
            root.getJsonData('interface/queryLessonGradeStage.json', {}, function (data) {
                home.queryLessonGradeStage = avalon.mix(home.queryLessonGradeStage, data);
            });
>>>>>>> router
            //if(home.getHeadLine.length==0){
            //    root.getJsonData('getHeadLine.json', {}, function (data) {
            //        home.getHeadLine = data;
            //    });
            //}
            //setTimeout(function () {
            //    home.queryLessonGradeStageState = new Date();
            //},10);
            home.setTime();
        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [home];
    });
});
