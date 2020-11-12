package com.x.yh.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.constraints.NotBlank;

import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.x.yh.context.vo.StaffStatisticVo;
import com.x.yh.service.StatisticService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/statistic")
@Api("用工统计")
public class StatisticController {

	@Autowired
	StatisticService statisticService;
	
	@RequiresRoles({"manager"})
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(path="/staff", method = RequestMethod.GET)
	@ApiOperation(value = "获取个人用工成本统计", notes = "获取个人用工成本统计")
	public List<StaffStatisticVo> getStaffStatistic(
			@ApiParam(name="year", value="年份") @RequestParam("year") @NotBlank String year,
			HttpServletRequest request, HttpServletResponse response) {
	
		List<StaffStatisticVo> result = statisticService.staffStatistic(year);
		return  result;
	}
	
}
