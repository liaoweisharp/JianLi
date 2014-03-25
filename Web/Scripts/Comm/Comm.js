/// <reference path="../JQuery/jquery-1.4.1-vsdoc.js?ver=Acepherics120317" />
//获得url参数
//    使用方法：
//var args = new Object();
//args = GetUrlParms();
//如果要查找参数key:
//value = args[key] 
function GetUrlParms() {
    var args = new Object();
    var query = location.search.substring(1); //获取查询串   
    var pairs = query.split("&"); //在逗号处断开   
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('='); //查找name=value   
        if (pos == -1) continue; //如果没有找到就跳过   
        var argname = pairs[i].substring(0, pos); //提取name   
        var value = pairs[i].substring(pos + 1); //提取value   
        args[argname] = unescape(value); //存为属性   
    }
    return args;
}

function getFlashObjectStr(url) {
    var _src = url.indexOf("?") != -1 ? url.substring(0, url.indexOf("?")) : url;
    var id_name = _src.indexOf("/") != -1 ? _src.substring(_src.lastIndexOf("/") + 1, _src.toLowerCase().lastIndexOf(".swf")) : _src.substring(0, _src.toLowerCase().lastIndexOf(".swf"));
    var flashStr = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="' + id_name + '"' +
                                    ' width="100%" height="100%" codebase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab">' +
                                    ' <param name="movie" value="' + _src + '" />' +
                                    ' <param name="quality" value="high" />' +
                                    ' <param name="bgcolor" value="#869ca7" />' +
                                    ' <param name="allowScriptAccess" value="sameDomain" />' +
                                    ' <param name="wmode" value="opaque" />' +
                                    ' <param id="paramValue" name="flashvars" value="' + url + '" />' +
                                    ' <embed id="embedSrc" src="' + url + '" quality="high" bgcolor="#869ca7" width="100%" height="100%"' +
                                        ' name="' + id_name + '" align="middle" play="true" loop="false" type="application/x-shockwave-flash"' +
                                        ' wmode="opaque" pluginspage="http://www.adobe.com/go/getflashplayer">' + '</embed></object>';
    return flashStr;

}


//打开一个新窗口
function openNewWindow(url) {
    $("<form action=\"" + url + "\" target=\"_blank\" method=\"POST\"><input type=\"submit\"></form>").appendTo("body").submit().remove();
}
//得到Body滚动条已经卷上去的高度。
function getScrollTop() {
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    }
    else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}

//保留x位小数（四舍五入）
function Math_Round(num, x) {

    if (parseFloat(num) == num) {
        if (x == 0) {
            return Math.round(num);
        }
        else {
            var xx = x * 10;
            return Math.round(num * xx) / xx;
        }
    }
    else {
        return 0;
    }
}
//字符串转换成日期类型(如：str为"\Date(213132312312)\")
function strToDate(str) {
    var reg = "[0-9]+";
    var minTime = str.match(reg)[0];
    return new Date(Number(minTime));
}
//保留小数指定位数
function fomatFloat(src, pos) {
    return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
}
var DateFormatType = {
    defaultDate: "mm/dd/yyyy HH:MM:ss",
    shortDateTime: "mm/dd/yyyy",
    fullDateTime: "ddd mmm dd yyyy HH:MM:ss",

    shortDate: "m/d/yy",

    mediumDate: "mmm d, yyyy",

    longDate: "mmmm d, yyyy",

    fullDate: "dddd, mmmm d, yyyy",

    shortTime: "h:MM TT",

    mediumTime: "h:MM:ss TT",

    longTime: "h:MM:ss TT Z",

    isoDate: "yyyy-mm-dd",

    isoTime: "HH:MM:ss",

    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",

    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"

};


Date.prototype.toUSAFormat = function (format) {
    var xYear = this.getFullYear();
//    if (!(navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)) {//非IE
//        xYear = xYear + 1900;
//    }

    var xMonth = this.getMonth() + 1;
    if (xMonth < 10) {
        xMonth = "0" + xMonth;
    }

    var xDay = this.getDate();
    if (xDay < 10) {
        xDay = "0" + xDay;
    }

    var xHours = this.getHours();
    if (xHours < 10) {
        xHours = "0" + xHours;
    }

    var xMinutes = this.getMinutes();
    if (xMinutes < 10) {
        xMinutes = "0" + xMinutes;
    }

    var xSeconds = this.getSeconds();
    if (xSeconds < 10) {
        xSeconds = "0" + xSeconds;
    }
    if (typeof format == "undefined" || format == null || format == DateFormatType.defaultDate) {
        return xMonth + "/" + xDay + "/" + xYear + " " + xHours + ":" + xMinutes + ":" + xSeconds;
    } else if (format == DateFormatType.shortDateTime) {
        return xMonth + "/" + xDay + "/" + xYear;
    }
    return xMonth + "/" + xDay + "/" + xYear + " " + xHours + ":" + xMinutes + ":" + xSeconds;
}

//得到FullName
function getFullName(firstName, lastName) {
    var name = "";
    if (lastName != null && lastName.length > 0) {
        var lname = lastName.substring(0, 1).toUpperCase() + lastName.substring(1);
        name += lname + ",";
    }
    if (firstName != null && firstName.length > 0) {
        var fname = firstName.substring(0, 1).toUpperCase() + firstName.substring(1);
        name += " " + fname;
    }
    return name;
}
function getFullName2(user) {
    var firstName = user.Fname;
    var lastName= user.Lname;
    var name = "";
    if (lastName != null && lastName.length > 0) {
        var lname = lastName.substring(0, 1).toUpperCase() + lastName.substring(1);
        name += lname + ",";
    }
    if (firstName != null && firstName.length > 0) {
        var fname = firstName.substring(0, 1).toUpperCase() + firstName.substring(1);
        name += " " + fname;
    }
    return name;
}

function randomStringFunEx(length) {
    ///<summary>生成随机字符串</summary>
    ///<param name="length">生成字符串的长度</param>
    ///<return>返回生成的字符串</return>

    var x = "0123456789qwertyuioplkjhgfdsazxcvbnm";
    var tmp = new Array();
    for (var i = 0; i < length; i++) {
        tmp[i] = (x.charAt(Math.ceil(Math.random() * 100000000) % x.length));
    }
    return tmp.join("");
}


//Knowledge Guide公用的函数
//var comm_randomStr = "";
/**
* data:{ container:a,result:b,par_UserId:c, par_SectionId:d, par_RoleId:e, par_tUserId:f, par_tRoleId:g, showPriorityFlag:h, showLessonFlag:i, showHistoryFlag:j, loFlag:k,showDescriptionFlag:l}
**/

//var tempSelectedStructureIndex = 0;
function comm_showDrillWindow(itemId) {
    var _simpleUser = null;
    if (typeof get_simpleUser=="function") {
        _simpleUser = get_simpleUser();
    } else if (typeof simpleUser != "undefined" && simpleUser) {
        _simpleUser = simpleUser;
    } else if (typeof getSimpleUser=="function") {
        _simpleUser = getSimpleUser();
    }
    showDrillWindow({ loId: itemId, simpleUser: _simpleUser })
}

