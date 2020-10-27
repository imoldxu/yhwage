package com.x.yh.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.x.yh.context.ErrorCode;
import com.x.yh.context.HandleException;
import com.x.yh.context.bo.AddTaskBo;
import com.x.yh.context.bo.ConfirmTaskBo;
import com.x.yh.context.bo.ModifyTaskBo;
import com.x.yh.context.bo.TaskQuery;
import com.x.yh.context.vo.TaskVo;
import com.x.yh.entity.Task;
import com.x.yh.mapper.TaskMapper;

import ma.glasnost.orika.MapperFacade;

@Service
public class TaskService {

	@Autowired
	TaskMapper taskMapper;
	@Autowired
	MapperFacade orikaMapper;
	
	public Task add(AddTaskBo addTaskBo) {
		Task task = orikaMapper.map(addTaskBo, Task.class);
		taskMapper.insertUseGeneratedKeys(task);
		return task;
	}
	
	public Task modify(ModifyTaskBo modifyTaskBo) {
		Task task = orikaMapper.map(modifyTaskBo, Task.class);
		taskMapper.updateByPrimaryKeySelective(task);
		return task;
	}
	
	public Task confirm(ConfirmTaskBo confirmTaskBo) {
		Task task = orikaMapper.map(confirmTaskBo, Task.class);
		taskMapper.updateByPrimaryKeySelective(task);
		return task;
	}
	
	public List<TaskVo> query(TaskQuery taskQuery) {
		List<TaskVo> ret = null;
		Integer companyid = taskQuery.getCompanyid();
		Integer teamid = taskQuery.getTeamid();
		String month = taskQuery.getMonth();
		if(null != teamid) {
			if(null != month) {
				ret = new ArrayList<TaskVo>();
				TaskVo task = selectTeamMonthTask(taskQuery);
				if (null != task) {
					ret.add(task);
				}
			}else {
				ret = taskMapper.queryTaskVoByTeam(teamid);
			}
		}else if(null != companyid) {
			if(null != month) {
				ret = new ArrayList<TaskVo>();
				TaskVo task = selectCompanyMonthTask(taskQuery);
				if (null != task) {
					ret.add(task);
				}
			}else {
				ret = taskMapper.queryTaskVoByCompany(companyid);
			}
		}else {
			throw new HandleException(ErrorCode.ARG_ERROR, "必须指定一个公司或团队");
		}
		return ret;
	}
	
	public TaskVo selectTeamMonthTask(TaskQuery taskQuery) {
		
		TaskVo ret = taskMapper.selectTeamMonthTaskVo(taskQuery.getTeamid(), taskQuery.getMonth());
		
		return ret;
	}

	public TaskVo selectCompanyMonthTask(TaskQuery taskQuery) {

		TaskVo ret = taskMapper.selectCompanyMonthTaskVo(taskQuery.getCompanyid(), taskQuery.getMonth());
		return ret;
	}
	
}
