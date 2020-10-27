package com.x.yh.service;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.x.commons.mybatis.PageResult;
import com.x.yh.context.bo.AddTeamBo;
import com.x.yh.context.bo.TeamQuery;
import com.x.yh.context.vo.TeamVo;
import com.x.yh.entity.Company;
import com.x.yh.entity.Team;
import com.x.yh.mapper.TeamMapper;

import ma.glasnost.orika.MapperFacade;

@Service
public class TeamService {

	@Autowired
	TeamMapper teamMapper;
	@Autowired
	MapperFacade orikaMapper;
	@Autowired
	CompanyService companyService;
	
	
	public PageResult<Team> getAll() {
		//List<Team> all = teamMapper.selectAll();
		
		return null;
	}

	public Team add(AddTeamBo addTeamBo) {
		Team record = orikaMapper.map(addTeamBo, Team.class);	
		teamMapper.insertUseGeneratedKeys(record);
		return record;
	}
	
	public Team modify(Team team) {
		teamMapper.updateByPrimaryKey(team);
		return team;		
	}

	public List<TeamVo> query(@Valid TeamQuery teamQuery) {
		//Example example = new Example(Team.class);
		List<TeamVo> list = null;
		if (null != teamQuery.getCompanyid()) {
		//	example.createCriteria().andEqualTo("companyid", teamQuery.getCompanyid());
			list = teamMapper.queryTeamVoByCompany(teamQuery.getCompanyid());
		}else {
			list = teamMapper.queryTeamVo();
		}
		return list;
	}

	public JSONObject queryAllByCompany() {
		
		List<Company> companys = companyService.getAll();

		JSONObject ret = new JSONObject(companys.size());
		companys.forEach(company->{
			TeamQuery teamQuery = new TeamQuery();
			teamQuery.setCompanyid(company.getId());
			List<TeamVo> teams = query(teamQuery);
			ret.put(company.getId().toString(), teams);
		});
		
		return ret;
	}
	
}
