package com.x.yh.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.x.yh.context.bo.AddTaskBo;
import com.x.yh.context.bo.AssignCompanyTaskBo;
import com.x.yh.context.bo.ModifyTaskBo;
import com.x.yh.context.bo.TaskQuery;
import com.x.yh.context.vo.TaskVo;
import com.x.yh.entity.Task;
import com.x.yh.service.TaskService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/task")
@Api("绩效接口")
public class TaskController{

	@Autowired
	TaskService taskService;
	
	@RequiresRoles({"manager"})
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(method = RequestMethod.POST)
	@ApiOperation(value = "添加绩效任务", notes = "添加绩效任务")
	public Task add(
			@ApiParam(name = "addTaskBo", value = "添加绩效任务") @RequestBody @Valid AddTaskBo addTaskBo,
			HttpServletRequest request, HttpServletResponse response) {
		Task task = taskService.add(addTaskBo);
		return task;
	}
	
	@RequiresRoles({"manager"})
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(method = RequestMethod.PUT)
	@ApiOperation(value = "修改任务", notes = "修改任务")
	public Task modify(
			@ApiParam(name = "task", value = "修改任务") @RequestBody @Valid ModifyTaskBo modifyTaskBo,
			HttpServletRequest request, HttpServletResponse response) {
		Task task = taskService.modify(modifyTaskBo);
		return task;
	}
	
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(method = RequestMethod.GET)
	@ApiOperation(value = "获取任务清单", notes = "获取任务清单")
	public List<TaskVo> query(
			@ApiParam(name = "taskQuery", value = "任务查询条件") @Valid TaskQuery taskQuery,
			HttpServletRequest request, HttpServletResponse response) {
	
		List<TaskVo> ret = taskService.query(taskQuery);
		return ret;
	}
	
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(path="/company", method = RequestMethod.GET)
	@ApiOperation(value = "分配任务清单", notes = "获取任务清单")
	public List<TaskVo> queryTaskByCompany(
			@ApiParam(name = "taskQuery", value = "任务查询条件") @Valid TaskQuery taskQuery,
			HttpServletRequest request, HttpServletResponse response) {
	
		List<TaskVo> ret = taskService.query(taskQuery);
		return ret;
	}
	
	@RequiresRoles({"manager"})
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(path="/company", method = RequestMethod.POST)
	@ApiOperation(value = "分配任务清单", notes = "获取任务清单")
	public void assignTasks(
			@ApiParam(name = "assignCompanyTaskBo", value = "部门任务") @Valid @RequestBody AssignCompanyTaskBo assignCompanyTaskBo,
			HttpServletRequest request, HttpServletResponse response) {
	
		taskService.assign(assignCompanyTaskBo);
		return;
	}
	
}