function comm_getKnowledgeGuideHTML(data) {//data
    //container, result, par_UserId, par_SectionId, par_RoleId, par_tUserId, par_tRoleId, showPriorityFlag, showLessonFlag, showHistoryFlag, loFlag,showImproveFlag
    var container = data.container;
    var result = data.result;
    var par_simpleUser = data.par_simpleUser;
    var par_UserId = null;
    var par_SectionId = null;
    var par_RoleId = null;

    if (par_simpleUser) {
        par_UserId = par_simpleUser.ID;
        par_SectionId = par_simpleUser.SectionId;
        par_RoleId = par_simpleUser.RoleId;
    }
    //    var par_UserId = data.par_UserId;
    //    var par_SectionId = data.par_SectionId;
    //    var par_RoleId = data.par_RoleId;
    var par_tUserId = data.par_tUserId;
    var par_tRoleId = data.par_tRoleId;
    var showPriorityFlag = data.showPriorityFlag;
    var showLessonFlag = data.showLessonFlag;
    var showHistoryFlag = data.showHistoryFlag;
    var loFlag = data.loFlag;
    var showDescriptionFlag = typeof data.showDescriptionFlag == "undefined" || data.showDescriptionFlag == null || !data.showDescriptionFlag ? false : true;
    var enterNextStructureObj = data.enterNextStructureObj;
    var showImproveFlag = typeof data.showImproveFlag != "undefined" && data.showImproveFlag != null && data.showImproveFlag == false ? false : true;
    var showMoreFlag = typeof data.showMoreFlag != "undefined" && data.showMoreFlag != null && data.showMoreFlag == false ? false : true;
    var expandFirstFlag = data.expandFirstFlag;
    var comm_randomStr = randomStringFunEx(10);

    var _container = null;
    if (typeof container == "object") {
        if (container instanceof jQuery) {
            _container = container;
        } else {
            _container = $(container);
        }
    } else if (typeof container == "string") {
        _container = $("#" + container);
    } else {

        alert("error");
        return;
    }

    if (result != null) {
        par_tUserId = par_UserId; //目前老师查看学生knowledge guide 点其他链接进去还是教师自己

        var htmlStrArray = new Array();
        var tLoFlag = typeof loFlag == "undefined" || loFlag || loFlag == null ? true : false;
        var showFuFlag = par_simpleUser.ShowCounsellingCentreFlag;  //typeof getShowCounsellingCentreFlag() != "undefined" && getShowCounsellingCentreFlag() ? true : false;
        var haveSampleQuestionFlag = false;
        var havePracticeFlag = false;
        var haveHistoryFlag = false;
        var index = 0;
        var levelMax = 0;
        // var tarray = new Array();
        for (var m = 0; m < result.length; m++) {
            var tlevel = $getCharCount(result[m].unit, ".");
            if (tlevel > levelMax) {
                levelMax = tlevel;
            }

            //            for (var n = 0; n < tarray.length; n++) {
            //                if (tarray[n] == result[m].itemId) {
            //                    result.splice(m, 1)
            //                    tarray.splice(n,1)
            //                    break;
            //                }
            //            }
            //           tarray.push(result[m].itemId);
        }
     
        for (var i = 0; i < result.length; i++) {
            var level = $getCharCount(result[i].unit, ".");

            var ulSuoJin = 'style="padding-left:' + (level * 20) + 'px;"';
            var titleDivClass = "";
            var titleSpanClass = "";
            var tUrlParams = result[i].itemType == "1" ? "loId=" + result[i].itemId : "structureId=" + result[i].itemId;
            var descriptionStr = result[i].description != null && $.trim(result[i].description) != "" ? result[i].description : ''; //'<span style="font-size:11px;color:gray;padding:2px;">No description yet.</span>';
            if (level < levelMax) {//tLoFlag && result[i].itemType != "1") {//chapter & section （是要生成Knowlege Point的界面 并且当前索引项类型不是KP）

                if (level == 0) {
                    //titleDivClass = 'class="c_blue_bg pd_5 h20 line_h20"';
                    titleSpanClass = 'class="fl f13 fbold c_d_blue"';

                } else {
                    titleDivClass = 'class="fl f13 fbold c_blue"';
                    titleSpanClass = ' class="fl f13 fbold c_blue"';
                }
                htmlStrArray.push('<ul ' + ulSuoJin + '>');
                htmlStrArray.push('<div ' + titleDivClass + ' style="clear:both;">');
                var tfun = "";
                if (enterNextStructureObj) {
                    tfun = ' onclick = "comm_ClickKPChapterOrSection(\'' + level + '\',\'' + result[i].parentId + '\')" style="cursor:pointer;" ';
                }
                htmlStrArray.push('<span ' + titleSpanClass + '>' + result[i].unit + ' <span ' + tfun + ' id="' + comm_randomStr + 'itemName_' + result[i].itemId + '">' + result[i].itemName + '</span></span>');
                htmlStrArray.push('</div>');
                htmlStrArray.push('<p class="f11 c_gra line_h20"></p>');
                htmlStrArray.push('</ul>');
            } else {//knowlege point
                htmlStrArray.push('<ul id="' + comm_randomStr + 'kg_ul_' + result[i].itemId + '" ' + ulSuoJin + ' class="kphover">');
                htmlStrArray.push('<div class="f11 fbold c_gra" style="clear:both;">'); //\'' + result[i].itemId + '\',\'' + comm_randomStr + '\',' + showDescriptionFlag + '
                htmlStrArray.push('<span class="fl">')
                if (tLoFlag) {//当前索引项是KP 且现在是要生成knowledge point选项卡下的界面
                    index++;
                    htmlStrArray.push('<table loIndex="' + index + '" cellpadding="0" cellspacing="0" onclick="onGetStudyReferenceClick({current:this,index:' + index + ',userId:\'' + par_UserId + '\',sectionId:\'' + par_SectionId + '\',itemId:\'' + result[i].itemId + '\',commStrId:\'' + comm_randomStr + '\',showDescriptionFlag:' + showDescriptionFlag + '})" class="pointerCursor">');
                    htmlStrArray.push('<tr>');
                    htmlStrArray.push('<td style="vertical-align:middle">');
                    htmlStrArray.push('<img alt="" src="../_Images/bullet_arrow_right.png" class="sanjiao" />');
                    htmlStrArray.push('</td>');
                    htmlStrArray.push('<td style="width:500px;font-size:13px;font-weight:normal;color:black;">' + result[i].unit + ' <span id="' + comm_randomStr + 'itemName_' + result[i].itemId + '">' + result[i].itemName + '</span></td>');
                    htmlStrArray.push('</tr>');
                    htmlStrArray.push('</table>');
                } else {
                    var _tStyle = "color:#013655;font-weight:bold;";
                    if (level != 0) {
                        _tStyle = "color:#005F9C;font-weight:normal;";
                    }

                    if (enterNextStructureObj) {
                        if (!(enterNextStructureObj.selectedSubMenuIndex == 1 && level == 0)) {
                            htmlStrArray.push('<span enterNextStructureId="' + result[i].itemId + '" ' + titleSpanClass + ' style="width:500px;font-size:13px;cursor:pointer;display:block;' + _tStyle + 'padding-left:5px">' + result[i].unit + ' ' + result[i].itemName + '</span>');
                        } else {
                            //enterLastStructure
                            htmlStrArray.push('<span onclick="comm_ClickKPChapterOrSection(0)" ' + titleSpanClass + ' style="cursor:pointer;width:500px;font-size:13px;' + _tStyle + 'padding-left:5px">' + result[i].unit + ' ' + result[i].itemName + '</span>');
                        }
                    } else {
                        htmlStrArray.push('<span ' + titleSpanClass + ' style="width:500px;font-size:13px;' + _tStyle + 'padding-left:5px">' + result[i].unit + ' ' + result[i].itemName + '</span>');
                    }
                }
                htmlStrArray.push('</span>');
                var classStatus = result[i].classKnowledgeStatus != "--" ? getScoreChange(result[i].classKnowledgeStatus * 100) : "--";
                var personalStatus;
                if (par_tRoleId == "1") {
                    personalStatus = result[i].personalKnowledgeStatus != null && result[i].personalKnowledgeStatus != "--" ? getScoreChange(result[i].personalKnowledgeStatus * 100) : "--";
                }
                if (!tLoFlag) {
                    //                    htmlStrArray.push('<span class="fr mg_r10">');暂屏蔽
                    //                    htmlStrArray.push('<img alt="" width="16" height="16" title="visual map" class="pointerCursor" onclick="openNewWindow(\''
                    //                    + '../Report/KnowledgeVisualMap.aspx?userId=' + par_UserId + '&sectionId=' + par_SectionId + '&tUserId=' + par_tUserId + '&tRoleId=' + par_RoleId + '&' + tUrlParams
                    //                    + '\')" src="../_Images/map.png" />');
                    //                    htmlStrArray.push('</span>');
                    //                    if (showFuFlag) {
                    //                        htmlStrArray.push('<span class="fr mg_r10">');
                    //                        htmlStrArray.push('<img alt="" width="16" height="16" title="send tutoring request" class="pointerCursor" onclick="openNewWindow(\''
                    //                    + '../Counselling/CounseRequest.aspx?ciId=' + result[i].itemId + '&ciType=2&sectionId=' + par_SectionId
                    //                    + '\')" src="../_Images/fafu.gif" src="../_Images/fafu.gif" />');
                    //                        htmlStrArray.push('</span>');
                    //                        htmlStrArray.push('<span class="fr mg_r10">');
                    //                        htmlStrArray.push('<img alt="" width="16" height="16" title="add to tutoring cart" class="pointerCursor" onclick="onAddRequestCartClick(\'' + result[i].itemId + '\',2)" src="../_Images/jiafu.gif" />');
                    //                        htmlStrArray.push('</span>');
                    //                    }
                } else {
                    if (showMoreFlag) {
                        htmlStrArray.push('<span class="fr mg_r10 pointerCursor" title="more" onmouseover="comm_showMoreAction(this)" onmouseout="comm_hideMoreAction(this)">');
                        htmlStrArray.push('<div class="moreAction">');
                        if (typeof showPriorityFlag == "undefined" || showPriorityFlag) {
                            var priority = getPriority(result[i].priority);
                            htmlStrArray.push('<div title="' + priority + '"><img title="' + priority + '" alt="" width="16" height="16" src="../_Images/' + priority + '.gif"/>&nbsp;<span>Priority</span></div>');
                        }

                        //                            if (typeof showLessonFlag != "undefined" && showLessonFlag) {
                        //                                htmlStrArray.push('<div title="Lesson" onclick="openNewWindow(\''
                        //                            + '../Report/KnowledgeGuide.aspx?userId=' + par_UserId + '&sectionId='
                        //                            + par_SectionId + '&tUserId=' + par_tUserId + '&tRoleId=' + par_RoleId + '&' + tUrlParams
                        //                            + '\')"><img alt="" width="16" height="16" src="../_Images/ico_sj.gif" />&nbsp;<span>Lesson</span></div>');
                        //                            }

                        if (result[i].exampleQuestionFlag > 0) {
                            if (!haveSampleQuestionFlag) {
                                haveSampleQuestionFlag = true;
                            }
                            htmlStrArray.push('<div title="sample question" onclick="openNewWindow(\''
                            + '../TestShow/TestContent.aspx?userId=' + par_UserId + '&sectionId=' + par_SectionId + '&tUserId=' + par_tUserId + '&type=2&loId=' + result[i].itemId + '&name=' + result[i].itemName
                            + '\')"><img alt="" width="16" height="16" src="../_Images/ico_les03.gif"/>&nbsp;<span>Sample&nbsp;Question</span></div>');
                        }

                        if (result[i].practiceFlag != "0") {
                            if (!havePracticeFlag) {
                                havePracticeFlag = true;
                            }
                            htmlStrArray.push('<div title="reinforcement practice" onclick="openNewWindow(\''
                            + '../TestShow/TestContent.aspx?userId=' + par_UserId + '&sectionId=' + par_SectionId + '&tUserId=' + par_tUserId + '&type=0&' + tUrlParams + '&name=' + result[i].itemName
                            + '\')"><img alt="" width="16" height="16" src="../_Images/practice.gif"/>&nbsp;<span>Practice</span></div>');
                        }

                        var tflag = result[i].testCoverage == null || result[i].testCoverage == "" || parseFloat(result[i].testCoverage) == 0 ? false : true;
                        if (tflag) {
                            if (!haveHistoryFlag) {
                                haveHistoryFlag = true;
                            }
                            htmlStrArray.push('<div title="History" onclick="onViewHistoryClick(\'' + result[i].itemId + '\',\'' + comm_randomStr + 'itemName_' + result[i].itemId + '\')"><img alt="" width="16" height="16" src="../_Images/history.png" />&nbsp;<span>History</span></div>');
                        }

                        if (showFuFlag) {
//                            htmlStrArray.push('<div title="send tutoring request" onclick="openNewWindow(\''
//                            + '../Counselling/CounseRequest.aspx?ciId=' + result[i].itemId + '&ciType=2&sectionId=' + par_SectionId
//                            + '\')"><img alt="" width="16" height="16" src="../_Images/fafu.gif" src="../_Images/fafu.gif" />&nbsp;<span>Send&nbsp;Request</span></div>');

//                            htmlStrArray.push('<div title="add to tutoring cart" onclick="onAddRequestCartClick(\'' + result[i].itemId + '\',2)"><img alt="" width="16" height="16" src="../_Images/jiafu.gif" />&nbsp;<span>Add&nbsp;Request</span></div>');
                        }
                        htmlStrArray.push('<div title="visual map" onclick="openNewWindow(\''
                        + '../Report/KnowledgeVisualMap.aspx?userId=' + par_UserId + '&sectionId=' + par_SectionId + '&tUserId=' + par_tUserId + '&tRoleId=' + par_RoleId + '&' + tUrlParams
                        + '\')"><img alt="" width="16" height="16" src="../_Images/map.png" />&nbsp;<span>Visual&nbsp;Map</span></div>');

                        htmlStrArray.push('<div title="report error" onclick="onCorrectionClick(\'' + result[i].itemId + '\')"><img alt="" width="16" height="16" src="../_Images/application_osx_double.png" />&nbsp;<span>Report&nbsp;Error</span></div>');
                       // htmlStrArray.push('<div title="Bookmark it for Review" onclick="onAddConcernClick(\'' + result[i].itemId + '\')"><img alt="" width="16" height="16" src="../_Images/optional.gif" />&nbsp;<span>Bookmark&nbsp;it&nbsp;for&nbsp;Review</span></div>');

                        htmlStrArray.push('</div>');
                        htmlStrArray.push('<span class="moreActionFontStyle">More<img Align="top" src="../_Images/bullet_arrow_down.png" alt=""/></span>');
                        htmlStrArray.push('</span>');
                    }
                    if (showImproveFlag) {
                        var tFlag = false;
                        if (typeof personalStatus != "undefined" && personalStatus != "Excellent") {
                            tFlag = true;
                        } else if (classStatus != "Excellent") {
                            tFlag = true;
                        }
                        if (tFlag) {
                            htmlStrArray.push('<span class="fr mg_r10 pointerCursor" title="help me improve" onclick="comm_showDrillWindow(\'' + result[i].itemId + '\')">');
                            htmlStrArray.push('<img alt="" Align="top" width="16" height="16" class="pointerCursor" src="../_Images/lightbulb_off.png"/>');
                            htmlStrArray.push('Help me improve');
                            htmlStrArray.push('</span>');

                        } else {
                            htmlStrArray.push('<span class="fr mg_r10 pointerCursor" style="visibility:hidden;">');
                            htmlStrArray.push('<img alt="" Align="top" width="16" height="16" class="pointerCursor" src="../_Images/lightbulb_off.png"/>');
                            htmlStrArray.push('Help me improve');
                            htmlStrArray.push('</span>');
                        }
                    }
                }


                //                if (false && tLoFlag && (typeof showHistoryFlag != "undefined" && showHistoryFlag)) {暂屏蔽
                //                    htmlStrArray.push('<span class="fr mg_r10" hideHistoryFlag="false">');
                //                    var tflag = result[i].testCoverage == null || result[i].testCoverage == "" || parseFloat(result[i].testCoverage) == 0 ? false : true;
                //                    if (tflag) {
                //                        if (!haveHistoryFlag) {
                //                            haveHistoryFlag = true;
                //                        }
                //                        htmlStrArray.push('<img alt="" class="cursorpointer" title="History" onclick="onViewHistoryClick(\'' + result[i].itemId + '\')" width="16" height="16" src="../_Images/history.png" />');
                //                    } else {
                //                        htmlStrArray.push('<img alt="" title="No history"  width="16" height="16" style="visibility:hidden" src="../_Images/history_g.png" />');
                //                    }
                //                    htmlStrArray.push('</span>');
                //                }
                //                if (!tLoFlag) {暂屏蔽
                //                    htmlStrArray.push('<span class="fr mg_r10" hidePracticeFlag="false">');
                //                    if (result[i].practiceFlag != "0") {
                //                        if (!havePracticeFlag) {
                //                            havePracticeFlag = true;
                //                        }
                //                        htmlStrArray.push('<img alt="" width="16" height="16" title="reinforcement practice" class="pointerCursor" onclick="openNewWindow(\''
                //                        + '../TestShow/TestContent.aspx?userId=' + par_UserId + '&sectionId=' + par_SectionId + '&tUserId=' + par_tUserId + '&type=0&' + tUrlParams + '&name=' + result[i].itemName
                //                        + '\')" src="../_Images/practice.gif"/>');
                //                    } else {
                //                        htmlStrArray.push('<img alt="" width="16" height="16" style="visibility:hidden" title="no reinforcement practice"  src="../_Images/practice_g.gif"/>');
                //                    }
                //                    htmlStrArray.push('</span>');
                //                    htmlStrArray.push('<span class="fr mg_r10" hideSampleQuestionFlag="false">');
                //                    if (result[i].exampleQuestionFlag > 0) {
                //                        if (!haveSampleQuestionFlag) {
                //                            haveSampleQuestionFlag = true;
                //                        }
                //                        htmlStrArray.push('<img alt="" width="16" height="16" title="sample question" class="pointerCursor" onclick="openNewWindow(\''
                //                        + '../TestShow/TestContent.aspx?userId=' + par_UserId + '&sectionId=' + par_SectionId + '&tUserId=' + par_tUserId + '&type=2&loId=' + result[i].itemId + '&name=' + result[i].itemName
                //                        + '\')" src="../_Images/ico_les03.gif"/>');
                //                    } else {
                //                        htmlStrArray.push('<img alt="" width="16" height="16" style="visibility:hidden" title="no sample question" src="../_Images/ico_les03_g.gif"/>');
                //                    }

                //                    htmlStrArray.push('</span>');

                //                    if (typeof showLessonFlag != "undefined" && showLessonFlag) {
                //                        htmlStrArray.push('<span class="fr mg_r10">');
                //                        htmlStrArray.push('<img onclick="openNewWindow(\''
                //                    + '../Report/KnowledgeGuide.aspx?userId=' + par_UserId + '&sectionId='
                //                    + par_SectionId + '&tUserId=' + par_tUserId + '&tRoleId=' + par_RoleId + '&' + tUrlParams
                //                    + '\')" alt="" style="cursor:pointer;" width="16" height="16" title="Lesson" src="../_Images/ico_sj.gif" />');
                //                        htmlStrArray.push('</span>');
                //                    }

                //                    if (typeof showPriorityFlag == "undefined" || showPriorityFlag) {
                //                        htmlStrArray.push('<span class="fr mg_r10">');
                //                        var priority = getPriority(result[i].priority);
                //                        htmlStrArray.push('<img alt="" width="16" height="16" title="' + priority + '" src="../_Images/' + priority + '.gif"/>');
                //                        htmlStrArray.push('</span>');
                //                    }
                //                }

                //                htmlStrArray.push('<span class="fr mg_r10">');【暂屏蔽】
                //                var classStatus = result[i].classKnowledgeStatus != "--" ? getScoreChange(result[i].classKnowledgeStatus * 100) : "--";
                //                var percentClassKnowledgeScore = result[i].classKnowledgeStatus != null && result[i].classKnowledgeStatus != "--" ? (result[i].classKnowledgeStatus * 100) + "%" : "0%";
                //                htmlStrArray.push('<div style="width:130px;padding:0px">');
                //                htmlStrArray.push('<div title="Class status: ' + classStatus + '" style="border:1px solid rgb(120,132,132);">');
                //                htmlStrArray.push('<div style="height:10px;width:' + percentClassKnowledgeScore + ';background-color:rgb(122,200,99);font-weight:normal">&nbsp;</div>');
                //                htmlStrArray.push("</div>");
                //                if (par_tRoleId == "1") {
                //                    var personalStatus = result[i].personalKnowledgeStatus != null && result[i].personalKnowledgeStatus != "--" ? getScoreChange(result[i].personalKnowledgeStatus * 100) : "--";
                //                    var percentPersonalKnowledgeScore = result[i].personalKnowledgeStatus != null && result[i].personalKnowledgeStatus != "--" ? (result[i].personalKnowledgeStatus * 100) + "%" : "0%";
                //                    htmlStrArray.push('<div title="Personal status: ' + personalStatus + '" style="border:1px solid rgb(120,132,132);border-top-style:none;">');
                //                    htmlStrArray.push('<div style="height:10px;width:' + percentPersonalKnowledgeScore + ';background-color:rgb(127,195,235);font-weight:normal;">&nbsp;</div>');
                //                    htmlStrArray.push('</div>');
                //                }
                //                htmlStrArray.push('</div>');
                //                htmlStrArray.push('</span>');
                //  /*htmlStrArray.push('</div>');*/
                //var classStatus = result[i].classKnowledgeStatus != "--" ? getScoreChange(result[i].classKnowledgeStatus * 100) : "--";
                if (par_tRoleId == "1") {
                    //   var personalStatus = result[i].personalKnowledgeStatus != null && result[i].personalKnowledgeStatus != "--" ? getScoreChange(result[i].personalKnowledgeStatus * 100) : "--";

                    htmlStrArray.push('<span class="fr mg_r10">');
                    
                    if (par_simpleUser && par_simpleUser.IsEmathCourse == true) {
                        htmlStrArray.push('<span title="My Status">' + personalStatus + '</span>');
                    }
                    else {
                        htmlStrArray.push('<span title="My Status">' + personalStatus + '</span> / <span style="color:#000" title="Class Status">' + classStatus + '</span>');
                    }
                    htmlStrArray.push('</span>');
                    if ($.trim(personalStatus) == "Weak") {
                        htmlStrArray.push('<span class="fr mg_r10"><img src="../_Images/flag_red.png" alt=""/></span>');
                    } else if ($.trim(personalStatus) == "Inadequate") {
                        htmlStrArray.push('<span class="fr mg_r10"><img src="../_Images/flag_yellow.png" alt=""/></span>');
                    }
                } else {

                    htmlStrArray.push('<span class="fr mg_r10" style="color:#000">');
                    htmlStrArray.push('<span title="Class Status">' + classStatus + '</span>');
                    htmlStrArray.push('</span>');
                    if ($.trim(classStatus) == "Weak") {
                        htmlStrArray.push('<span class="fr mg_r10"><img src="../_Images/flag_red.png" alt=""/></span>');
                    } else if ($.trim(classStatus) == "Inadequate") {
                        htmlStrArray.push('<span class="fr mg_r10"><img src="../_Images/flag_yellow.png" alt=""/></span>');
                    }
                }

                var tDescriptionId = comm_randomStr + "kg_detail_" + result[i].itemId;
                if (tLoFlag) {
                    htmlStrArray.push('<p class="f11 c_gra line_h20 pointerCursor"></p>');
                    htmlStrArray.push('<div>');
                    htmlStrArray.push('<table id="' + comm_randomStr + '_tb_' + result[i].itemId + '" style="display:none;margin-bottom:6px;" cellpadding="0" cellspacing="0" border="0" class="roudcorntb">');
                    htmlStrArray.push('<tr><td class="tl"></td><td class="tm"></td><td class="tr"></td></tr>');
                    htmlStrArray.push('<tr>');
                    htmlStrArray.push('<td class="ml"></td>');
                    htmlStrArray.push('<td class="mm">');
                    if (descriptionStr != "") {
                        htmlStrArray.push('<table style="margin-bottom:5px" cellpadding="0" cellspacing="0" border="0" class="roudcornlb">');
                        htmlStrArray.push('<tr><td class="tl"></td><td class="tm"></td><td class="tr"></td></tr>');
                        htmlStrArray.push('<tr>');
                        htmlStrArray.push('<td class="ml"></td>');
                        htmlStrArray.push('<td class="mm">');
                        if (showDescriptionFlag) {
                            htmlStrArray.push('<div id="' + tDescriptionId + '" style="width:860px;font-weight:normal;font-size:13px;color:#43525a;">' + descriptionStr + '</div>');
                        } else {
                            htmlStrArray.push('<div id="' + tDescriptionId + '" style="display:none;width:860px;font-weight:normal;font-size:13px;color:#43525a;">' + descriptionStr + '</div>');
                        }
                        htmlStrArray.push('</td>');
                        htmlStrArray.push('<td class="mr"></td>');
                        htmlStrArray.push('</tr>');
                        htmlStrArray.push('<tr><td class="bl"></td><td class="bm"></td><td class="br"></td></tr>');
                        htmlStrArray.push('</table>');
                    }
                    htmlStrArray.push('<table cellpadding="0" cellspacing="0" border="0" class="roudcornlb">');
                    htmlStrArray.push('<tr><td class="tl"></td><td class="tm"></td><td class="tr"></td></tr>');
                    htmlStrArray.push('<tr>');
                    htmlStrArray.push('<td class="ml"></td>');
                    htmlStrArray.push('<td class="mm">');
                    htmlStrArray.push('<div style="display:none;width:860px" id="' + comm_randomStr + 'kg_p_reference_' + result[i].itemId + '"></div>');
                    htmlStrArray.push('</td>');
                    htmlStrArray.push('<td class="mr"></td>');
                    htmlStrArray.push('</tr>');
                    htmlStrArray.push('<tr><td class="bl"></td><td class="bm"></td><td class="br"></td></tr>');
                    htmlStrArray.push('</table>');

                    htmlStrArray.push('</td>');
                    htmlStrArray.push('<td class="mr"></td>');
                    htmlStrArray.push('</tr>');
                    htmlStrArray.push('<tr><td class="bl"></td><td class="bm"></td><td class="br"></td></tr>');
                    htmlStrArray.push('</table>');
                } else {
                    htmlStrArray.push('<p class="f11 c_gra line_h20" style="padding-left:20px">');
                    if (showDescriptionFlag) {
                        htmlStrArray.push('<div id="' + tDescriptionId + '" class="kpDes">' + descriptionStr + '</div>');
                    } else {
                        htmlStrArray.push('<div id="' + tDescriptionId + '" class="kpDes" style="display:none;">' + descriptionStr + '</div>');
                    }
                    htmlStrArray.push('<div style="display:none;" id="' + comm_randomStr + 'kg_p_reference_' + result[i].itemId + '"></div>');
                }

                //                var tDescriptionId = comm_randomStr + "kg_detail_" + result[i].itemId;
                //                if (tLoFlag) {
                //                    htmlStrArray.push('<p id="' + comm_randomStr + 'kg_p_' + result[i].itemId + '" class="f11 c_gra line_h20 pointerCursor">');
                //                    if (showDescriptionFlag) {
                //                        htmlStrArray.push('<div id="' + tDescriptionId + '" class="kpDes">' + descriptionStr + '</div>');
                //                    } else {
                //                        htmlStrArray.push('<div id="' + tDescriptionId + '" class="kpDes" style="display:none;">' + descriptionStr + '</div>');
                //                    }
                //                    htmlStrArray.push('<div style="display:none;" id="' + comm_randomStr + 'kg_p_reference_' + result[i].itemId + '"></div></p>');
                //                } else {
                //                    htmlStrArray.push('<p id="' + comm_randomStr + 'kg_p_' + result[i].itemId + '" class="f11 c_gra line_h20" style="padding-left:20px">');
                //                    if (showDescriptionFlag) {
                //                        htmlStrArray.push('<div id="' + tDescriptionId + '" class="kpDes">' + descriptionStr + '</div>');
                //                    } else {
                //                        htmlStrArray.push('<div id="' + tDescriptionId + '" class="kpDes" style="display:none;">' + descriptionStr + '</div>');
                //                    }
                //                    htmlStrArray.push('<div style="display:none;" id="' + comm_randomStr + 'kg_p_reference_' + result[i].itemId + '"></div></p>');
                //                }

                htmlStrArray.push('</ul>');
            }

        }
        _container.html(htmlStrArray.join(''));
        if (expandFirstFlag) {
            //$("table[loIndex=1]").trigger("click");
        }
        if (!haveHistoryFlag) {
            _container.find("span[hideHistoryFlag=false]").hide();
        }
        if (!havePracticeFlag) {
            _container.find("span[hidePracticeFlag=false]").hide();
        }
        if (!haveSampleQuestionFlag) {
            _container.find("span[hideSampleQuestionFlag=false]").hide();
        }

        if (enterNextStructureObj) {

            _container.find("span[enterNextStructureId]").each(function (index) {
                var $this = $(this);
                $this.click(function () {

                    if (enterNextStructureObj.selectedSubMenuIndex < 4) {
                        // comm_clickEnterStructure({ treeO: enterNextStructureObj.treeO, goButtonO: enterNextStructureObj.goButtonO, structureId: $this.attr("enterNextStructureId") });
                        comm_clickEnterStructure($this.attr("enterNextStructureId"), enterNextStructureObj.selectedSubMenuIndex + 1)
                    }
                });
            });
        }
        // return htmlStrArray.join('');
    } else {
        _container.html("<div style='margin: 10px; font-size: 11px; color: Gray;'>No knowledge guide info yet.</div>");
    }
    // return "<div style='margin: 10px; font-size: 11px; color: Gray;'>No knowledge guide info yet.</div>";

}

