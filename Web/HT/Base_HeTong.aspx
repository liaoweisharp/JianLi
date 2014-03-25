<%@ Page Title="" Language="C#" MasterPageFile="~/Master/MasterPage.master" AutoEventWireup="true"
    CodeFile="Base_HeTong.aspx.cs" Inherits="HT_Base_HeTong" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="../Scripts/Page/Base_HeTong.js" type="text/javascript"></script>
    <link href="../Style/Base_HeTong.css" rel="stylesheet" type="text/css" />
    <link href="../Style/Base_HeTong_XiangMuQianQi.css" rel="stylesheet" type="text/css" />
    <link href="../Style/Base_HeTong_BianGeng.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/Page/Base_HeTong_BianGeng.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_HeTong_ShouKuanJiHua.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_HeTong_XiangMuQianQi.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_HeTong_FaPiaoGuanLi.js" type="text/javascript"></script>
   
    <link rel="stylesheet" type="text/css" href="../Scripts/jQuery/plugins/zTree_v3.5.14/css/zTreeStyle/zTreeStyle.css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div style="width: 95%; margin: 0px auto;">
        <div class="ZX_BG_header ZX_h2">
            <ul class="ulnone">
                <li class="ZX_title2">项目前期</li><li style="float: right;" class="bg_A"><a onclick="XMQQ.clickAdd()"
                    href="javascript:void(0);">添加</a></li></ul>
            <br />
        </div>
        <div class='cc'>
            <%--<div>
    <ul class="ulnone fr" >
        <li class="mr20 bg_A"><a href="javascript:void(0);" onclick="XMQQ.clickAdd()">添加</a></li>
    </ul>
    <br />
</div>--%>
            <div class="divAll">
                <div id="divContent_QQ">
                </div>
                <div id="divPageSize_QQ" class="divPageSize">
                </div>
            </div>
        </div>
        <div class="ZX_BG_header ZX_h2" style=" height:28px; line-height:28px">
            <ul class="ulnone">
                <li class="ZX_title2">合同</li>
               
                <li style="float: right;" class="bg_A"><a onclick="click_AddHeTong()"
                    href="javascript:void(0);">添加</a></li>
             <li style="height: 28px; float:right;margin-right:30px; width: 150px; background-repeat: no-repeat; background-image: url(&quot;../Images/Search1.png&quot;);"><input id="txtSerHeTong" type="text" class="search searchW" watermark="合同号或名称" /><img alt='搜索' style=" cursor:pointer;float:right" src="../Images/Search2.png" onclick="Click_Search_HeTong()"/></li>
            </ul>
            <br />
        </div>
        <div class='cc'>
            <%--<div>
    <ul class="ulnone fr" >
        <li class="mr20 bg_A"><a href="javascript:void(0);" onclick="click_AddHeTong()">添加</a></li>
    </ul>
    <br />
</div>--%>
            <div class="divAll">
                <div id="divContent">
                </div>
                <div id="divPageSize" class="divPageSize">
                </div>
            </div>
        </div>
    </div>
</asp:Content>
