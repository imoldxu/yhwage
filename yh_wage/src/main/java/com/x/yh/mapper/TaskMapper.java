package com.x.yh.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.x.commons.mybatis.BaseMapper;
import com.x.yh.context.vo.TaskVo;
import com.x.yh.entity.Task;

public interface TaskMapper extends BaseMapper<Task>{

	TaskVo selectTeamTaskVo(@Param(value = "teamid")Integer teamid, @Param(value = "month")String month);

	List<TaskVo> queryTeamTaskVo(@Param(value = "companyid")Integer companyid,@Param(value = "departmentid")Integer departmentid, @Param(value = "teamid")Integer teamid, @Param(value = "month")String month, @Param(value = "limit")Integer limit);

}
