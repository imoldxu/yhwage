package com.x.yh.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.x.yh.context.bo.AddStaffBo;
import com.x.yh.context.bo.StaffQuery;
import com.x.yh.context.vo.StaffVo;
import com.x.yh.entity.Staff;
import com.x.yh.service.StaffService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@Api("账户接口")
@RequestMapping("/staff")
public class StaffController {

	@Autowired
	StaffService staffService;
	
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(method = RequestMethod.GET)
	@ApiOperation(value = "获取员工列表", notes = "获取员工列表")
	public List<StaffVo> getMyAccount(
			@ApiParam(name="staffQuery", value="查询条件") @Valid StaffQuery staffQuery,
			HttpServletRequest request, HttpServletResponse response) {
	
		List<StaffVo> result = staffService.query(staffQuery);
		return  result;
	}
	
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(path="/{id}", method = RequestMethod.GET)
	@ApiOperation(value = "获取员工信息", notes = "获取员工列表")
	public StaffVo getStaff(@ApiParam(name="id", value="查询条件") @PathVariable("id") Integer id,
			HttpServletRequest request, HttpServletResponse response) {
			
		StaffVo a = staffService.getById(id);	
		return a;
	}
	
	@RequiresRoles({"manager"})
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(method = RequestMethod.POST)
	@ApiOperation(value = "添加员工", notes = "添加员工")
	public Staff add(
			@ApiParam(name="addStaffBo", value="查询条件") @Valid @RequestBody AddStaffBo addStaffBo,
			HttpServletRequest request, HttpServletResponse response) {
	
		Staff result = staffService.add(addStaffBo);
		return  result;
	}
	
	@RequiresRoles({"manager"})
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(method = RequestMethod.PUT)
	@ApiOperation(value = "修改员工", notes = "修改员工")
	public Staff modify(
			@ApiParam(name="staff", value="修改信息") @Valid @RequestBody Staff staff,
			HttpServletRequest request, HttpServletResponse response) {
	
		Staff result = staffService.modify(staff);
		return result;
	}
	
	@RequiresRoles({"manager"})
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(path="/{id}", method = RequestMethod.DELETE)
	@ApiOperation(value = "删除员工", notes = "删除员工")
	public void delete(
			@ApiParam(name="staffQuery", value="查询条件") @PathVariable("id") Integer id,
			HttpServletRequest request, HttpServletResponse response) {
		staffService.delete(id);
		return;
	}
}
