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

import com.x.yh.context.bo.AddCompanyBo;
import com.x.yh.entity.Company;
import com.x.yh.service.CompanyService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/company")
@Api("公司接口")
public class CompanyController {

	@Autowired
	CompanyService companyService;
	
	@RequiresRoles({"manager"})
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(method = RequestMethod.POST)
	@ApiOperation(value = "添加公司", notes = "添加公司")
	public Company add(
			@ApiParam(name = "addTaskBo", value = "添加绩效任务") @RequestBody @Valid AddCompanyBo addCompanyBo,
			HttpServletRequest request, HttpServletResponse response) {
		Company company = companyService.add(addCompanyBo);
		
		return company;
	}
	
	@RequiresRoles({"manager"})
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(method = RequestMethod.PUT)
	@ApiOperation(value = "修改公司", notes = "修改公司")
	public Company modify(
			@ApiParam(name = "company", value = "公司信息") @RequestBody @Valid Company company,
			HttpServletRequest request, HttpServletResponse response) {
		company = companyService.modify(company);
		return company;
	}
	
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(method = RequestMethod.GET)
	@ApiOperation(value = "获取公司列表", notes = "获取公司列表")
	public List<Company> query(
			HttpServletRequest request, HttpServletResponse response) {
	
		List<Company> list = companyService.getAll();
		return list;
	}
	
}
