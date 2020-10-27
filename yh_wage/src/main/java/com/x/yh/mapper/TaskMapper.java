package com.x.yh.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.x.commons.mybatis.BaseMapper;
import com.x.yh.context.vo.TaskVo;
import com.x.yh.entity.Task;

public interface TaskMapper extends BaseMapper<Task>{

	TaskVo selectTeamMonthTaskVo(@Param(value = "teamid")Integer teamid, @Param(value = "month")String month);

	TaskVo selectCompanyMonthTaskVo(@Param(value = "companyid")Integer companyid, @Param(value = "month")String month);

	List<TaskVo> queryTaskVoByTeam(@Param(value = "teamid")Integer teamid);

	List<TaskVo> queryTaskVoByCompany(@Param(value = "companyid")Integer companyid);
}
