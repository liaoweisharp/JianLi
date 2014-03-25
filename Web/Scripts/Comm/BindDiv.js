(function () {
    function bindDiv(jsonArray, obj, divId, options, callback) {
        this.options = $.extend({}, bindDiv.options, options);
        this.jsonArray = jsonArray;
        this.obj = obj;
        this.divId = divId;
        this.callback = callback;

        this.InitDom();
        return this;
    }
    bindDiv.prototype.ShouJiData = function () {
        /// <summary>收集数据</summary>

        var $parentDiv = $("#" + this.divId);
        for (var i = 0; i < this.jsonArray.length; i++) {
            this.jsonArray[i]["value"] = $parentDiv.find("[itemId='" + this.jsonArray[i].itemId + "']").val();
        }
        bind.convertNull(this.jsonArray);
        debugger
        //把外键的主键改成Number类型
        for (var i = 0; i < this.jsonArray.length; i++) {
            if (this.jsonArray[i].value != null) {
                if (!this.jsonArray[i].yesOrNo && value && this.jsonArray[i].init) {
                    this.jsonArray[i]["value"] = Number(this.jsonArray[i]["value"]);
                }
                else if (this.jsonArray[i].yesOrNo && this.jsonArray[i].init) {
                    this.jsonArray[i]["value"] = this.jsonArray[i]["value"]=="1"?true:false;
                }
            }
        }
        return this.jsonArray;
    }
    bindDiv.prototype.InitDom = function () {

        var $div = $("#" + this.divId);
        var $table = bindDiv.table(this.jsonArray, this.obj, this.options);
        $div.append($table);
        if (this.options.type == "update" || this.options.type == "new") {
            $table.css("max-height", "460px").css("overflow", "auto").css("overflow-x", "hidden");
            var $buttonDiv = $("<div class='divUpOrNew'></div>");
            if (this.options.type == "update") {
                var $button = $("<input type='button' value='更新'/> &nbsp;&nbsp;<input type='button' value='关闭' onclick=\"javascript:$.jBox.close();\">");
            }
            else if (this.options.type == "new") {
                var $button = $("<input type='button' value='添加'/> &nbsp;&nbsp;<input type='button' value='关闭' onclick=\"javascript:$.jBox.close();\">");
            }
            $button.bind("click", { obj: this.obj, newBind: this }, this.callback);
            $buttonDiv.append($button);
            $div.append($buttonDiv);
            if (this.options.type == "update") {
                bind.initDomData(this.jsonArray, this.obj, this.divId);
            }
            bind.InitValidate(this.jsonArray, this.divId);
        }

        if (this.options["type"] == "review") {
            $("#" + this.divId).find("label[validate='money']").formatCurrency();
        }

    }

    bindDiv.options = {
        align: 'x'//排列方式 x:横坐标，y纵坐标
    }
    bindDiv.table = function (jsonArray, obj, options) {
        return bind.table(jsonArray, obj, options);
    }
    window.bindDiv = bindDiv;
})()