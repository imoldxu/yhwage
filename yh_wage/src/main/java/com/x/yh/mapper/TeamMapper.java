package com.x.yh.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.x.commons.mybatis.BaseMapper;
import com.x.yh.context.vo.TeamVo;
import com.x.yh.entity.Team;

public interface TeamMapper extends BaseMapper<Team>{

	//List<TeamVo> queryTeamVoByCompany(@Param(value = "companyid")Integer companyid);
	
	List<TeamVo> queryTeamVo(@Param(value = "companyid")Integer companyid, @Param(value = "departmentid")Integer departmentid);
}
