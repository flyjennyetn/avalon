/**
 * Created by TR on 2016/11/2.
 */
//此部分与页面没有交互的逻辑性操作
(function (config) {
    config.tools = {
        Wi: [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1],    // 加权因子
        ValideCode: [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2],           // 身份证验证位值.10代表X
        IdCardValidate: function (idCard) {
            idCard = tools.trim(idCard.replace(/ /g, ""));               //去掉字符串头尾空格
            var a_idCard = idCard.split("");                // 得到身份证数组
            if (tools.isValidityBrithBy18IdCard(idCard) && tools.isTrueValidateCodeBy18IdCard(a_idCard)) {   //进行18位身份证的基本验证和第18位的验证
                return true;
            } else {
                return false;
            }
        },

        /**
         * 判断身份证号码为18位时最后的验证位是否正确
         * @param a_idCard 身份证号码数组
         * @return
         */
        isTrueValidateCodeBy18IdCard: function (a_idCard) {
            var sum = 0;                             // 声明加权求和变量
            if (a_idCard[17].toLowerCase() == 'x') {
                a_idCard[17] = 10;                    // 将最后位为x的验证码替换为10方便后续操作
            }
            for (var i = 0; i < 17; i++) {
                sum += tools.Wi[i] * a_idCard[i];            // 加权求和
            }
            var valCodePosition = sum % 11;                // 得到验证码所位置
            if (a_idCard[17] == tools.ValideCode[valCodePosition]) {
                return true;
            } else {
                return false;
            }
        },
        /**
         * 验证18位数身份证号码中的生日是否是有效生日
         * @param idCard 18位书身份证字符串
         * @return
         */
        isValidityBrithBy18IdCard: function (idCard18) {
            var year = idCard18.substring(6, 10);
            var month = idCard18.substring(10, 12);
            var day = idCard18.substring(12, 14);
            var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
            // 这里用getFullYear()获取年份，避免千年虫问题
            if (temp_date.getFullYear() != parseFloat(year)
                || temp_date.getMonth() != parseFloat(month) - 1
                || temp_date.getDate() != parseFloat(day)) {
                return false;
            } else {
                return true;
            }
        },

        //去掉字符串头尾空格
        trim: function (str) {
            return str.replace(/(^\s*)|(\s*$)/g, "");
        },

        /**
         * 通过身份证判断是男是女
         * @param idCard 15/18位身份证号码
         * @return 'female'-女、'male'-男
         * @return '0'-女、'1'-男
         */
        maleOrFemalByIdCard: function (idCard) {
            if (!idCard) {
                return "";
            }
            // 对身份证号码做处理。包括字符间有空格。
            idCard = tools.trim(idCard.replace(/ /g, ""));
            if (idCard.length == 15) {
                if (idCard.substring(14, 15) % 2 == 0) {
                    return '0';
                } else {
                    return '1';
                }
            } else if (idCard.length == 18) {
                if (idCard.substring(14, 17) % 2 == 0) {
                    return '0';
                } else {
                    return '1';
                }
            } else {
                return null;
            }
        },
        /**
         * 功能：根据身份证号获得出生日期
         参数：身份证号 psidno
         返回值：
         出生日期*/

        GetBirthday: function (psidno) {
            var birthdayno, birthdaytemp;
            if (psidno.length == 18) {
                birthdayno = psidno.substring(6, 14);
            } else if (psidno.length == 15) {
                birthdaytemp = psidno.substring(6, 12);
                birthdayno = "19" + birthdaytemp;
            } else {
                //alert("错误的身份证号码，请核对！")
                return false;
            }
            var birthday = birthdayno.substring(0, 4) + "-" + birthdayno.substring(4, 6) + "-" + birthdayno.substring(6, 8);
            return birthday;
        },


        //获取明天日期
        genTomorrowDate: function () {
            var tomorrow = new Date();
            var month = tomorrow.getMonth() + 1;
            var date = tomorrow.getDate() + 1;
            if (month < 10) {
                month = "0" + month;
            }
            if (date < 10) {
                date = "0" + date;
            }
            return tomorrow.getFullYear() + '-' + month + '-' + date;
        },


        //生成当前日期
        genCurrentDate: function () {
            var tomorrow = new Date();
            var month = tomorrow.getMonth() + 1;
            var date = tomorrow.getDate();
            if (month < 10) {
                month = "0" + month;
            }
            if (date < 10) {
                date = "0" + date;
            }
            return tomorrow.getFullYear() + '-' + month + '-' + date;
        },


        //获取结束时间
        getEndDate: function (startTime, space) {
            if (space != null) {
                var temp = parseInt(space.substring(0, space.length - 1));
                var day = new Date(startTime);
                var yeas = day.getFullYear();// 获取年份
                var month = day.getMonth();// 获取月份，值在0--11之间
                var days = day.getDate();// 获取每个月的第几天
                if (temp == 0) {
                    return startTime;
                } else {
                    if (space.indexOf('D') >= 0) {
                        day.setDate(temp + days);
                        return tools.getNewDate(day);

                    } else if (space.indexOf('M') >= 0) {
                        day.setMonth(month + temp);
                        if (day.getDate() < days) {
                            day.setDate(0);
                        }
                        days = day.getDate();// 获取每个月的第几天
                        day.setDate(days - 1);
                        return tools.getNewDate(day);
                    } else if (space.indexOf('Y') >= 0) {
                        day.setYear(yeas + temp);
                        if (month < day.getMonth()) {
                            day.setDate(0);
                        }
                        days = day.getDate();// 获取每个月的第几天
                        day.setDate(days - 1);
                        return tools.getNewDate(day);
                    } else {
                        alert("您输入的日期有误");
                    }
                }
            }
        },

        getNewDate: function (oldFormat) {
            var day = new Date(oldFormat);
            var yeas = day.getFullYear();// 获取年份
            var month = day.getMonth() + 1;// 获取月份，值在0--12之间
            var days = day.getDate();// 获取每个月的第几天
            var week = day.getDay();// 获取当前的星期值在0--6之间
            if (month.toString().length == 1) {
                month = '0' + month;
            }
            if (days.toString().length == 1) {
                days = '0' + days;
            }
            return yeas + "-" + month + "-" + days;
        },

        //将时间yyyy-mm-dd 转为 yyyymmdd
        getTurnDate: function (vul) {
            var newTypeDate = vul.substring(0, 4) + vul.substring(5, 7) + vul.substring(8, 10);
            return newTypeDate;
        },

        /**
         *根据出生日期计算年龄
         * str : 出生日期
         * insuredDate : 投保生效日
         */
        getCurrentAge: function (str, insuredDate) {
            var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
            if (r == null) {
                return false;
            }
            var d = new Date(r[1], r[3] - 1, r[4]);
            var age = 0;
            if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
                var Y;
                if (insuredDate) {
                    var insured = insuredDate.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
                    Y = new Date(insured[1], insured[3] - 1, insured[4]);
                } else {
                    Y = new Date();
                }
                if (Y.getFullYear() - r[1] <= 0) {
                    age = 0;
                } else {
                    if (Y.getFullYear() - r[1] == 0) {
                        age = 0;
                    } else {
                        if ((d.getMonth() + 1) > (Y.getMonth() + 1)) {
                            age = Y.getFullYear() - r[1] - 1;
                        } else {
                            if ((d.getMonth() + 1) == (Y.getMonth() + 1) && (d.getDate()) > (Y.getDate())) {
                                age = Y.getFullYear() - r[1] - 1;
                            } else {
                                age = Y.getFullYear() - r[1];
                            }
                        }
                    }
                }
                return ( age <= 0 ? 0 : age);
            }
            return ("输入的日期格式错误！");
        },
        /**根据出生日期获取 出生多少天  传入yyyy-MM-dd
         /* day : 出生日期
         * insuredDate ： 保单生效日
         **/
        getDaysFromBirth: function (day, insuredDate) {
            if (day) {
                var birthday = new Date(day.replace(/-/g, '/')).getTime();
                var currentTimpstamp;
                if (insuredDate) {
                    var insured = insuredDate.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
                    currentTimpstamp = new Date(insured[1], insured[3] - 1, insured[4]).getTime();
                } else {
                    currentTimpstamp = new Date().getTime();
                }
                return ((currentTimpstamp - birthday) / 86400000).toFixed(0);
            } else {
                return 0
            }
        },
        /**根据出生日期获取 出生多少月  传入yyyy-MM-dd
         /* birthday : 出生日期
         * insuredDate ： 保单生效日
         **/
        getMonthsFromBirth: function (birthday, insuredDate) {
            //用-分成数组
            var date1 = birthday.split("-");
            var date2 = insuredDate.split("-");
            //获取年,月数
            var year1 = parseInt(date1[0]),
                month1 = parseInt(date1[1]),
                year2 = parseInt(date2[0]),
                month2 = parseInt(date2[1]),
            //通过年,月差计算月份差
                months = (year2 - year1) * 12 + (month2 - month1);
            return months;
        },


        //获取URl中的参数
        getUrlString: function (val) {
            var uri = window.location.href;
            var re = new RegExp("" + val + "=([^&?]*)", "ig");
            return ((uri.match(re)) ? (uri.match(re)[0].substr(val.length + 1)) : null);
        },
        //计算成保年龄区间
        getAgeInterval: function (minAge, maxAge) {
            var str1 = '';
            var str2 = '';
            //最小年龄
            if (minAge.indexOf('Y') > -1) {
                str1 = minAge.replace("Y", "岁");
            }
            if (minAge.indexOf('M') > -1) {
                str1 = minAge.replace("M", "月");
            }
            if (minAge.indexOf('D') > -1) {
                str1 = minAge.replace("D", "天");
            }
            //最大年龄
            if (maxAge.indexOf('Y') > -1) {
                str2 = maxAge.replace("Y", "岁");
            }
            if (maxAge.indexOf('M') > -1) {
                str2 = maxAge.replace("M", "月");
            }
            if (maxAge.indexOf('D') > -1) {
                str2 = maxAge.replace("D", "天");
            }
            if (minAge == maxAge) {
                return str1
            }
            return str1 + '至' + str2 + '之间';
        },
        //判断产品投保年龄是否满足
        calculateAge: function (birthday, minAge, maxAge, insuredDate) {
            var effectiveDate = '';
            if (insuredDate == null) {
                effectiveDate = tools.genTomorrowDate();
            } else {
                effectiveDate = insuredDate
            }
            var age = tools.getCurrentAge(birthday, effectiveDate);//计算多少周岁
            var months = tools.getMonthsFromBirth(birthday, effectiveDate);//计算出生多少月
            var days = tools.getDaysFromBirth(birthday, effectiveDate);//计算出生了多少天
            //最小年龄
            if (minAge.indexOf('Y') > -1) {
                if (age <= parseInt(minAge.replace("Y", ""))) {
                    return false;
                }
            }
            if (minAge.indexOf('M') > -1) {
                if (months < parseInt(minAge.replace("M", ""))) {
                    return false;
                }
            }
            if (minAge.indexOf('D') > -1) {
                if (days < parseInt(minAge.replace("D", ""))) {
                    return false;
                }
            }
            //最大年龄
            if (maxAge.indexOf('Y') > -1) {
                if (age > parseInt(maxAge.replace("Y", ""))) {
                    return false;
                }
            }
            if (maxAge.indexOf('M') > -1) {
                if (months > parseInt(maxAge.replace("M", ""))) {
                    return false;
                }
            }
            if (maxAge.indexOf('D') > -1) {
                if (days > parseInt(maxAge.replace("D", ""))) {
                    return false;
                }
            }
            return true;
        },
        validCredNum: function (type, credNum) {                //表单验证
            //console.info("进入验证",type,credNum);
            var validFlag = true;
            if (typeof credNum == "undefined" || credNum == null || credNum == "" || credNum == "-1") {
                validFlag = false;
            } else {
                if ("1" == type) {//身份证
                    validFlag = tools.IdCardValidate(credNum);
                } else if ("3" == type) {//护照号
                    validFlag = (/^[a-zA-Z\d]{6,10}$/).test(credNum);
                } else if ("mobile" == type) {//手机
                    validFlag = (/^[\+86|86]?1[3|4|5|7|8]\d{9}$/.test(credNum));
                } else if ("name" == type) {//姓名
                    validFlag = (/^[\u4e00-\u9fa5]{2,10}$/).test(credNum);
                } else if ("email" == type) {//邮箱
                    validFlag = (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(credNum));
                } else if ("postCode" == type) {//邮政编码
                    validFlag = (/^[0-9]{6}$/).test(credNum);
                } else if ("passWord" == type) { //密码验证 6-20位，字母、数字、符号的组合
                    validFlag = (/^[\w.]{6,20}$/).test(credNum)
                }else if('number' == type){     //验证是否为全数字
                    validFlag = (/^[0-9]*$/).test(credNum)
                }
            }
            return validFlag;
        }
    }
})(window);