package com.x.yh.controller;


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

import com.x.yh.context.bo.ConfirmTaskBo;
import com.x.yh.entity.Task;
import com.x.yh.service.TaskService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/actualtask")
@Api("实际绩效接口")
public class ActualTaskController{

	@Autowired
	TaskService taskService;
	
	@RequiresRoles({"finance"})
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(method = RequestMethod.PUT)
	@ApiOperation(value = "完成任务", notes = "完成任务")
	public Task confirm(
			@ApiParam(name = "confirmTaskBo", value = "完成任务") @RequestBody @Valid ConfirmTaskBo confirmTaskBo,
			HttpServletRequest request, HttpServletResponse response) {
		Task task = taskService.confirm(confirmTaskBo);
		return task;
	}
	
}
