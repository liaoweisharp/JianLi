<%@ Page Title="" Language="C#" MasterPageFile="~/Master/MasterPage.master" AutoEventWireup="true" CodeFile="Base_RenLi.aspx.cs" Inherits="RL_Base_RenLi" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <script src="../Scripts/Page/Base_RenLi.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_User.js" type="text/javascript"></script>
    <link href="../Style/Base_User.css" rel="stylesheet" type="text/css" />
    <link href="../Style/Base_RenLi.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
<div class='width:95%; margin:0px auto;'>
    <div style=" height:28px; line-height:28px" class="ZX_BG_header ZX_h2">
            <ul class="ulnone">
                <li class="ZX_title2">人员</li>
               
                <li class="bg_A" style="float: right;"><a href="javascript:void(0);" onclick="USER.click_AddUser()">添加</a> &nbsp;<a href="javascript:void(0);" onclick="USER.click_EditUser(5)"></li>
             <li style="height: 28px; float:right;margin-right:30px; width: 150px; background-repeat: no-repeat; background-image: url(&quot;../Images/Search1.png&quot;);"><span style="position:relative;" wmwrap="true"><label style="position: absolute; left: 7px; display: inline-block; cursor: text; line-height: 28px; color: rgb(204, 204, 204);">合同号或名称</label><input type="text" watermark="合同号或名称" class="search searchW" id="txtSerHeTong"></span><img onclick="Click_Search_HeTong()" src="../Images/Search2.png" style=" cursor:pointer;float:right" alt="搜索"></li>
            </ul>
            <br>
        </div>
</div>
</asp:Content>

