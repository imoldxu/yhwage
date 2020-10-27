package com.x.yh.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.x.yh.context.bo.CalcYearAwardBo;
import com.x.yh.context.vo.YearAwardVo;
import com.x.yh.service.WageService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@Api("年终接口")
@RequestMapping("/yearaward")
public class YearAwardController {
	
	@Autowired
	WageService calcWageService;
	
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(method = RequestMethod.GET)
	@ApiOperation(value = "计算年终", notes = "计算年终")
	public List<YearAwardVo> calcWage(@ApiParam(name="calcYearAwardBo", value="计算年终请求") @Valid CalcYearAwardBo calcYearAwardBo,
			HttpServletRequest request, HttpServletResponse response) {		
		return calcWageService.calcYearAward(calcYearAwardBo);
	}
	
}
