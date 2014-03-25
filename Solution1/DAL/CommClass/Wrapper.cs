using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.CommClass
{
    public class HeTongWrapper
    {
        
        public int ht_Id
        {
            get;
            set;
        }
        /// <summary>
        /// 合同号
        /// </summary>
        public string heTongHao
        {
            get;
            set;
        }
        /// <summary>
        /// 合同名称
        /// </summary>
        public string ht_MingCheng
        {
            get;
            set;
        }
        /// <summary>
        /// 暂定监理费总额
        /// </summary>
        public decimal? zanJianLiFeiZongE
        {
            get;
            set;
        }
        /// <summary>
        /// 累计应收款总额
        /// </summary>
        public decimal? yingShouKuanZongE
        {
            get;
            set;
        }
        /// <summary>
        /// 累计应收款总额
        /// </summary>
        public decimal? yiShouKuanZongE
        {
            get;
            set;
        }
        /// <summary>
        /// 累计已开票总额
        /// </summary>
        public decimal? leJiYiKaiPiaoZongE
        {
            get;
            set;
        }
        /// <summary>
        /// 是否退还履约保证金
        /// </summary>
        public bool isTuiLvYue
        {
            get;
            set;
        }
        /// <summary>
        /// 是否退还质保金
        /// </summary>
        public bool isTuiZhiBao
        {
            get;
            set;
        }
        /// <summary>
        /// 执行类型
        /// </summary>
        public string zhiXingLeiXing
        {
            get;
            set;
        }
        /// <summary>
        /// 工程状态
        /// </summary>
        public string gongChengZhuangTai { get; set; }

    }

    public class XiangMuQianQiWrapper:DAL.DTO.TabXiangMuQianQi {
        public XiangMuQianQiWrapper() { 
        }
        public bool haveHeTong
        {
            get;
            set;
        }
    }
    public class ExtendHeTong : DTO.TabHeTong
    {
        
        /// <summary>
        /// 项目来源
        /// </summary>
        public string fs_Name { get; set; }
        /// <summary>
        /// 工程地点
        /// </summary>
        public string dd_Name { get; set; }
        /// <summary>
        /// 付款方式
        /// </summary>
        public string fk_Name { get; set; }
        /// <summary>
        /// 签订状态
        /// </summary>
        public string zt_Name { get; set; }
        /// <summary>
        /// 投资性质
        /// </summary>
        public string xz_Name { get; set; }
        /// <summary>
        /// 项目分类
        /// </summary>
        public string fl_Name { get; set; }
        /// <summary>
        /// 业务类型
        /// </summary>
        public string lx_Name { get; set; }
        /// <summary>
        /// 执行部门
        /// </summary>
        public string bm_Name { get; set; }
        /// <summary>
        /// 项目时间
        /// </summary>
        public DateTime? qq_ShiJian { get; set; }
        /// <summary>
        /// 延期监理费预计总额（万元）
        /// </summary>
        public decimal? htv_YanQiZongE { get; set; }
        /// <summary>
        /// 暂定监理费总额
        /// </summary>
        public decimal? zanJianLiFeiZongE
        {
            get;
            set;
        }
        /// <summary>
        /// 累计应收款总额
        /// </summary>
        public decimal? yingShouKuanZongE
        {
            get;
            set;
        }
        /// <summary>
        /// 累计已收款总额
        /// </summary>
        public decimal? yiShouKuanZongE
        {
            get;
            set;
        }
        /// <summary>
        /// 累计已开票总额
        /// </summary>
        public decimal? leJiYiKaiPiaoZongE
        {
            get;
            set;
        }
        /// <summary>
        /// 履约保证金应退还时间
        /// </summary>
        public DateTime? htv_LvYueYingTuiHuanRiQi { get; set; }
        /// <summary>
        /// 履约保证金应退总额
        /// </summary>
        public decimal? htv_LvYueYingTuiZongE { get; set; }
        /// <summary>
        /// 质保金应退时间
        /// </summary>
        public DateTime? htv_ZhiBaoJinTuiHuanShiJian { get; set; }
        /// <summary>
        /// 质保金应退总额（万元）
        /// </summary>
        public decimal? htv_ZhiBaoJinYingTuiZongE { get; set; }
        /// <summary>
        /// 竣工资料归档情况
        /// </summary>
        public string gd_Name { get; set; }
        /// <summary>
        /// 计划收款总额
        /// </summary>
        public decimal? jiHuaShouKuanZongE
        {
            get;
            set;
        }
        /// <summary>
        /// 实收总额
        /// </summary>
        public decimal? shiShouZongE
        {
            get;
            set;
        }
       
    }
    /// <summary>
    /// 合同查询条件
    /// </summary>
    public class QueryWhereHT { 
        public byte? fs_Name{get;set;} 
        public byte? dd_Name{get;set;}  
        public byte? fk_Name{get;set;}  
        public byte? zt_Name{get;set;}  
        public byte? xz_Name{get;set;}  
        public byte? fl_Name{get;set;}  
        public byte? lx_Name{get;set;}  
        public byte? bm_Name{get;set;}  
        public DateTime? qq_ShiJian_Start{get;set;}  
        public DateTime? qq_ShiJian_End{get;set;}  
        public string zhiXingLeiXing{get;set;}  
        public string ht_MingCheng{get;set;}  
        public string ht_Number{get;set;}  
        public string ht_YeZhuMingCheng{get;set;}  
        public string ht_YiFangQianYueDanWei{get;set;}  
        public DateTime? ht_QianYueRiQi_Start{get;set;}
        public DateTime? ht_QianYueRiQi_End { get; set; }  
    }
}
