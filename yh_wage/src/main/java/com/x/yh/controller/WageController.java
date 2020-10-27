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

import com.x.yh.context.ErrorCode;
import com.x.yh.context.HandleException;
import com.x.yh.context.bo.CalcWageBo;
import com.x.yh.context.bo.WageQuery;
import com.x.yh.entity.Wage;
import com.x.yh.service.WageService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@Api("账户接口")
@RequestMapping("/wage")
public class WageController {
	
	@Autowired
	WageService calcWageService;

	@RequiresRoles({"finance"})
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(method = RequestMethod.POST)
	@ApiOperation(value = "计算工资", notes = "计算工资")
	public void calcWage(@ApiParam(name="calcWageBo", value="计算工资请求") @Valid @RequestBody CalcWageBo calcWageBo,
			HttpServletRequest request, HttpServletResponse response) {
		calcWageService.calcWage(calcWageBo.getCompanyid(), calcWageBo.getMonth());	
	}
	
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(method = RequestMethod.GET)
	@ApiOperation(value = "查询工资", notes = "查询工资")
	public List<Wage> queryWage(@ApiParam(name="calcWageBo", value="查询工资请求") @Valid WageQuery wageQuery,
			HttpServletRequest request, HttpServletResponse response) {
		if(null!=wageQuery.getTeamid()) {
			return calcWageService.queryTeamWage(wageQuery.getTeamid(), wageQuery.getMonth());
		}else if(null!=wageQuery.getCompanyid()) {
			return calcWageService.queryCompanyWage(wageQuery.getCompanyid(), wageQuery.getMonth());	
		}else {
			throw new HandleException(ErrorCode.ARG_ERROR, "必须指定一个公司或一个团队");
		}
	}
	
}
