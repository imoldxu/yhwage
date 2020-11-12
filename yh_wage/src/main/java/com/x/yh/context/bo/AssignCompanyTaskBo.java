package com.x.yh.context.bo;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import com.alibaba.fastjson.annotation.JSONField;

@Valid
public class AssignCompanyTaskBo {

	@NotNull
	private Integer companyid;
	
	@NotNull
	@JSONField(format="yyyy-MM")
	private String month;
	
	@Valid
	private List<AddDepartmentTaskBo> departments; 
	
	public Integer getCompanyid() {
		return companyid;
	}

	public void setCompanyid(Integer companyid) {
		this.companyid = companyid;
	}

	public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}

	public List<AddDepartmentTaskBo> getDepartments() {
		return departments;
	}

	public void setDepartments(List<AddDepartmentTaskBo> departments) {
		this.departments = departments;
	}
	
}
