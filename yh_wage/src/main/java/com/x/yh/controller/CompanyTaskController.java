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

import com.x.yh.context.bo.AddCompanyTaskBo;
import com.x.yh.context.bo.CompanyTaskQuery;
import com.x.yh.context.vo.CompanyTaskVo;
import com.x.yh.entity.CompanyTask;
import com.x.yh.service.CompanyTaskService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/companytask")
@Api("公司绩效接口")
public class CompanyTaskController{

	@Autowired
	CompanyTaskService taskService;
	
	@RequiresRoles({"manager"})
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(method = RequestMethod.POST)
	@ApiOperation(value = "添加绩效任务", notes = "添加绩效任务")
	public CompanyTask add(
			@ApiParam(name = "addTaskBo", value = "添加绩效任务") @RequestBody @Valid AddCompanyTaskBo addTaskBo,
			HttpServletRequest request, HttpServletResponse response) {
		CompanyTask task = taskService.add(addTaskBo);
		return task;
	}
	
	@RequiresRoles({"manager"})
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(method = RequestMethod.PUT)
	@ApiOperation(value = "修改任务", notes = "修改任务")
	public CompanyTask modify(
			@ApiParam(name = "task", value = "修改任务") @RequestBody @Valid CompanyTask modifyTaskBo,
			HttpServletRequest request, HttpServletResponse response) {
		CompanyTask task = taskService.modify(modifyTaskBo);
		return task;
	}
	
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(method = RequestMethod.GET)
	@ApiOperation(value = "获取任务清单", notes = "获取任务清单")
	public List<CompanyTaskVo> query(
			@ApiParam(name = "taskQuery", value = "任务查询条件") @Valid CompanyTaskQuery taskQuery,
			HttpServletRequest request, HttpServletResponse response) {
	
		List<CompanyTaskVo> ret = taskService.query(taskQuery);
		return ret;
	}
	
}
