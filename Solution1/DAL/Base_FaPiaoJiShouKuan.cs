using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL
{
    public class Base_FaPiaoJiShouKuan:Base
    {
        public DTO.TabFaPiaoJiShouKuanGuanLi Save(DTO.TabFaPiaoJiShouKuanGuanLi obj)
        {
            return this.Save<DTO.TabFaPiaoJiShouKuanGuanLi>(obj);
        }
        public int Updates(TabFaPiaoJiShouKuanGuanLi[] objs)
        {
            int returnValue = 0;
            TabFaPiaoJiShouKuanGuanLi[] query = (from i in this.dataContext.TabFaPiaoJiShouKuanGuanLi where objs.Select(ins => ins.fp_Id).Contains(i.fp_Id) select i).ToArray();
            foreach (TabFaPiaoJiShouKuanGuanLi q in query)
            {
                TabFaPiaoJiShouKuanGuanLi item = objs.FirstOrDefault(ins => ins.fp_Id == q.fp_Id);
                this.CopyObjectPoperty<TabFaPiaoJiShouKuanGuanLi, TabFaPiaoJiShouKuanGuanLi>(item, q);
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
            var query = from i in this.dataContext.TabFaPiaoJiShouKuanGuanLi where ids.Contains(i.fp_Id) select i;
            this.dataContext.TabFaPiaoJiShouKuanGuanLi.DeleteAllOnSubmit(query);
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

        public DTO.TabFaPiaoJiShouKuanGuanLi getById(int Id, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.TabFaPiaoJiShouKuanGuanLi.FirstOrDefault(ins => ins.fp_Id == Id);
        }
        public List<DTO.TabFaPiaoJiShouKuanGuanLi> getByHtId(int htId, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.TabFaPiaoJiShouKuanGuanLi.Where(ins => ins.fp_htId == htId).ToList();
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
                if (tabs.Contains("TabHeTong"))
                {
                    dl.LoadWith<DTO.TabFaPiaoJiShouKuanGuanLi>(tab => tab.TabHeTong);
                }
                if (tabs.Contains("TabHeTongBianGeng"))
                {
                    dl.LoadWith<DTO.TabFaPiaoJiShouKuanGuanLi>(tab => tab.TabHeTongBianGeng);
                }
                this.dataContext.LoadOptions = dl;
            }
        }

        public List<DTO.TabFaPiaoJiShouKuanGuanLi> getAll()
        {
            return this.dataContext.TabFaPiaoJiShouKuanGuanLi.ToList();
        }
    }
}
