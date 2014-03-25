using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.Linq;
using DAL.DTO;

namespace DAL
{
    public class Base_XiangMuQianQi:Base
    {
        /// <summary>
        /// 保存一个对象
        /// </summary>
        /// <param name="ht"></param>
        /// <returns></returns>
        public TabXiangMuQianQi Save(TabXiangMuQianQi xiangMuQianQi)
        {
            return this.Save<DTO.TabXiangMuQianQi>(xiangMuQianQi);
        }
        public int Updates(TabXiangMuQianQi[] objs)
        {
            int returnValue = 0;
            TabXiangMuQianQi[] query = (from i in this.dataContext.TabXiangMuQianQi where objs.Select(ins => ins.qq_Id).Contains(i.qq_Id) select i).ToArray();
            foreach (TabXiangMuQianQi q in query)
            {
                TabXiangMuQianQi item = objs.FirstOrDefault(ins => ins.qq_Id == q.qq_Id);
                this.CopyObjectPoperty<TabXiangMuQianQi, TabXiangMuQianQi>(item, q);
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
            var query = from i in this.dataContext.TabXiangMuQianQi where ids.Contains(i.qq_Id) select i;
            this.dataContext.TabXiangMuQianQi.DeleteAllOnSubmit(query);
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
        public int countAllQianQi()
        {
            return this.dataContext.TabXiangMuQianQi.Count();
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
                    dl.LoadWith<DTO.TabXiangMuQianQi>(tab => tab.TabHeTong);
                }
                

                this.dataContext.LoadOptions = dl;
            }
        }

        public List<TabXiangMuQianQi> filterAllXiangMuQianQi(CommClass.PageClass pageClass,params string[] tabs)
        {
            queryConfig(tabs);
            //排序：有没有合同，qq_Id
            return this.dataContext.TabXiangMuQianQi.OrderBy(ins => ins.TabHeTong.Count).Skip((pageClass.currentPageNumber) * pageClass.pageSize).Take(pageClass.pageSize).ToList();
        }
        /// <summary>
        /// 得到没有合同的项目
        /// </summary>
        /// <returns></returns>
        public List<TabXiangMuQianQi> getNoHeTong()
        {
            queryConfig(new string[]{"TabHeTong"});
            return this.dataContext.TabXiangMuQianQi.Where(ins => ins.TabHeTong.Count == 0).ToList();
        }

        public TabXiangMuQianQi getById(int id, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.TabXiangMuQianQi.FirstOrDefault(ins => ins.qq_Id==id);
        }


        /// <summary>
        /// 得到所有“Name”字段去重的值
        /// </summary>
        /// <param name="tabs"></param>
        /// <returns></returns>
        public string[] getNameArray(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.TabXiangMuQianQi.Select(ins => ins.qq_ZhiXingLeiXing).Distinct().ToArray();
        }
    }
}
