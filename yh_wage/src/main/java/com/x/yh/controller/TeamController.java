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
import com.x.yh.context.bo.AddTeamBo;
import com.x.yh.context.bo.TeamQuery;
import com.x.yh.context.vo.TeamVo;
import com.x.yh.entity.Team;
import com.x.yh.service.TeamService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/team")
@Api("公司接口")
public class TeamController {

	@Autowired
	TeamService teamService;
	
	@RequiresRoles({"manager"})
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(method = RequestMethod.POST)
	@ApiOperation(value = "添加团队", notes = "添加团队")
	public Team add(
			@ApiParam(name = "addTeamBo", value = "添加绩效任务") @RequestBody @Valid AddTeamBo addTeamBo,
			HttpServletRequest request, HttpServletResponse response) {
		Team team = teamService.add(addTeamBo);
		return team;
	}
	
	@RequiresRoles({"manager"})
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(method = RequestMethod.PUT)
	@ApiOperation(value = "修改团队", notes = "修改团队")
	public Team modify(
			@ApiParam(name = "team", value = "公司信息") @RequestBody @Valid Team team,
			HttpServletRequest request, HttpServletResponse response) {
		teamService.modify(team);
		return team;
	}
	
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(method = RequestMethod.GET)
	@ApiOperation(value = "获取团队列表", notes = "获取团队列表")
	public List<TeamVo> query(
			@ApiParam(name = "team", value = "公司信息") @Valid TeamQuery teamQuery,
			HttpServletRequest request, HttpServletResponse response) {
	
		List<TeamVo> teams = teamService.query(teamQuery);
		
		return teams;
	}
	
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(path="/all", method = RequestMethod.GET)
	@ApiOperation(value = "获取团队列表", notes = "获取团队列表")
	public JSONObject query(
			HttpServletRequest request, HttpServletResponse response) {
	
		JSONObject teams = teamService.queryAllByDepartment();
		
		return teams;
	}
}