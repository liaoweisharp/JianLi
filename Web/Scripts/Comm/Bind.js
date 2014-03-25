/// <reference path="../jQuery/jquery-1.6.1.min.js" />

//使用 new bind();
function bind(jsonArray,obj, options, jboxOptions) {
    this.jsonArray = jsonArray;
    this.obj = obj;
    this.parentId= String.randomString(6);
    this.options= $.extend({},bind.options,options);
    this.createJbox(jsonArray, this.options, jboxOptions, this.parentId)
    if (this.options.type == "update") {
        this.InitDom();
    }
    return this;
}
bind.prototype.InitDom=function(){

}
bind.prototype.ShouJiData = function () {
    /// <summary>收集界面上的数据</summary>
    var $parentDiv = $("#" + this.parentId);
    for (var i = 0; i < this.jsonArray.length; i++) {
        this.jsonArray[i]["value"] = $parentDiv.find("[itemId='" + this.jsonArray[i].itemId + "']").val();
    }
    
    bind.convertNull(this.jsonArray);
    //把外键的主键改成Number类型
    for (var i = 0; i < this.jsonArray.length; i++) {
        if (this.jsonArray[i].value && this.jsonArray[i].type=="select") {
            this.jsonArray[i]["value"] = Number(this.jsonArray[i]["value"]);
        }
    }
    return this.jsonArray;
}
bind.InitValidate = function (jsonArray, parentId) {
    /// <summary>初始化验证（内部函数）</summary>
    debugger
    var arr = jsonArray.findAll("validate", "datetime");
    var $div = $("#" + parentId);
    for (var i = 0; i < arr.length; i++) {
        var itemId = arr[i].itemId;
        $div.find("[itemId='" + itemId + "']").datepicker({ changeMonth: true, changeYear: true });
    }
    var arr = jsonArray.findAll("validate", "money");
    for (var i = 0; i < arr.length; i++) {
        var itemId = arr[i].itemId;
        $div.find("[itemId='" + itemId + "']").numeral();
    }
    var arr = jsonArray.findAll("type", "textSelect");
    for (var i = 0; i < arr.length; i++) {
        var itemId = arr[i].itemId;
        $div.find("[itemId='" + itemId + "_select" + "']").bind("click", { zNodes: arr[i].init }, TS.showMenu);
    }
}
//转换空数据为null

bind.prototype.createJbox = function (jsonArray, options, jboxOptions, parentId) {
    var $div = $("<div style='margin:13px; height:auto;overflow:hidden;'></div>");
    $div.attr("id", parentId)
    .attr("name", bind.Obj);

    $div.append(bind.table(jsonArray, this.obj, options));

    var $tempDiv = $("<div></div>");
    $tempDiv.html($div);
    $.jBox($tempDiv.html(), jboxOptions);

    //如果是显示需要初始化界面数据
    if (options["type"] == "review") {
        $("label[validate='money']").formatCurrency();
    }

    //如果是编辑需要初始化界面数据
    if (options["type"] == "update" || options["type"] == "new") {
        $("#" + parentId).data("data", this); //把对象绑到制定元素上。方便页面从回调函数中得到当前对象
        if (options["type"] == "update") {
            bind.initDomData(jsonArray, this.obj, this.parentId);

        }
        //初始化验证
        bind.InitValidate(jsonArray,this.parentId);
    }


}
bind.Obj = "aabbcc";
bind.options = {
    align: 'x'//排列方式 x:横坐标，y纵坐标
}
//生成table界面
bind.table = function (jsonArray, obj, options) {
    var rowLeft = [];
    var rowRight = [];
    if (options["align"] == 'x') {
        for (var i = 0,j=0; i < jsonArray.length; i++,j++) {
            var arr = new Array();
            arr.push(jsonArray[i]);
            if ((i + 1) < jsonArray.length && jsonArray[i + 1].parentId) {
                i++;
                arr.push(jsonArray[i]);
            }
            if (j % 2 == 0) {
                if (options["type"] == "new" || options["type"] == "update") {
                    rowLeft.push(bind.newOrUpdate_node(arr,options));
                }
                else if (options["type"] == "review") {
                    rowLeft.push(bind.review_node(arr, obj));
                }
            }
            else if (j % 2 == 1) {
                if (options["type"] == "new" || options["type"] == "update") {

                    rowRight.push(bind.newOrUpdate_node(arr,options));
                }
                else if (options["type"] == "review") {

                    rowRight.push(bind.review_node(arr, obj));
                }
            }
        }
    }
    var $div = $("<div></div>");
    if (rowLeft.length > 0) {
        var $table = $("<table cellSpacing='0' cellpadding='3' width='400'  border='0'></table>");
        for (var i = 0; i < rowLeft.length; i++) {
            $table.append(rowLeft[i]);
        }
        $table.appendTo($div)
        .attr("class", "tbComm fl mr20");
    }
    if (rowRight.length > 0) {
        var $table = $("<table cellSpacing='0' cellpadding='3' width='400'  border='0'></table>");
        for (var i = 0; i < rowRight.length; i++) {
            $table.append(rowRight[i]);
        }
        $table.appendTo($div)
        .attr("class", "tbComm");
    }
    return $div;
}

