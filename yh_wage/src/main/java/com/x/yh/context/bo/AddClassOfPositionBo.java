package com.x.yh.context.bo;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PositiveOrZero;

public class AddClassOfPositionBo {

	@NotBlank(message="名称不能为空")
	private String name;

	@PositiveOrZero
	private Integer basicwage;

	@PositiveOrZero
	private Integer floatwage;

	@PositiveOrZero
	private Double monthratio;
	
	@PositiveOrZero
	private Double yearratio;
	
	@PositiveOrZero
	@Min(0)
	@Max(1)
	private Integer ismanager;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getBasicwage() {
		return basicwage;
	}

	public void setBasicwage(Integer basicwage) {
		this.basicwage = basicwage;
	}

	public Integer getFloatwage() {
		return floatwage;
	}

	public void setFloatwage(Integer floatwage) {
		this.floatwage = floatwage;
	}

	public Double getMonthratio() {
		return monthratio;
	}

	public void setMonthratio(Double monthratio) {
		this.monthratio = monthratio;
	}

	public Double getYearratio() {
		return yearratio;
	}

	public void setYearratio(Double yearratio) {
		this.yearratio = yearratio;
	}

	public Integer getIsmanager() {
		return ismanager;
	}

	public void setIsmanager(Integer ismanager) {
		this.ismanager = ismanager;
	}
	
}
