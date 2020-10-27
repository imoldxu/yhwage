package com.x.yh.context.bo;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

import com.alibaba.fastjson.annotation.JSONField;

public class CalcWageBo {

	@Positive
	private Integer companyid;
	
	@NotBlank
	@JSONField(format="yyyy-MM")
	private String month;

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
	
}