//生成tr节点
bind.newOrUpdate_node = function (jsons, options) {

    var $tr = $("<tr></tr>");
    var $td1 = $("<td valign='top'></td>");
    var $td2 = $("<td></td>");

    $td1
    .attr("class", "td1")
    .html(jsons[0].title)

    var $node;
    for (var i = 0; i < jsons.length; i++) {
        var json = jsons[i];
        if (jsons.length == 2 && options.filter && options.filter == "1") {
            var _class = "_half";
        }
        else {
            var _class = jsons.length > 1 ? "half" : "";
        }
        var _class2 = i == 0 ? "" : " fr";
        switch (json.type) {
            case "text":
                var mid = "";
                if (i == 1 && jsons.length == 2 && jsons.findAll("validate", "datetime").length == 2) {
                debugger
                    mid = " <label>-</label> ";
                }
                $node = $(String.format("{3}<input class='{1}{2}' type='text' itemId='{0}'/>", json.itemId, _class, _class2, mid));
                break;
            case "textSelect":
                $node = $(String.format("<input class='txtSel{2}{3}' type='text' itemId='{0}'/>&nbsp;<a itemId={1} href='javascript:void(0);'>选择</a>", json.itemId, json.itemId + "_select", _class, _class2));
                break;
            case "ntext":
                $node = $(String.format("<textarea class='{1}{2}' row='3' itemId='{0}'></textarea>", json.itemId, _class, _class2));
                break;
            case "select":
                $node = $(String.format("<select class='{1}{2}' itemId='{0}'>", json.itemId, _class, _class2));
                if (typeof json.isNull == "undefined" || json.isNull == true) {
                    $node.append($("<option value=''> </option>")); //有一个空的初始值
                }
                for (var i = 0; i < json.init.length; i++) {
                    var option = json.init[i];
                    var $option = $(String.format("<option value={0}>{1}</option>", option.id, option.title));
                    $node.append($option);
                }

                break;
        }
        if (i == 1 && options.filter && options.filter == "1") {
            $td2.append("-");
        }
        $td2.append($node);
    }


    $tr.append($td1)
    .append($td2);
    return $tr;
}
bind.review_node = function (jsons, obj) {
    var $tr = $("<tr></tr>");
    var $td1 = $("<td valign='top'></td>");
    var $td2 = $("<td></td>");

    $td1
    .addClass("td1")
    .html(jsons[0].title)
    $td2.addClass("td2");
    var value = "";
    for (var i = 0; i < jsons.length; i++) {
        var json = jsons[i];
        var _value = obj[json.itemId];
        
        if (!_value) {
            _value = "";
        }
        if (json.type == "select") {
            if (_value) {
                _value = json.init.firstOrDefault("id", _value).title;
            }

        }
        if (json.validate && json.validate == "money") {
            _value = "<label validate='money'>" + _value + "</label>"
        }
        value += _value + "&nbsp;";
    }
    $td2.html(value);
    $tr.append($td1)
    .append($td2);
    return $tr;
}
//初始化界面数据
bind.initDomData = function (jsonArray,obj, parentId) {
    var $parentDiv = $("#" + parentId);
    for (var i = 0; i < jsonArray.length; i++) {
        var itemId = jsonArray[i].itemId;
        var value = obj[itemId];
        switch (jsonArray[i].type) {
            case "text":
                value = value == null ? "" : value;
                break;
            case "select":
                value = value == null ? "" : value;
                break;
        }
        $parentDiv.find("[itemId = '"+itemId+"']").val(value);

    }
}
//#region 其他
bind.convertNull = function (jsonArray) {
    for (var i = 0; i < jsonArray.length; i++) {
        if ($.trim(jsonArray[i].value) == "") {
            jsonArray[i].value = null;
        }
    }
}

bind.jsonToObject = function (jsonArray) {
    /// <summary>jason数组转换成一个对象的属性</summary>
    var obj = {};
    for (var i = 0; i < jsonArray.length; i++) {
        var json = jsonArray[i];
        if (!json.value) {
            obj[json.itemId]=null;
        }
        else{
            obj[json.itemId] = json.value;
        }
    }
    return obj;
}
//#endregion