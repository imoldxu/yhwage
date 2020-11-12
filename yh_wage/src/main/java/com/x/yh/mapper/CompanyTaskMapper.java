package com.x.yh.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.x.commons.mybatis.BaseMapper;
import com.x.yh.context.vo.CompanyTaskVo;
import com.x.yh.entity.CompanyTask;

public interface CompanyTaskMapper extends BaseMapper<CompanyTask>{

	List<CompanyTaskVo> queryCompanyTaskVo(@Param("companyid") Integer companyid, @Param("month") String month);

	CompanyTaskVo selectCompanyTaskVo(@Param("companyid") Integer companyid, @Param("month") String month);
}
