package com.x.yh.mapper;


import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.x.commons.mybatis.BaseMapper;
import com.x.yh.context.vo.StaffVo;
import com.x.yh.entity.Staff;

public interface StaffMapper extends BaseMapper<Staff>{

	StaffVo selectStaffVoById(@Param(value = "id")Integer id);

	List<StaffVo> queryStaffVoByCompany(@Param(value = "companyid")Integer companyid);
	
	List<StaffVo> queryStaffVoByTeam(@Param(value = "teamid")Integer teamid);

	List<StaffVo> queryManagerStaffVoByCompany(@Param(value = "companyid") Integer companyid);
	
}
