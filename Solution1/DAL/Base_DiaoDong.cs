using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL
{
    public class Base_DiaoDong:Base
    {
        public DTO.Tab_RL_DiaoDong getById(int Id, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_RL_DiaoDong.FirstOrDefault(ins=>ins.rl_dd_Id==Id);
        }
        public Tab_RL_DiaoDong Save(Tab_RL_DiaoDong ins)
        {
            return base.Save<Tab_RL_DiaoDong>(ins);
        }
        /// <summary>
        /// 设置查询需要返回哪些关联表。
        /// </summary>
        /// <param name="tabs"></param>
        private void queryConfig(params string[] tabs)
        {
            if (tabs.Length == 0)
            {
                this.dataContext.DeferredLoadingEnabled = false;
            }
            else
            {
                DataLoadOptions dl = new DataLoadOptions();
                if (tabs.Contains("Tab_RL_DiaoDong_BianDongQingKuang"))
                {
                    dl.LoadWith<DTO.Tab_RL_DiaoDong>(tab => tab.Tab_RL_DiaoDong_BianDongQingKuang);
                }
                if (tabs.Contains("Tab_RL_DiaoDong_GongZuoZhuangTai"))
                {
                    dl.LoadWith<DTO.Tab_RL_DiaoDong>(tab => tab.Tab_RL_DiaoDong_GongZuoZhuangTai);
                }
                if (tabs.Contains("Tab_RL_User"))
                {
                    dl.LoadWith<DTO.Tab_RL_DiaoDong>(tab => tab.Tab_RL_User);
                }
                this.dataContext.LoadOptions = dl;
            }
        }

        public int Updates(Tab_RL_DiaoDong[] objs)
        {
            int returnValue = 0;
            Tab_RL_DiaoDong[] query = (from i in this.dataContext.Tab_RL_DiaoDong where objs.Select(ins => ins.rl_dd_Id).Contains(i.rl_dd_Id) select i).ToArray();
            foreach (Tab_RL_DiaoDong q in query)
            {
                Tab_RL_DiaoDong item = objs.FirstOrDefault(ins => ins.rl_dd_Id == q.rl_dd_Id);
                this.CopyObjectPoperty<Tab_RL_DiaoDong, Tab_RL_DiaoDong>(item, q);
            }
            try
            {
                this.dataContext.SubmitChanges();
                returnValue = query.Count();
            }
            catch
            {
                returnValue = 0;
            }
            return returnValue;
        }

        public int Deletes(int[] ids)
        {
            var query = from i in this.dataContext.Tab_RL_DiaoDong where ids.Contains(i.rl_dd_Id) select i;
            this.dataContext.Tab_RL_DiaoDong.DeleteAllOnSubmit(query);
            int status = query.Count();
            try
            {
                this.dataContext.SubmitChanges();
            }
            catch
            {
                status = 0;
            }
            return status;
        }

        public List<DTO.Tab_RL_DiaoDong> getAll()
        {
            return this.dataContext.Tab_RL_DiaoDong.ToList();
        }
    }
}
