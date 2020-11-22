package com.x.yh.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSONObject;
import com.x.yh.context.ErrorCode;
import com.x.yh.context.HandleException;
import com.x.yh.context.bo.AddDepartmentTaskBo;
import com.x.yh.context.bo.AddTaskBo;
import com.x.yh.context.bo.AssignCompanyTaskBo;
import com.x.yh.context.bo.CompanyTaskQuery;
import com.x.yh.context.bo.ConfirmTaskBo;
import com.x.yh.context.bo.ModifyTaskBo;
import com.x.yh.context.bo.TaskQuery;
import com.x.yh.context.vo.TaskVo;
import com.x.yh.entity.CompanyTask;
import com.x.yh.entity.Task;
import com.x.yh.mapper.TaskMapper;

import ma.glasnost.orika.MapperFacade;
import tk.mybatis.mapper.entity.Example;

@Service
public class TaskService {

	@Autowired
	TaskMapper taskMapper;
	@Autowired
	MapperFacade orikaMapper;
	@Autowired
	CompanyTaskService companyTaskService;
	@Autowired
	DepartmentService departmentService;
	@Autowired
	TeamService teamService;
	
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
		Integer departmentid = taskQuery.getDepartmentid();
		Integer teamid = taskQuery.getTeamid();
		String month = taskQuery.getMonth();
		ret = taskMapper.queryTeamTaskVo(companyid, departmentid, teamid, month, taskQuery.getLimit());
		return ret;
	}
	
	public TaskVo selectTeamMonthTask(TaskQuery taskQuery) {
		
		TaskVo ret = taskMapper.selectTeamTaskVo(taskQuery.getTeamid(), taskQuery.getMonth());
		
		return ret;
	}

	public JSONObject queryTaskByCompany(TaskQuery taskQuery) {
		JSONObject ret = new JSONObject();
		taskQuery.setLimit(1000);
		List<TaskVo> tasks = query(taskQuery);
		tasks.forEach(task->{
			ret.put(task.getTeamid().toString(), task);
		});
		return ret;
	}

	@Transactional
	public void assign(AssignCompanyTaskBo assignCompanyTaskBo) {
		//检查各个团队的绩效与总绩效是否相等
		CompanyTaskQuery taskQuery = new CompanyTaskQuery();
		taskQuery.setCompanyid(assignCompanyTaskBo.getCompanyid());
		taskQuery.setMonth(assignCompanyTaskBo.getMonth());
		CompanyTask companyTask = companyTaskService.selectCompanyMonthTask(taskQuery);
		
		List<AddDepartmentTaskBo> tasks = assignCompanyTaskBo.getDepartments();
		
		for(int j=0; j<tasks.size(); j++) {
			AddDepartmentTaskBo departtask = tasks.get(j);
			List<AddTaskBo> teamTasks = departtask.getTeams();
			//为各个部门的团队插入任务
			int totalProfit = 0;
			int totalTourists = 0;
			for(int i=0; i<teamTasks.size(); i++) {
				AddTaskBo task = teamTasks.get(i);
				Example example = new Example(Task.class);
				Integer teamid = task.getTeamid();
				String month = task.getMonth();
				
				totalProfit += task.getProfit();
				totalTourists += task.getTourists();
				
				example.createCriteria().andEqualTo("teamid", teamid).andEqualTo("month", month);
				Task oldtask = taskMapper.selectOneByExample(example);
				if(oldtask!=null) {
					oldtask.setProfit(task.getProfit());
					oldtask.setTourists(task.getTourists());
					taskMapper.updateByPrimaryKeySelective(oldtask);
				}else {
					add(task);
				}
			}
			if(teamTasks.size()!=0) {//部门之下没有团队则不检查
				if(totalProfit!=companyTask.getProfit().intValue()) {
					throw new HandleException(ErrorCode.ARG_ERROR, "部门中团队利润必须与公司利润匹配");
				}
				if(totalTourists!=companyTask.getTourists().intValue()) {
					throw new HandleException(ErrorCode.ARG_ERROR, "部门中团队流量必须与公司流量匹配");
				}
			}
		}
	}
}
