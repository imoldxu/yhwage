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

import com.alibaba.fastjson.JSONObject;
import com.x.yh.context.bo.AddDepartmentBo;
import com.x.yh.context.bo.DepartmentQuery;
import com.x.yh.context.bo.SetDepartmentRatioBo;
import com.x.yh.context.vo.DepartmentVo;
import com.x.yh.entity.Department;
import com.x.yh.service.DepartmentService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/department")
@Api("部门")
public class DepartmentController {

	@Autowired
	DepartmentService departmentService;
	
	@RequiresRoles({"manager"})
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(method = RequestMethod.POST)
	@ApiOperation(value = "添加部门", notes = "添加部门")
	public Department add(
			@ApiParam(name = "AddDepartmentBo", value = "添加绩效任务") @RequestBody @Valid AddDepartmentBo addDepartmentBo,
			HttpServletRequest request, HttpServletResponse response) {
		Department department = departmentService.add(addDepartmentBo);
		
		return department;
	}
	
	@RequiresRoles({"manager"})
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(method = RequestMethod.PUT)
	@ApiOperation(value = "修改部门", notes = "修改部门")
	public Department modify(
			@ApiParam(name = "department", value = "部门信息") @RequestBody @Valid Department department,
			HttpServletRequest request, HttpServletResponse response) {
		department = departmentService.modify(department);
		return department;
	}
	
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(method = RequestMethod.GET)
	@ApiOperation(value = "获取部门列表", notes = "获取部门列表")
	public List<DepartmentVo> query(@ApiParam(name="departmentQuery", value="查询条件") @Valid DepartmentQuery departmentQuery,
			HttpServletRequest request, HttpServletResponse response) {
	
		List<DepartmentVo> list = departmentService.query(departmentQuery);
		return list;
	}
	
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(path = "/all", method = RequestMethod.GET)
	@ApiOperation(value = "获取所有部门列表", notes = "获取所有部门列表")
	public JSONObject query(
			HttpServletRequest request, HttpServletResponse response) {
	
		JSONObject ret = departmentService.queryAllByCompany();
		return ret;
	}
	
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(path = "/ratio", method = RequestMethod.PATCH)
	@ApiOperation(value = "设置部门分成比例", notes = "设置部门分成比例")
	public void setRatio(
			@ApiParam(name="ratios" ,value="比例列表") @RequestBody @Valid List<SetDepartmentRatioBo> ratios,
			HttpServletRequest request, HttpServletResponse response) {
	
		departmentService.setDepartmentsRatio(ratios);
		return;
	}
}
