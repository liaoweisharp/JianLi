var baseData = {};
$(function () {
    //    $(".ZX_BG_header").hide();
    //    var html = "<div style='margin:15px auto;'><center>请输入密码：<input id='txtPW' type='password'></center></div>"
    //    $.jBox(html, { title: "密码", buttons: { "确认": "1" }, submit: function (v) {
    //        
    //        if (v == "1") {

    //            if ($.trim($("#txtPW").val()) == "mingqing") { $.jBox.tip('密码正确', 'success'); $(".ZX_BG_header").show(); initDataDom(); }
    //            else {
    //                $.jBox.tip('密码错误，请重试或联系工作人员。', 'error');
    //                return false;
    //            }
    //        }
    //    }, showClose: false
    //    });

    $invokeWebService_2("~WebService_RenLi.getInitData", {}, null, successCallBack, errorCallBack, null, "getInitData");
})
function successCallBack(result, context) {
    if (context == "getInitData") {
        baseData["部门"] = result[0];
        baseData["参保状况"] = result[1];
        baseData["户籍性质"] = result[2];
        baseData["婚姻"] = result[3];
        baseData["民族"] = result[4];
        baseData["政治面貌"] = result[5];
        baseData["入职途径"] = result[6];
    }
  
}
function errorCallBack(result, context) { 
    debugger
}
//#region 句柄

//#endregion

//#region HTML

//#endregion

//#region 其他
//#endregion