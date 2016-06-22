// msl20n/avalon.l20n 支持1.4.6
// msl20n/avalon.l20n_1 支持1.5.5
define(['msl20n','meld'], function() {
    'use strict';

    var samples = avalon.define({
        $id: "samples"
    });

    avalon.define({
        $id: "samples1"
    })

    var vmsamples2 = avalon.define({
        $id: "samples2",
        data: {
            objectsNum: 3
        },
        changeLocale: function(newLocale) {
            avalon.changeLocale(newLocale, vmsamples2.$id);
        }
    })

    var vmsamples3 = avalon.define({
        $id: "samples3",
        l20nI18nId: "setObjectsNumber",
        changeLocale: function(newLocale) {
            avalon.changeLocale(newLocale, vmsamples3.$id);
        }
    })

    var vmsamples4 = avalon.define({
        $id: "samples4",
        data: {
            testNumber: 4
        },

        changeLocale: function(newLocale) {
            avalon.changeLocale(newLocale, vmsamples4.$id);
        }
    })

    var vmsamples5 = avalon.define({
        $id: "samples5",
        AttributeL20nAuto: 'Attribute',

        changeLocale: function(newLocale) {
            avalon.changeLocale(newLocale, vmsamples5.$id);
        }
    })

    var vmsamples6 = avalon.define({
        $id: "samples6",

        changeLocale: function(newLocale) {
            avalon.changeLocale(newLocale, vmsamples6.$id);
        }
    })

    var vmsamples7 = avalon.define({
        $id: "samples7",

        changeLocale: function(newLocale) {
            avalon.changeLocale(newLocale, vmsamples7.$id);
        },
        changeLocaleGlobal: function(newLocale) {
            avalon.changeLocale(newLocale);
        }
    })

    var vmsamples71 = avalon.define({
        $id: "samples71",
        $skipArray: ["l20n"],
        l20n: {},


        changeLocale: function(newLocale) {
            avalon.changeLocale(newLocale, vmsamples71.$id);
        }
    })

    var vmsamples72 = avalon.define({
        $id: "samples72",
        $skipArray: ["l20n"],
        l20n: {},

        changeLocale: function(newLocale) {
            avalon.changeLocale(newLocale, vmsamples72.$id);
        }
    })

    var vmsamples8 = avalon.define({
        $id: "samples8",
        currentLocale: 'en-US',
        $skipArray: ["l20n"],
        l20n: {
            initLocale: 'en-US',
            manifestResource: "./locales/l20n.json"
        },
        changeLocale: function(newLocale) {
            avalon.changeLocale(newLocale, vmsamples8.$id);
        },
        changeLocaleGlobal: function(newLocale) {
            avalon.changeLocale(newLocale);
        }
    })

    var vmsamples81 = avalon.define({
        $id: "samples81",
        $skipArray: ["l20n"],
        l20n: {
            initLocale: 'pl',
            manifestResource: "./locales/l20n.json"
        },


        changeLocale: function(newLocale) {
            avalon.changeLocale(newLocale, vmsamples81.$id);
        }
    })

    var vmsamples82 = avalon.define({
        $id: "samples82",
        $skipArray: ["l20n"],
        l20n: {},

        changeLocale: function(newLocale) {
            avalon.changeLocale(newLocale, vmsamples82.$id);
        }
    })

    var vmsamples83 = avalon.define({
        $id: "samples83"

    })

    return avalon.controller(function ($ctrl) {

        $ctrl.$onEnter = function (param, rs, rj) {
            console.log("开始进入");
        };
        $ctrl.$onRendered = function () {
            console.log("加载完成");
        };
        $ctrl.$onBeforeUnload = function () {
        };
        $ctrl.$vmodels = [samples];
    });
});
