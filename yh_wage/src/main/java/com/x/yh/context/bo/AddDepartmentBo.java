package com.x.yh.context.bo;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class AddDepartmentBo {

	@NotBlank
	private String name;

	@NotNull
	private Integer companyid;
	
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

}
