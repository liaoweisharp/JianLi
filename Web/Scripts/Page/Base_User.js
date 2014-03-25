(function () {
    function USER() { }
    function successCallBack(result, context) {
        if (context.userContent == "addUser") {
            var user = result;
            if (user) {
                $.jBox.tip('完成。', 'success');
            }
            else {
                $.jBox.tip('添加失败。', 'error');
            }
        }
    }
    //#region 句柄
    USER.click_AddUser = function () {
        var id = String.randomString(6);
        var id1 = String.randomString(6);
        var id2 = String.randomString(6);
        var html = getTabsHtml(id, id1, id2);

        $.jBox(html, { title: "添加人员", showClose: false, buttons: { "取消": "0" }, width: 900, submit: USER._clickCancelAdd });
        $("#" + id1).html(loading);
        $("#" + id2).html(loading);
        $("#" + id).tabs();
        var jsonOfHeTong = USER.createJson();
        new bindDiv(jsonOfHeTong, null, id1, { type: "new" }, USER._clickAdd);
    }
    USER.click_EditUser = function (userId, Name) {
        var id = String.randomString(6);
        var id1 = String.randomString(6);
        var id2 = String.randomString(6);
        var id3 = String.randomString(6);
        var id4 = String.randomString(6);
        var id5 = String.randomString(6);
        
        var html = getTabsHtml2(id, id1, id2, id3, id4, id5);
        $.jBox(html, { title: Name, buttons: {} });

    }
    USER.click_DetailUser = function (userId, Name) {
        var id = String.randomString(6);
        var id1 = String.randomString(6);
        var id2 = String.randomString(6);
        var id3 = String.randomString(6);
        var id4 = String.randomString(6);
        var id5 = String.randomString(6);
        var html = getTabsHtml2(id, id1, id2, id3, id4, id5);
        $.jBox(html, { title: Name, buttons: { "关闭": "0"} });
        $("#" + id1).html(loading);
        $("#" + id2).html(loading);
        $("#" + id3).html(loading);
        $("#" + id4).html(loading);
        $("#" + id5).html(loading);
        $("#" + id).tabs();
    }
    USER._clickCancelAdd = function (v, h, f) {

    }
    USER._clickAdd = function (event) {
        var bindObj = event.data.newBind;
        var jsonArray = bindObj.ShouJiData();
        var _newObj = bind.jsonToObject(jsonArray);
        $invokeWebService_2("~WebService_RenLi.addUser", { obj: _newObj }, function () {
            //        $.jBox.tip("传送数据，请稍后...", 'loading');
        }, successCallBack, errorCallBack, null, { userContent: "addUser" });
    }
    //#endregion

    //#region HTML
    function getTabsHtml(id, id1, id2) {
        var str = [];
        str.push(String.format("<div id='{0}' class='tabsP'>", id));
        str.push("<ul>");
        str.push(String.format("<li><a href='#{0}'>基本信息</a></li>", id1));
        str.push(String.format("<li><a href='#{0}'>工作、工程经历</a></li>", id2));
        str.push("</ul>");
        str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'></div>", id1));
        str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'></div>", id2));
        str.push("</div>");
        return str.join("");
    }
    function getTabsHtml2(id, id1, id2, id3, id4, id5) {
        var str = [];
        str.push(String.format("<div id='{0}' class='tabsP'>", id));
        str.push("<ul>");
        str.push(String.format("<li><a href='#{0}'>基本信息</a></li>", id1));
        str.push(String.format("<li><a href='#{0}'>工作、工程经历</a></li>", id2));
        str.push(String.format("<li><a href='#{0}'>职称、职业资格</a></li>", id3));
        str.push(String.format("<li><a href='#{0}'>薪酬、岗位调动</a></li>", id4));
        str.push(String.format("<li><a href='#{0}'>培训、奖惩</a></li>", id5));
        str.push("</ul>");
        str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'></div>", id1));
        str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'></div>", id2));
        str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'></div>", id3));
        str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'></div>", id4));
        str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'></div>", id5));
        str.push("</div>");
        return str.join("");
    }
    //#endregion
    USER.createJson = function () {
        var str = [];
        str.push({ itemId: "jl_Name", type: "text", title: "姓名" });
        str.push({ itemId: "jl_YuanGongBianHao", type: "text", title: "员工编号" });
        str.push({ itemId: "jl_XingBie", type: "select", title: "性别", yesOrNo: true, init: [{ id: "1", title: "男" }, { id: "0", title: "女"}] });
        str.push({ itemId: "jl_ChuShengRiQi", type: "text", title: "出生日期", validate: "datetime" });
        str.push({ itemId: "ji_JiGuan", type: "text", title: "籍贯" });
        str.push({ itemId: "jl_HunYinZhuangKuang", type: "select", title: "婚姻状况", init: getInit(baseData["婚姻"], "hy_") });
        str.push({ itemId: "jl_MingZu", type: "select", title: "民族", init: getInit(baseData["民族"], "mz_") });
        str.push({ itemId: "jl_ZhengZhiMianMao", type: "select", title: "政治面貌", init: getInit(baseData["政治面貌"], "zzmm_") });
        str.push({ itemId: "jl_CanJIanGongZuoShiJian", type: "text", title: "参加工作时间", validate: "datetime" });
        str.push({ itemId: "jl_YuanDanWeiLiZhiShiJian", type: "text", title: "原单位离职时间", validate: "datetime" });
        str.push({ itemId: "jl_ShenFenZhengHao", type: "text", title: "身份证号" });
        str.push({ itemId: "jl_ZongJianZiGeZhengShu", type: "select", title: "总监执业资格证书", yesOrNo: true, init: [{ id: "1", title: "有" }, { id: "0", title: "无"}] });
        str.push({ itemId: "jl_JianKangZhuangKuang", type: "text", title: "健康状况" });
        str.push({ itemId: "jl_HuJiDiZhi", type: "text", title: "户籍地址" });
        str.push({ itemId: "jl_HuJiXingZhi", type: "select", title: "户籍性质", init: getInit(baseData["户籍性质"], "hjxz_") });
        str.push({ itemId: "jl_LianXiFangShi_1", type: "text", title: "联系方式(手机)" });
        str.push({ itemId: "jl_LianXiFangShi_2", type: "text", title: "联系方式(座机)" });
        str.push({ itemId: "jl_LianXiFangShi_3", type: "text", title: "联系方式(QQ、微信...)" });
        str.push({ itemId: "jl_XianZhuZhi", type: "text", title: "本人现详细住址" });
        str.push({ itemId: "jl_XianYouBian", type: "text", title: "邮编" });
        str.push({ itemId: "jl_JuZhuZhengHao", type: "text", title: "暂(居)住证号" });
        str.push({ itemId: "jl_JuZhuZhengRiQi", type: "text", title: "暂(居)住证有效日期", validate: "datetime" });
        str.push({ itemId: "jl_SheHuiGuanXi", type: "ntext", title: "社会关系" });
        str.push({ itemId: "jl_CanBaoZhuangKuang", type: "select", title: "参保状况", init: getInit(baseData["参保状况"], "cbzk_") });
        str.push({ itemId: "jl_RuZhiShiJian", type: "text", title: "入职时间", validate: "datetime" });
        str.push({ itemId: "jl_RuZhiTuJing", type: "select", title: "入职途径", init: getInit(baseData["入职途径"], "rztj_") });
        str.push({ itemId: "jl_SuShuBuMen", type: "select", title: "所属部门", init: getInit(baseData["部门"], "bm_") });
        str.push({ itemId: "jl_RuZhiShouXuBanLi", type: "select", title: "入职手续办理", yesOrNo: true, init: [{ id: '1', title: "已办理" }, { id: '0', title: "未办理"}] });
        str.push({ itemId: "jl_ShiYongKaiShiShiJian", type: "text", title: "试用时间段", validate: "datetime" });
        str.push({ itemId: "jl_ShiYongJieShuShiJian", type: "text", title: "试用结束时间", validate: "datetime", parentId: "jl_ShiYongKaiShiShiJian" });
        str.push({ itemId: "jl_ShiFouCanBao", type: "select", title: "是否参保", yesOrNo: true, init: [{ id: "1", title: "是" }, { id: "0", title: "否"}] });
        str.push({ itemId: "jl_YingCanBaoShiJian", type: "text", title: "应参保时间", validate: "datetime" });
        str.push({ itemId: "jl_ShangYeBaoXian", type: "select", title: "商业保险", yesOrNo: true, init: [{ id: "1", title: "是" }, { id: "0", title: "否"}] });
        str.push({ itemId: "jl_LaoDongHeTongQianDing", type: "select", title: "劳动合同签订", yesOrNo: true, init: [{ id: "1", title: "是" }, { id: "0", title: "否"}] });
        str.push({ itemId: "jl_LaoDongHeTongKaiShiShiJian", type: "text", title: "劳动合同有效时间段", validate: "datetime" });
        str.push({ itemId: "jl_LaoDongHeTongJieShuShiJian", type: "text", title: "劳动合同结束时间", validate: "datetime", parentId: "jl_LaoDongHeTongKaiShiShiJian" });
        str.push({ itemId: "jl_FanPingXieYiQianDing", type: "select", title: "返聘协议签订", yesOrNo: true, init: [{ id: "1", title: "已签订" }, { id: "0", title: "未签订"}] });
        str.push({ itemId: "jl_FanPingQianDingShiJian", type: "text", title: "返聘签订时间", validate: "datetime" });
        str.push({ itemId: "jl_LiuCunZhengJian", type: "text", title: "留存证件" });
        return str;
    }
    //#region 其他
    //#endregion
    window.USER = USER;

})();