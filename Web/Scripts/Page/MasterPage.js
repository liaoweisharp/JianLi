﻿$(function () {
    $.datepicker.regional['zh-CN'] = {
        clearText: '清除',
        clearStatus: '清除已选日期',
        closeText: '关闭',
        closeStatus: '不改变当前选择',
        prevText: '<上月',
        prevStatus: '显示上月',
        prevBigText: '<<',
        prevBigStatus: '显示上一年',
        nextText: '下月>',
        nextStatus: '显示下月',
        nextBigText: '>>',
        nextBigStatus: '显示下一年',
        currentText: '今天',
        currentStatus: '显示本月',
        monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        monthNames: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
        monthStatus: '选择月份',
        yearStatus: '选择年份',
        weekHeader: '周',
        weekStatus: '年内周次',
        dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
        dayStatus: '设置 DD 为一周起始',
        dateStatus: '选择 m月 d日, DD',
        dateFormat: 'yy-mm-dd',
        firstDay: 1,
        initStatus: '请选择日期',
        isRTL: false
    };
    $.datepicker.setDefaults($.datepicker.regional['zh-CN']);

    $.fn.numeral = function () {
        $(this).css("ime-mode", "disabled");
        this.bind("keypress", function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);  //兼容火狐 IE   
            if (!$.browser.msie && (e.keyCode == 0x8))  //火狐下 不能使用退格键  
            {
                return;
            }
            return code >= 48 && code <= 57 || code == 46;
        });
        this.bind("blur", function () {
            if (this.value.lastIndexOf(".") == (this.value.length - 1)) {
                this.value = this.value.substr(0, this.value.length - 1);
            } else if (isNaN(this.value)) {
                this.value = " ";
            }
        });
        this.bind("paste", function () {
            var s = clipboardData.getData('text');
            if (!/\D/.test(s));
            value = s.replace(/^0*/, '');
            return false;
        });
        this.bind("dragenter", function () {
            return false;
        });
        this.bind("keyup", function () {
            this.value = this.value.replace(/[^\d.]/g, "");
            //必须保证第一个为数字而不是.
            this.value = this.value.replace(/^\./g, "");
            //保证只有出现一个.而没有多个.
            this.value = this.value.replace(/\.{2,}/g, ".");
            //保证.只出现一次，而不能出现两次以上
            this.value = this.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        });
    };

    //#region 格式化金额
    jQuery.formatCurrency = {};

    jQuery.formatCurrency.regions = [];

    // default Region is en
    jQuery.formatCurrency.regions[''] = {
        symbol: '',
        positiveFormat: '%s%n',
        negativeFormat: '(%s%n)',
        decimalSymbol: '.',
        digitGroupSymbol: ',',
        groupDigits: true
    };

    jQuery.fn.formatCurrency = function (destination, settings) {

        if (arguments.length == 1 && typeof destination !== "string") {
            settings = destination;
            destination = false;
        }

        // initialize defaults
        var defaults = {
            name: "formatCurrency",
            colorize: true,
            region: '',
            global: true,
            roundToDecimalPlace: 2, // roundToDecimalPlace: -1; for no rounding; 0 to round to the dollar; 1 for one digit cents; 2 for two digit cents; 3 for three digit cents; ...
            eventOnDecimalsEntered: false
        };
        // initialize default region
        defaults = $.extend(defaults, $.formatCurrency.regions['']);
        // override defaults with settings passed in
        settings = $.extend(defaults, settings);

        // check for region setting
        if (settings.region.length > 0) {
            settings = $.extend(settings, getRegionOrCulture(settings.region));
        }
        settings.regex = generateRegex(settings);

        return this.each(function () {
            
            $this = $(this);

            // get number
            var num = '0';
            num = $this[$this.is('input, select, textarea') ? 'val' : 'html']();
            if (num == "null") {
                $this[$this.is('input, select, textarea') ? 'val' : 'html']("");
                return;
            }
            //identify '(123)' as a negative number
            if (num.search('\\(') >= 0) {
                num = '-' + num;
            }

            if (num === '' || (num === '-' && settings.roundToDecimalPlace === -1)) {
                return;
            }

            // if the number is valid use it, otherwise clean it
            if (isNaN(num)) {
                // clean number
                num = num.replace(settings.regex, '');

                if (num === '' || (num === '-' && settings.roundToDecimalPlace === -1)) {
                    return;
                }

                if (settings.decimalSymbol != '.') {
                    num = num.replace(settings.decimalSymbol, '.');  // reset to US decimal for arithmetic
                }
                if (isNaN(num)) {
                    num = '0';
                }
            }

            // evalutate number input
            var numParts = String(num).split('.');
            var isPositive = (num == Math.abs(num));
            var hasDecimals = (numParts.length > 1);
            var decimals = (hasDecimals ? numParts[1].toString() : '0');
            var originalDecimals = decimals;

            // format number
            num = Math.abs(numParts[0]);
            num = isNaN(num) ? 0 : num;
            if (settings.roundToDecimalPlace >= 0) {
                decimals = parseFloat('1.' + decimals); // prepend "0."; (IE does NOT round 0.50.toFixed(0) up, but (1+0.50).toFixed(0)-1
                decimals = decimals.toFixed(settings.roundToDecimalPlace); // round
                if (decimals.substring(0, 1) == '2') {
                    num = Number(num) + 1;
                }
                decimals = decimals.substring(2); // remove "0."
            }
            num = String(num);

            if (settings.groupDigits) {
                for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
                    num = num.substring(0, num.length - (4 * i + 3)) + settings.digitGroupSymbol + num.substring(num.length - (4 * i + 3));
                }
            }

            if ((hasDecimals && settings.roundToDecimalPlace == -1) || settings.roundToDecimalPlace > 0) {
                num += settings.decimalSymbol + decimals;
            }

            // format symbol/negative
            var format = isPositive ? settings.positiveFormat : settings.negativeFormat;
            var money = format.replace(/%s/g, settings.symbol);
            money = money.replace(/%n/g, num);

            // setup destination
            var $destination = $([]);
            if (!destination) {
                $destination = $this;
            } else {
                $destination = $(destination);
            }
            // set destination
            
            $destination[$destination.is('input, select, textarea') ? 'val' : 'html']("￥" + money);


            if (
                hasDecimals &&
                settings.eventOnDecimalsEntered &&
                originalDecimals.length > settings.roundToDecimalPlace
            ) {
                $destination.trigger('decimalsEntered', originalDecimals);
            }

            // colorize
            if (settings.colorize) {
                $destination.css('color', isPositive ? 'green' : 'red');
            }
        });
    };

    // Remove all non numbers from text
    jQuery.fn.toNumber = function (settings) {
        var defaults = $.extend({
            name: "toNumber",
            region: '',
            global: true
        }, $.formatCurrency.regions['']);

        settings = jQuery.extend(defaults, settings);
        if (settings.region.length > 0) {
            settings = $.extend(settings, getRegionOrCulture(settings.region));
        }
        settings.regex = generateRegex(settings);

        return this.each(function () {
            var method = $(this).is('input, select, textarea') ? 'val' : 'html';
            $(this)[method]($(this)[method]().replace('(', '(-').replace(settings.regex, ''));
        });
    };

    // returns the value from the first element as a number
    jQuery.fn.asNumber = function (settings) {
        var defaults = $.extend({
            name: "asNumber",
            region: '',
            parse: true,
            parseType: 'Float',
            global: true
        }, $.formatCurrency.regions['']);
        settings = jQuery.extend(defaults, settings);
        if (settings.region.length > 0) {
            settings = $.extend(settings, getRegionOrCulture(settings.region));
        }
        settings.regex = generateRegex(settings);
        settings.parseType = validateParseType(settings.parseType);

        var method = $(this).is('input, select, textarea') ? 'val' : 'html';
        var num = $(this)[method]();
        num = num ? num : "";
        num = num.replace('(', '(-');
        num = num.replace(settings.regex, '');
        if (!settings.parse) {
            return num;
        }

        if (num.length == 0) {
            num = '0';
        }

        if (settings.decimalSymbol != '.') {
            num = num.replace(settings.decimalSymbol, '.');  // reset to US decimal for arthmetic
        }

        return window['parse' + settings.parseType](num);
    };

    function getRegionOrCulture(region) {
        var regionInfo = $.formatCurrency.regions[region];
        if (regionInfo) {
            return regionInfo;
        }
        else {
            if (/(\w+)-(\w+)/g.test(region)) {
                var culture = region.replace(/(\w+)-(\w+)/g, "$1");
                return $.formatCurrency.regions[culture];
            }
        }
        // fallback to extend(null) (i.e. nothing)
        return null;
    }

    function validateParseType(parseType) {
        switch (parseType.toLowerCase()) {
            case 'int':
                return 'Int';
            case 'float':
                return 'Float';
            default:
                throw 'invalid parseType';
        }
    }

    function generateRegex(settings) {
        if (settings.symbol === '') {
            return new RegExp("[^\\d" + settings.decimalSymbol + "-]", "g");
        }
        else {
            var symbol = settings.symbol.replace('$', '\\$').replace('.', '\\.');
            return new RegExp(symbol + "|[^\\d" + settings.decimalSymbol + "-]", "g");
        }
    }
    //#endregion  
})
var loading = "<div class='loading'><center><img src='../Images/ajax-loader_b.gif'></center></div>";
function getInit(arr, prefix) {

    var init = [];
    for (var i = 0; i < arr.length; i++) {
        id = arr[i][prefix + "Id"]; //Id是固定属性
        value = arr[i][prefix + "Name"]; //name是固定属性
        init.push({ id: id, title: value })
    }
    return init;
}
function getYesAndNo() {
    var init = [];
    init.push({ id: '1', title: "是" });
    init.push({ id: '0', title: "否" });
    return init;
}
//把obj属性是时间转化成日期字符串
function conventToDateTime(obj, jsonArray) {
    var datetimes = jsonArray.findAll("validate", "datetime");
    for (var i = 0; i < datetimes.length; i++) {
        if (obj && obj[datetimes[i].itemId]) {
            obj[datetimes[i].itemId] = strToDate(obj[datetimes[i].itemId]).pattern("yyyy-MM-dd");
        }
    } 
}