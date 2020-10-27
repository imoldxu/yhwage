package com.x.yh.context.vo;

import com.x.yh.entity.ClassOfPosition;

public class StaffVo {

	private Integer id;
	
	private String name;
	
	private Integer companyid;
	
	private String companyName;
	
	private Integer teamid;
	
	private String teamName;
	
	private ClassOfPosition cop;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getCompanyid() {
		return companyid;
	}

	public void setCompanyid(Integer companyid) {
		this.companyid = companyid;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public Integer getTeamid() {
		return teamid;
	}

	public void setTeamid(Integer teamid) {
		this.teamid = teamid;
	}

	public String getTeamName() {
		return teamName;
	}

	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}

	public ClassOfPosition getCop() {
		return cop;
	}

	public void setCop(ClassOfPosition cop) {
		this.cop = cop;
	}

//	public Integer getCopid() {
//		return copid;
//	}
//
//	public void setCopid(Integer copid) {
//		this.copid = copid;
//	}
//
//	public String getCopName() {
//		return copName;
//	}
//
//	public void setCopName(String copName) {
//		this.copName = copName;
//	}
	
}