function comm_getKnowledgeGuideHTMLForSAT(data) {//data
    //container, result, par_UserId, par_SectionId, par_RoleId, par_tUserId, par_tRoleId, showPriorityFlag, showLessonFlag, showHistoryFlag, loFlag,showImproveFlag
    var container = data.container;
    var result = data.result;
    var par_simpleUser = data.par_simpleUser;
    var par_UserId = null;
    var par_SectionId = null;
    var par_RoleId = null;
    
    if (par_simpleUser) {
        par_UserId = par_simpleUser.ID;
        par_SectionId = par_simpleUser.SectionId;
        par_RoleId = par_simpleUser.RoleId;
    }
//    var par_UserId = data.par_UserId;
//    var par_SectionId = data.par_SectionId;
//    var par_RoleId = data.par_RoleId;
    var par_tUserId = data.par_tUserId;
    var par_tRoleId = data.par_tRoleId;
    var showPriorityFlag = data.showPriorityFlag;
    var showLessonFlag = data.showLessonFlag;
    var showHistoryFlag = data.showHistoryFlag;
    var loFlag = data.loFlag;
    var showDescriptionFlag = typeof data.showDescriptionFlag == "undefined" || data.showDescriptionFlag == null || !data.showDescriptionFlag ? false : true;
    var enterNextStructureObj = data.enterNextStructureObj;
    var showImproveFlag = typeof data.showImproveFlag != "undefined" && data.showImproveFlag != null && data.showImproveFlag == false ? false : true;
    var showMoreFlag = typeof data.showMoreFlag != "undefined" && data.showMoreFlag != null && data.showMoreFlag == false ? false : true;
    var expandFirstFlag = data.expandFirstFlag;
    var comm_randomStr = randomStringFunEx(10);
    
    var _container = null;
    if (typeof container == "object") {
        if (container instanceof jQuery) {
            _container = container;
        } else {
            _container = $(container);
        }
    } else if (typeof container == "string") {
        _container = $("#" + container);
    } else {
    
        alert("error");
        return;
    }

    if (result != null) {
        par_tUserId = par_UserId; //目前老师查看学生knowledge guide 点其他链接进去还是教师自己

        var htmlStrArray = new Array();
        var tLoFlag = typeof loFlag == "undefined" || loFlag || loFlag == null ? true : false;
        var showFuFlag = par_simpleUser.ShowCounsellingCentreFlag;  //typeof getShowCounsellingCentreFlag() != "undefined" && getShowCounsellingCentreFlag() ? true : false;
        var haveSampleQuestionFlag = false;
        var havePracticeFlag = false;
        var haveHistoryFlag = false;
        var index = 0;

        for (var i = 0; i < result.length; i++) {
            var level = $getCharCount(result[i].unit, ".");
            //var ulSuoJin = 'style="padding-left:' + (level * 20) + 'px;"';
            var titleDivClass = "";
            var titleSpanClass = "";
            var tUrlParams = result[i].itemType == "1" ? "loId=" + result[i].itemId : "structureId=" + result[i].itemId;
            var descriptionStr =result[i].description != null && $.trim(result[i].description) != "" ? result[i].description : ''; //'<span style="font-size:11px;color:gray;padding:2px;">No description yet.</span>';
            if (result[i].structureType != null) {//tLoFlag && result[i].itemType != "1") {//chapter & section （是要生成Knowlege Point的界面 并且当前索引项类型不是KP）
                
                if (result[i].structureType == "Chapter") {
                    titleSpanClass = 'class="fl f13 fbold c_d_blue"';
                    htmlStrArray.push('<ul style="background-color:rgb(51,159,217);padding:10px">');
                } else {
                    titleDivClass = 'class="fl f13 fbold c_blue"';
                    titleSpanClass = ' class="fl f13 fbold c_blue"';
                    htmlStrArray.push('<ul style="background-color:rgb(198,234,254); padding:5px 5px 5px 30px ">');
                }
                
                htmlStrArray.push('<div ' + titleDivClass + ' style="clear:both;">');
                var tfun = "";
                if (enterNextStructureObj) {
                    tfun = ' onclick = "comm_ClickKPChapterOrSection(\'' + level + '\',\'' + result[i].parentId + '\')" style="cursor:pointer;" ';
                }
                htmlStrArray.push('<span ' + titleSpanClass + '>' + result[i].unit + ' <span ' + tfun + ' id="' + comm_randomStr + 'itemName_' + result[i].itemId + '">' + result[i].itemName + '</span></span>');
                htmlStrArray.push('</div>');
                htmlStrArray.push('<p class="f11 c_gra line_h20"></p>');
                htmlStrArray.push('</ul>');
            } else {//knowlege point
                htmlStrArray.push('<ul id="' + comm_randomStr + 'kg_ul_' + result[i].itemId + '" style="background-color: rgb(211, 240, 255);padding:8px 8px 8px 50px;" class="kphover">');
                htmlStrArray.push('<div class="f11 fbold c_gra" style="clear:both;">');//\'' + result[i].itemId + '\',\'' + comm_randomStr + '\',' + showDescriptionFlag + '
                htmlStrArray.push('<span class="fl">')
                if (tLoFlag) {//当前索引项是KP 且现在是要生成knowledge point选项卡下的界面
                    index++;
                    htmlStrArray.push('<table loIndex="'+index+'" cellpadding="0" cellspacing="0" onclick="onGetStudyReferenceClick({current:this,index:'+index+',userId:\''+par_UserId+'\',sectionId:\''+par_SectionId+'\',itemId:\'' + result[i].itemId + '\',commStrId:\'' + comm_randomStr + '\',showDescriptionFlag:' + showDescriptionFlag + ',isSAT:true})" class="pointerCursor">');
                    htmlStrArray.push('<tr>');
                    htmlStrArray.push('<td style="vertical-align:middle">');
                    htmlStrArray.push('<img alt="" src="../_Images/bullet_arrow_right.png" class="sanjiao" />');
                    htmlStrArray.push('</td>');
                    htmlStrArray.push('<td style="width:500px;font-size:13px;font-weight:normal;color:black;">' + result[i].unit + ' <span id="' + comm_randomStr + 'itemName_' + result[i].itemId + '">' + result[i].itemName + '</span></td>');
                    htmlStrArray.push('</tr>');
                    htmlStrArray.push('</table>');
                } else {
                    var _tStyle = "color:#013655;font-weight:bold;";
                    if (level != 0) {
                        _tStyle = "color:#005F9C;font-weight:normal;";
                    }

                    if (enterNextStructureObj) {
                        if (!(enterNextStructureObj.selectedSubMenuIndex == 1 && level == 0)) {
                            htmlStrArray.push('<span enterNextStructureId="' + result[i].itemId + '" ' + titleSpanClass + ' style="width:500px;font-size:13px;cursor:pointer;display:block;' + _tStyle + 'padding-left:5px">' + result[i].unit + ' ' + result[i].itemName + '</span>');
                        } else {
                            //enterLastStructure
                            htmlStrArray.push('<span onclick="comm_ClickKPChapterOrSection(0)" ' + titleSpanClass + ' style="cursor:pointer;width:500px;font-size:13px;' + _tStyle + 'padding-left:5px">' + result[i].unit + ' ' + result[i].itemName + '</span>');
                        }
                    } else {
                        htmlStrArray.push('<span ' + titleSpanClass + ' style="width:500px;font-size:13px;' + _tStyle + 'padding-left:5px">' + result[i].unit + ' ' + result[i].itemName + '</span>');
                    }
                }
                htmlStrArray.push('</span>');
                var classStatus = result[i].classKnowledgeStatus != "--" ? getScoreChange(result[i].classKnowledgeStatus * 100) : "--";
                var personalStatus;
                if (par_tRoleId == "1") {
                    personalStatus = result[i].personalKnowledgeStatus != null && result[i].personalKnowledgeStatus != "--" ? getScoreChange(result[i].personalKnowledgeStatus * 100) : "--";
                } 
                if (!tLoFlag) {
                    //                    htmlStrArray.push('<span class="fr mg_r10">');暂屏蔽
//                    htmlStrArray.push('<img alt="" width="16" height="16" title="visual map" class="pointerCursor" onclick="openNewWindow(\''
//                    + '../Report/KnowledgeVisualMap.aspx?userId=' + par_UserId + '&sectionId=' + par_SectionId + '&tUserId=' + par_tUserId + '&tRoleId=' + par_RoleId + '&' + tUrlParams
//                    + '\')" src="../_Images/map.png" />');
//                    htmlStrArray.push('</span>');
//                    if (showFuFlag) {
//                        htmlStrArray.push('<span class="fr mg_r10">');
//                        htmlStrArray.push('<img alt="" width="16" height="16" title="send tutoring request" class="pointerCursor" onclick="openNewWindow(\''
//                    + '../Counselling/CounseRequest.aspx?ciId=' + result[i].itemId + '&ciType=2&sectionId=' + par_SectionId
//                    + '\')" src="../_Images/fafu.gif" src="../_Images/fafu.gif" />');
//                        htmlStrArray.push('</span>');
//                        htmlStrArray.push('<span class="fr mg_r10">');
//                        htmlStrArray.push('<img alt="" width="16" height="16" title="add to tutoring cart" class="pointerCursor" onclick="onAddRequestCartClick(\'' + result[i].itemId + '\',2)" src="../_Images/jiafu.gif" />');
//                        htmlStrArray.push('</span>');
//                    }
                } else {
                    if (showMoreFlag) {
                        htmlStrArray.push('<span class="fr mg_r10 pointerCursor" title="more" onmouseover="comm_showMoreAction(this)" onmouseout="comm_hideMoreAction(this)">');
                        htmlStrArray.push('<div class="moreAction">');
                        if (typeof showPriorityFlag == "undefined" || showPriorityFlag) {
                            var priority = getPriority(result[i].priority);
                            htmlStrArray.push('<div title="' + priority + '"><img title="' + priority + '" alt="" width="16" height="16" src="../_Images/' + priority + '.gif"/>&nbsp;<span>Priority</span></div>');
                        }

                        //                            if (typeof showLessonFlag != "undefined" && showLessonFlag) {
                        //                                htmlStrArray.push('<div title="Lesson" onclick="openNewWindow(\''
                        //                            + '../Report/KnowledgeGuide.aspx?userId=' + par_UserId + '&sectionId='
                        //                            + par_SectionId + '&tUserId=' + par_tUserId + '&tRoleId=' + par_RoleId + '&' + tUrlParams
                        //                            + '\')"><img alt="" width="16" height="16" src="../_Images/ico_sj.gif" />&nbsp;<span>Lesson</span></div>');
                        //                            }

                        if (result[i].exampleQuestionFlag > 0) {
                            if (!haveSampleQuestionFlag) {
                                haveSampleQuestionFlag = true;
                            }
                            htmlStrArray.push('<div title="sample question" onclick="openNewWindow(\''
                            + '../TestShow/TestContent.aspx?userId=' + par_UserId + '&sectionId=' + par_SectionId + '&tUserId=' + par_tUserId + '&type=2&loId=' + result[i].itemId + '&name=' + result[i].itemName
                            + '\')"><img alt="" width="16" height="16" src="../_Images/ico_les03.gif"/>&nbsp;<span>Sample&nbsp;Question</span></div>');
                        }

                        if (result[i].practiceFlag != "0") {
                            if (!havePracticeFlag) {
                                havePracticeFlag = true;
                            }
                            htmlStrArray.push('<div title="reinforcement practice" onclick="openNewWindow(\''
                            + '../TestShow/TestContent.aspx?userId=' + par_UserId + '&sectionId=' + par_SectionId + '&tUserId=' + par_tUserId + '&type=0&' + tUrlParams + '&name=' + result[i].itemName
                            + '\')"><img alt="" width="16" height="16" src="../_Images/practice.gif"/>&nbsp;<span>Practice</span></div>');
                        }

                        var tflag = result[i].testCoverage == null || result[i].testCoverage == "" || parseFloat(result[i].testCoverage) == 0 ? false : true;
                        if (tflag) {
                            if (!haveHistoryFlag) {
                                haveHistoryFlag = true;
                            }
                            htmlStrArray.push('<div title="History" onclick="onViewHistoryClick(\'' + result[i].itemId + '\',\'' + comm_randomStr + 'itemName_' + result[i].itemId + '\')"><img alt="" width="16" height="16" src="../_Images/history.png" />&nbsp;<span>History</span></div>');
                        }

                        if (showFuFlag) {
//                            htmlStrArray.push('<div title="send tutoring request" onclick="openNewWindow(\''
//                            + '../Counselling/CounseRequest.aspx?ciId=' + result[i].itemId + '&ciType=2&sectionId=' + par_SectionId
//                            + '\')"><img alt="" width="16" height="16" src="../_Images/fafu.gif" src="../_Images/fafu.gif" />&nbsp;<span>Send&nbsp;Request</span></div>');

//                            htmlStrArray.push('<div title="add to tutoring cart" onclick="onAddRequestCartClick(\'' + result[i].itemId + '\',2,\''+comm_randomStr+'\')"><img alt="" width="16" height="16" src="../_Images/jiafu.gif" />&nbsp;<span>Add&nbsp;Request</span></div>');
                        }
                        htmlStrArray.push('<div title="visual map" onclick="openNewWindow(\''
                        + '../Report/KnowledgeVisualMap.aspx?userId=' + par_UserId + '&sectionId=' + par_SectionId + '&tUserId=' + par_tUserId + '&tRoleId=' + par_RoleId + '&' + tUrlParams
                        + '\')"><img alt="" width="16" height="16" src="../_Images/map.png" />&nbsp;<span>Visual&nbsp;Map</span></div>');

                        htmlStrArray.push('<div title="report error" onclick="onCorrectionClick(\'' + result[i].itemId + '\')"><img alt="" width="16" height="16" src="../_Images/application_osx_double.png" />&nbsp;<span>Report&nbsp;Error</span></div>');
                        //htmlStrArray.push('<div title="Bookmark it for Review" onclick="onAddConcernClick(\'' + result[i].itemId + '\')"><img alt="" width="16" height="16" src="../_Images/optional.gif" />&nbsp;<span>Bookmark&nbsp;it&nbsp;for&nbsp;Review</span></div>');

                        htmlStrArray.push('</div>');
                        htmlStrArray.push('<span class="moreActionFontStyle">More<img Align="top" src="../_Images/bullet_arrow_down.png" alt=""/></span>');
                        htmlStrArray.push('</span>');
                    }
                    if (showImproveFlag) {
                        var tFlag = false;
                        if (typeof personalStatus != "undefined" && personalStatus != "Excellent") {
                            tFlag = true;
                        } else if (classStatus != "Excellent") {
                            tFlag = true;
                        }
                        if (tFlag) {
                            htmlStrArray.push('<span class="fr mg_r10 pointerCursor" title="help me improve" onclick="comm_showDrillWindow(\'' + result[i].itemId + '\')">');
                            htmlStrArray.push('<img alt="" Align="top" width="16" height="16" class="pointerCursor" src="../_Images/lightbulb_off.png"/>');
                            htmlStrArray.push('Help me improve');
                            htmlStrArray.push('</span>');

                        } else {
                            htmlStrArray.push('<span class="fr mg_r10 pointerCursor" style="visibility:hidden;">');
                            htmlStrArray.push('<img alt="" Align="top" width="16" height="16" class="pointerCursor" src="../_Images/lightbulb_off.png"/>');
                            htmlStrArray.push('Help me improve');
                            htmlStrArray.push('</span>');
                        }
                    }
                }


            
                if (par_tRoleId == "1") {
                    //   var personalStatus = result[i].personalKnowledgeStatus != null && result[i].personalKnowledgeStatus != "--" ? getScoreChange(result[i].personalKnowledgeStatus * 100) : "--";

                    htmlStrArray.push('<span class="fr mg_r10">');
                    if (par_simpleUser && par_simpleUser.IsEmathCourse == true) {
                        htmlStrArray.push('<span title="My Status">' + personalStatus + '</span>');
                    }
                    else {
                        htmlStrArray.push('<span title="My Status">' + personalStatus + '</span> / <span style="color:#000" title="Class Status">' + classStatus + '</span>');
                    }
                    htmlStrArray.push('</span>');
                    if ($.trim(personalStatus) == "Weak") {
                        htmlStrArray.push('<span class="fr mg_r10"><img src="../_Images/flag_red.png" alt=""/></span>');
                    } else if ($.trim(personalStatus) == "Inadequate") {
                        htmlStrArray.push('<span class="fr mg_r10"><img src="../_Images/flag_yellow.png" alt=""/></span>');
                    }
                } else {
                    
                    htmlStrArray.push('<span class="fr mg_r10" style="color:#000">');
                    htmlStrArray.push('<span title="Class Status">' + classStatus + '</span>');
                    htmlStrArray.push('</span>');
                    if ($.trim(classStatus) == "Weak") {
                        htmlStrArray.push('<span class="fr mg_r10"><img src="../_Images/flag_red.png" alt=""/></span>');
                    } else if ($.trim(classStatus) == "Inadequate") {
                        htmlStrArray.push('<span class="fr mg_r10"><img src="../_Images/flag_yellow.png" alt=""/></span>');
                    }
                } 
                
                var tDescriptionId = comm_randomStr+"kg_detail_"+result[i].itemId;
                if (tLoFlag) {
                    htmlStrArray.push('<p class="f11 c_gra line_h20 pointerCursor"></p>');
                    htmlStrArray.push('<div>');
                    htmlStrArray.push('<table id="' + comm_randomStr + '_tb_' + result[i].itemId + '" style="display:none;margin-bottom:6px;" cellpadding="0" cellspacing="0" border="0" class="roudcorntb">');
                    htmlStrArray.push('<tr><td class="tl"></td><td class="tm"></td><td class="tr"></td></tr>');
                    htmlStrArray.push('<tr>');
                    htmlStrArray.push('<td class="ml"></td>');
                    htmlStrArray.push('<td class="mm">');
                    
                    if (descriptionStr != "") {
                        htmlStrArray.push('<table style="margin-bottom:5px" cellpadding="0" cellspacing="0" border="0" class="roudcornlb">');
                        htmlStrArray.push('<tr><td class="tl"></td><td class="tm"></td><td class="tr"></td></tr>');
                        htmlStrArray.push('<tr>');
                        htmlStrArray.push('<td class="ml"></td>');
                        htmlStrArray.push('<td class="mm">');
                        if (showDescriptionFlag) {
                            htmlStrArray.push('<div id="' + tDescriptionId + '" style="width:860px;font-weight:normal;font-size:13px;color:#43525a;">' + descriptionStr + '</div>');
                        } else {
                            htmlStrArray.push('<div id="' + tDescriptionId + '" style="display:none;width:860px;font-weight:normal;font-size:13px;color:#43525a;">' + descriptionStr + '</div>');
                        }
                        htmlStrArray.push('</td>');
                        htmlStrArray.push('<td class="mr"></td>');
                        htmlStrArray.push('</tr>');
                        htmlStrArray.push('<tr><td class="bl"></td><td class="bm"></td><td class="br"></td></tr>');
                        htmlStrArray.push('</table>');
                    }
                    htmlStrArray.push('<table cellpadding="0" cellspacing="0" border="0" class="roudcornlb">');
                    htmlStrArray.push('<tr><td class="tl"></td><td class="tm"></td><td class="tr"></td></tr>');
                    htmlStrArray.push('<tr>');
                    htmlStrArray.push('<td class="ml"></td>');
                    htmlStrArray.push('<td class="mm">');
                    htmlStrArray.push('<div style="display:none;width:860px" id="' + comm_randomStr + 'kg_p_reference_' + result[i].itemId + '"></div>');
                    htmlStrArray.push('</td>');
                    htmlStrArray.push('<td class="mr"></td>');
                    htmlStrArray.push('</tr>');
                    htmlStrArray.push('<tr><td class="bl"></td><td class="bm"></td><td class="br"></td></tr>');
                    htmlStrArray.push('</table>');

                    htmlStrArray.push('</td>');
                    htmlStrArray.push('<td class="mr"></td>');
                    htmlStrArray.push('</tr>');
                    htmlStrArray.push('<tr><td class="bl"></td><td class="bm"></td><td class="br"></td></tr>');
                    htmlStrArray.push('</table>');
                } else {
                    htmlStrArray.push('<p class="f11 c_gra line_h20" style="padding-left:20px">');
                    if (showDescriptionFlag) {
                        htmlStrArray.push('<div id="' + tDescriptionId + '" class="kpDes">' + descriptionStr + '</div>');
                    }else{
                        htmlStrArray.push('<div id="' + tDescriptionId + '" class="kpDes" style="display:none;">' + descriptionStr + '</div>');
                    }
                    htmlStrArray.push('<div style="display:none;" id="' + comm_randomStr + 'kg_p_reference_' + result[i].itemId + '"></div>');
                }



                htmlStrArray.push('</ul>');
            }

        }
        _container.html(htmlStrArray.join(''));
        if (expandFirstFlag) {
            //$("table[loIndex=1]").trigger("click");
        }
        if (!haveHistoryFlag) {
            _container.find("span[hideHistoryFlag=false]").hide();
        }
        if (!havePracticeFlag) {
            _container.find("span[hidePracticeFlag=false]").hide();
        }
        if (!haveSampleQuestionFlag) {
            _container.find("span[hideSampleQuestionFlag=false]").hide();
        }

        if (enterNextStructureObj) {

            _container.find("span[enterNextStructureId]").each(function (index) {
                var $this = $(this);
                $this.click(function () {
                
                    if (enterNextStructureObj.selectedSubMenuIndex < 4) {
                        // comm_clickEnterStructure({ treeO: enterNextStructureObj.treeO, goButtonO: enterNextStructureObj.goButtonO, structureId: $this.attr("enterNextStructureId") });
                        comm_clickEnterStructure($this.attr("enterNextStructureId"), enterNextStructureObj.selectedSubMenuIndex + 1)
                    }
                });
            });
        }
        // return htmlStrArray.join('');
    } else {
        _container.html("<div style='margin: 10px; font-size: 11px; color: Gray;'>No knowledge guide info yet.</div>");
    }
    // return "<div style='margin: 10px; font-size: 11px; color: Gray;'>No knowledge guide info yet.</div>";

}

