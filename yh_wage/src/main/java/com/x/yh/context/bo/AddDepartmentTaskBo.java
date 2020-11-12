package com.x.yh.context.bo;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Valid
public class AddDepartmentTaskBo {

	@NotNull
	private Integer departmentid;
	
	private List<AddTaskBo> teams;

	public Integer getDepartmentid() {
		return departmentid;
	}

	public void setDepartmentid(Integer departmentid) {
		this.departmentid = departmentid;
	}

	public List<AddTaskBo> getTeams() {
		return teams;
	}

	public void setTeams(List<AddTaskBo> teams) {
		this.teams = teams;
	}
	
}
