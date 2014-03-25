//项目前期
(function () {
    XMQQ.pd = {};
    var requireColumn = ["qq_GongChengMingCheng", "qq_XiangMuLaiYuan", "qq_ZhiXingLeiXing", "qq_HeTongHao", "qq_ShiJian"];
    function XMQQ(divPage, divContent) {

        $("#" + divPage).html(loading);
        $("#" + divContent).html(loading);
        $invokeWebService_2("~WebService_HeTong.countQianQi", {}, null, successCallBack, errorCallBack, null, { userContent: "countQianQi" });
        XMQQ.divPage = divPage;
        XMQQ.divContent = divContent;
    }
    function successCallBack(result, context) {
        if (context.userContent == "countQianQi") {
            var optInit = getOptionsFromForm();
            $("#" + XMQQ.divPage).pagination(result, optInit);
            $("#" + XMQQ.divContent).show();
        }
        else if (context.userContent == "filterAllXiangMuQianQi") {

            var data = result;
            baseData["xiangMuQianQi"] = data;
            //#region 日期转换成日期格式
            var jsons = createJson().findAll("validate", "datetime");

            for (var i = 0; i < jsons.length; i++) {
                for (var j = 0; j < data.length; j++) {
                    if (data[j][jsons[i].itemId]) {
                        data[j][jsons[i].itemId] = strToDate(data[j][jsons[i].itemId]).pattern("yyyy-MM-dd");
                    }
                }
            }
            //#endregion
            if (data.length == 0) {
                $("#" + XMQQ.divContent).html("还没有项目前期记录，要添加一个合同请点击右上角的\"添加\"按钮");
            }
            else {
                var str = getHtmlOfQianQi(data);
                $("#" + XMQQ.divContent).html(str);
                tableAddStyle();
            }
        }
        else if (context.userContent == "addXiangMuQianQi") {
            //重新加载
            if (result) {
                $.jBox.tip('添加成功。', 'success');
                new XMQQ(XMQQ.divPage, XMQQ.divContent);
            }
            else {
                $.jBox.tip('添加失败', 'error', {});
            }
        }
        else if (context.userContent == "updateXiangMuQianQi") {
            if (result == 1) {
                $.jBox.tip('更新成功。', 'success');
                pageselectCallback(XMQQ.pd.currentPageNumber, null);
                HT.pageselectCallback(HT.pd.currentPageNumber, null);
            }
            else {
                $.jBox.tip('更新失败', 'error', {});
            }
        }
        else if (context.userContent == "delXiangMuQianQi") {
            if (result == 1) {
                $.jBox.tip('删除成功。', 'success');
                pageselectCallback(XMQQ.pd.currentPageNumber, null);

            }
            else {
                $.jBox.tip('删除失败', 'error', {});
            }
        }
        else if (context.userContent == "getHeTongInfo") {
            var type = context.type;
            var jsonArray = createJson();
            var leiXing = jsonArray.firstOrDefault("itemId", "qq_ZhiXingLeiXing");
            leiXing.init.addRange(result);//名字字符串赋值
            if (type == "new") {
                var option = { type: "new" };
                //jBox options
                var optionJbox = { title: "添加项目", width: 850, buttons: { "添加": "1", "取消": "0" }, submit: _clickAdd };
                

                var bindObj = new bind(jsonArray, null, option, optionJbox);
            }
            else if (type == "update") {
                var id = context.id;
                var option = { type: "update" };
                //jBox options
                var optionJbox = { title: "编辑项目", width: 850, buttons: { "更新": "1", "取消": "0" }, submit: _clickEdit };
             
                var obj = baseData["xiangMuQianQi"].firstOrDefault("qq_Id", id);
                if (obj) {
                    var bindObj = new bind(jsonArray, obj, option, optionJbox);
                }
            }
        }
    }
    function errorCallBack(result, context) {

    }
    //#region HTML
    function getHtmlOfQianQi(qianQi) {
        var str = [];
        var jsonArray = createJson();
        if (qianQi.length > 0) {
            str.push("<table class='tbQianQi' cellspacing='0' cellpadding='6'>");
            str.push("<tr class='header'>");
            for (var i = 0; i < jsonArray.length; i++) {
                var json = jsonArray[i];
                if (requireColumn.contains(json.itemId)) {
                    if (i == 0) {
                        str.push(String.format("<td class='td1'>{0}</td>", json.title));

                    }
                    else {
                        str.push(String.format("<td>{0}</td>", json.title));
                    }
                }
            }

            str.push("<td class='td6'>签订状态</td>");
            str.push("<td class='td7'>操作</td>");
            str.push("</tr>");
            //表内容

            for (var j = 0; j < qianQi.length; j++) {
                str.push("<tr class='row'>");
                for (var i = 0; i < jsonArray.length; i++) {
                    var json = jsonArray[i];
                    if (requireColumn.contains(json.itemId)) {
                        var value = qianQi[j][json.itemId];
                        value = value == null ? "" : value;
                        if (json.type == "select" && value != "") {
                            value = json.init.firstOrDefault("id", value).title;
                        }
                        str.push(String.format("<td>{0}</td>", value));
                    }
                }
                var zhuangTai = "";
                var lei = "";
                if (!qianQi[j].haveHeTong) {
                    zhuangTai = "未签订";
                    lei = "wq";
                }
                else {
                    zhuangTai = String.format("已签订");
                    lei = "yq";
                }
                str.push(String.format("<td class='td6 {1}'>{0}</td>", zhuangTai, lei));

                str.push(String.format("<td class='td7'><span class='opation'><a class='hid' href='javascript:void(0);' onclick=\"XMQQ.clickDetail({0})\">详细</a>  <a href='javascript:void(0);' onclick=\"XMQQ.clickEdit({0})\">编辑</a>|<a href='javascript:void(0);' onclick=\"XMQQ.clickDel({0})\">删除</a></span></td>", qianQi[j].qq_Id));

                str.push("</tr>");
            }


            str.push("</table>");
        }
        return str.join("");
    }
    //#endregion
    //#region 句柄
    XMQQ.clickAdd = function (id) {
        $invokeWebService_2("~WebService_HeTong.getNameArray", {}, null, successCallBack, errorCallBack, null, { userContent: "getHeTongInfo", type: "new" });
//        var option = { type: "new" };
//        //jBox options
//        var optionJbox = { title: "添加项目", width: 850, buttons: { "添加": "1", "取消": "0" }, submit: _clickAdd };
//        var jsonArray = createJson();
//        var bindObj = new bind(jsonArray, null, option, optionJbox);
    }
    XMQQ.clickEdit = function (id) {
        $invokeWebService_2("~WebService_HeTong.getNameArray", {}, null, successCallBack, errorCallBack, null, { userContent: "getHeTongInfo", type: "update", id: id });
//        var option = { type: "update" };
//        //jBox options
//        var optionJbox = { title: "编辑项目", width: 850, buttons: { "更新": "1", "取消": "0" }, submit: _clickEdit };
//        var jsonArray = createJson();
//        var obj = baseData["xiangMuQianQi"].firstOrDefault("qq_Id", id);
//        if (obj) {
//            var bindObj = new bind(jsonArray, obj, option, optionJbox);
//        }
    }
    XMQQ.clickDetail = function (id) {
        var option = { type: "review" };
        //jBox options
        var optionJbox = { title: "项目", width: 850, buttons: {} };
        var jsonArray = createJson();
        var obj = baseData["xiangMuQianQi"].firstOrDefault("qq_Id", id);
        if (obj) {
            var bindObj = new bind(jsonArray, obj, option, optionJbox);
        }
    }
    XMQQ.clickDel = function (id) {
        var ramdomId = String.randomString(6);
        $.jBox.confirm(String.format("<input id='{0}' type='hidden'>你确定要删除这个项目吗？", ramdomId), "确定删除吗？", _clickDel, { buttons: { "删除": "1", "取消": "0"} })
        $("#" + ramdomId).data("data", { id: id });
    }
    function _clickAdd(v, h, f) {
        if (v == "1") {
            
            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");
            var jsonArray = bindObj.ShouJiData();
            var obj = bind.jsonToObject(jsonArray);
            $invokeWebService_2("~WebService_HeTong.addXiangMuQianQi", { obj: obj }, function () {
                $.jBox.tip("添加新项目，请稍后...", 'loading');
            }, successCallBack, errorCallBack, function () {
                $.jBox.tip('完成。', 'success');
            }, { userContent: "addXiangMuQianQi" });
        }
        return true;
    }
    function _clickEdit(v, h, f) {
        if (v == "1") {
            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");
            var jsonArray = bindObj.ShouJiData();

            var _newHeTong = bind.jsonToObject(jsonArray);
            _newHeTong["qq_Id"] = bindObj.obj.qq_Id;
            //var newHeTong = $.extend({}, bindObj.heTong, _newHeTong);
            //delete newHeTong.__type;
            $invokeWebService_2("~WebService_HeTong.updateXiangMuQianQi", { xiangMuQianQi: _newHeTong }, function () {
                $.jBox.tip("更新中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, function () {
                $.jBox.tip('完成。', 'success');
            }, { userContent: "updateXiangMuQianQi" });
        }
        return true;
    }
    function _clickDel(v, h, f) {
        if (v == "1") {
            var data = h.find("input[type='hidden']").data("data");
            var id = data.id;
            $invokeWebService_2("~WebService_HeTong.delXiangMuQianQi", { id: id }, function () {
                $.jBox.tip("删除中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, null, { userContent: "delXiangMuQianQi", id: id });
        }
        return true;
    }
    //#endregion
    //#region 生成json
    function createJson() {
        var jsonArray = [];
        jsonArray.push({ itemId: "qq_GongChengMingCheng", type: "text", title: "工程名称" });
        jsonArray.push({ itemId: "qq_XiangMuLaiYuan", type: "select", title: "项目来源", init: getInit(baseData["获取方式"], "fs_") });

        jsonArray.push({ itemId: "qq_ZhiXingLeiXing", type: "textSelect", title: "执行类型", init: [] });
        jsonArray.push({ itemId: "qq_ShiJian", type: "text", validate: "datetime", title: "日期" });
        jsonArray.push({ itemId: "qq_HeTongHao", type: "text", title: "合同号" });

        return jsonArray;
    }
    //#endregion
    //#region 其他
    function getOptionsFromForm() {
        var opt = { callback: pageselectCallback, items_per_page: 10, next_text: "下页", num_display_entries: pageSize, num_edge_entries: 2, prev_text: "上页" };
        var htmlspecialchars = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }
        $.each(htmlspecialchars, function (k, v) {
            opt.prev_text = opt.prev_text.replace(k, v);
            opt.next_text = opt.next_text.replace(k, v);
        })
        return opt;
    }
    function pageselectCallback(page_index, jq) {

        XMQQ.pd.currentPageNumber = page_index;
        XMQQ.pd.pageSize = pageSize;

        $invokeWebService_2("~WebService_HeTong.filterAllXiangMuQianQi", { pageClass: XMQQ.pd },
       function () {
           //$("#divContent").html(loading);
       }, successCallBack, errorCallBack, null, { userContent: "filterAllXiangMuQianQi" });
    }
    //绑定列表后绑定样式或事件
    function tableAddStyle() {
        $("#" + XMQQ.divContent).find("tr[class*='header']").addClass("bgHeader");
        $("#" + XMQQ.divContent).find("tr[class*='row']:odd").addClass("bg1");
        $("#" + XMQQ.divContent).find("tr[class*='row']").bind("mouseover", {}, function () {
            $(this).addClass("mouseover");
        })
        $("#" + XMQQ.divContent).find("tr[class*='row']").bind("mouseout", {}, function () {
            $(this).removeClass("mouseover");
        })
    }
    window.XMQQ = XMQQ;
})()
//#endregion