function comm_showMoreAction(o) {
    $(o).find("div.moreAction").show();
}

function comm_hideMoreAction(o) {
    $(o).find("div.moreAction").hide();
}


//{itemId:"itemId",commStrId:"commStrId",showDescriptionFlag:true}
function onGetStudyReferenceClick(data) { 
    var $current = $(data.current);
    var userId = data.userId;
    var sectionId = data.sectionId;
    var itemId = data.itemId;
    var str = data.commStrId;
    var showDescriptionFlag = data.showDescriptionFlag;
    var $kgUL = $("#" + str + "kg_ul_" + itemId);
    var $divReferenceContainer = $("#" + str + "kg_p_reference_" + itemId);
    var $divReference = $divReferenceContainer.find("div.reference");
    var $sanjiaoImg = $kgUL.find("img[class=sanjiao]");
    var $description = $("#" + str + "kg_detail_" + itemId);
    var rowBgColor = data.index && data.index % 2 == 0 ? "#fff" : "#d3f0ff";
    var $tbContainerForLo = $("#" + str + "_tb_" + itemId);
    
    if ($divReference.length != 0) {

        if ($divReference.attr("flag") == "1") {
            $divReference.removeAttr("flag")
            $current.parent().removeAttr("style");
            $tbContainerForLo.hide();
            $divReferenceContainer.slideUp(100);
            $kgUL.removeClass("mg_t5 c_blue_bg pd_8").addClass("kphover");
            if (data.isSAT) {
                $kgUL.css("background-color", "rgb(211, 240, 255)");
            } else {
                $kgUL.css("background-color", "");
            }
            $sanjiaoImg.attr("src", "../_Images/bullet_arrow_right.png");
            if (!showDescriptionFlag) {
                $description.hide();
            }
        } else {
            $divReference.attr("flag","1")
            $current.parent().css("padding", "6px 0px 6px 0px");
            $tbContainerForLo.slideDown();
            $divReferenceContainer.slideDown(100);
            $kgUL.addClass("mg_t5 c_blue_bg pd_8").removeClass("kphover");
            $kgUL.css("background-color", rowBgColor);
            $sanjiaoImg.attr("src", "../_Images/bullet_arrow_down.png");
            if (!showDescriptionFlag) {
                $description.show();
            }
        }
        return;
    }
   
    if (!showDescriptionFlag) {
        $description.show();
    }
    $current.parent().css("padding", "6px 0px 6px 0px");
    $tbContainerForLo.show();
    $divReferenceContainer.show();

    
    $sanjiaoImg.attr("src", "../_Images/bullet_arrow_down.png");
    $kgUL.addClass("mg_t5 c_blue_bg pd_8").removeClass("kphover");
    $kgUL.css("background-color", rowBgColor);
    $divReferenceContainer.html('<center><img src="../_Images/ajax-loader_b.gif" alt=""/></center>');
    var _simpleUser = null;
    if (typeof get_simpleUser == "function" && get_simpleUser()) {
        _simpleUser = get_simpleUser();
    } else if (typeof simpleUser != "undefined" && simpleUser) {
        _simpleUser = simpleUser;
    } else if (typeof getSimpleUser == "function") {
        _simpleUser = getSimpleUser();
    }
    
    $invokeWebService("~KnowlegeProfileWS.getStudyReferenceWithLoId", { loId: itemId, simpleUser: _simpleUser }, function (result, context) {
        //  $divReferenceContainer.hide();
        
        if (result && result.length != 0) {
            var htmlStrArray = new Array();
            htmlStrArray.push('<div flag="1" class="reference">');
            htmlStrArray.push('<div id="' + str + 'reference_' + itemId + '"><div id="' + str + 'reference_div_' + itemId + '" class="referenceContent"><center><img src="../_Images/ajax-loader_b.gif" /></center></div></div>');
            htmlStrArray.push('<div class="mg_5" style="display:none">');
            htmlStrArray.push('<span class="f11 c_d_blue mg_r10"><input type="radio" name="rdKnowStatusGroup"/>I know this well </span>');
            htmlStrArray.push('<span class="f11 c_d_blue mg_r10"><input type="radio" name="rdKnowStatusGroup"/>I don’t know this yet </span>');
            htmlStrArray.push('<span class="f11 c_d_blue mg_r10"><input type="radio" name="rdKnowStatusGroup"/>I’ll review again</span>');
            htmlStrArray.push('<span><a href="#" class="ico_les_04 c_blue">Get Help</a></span>');
            htmlStrArray.push('<span><a href="#" class="ico_les_05 c_blue">Quiz Me</a></span>');
            htmlStrArray.push('</div>');
            htmlStrArray.push('</div>');
            $divReferenceContainer.html(htmlStrArray.join(''));
        }
        else {
            $divReferenceContainer.html('<div flag="1" class="reference">No results found.</div>');
            var $tb = $tbContainerForLo.find("table[class=roudcornlb]");
//            if ($tb.length == 1) {
//                $divReferenceContainer.html('<div class="reference">No results found.</div>');
//            } else 
            if ($tb.length == 2) {
                $tb.filter(":eq(1)").hide();
            }
            return;
        }
        
        $("#"+str + "reference_" + itemId).html(SM_CreateTabsHTML({ result: result, userId: _simpleUser.ID, sectionId: _simpleUser.SectionId, pType: 0 }));
//        CreateTabsHTML(result, { rootContainerId: str + "reference_" + itemId,
//            userId: userId,
//            //haveBgFlag: rowBgColor == "#d3f0ff" ? true : false,
//            sectionId: sectionId,
//            tabContainerId: str + "reference_div_" + itemId,
//            plLoRelated: null, itemId: itemId, itemType: "1",
//            userType: "ins_report", //getTempSimpleUser().RoleId == "0" ? "ins_report" : "stu_report",
//            itemNameId: str + "itemName_" + itemId, sourceId: itemId, sourceType: "1",
//            objectType: "1", sourceTitleId: str + "itemName_" + itemId
//        });
        //resetAllGlobalVariables();
    }, null, { userContext: "getStudyReferenceWithLoId" });
}

