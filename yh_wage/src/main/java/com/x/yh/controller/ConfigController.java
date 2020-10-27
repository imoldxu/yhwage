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

import com.x.yh.entity.Config;
import com.x.yh.service.ConfigService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/config")
@Api("配置")
public class ConfigController {

	@Autowired
	ConfigService configService;
	
//	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
//	@RequestMapping(method = RequestMethod.PUT)
//	@ApiOperation(value = "修改配置", notes = "修改配置")
//	public Config modify(
//			@ApiParam(name = "config", value = "配置") @RequestBody @Valid Config config,
//			HttpServletRequest request, HttpServletResponse response) {
//		config = configService.modifyConfig(config);
//		return config;
//	}
	
	@RequiresRoles({"manager"})
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(method = RequestMethod.POST)
	@ApiOperation(value = "新建配置", notes = "新建配置")
	public Config add(
			@ApiParam(name = "config", value = "配置") @RequestBody @Valid Config config,
			HttpServletRequest request, HttpServletResponse response) {
		config = configService.newConfig(config);
		return config;
	}
	
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(method = RequestMethod.GET)
	@ApiOperation(value = "获取配置", notes = "获取配置")
	public Config get(
			HttpServletRequest request, HttpServletResponse response) {
		Config config = configService.getConfig();
		return config;
	}
	
}
