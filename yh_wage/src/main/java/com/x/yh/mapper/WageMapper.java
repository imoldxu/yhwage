package com.x.yh.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.x.commons.mybatis.BaseMapper;
import com.x.yh.context.vo.YearAwardVo;
import com.x.yh.entity.Wage;

public interface WageMapper extends BaseMapper<Wage>{

	//Wage sumMonthCostByCompany(@Param(value = "companyid") Integer companyid, @Param(value = "month") String month);
	
	List<YearAwardVo> sumYearAward(@Param(value = "year") String year);
	
	List<YearAwardVo> sumStaffYearAward(@Param(value = "staffname") String staffname ,@Param(value = "year") String year);
}
