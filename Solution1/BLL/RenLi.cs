using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;

namespace BLL
{
    public static class RenLi
    {
        public static ArrayList getBaseData()
        {
            ArrayList returnValue = new ArrayList();
            DAL.Base_User user=new DAL.Base_User();
            returnValue.Add(user.listBuMen());//部门
            user = new DAL.Base_User();
            returnValue.Add(user.listCBZK());
            user = new DAL.Base_User();
            returnValue.Add(user.listHJXZ());
            user = new DAL.Base_User();
            returnValue.Add(user.listHY());
            user = new DAL.Base_User();
            returnValue.Add(user.listMZ());
            user = new DAL.Base_User();
            returnValue.Add(user.listZZMM());
            user = new DAL.Base_User();
            returnValue.Add(user.listRZRJ());
            return returnValue;
        }
    }
}
