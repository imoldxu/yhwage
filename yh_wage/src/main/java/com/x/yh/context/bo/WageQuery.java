package com.x.yh.context.bo;

import javax.validation.constraints.NotBlank;

import com.alibaba.fastjson.annotation.JSONField;

public class WageQuery {

	private Integer companyid;
	
	private Integer departmentid;
	
	private Integer teamid;
	
	@NotBlank
	@JSONField(format="yyyy-MM")
	private String month;

	public Integer getCompanyid() {
		return companyid;
	}

	public void setCompanyid(Integer companyid) {
		this.companyid = companyid;
	}

	public Integer getTeamid() {
		return teamid;
	}

	public void setTeamid(Integer teamid) {
		this.teamid = teamid;
	}

	public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}

	public Integer getDepartmentid() {
		return departmentid;
	}

	public void setDepartmentid(Integer departmentid) {
		this.departmentid = departmentid;
	}
	
}