//注意content里的每一块区域是一个div 且样式为les_tab_sma_box；即：<div class="les_tab_sma_box">
function $initTabs(data) {
    var containerId = data.containerId;
    var tabTitles = data.tabTitles;
    var content = data.content;
    var container = document.getElementById(containerId);
    if (container == null) {
        
        alert("error");
        return;
    }

    if (tabTitles == null || tabTitles.length == 0) {
        container.innerHTML = "No results found.";
        return;
    }
    var tabHTMLArray = new Array();
    tabHTMLArray.push('<div>');//1
    //tabHTMLArray.push('<ul style="width:100%">');
    if (data.haveBgFlag) {
        tabHTMLArray.push('<div class="les_tab_sm">');//3
    } else { 
        tabHTMLArray.push('<div class="les_tab_sm1">');//3
    }
    
    for (var h = 0; h < tabTitles.length; h++) {
        if (h == 0) {
            tabHTMLArray.push('<ul ulTitle="tabTitle" class="les_tab_sma_sl"><div class="tabTitleClass" style="padding:3px;">' + tabTitles[h] + '</div></ul>');
        } else {
            tabHTMLArray.push('<ul ulTitle="tabTitle" style="margin-left:4px;" class="les_tab_sma"><div class="tabTitleClass" style="padding:3px;">' + tabTitles[h] + '</div></ul>');
        }
    }
    tabHTMLArray.push('</div>');//3
    tabHTMLArray.push('<div>'); //2
    tabHTMLArray.push(content);
    tabHTMLArray.push('</div>');//2
    tabHTMLArray.push('</div>');//1

    container.innerHTML = tabHTMLArray.join('');
    var $rootContainer = $(container);
    var $referenceContent = $rootContainer.find("div[class=les_tab_sma_box]");
    $referenceContent.hide();
    $referenceContent.filter(":eq(0)").show();
    var $ulTabTitle = $rootContainer.find("ul[ulTitle=tabTitle]");
    $ulTabTitle.each(function (index) {
        var $this = $(this);
        $this.click(function () {
            $ulTabTitle.filter("[class=les_tab_sma_sl]").attr("class", "les_tab_sma");
            $this.attr("class", "les_tab_sma_sl");
            $referenceContent.hide();
            $referenceContent.filter(":eq(" + index + ")").show();
        });
    });

}

