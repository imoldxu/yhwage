package com.x.yh.context.bo;

import javax.validation.constraints.NotBlank;

import com.alibaba.fastjson.annotation.JSONField;

public class CalcYearAwardBo {

	private String name;
	
	@NotBlank
	@JSONField(format="yyyy")
	private String year;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}
	
}
