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

import com.x.yh.context.bo.AddClassOfPositionBo;
import com.x.yh.entity.ClassOfPosition;
import com.x.yh.service.COPService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/cop")
@Api("职级接口")
public class COPController {

	@Autowired
	COPService copService;
	
	@RequiresRoles({"manager"})
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(method = RequestMethod.POST)
	@ApiOperation(value = "添加职级", notes = "添加职级")
	public ClassOfPosition add(
			@ApiParam(name = "addCopBo", value = "添加职级") @RequestBody @Valid AddClassOfPositionBo addCopBo,
			HttpServletRequest request, HttpServletResponse response) {
		ClassOfPosition ret = copService.add(addCopBo);
		
		return ret;
	}
	
	@RequiresRoles({"manager"})
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(method = RequestMethod.PUT)
	@ApiOperation(value = "修改职级", notes = "修改职级")
	public ClassOfPosition modify(
			@ApiParam(name = "cop", value = "修改职级") @RequestBody @Valid ClassOfPosition cop,
			HttpServletRequest request, HttpServletResponse response) {
		ClassOfPosition ret = copService.modify(cop);
		
		return ret;
	}
	
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(method = RequestMethod.GET)
	@ApiOperation(value = "查询职级", notes = "查询职级")
	public List<ClassOfPosition> getAll(
			HttpServletRequest request, HttpServletResponse response) {
		List<ClassOfPosition> ret = copService.getAll();
		
		return ret;
	}
}
