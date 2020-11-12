package com.x.yh.context.bo;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class AddTeamBo {
	
	@NotBlank
	private String name;
	
	@NotNull
	private Integer departmentid;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getDepartmentid() {
		return departmentid;
	}

	public void setDepartmentid(Integer departmentid) {
		this.departmentid = departmentid;
	}
	
}
