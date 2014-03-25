using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Collections;

/// <summary>
///WebService_RenLi 的摘要说明
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
//若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。 
[System.Web.Script.Services.ScriptService]
public class WebService_RenLi : System.Web.Services.WebService
{

    public WebService_RenLi()
    {

        //如果使用设计的组件，请取消注释以下行 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string HelloWorld()
    {
        return "Hello World";
    }
    [WebMethod(Description = "初始化数据", EnableSession = true)]
    public ArrayList getInitData()
    {
        return BLL.RenLi.getBaseData();
    }
    [WebMethod(Description = "添加人员", EnableSession = true)]
    public DAL.DTO.Tab_RL_User addUser(DAL.DTO.Tab_RL_User obj)
    {
        DAL.Base_User ins = new DAL.Base_User();
        return ins.Save(obj);
    }

}