//添加纠错
function onCorrectionClick(knowlegePointId) {
    if (knowlegePointId != "") {
        var correctionDlg = new CorrectionDlg(knowlegePointId, 2, null);
        correctionDlg.Show();
    }
}

//添加我的关注
function onAddConcernClick(knowlegePointId) {
    if (knowlegePointId != "") {
        var addConcernDlg = new AddConcernDlg(knowlegePointId, 2);
        addConcernDlg.Show();
    }
}

//返回相对路径
function getRelativePath() {
    var url = location.href; //当前url
    
    var path = url.length - url.replace(/\//g, "").length - 4;

    //层次为url包含/的长度-没有包含/的长度再减去项目头/的个数
    var str = "";
    for (var i = 0; i < path; i++) {
        str += "../"; //组合成一个相对路径的字符串返回
    }
    return str;
}

function Left(obj)
{
    /// <summary> obj对象左上角的left值</summary>
    var curleft = 0;
    if (obj.offsetParent)
    {
        while (obj.offsetParent)
        {
            curleft += obj.offsetLeft
            obj = obj.offsetParent;
        }
    }
    else if (obj.x)
        curleft += obj.x;
    return curleft;
}
function Top(obj)
{
    /// <summary> obj对象左上角的top值</summary>
    var curtop = 0;
    if (obj.offsetParent)
    {
        while (obj.offsetParent)
        {
            curtop += obj.offsetTop
            obj = obj.offsetParent;
        }
    }
    else if (obj.y)
        curtop += obj.y;
    return curtop;
}
function getMousePos(event)
{/// <summary>获得鼠标事件位置（各种浏览器测试通过）</summary>
    var e = event || window.event;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX + scrollX;
    var y = e.pageY || e.clientY + scrollY;
    //alert('x: ' + x + '\ny: ' + y);
    return { 'x': x, 'y': y };
}