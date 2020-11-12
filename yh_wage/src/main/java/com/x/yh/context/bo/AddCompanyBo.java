package com.x.yh.context.bo;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PositiveOrZero;

public class AddCompanyBo {

	@NotBlank
	private String name;

	@PositiveOrZero
	@Max(100)
	@Min(0)
	private Integer scoreweight;

	@PositiveOrZero
	@Max(100)
	@Min(0)
	private Integer profitweight;

	@PositiveOrZero
	@Max(100)
	@Min(0)
	private Integer touristsweight;
	
	@PositiveOrZero
	@Max(100)
	@Min(0)
	private Double yearratio;
	
	@PositiveOrZero
	@Max(100)
	@Min(0)
	private Double monthratio;
	
	@PositiveOrZero
	private Integer headerfee;
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getScoreweight() {
		return scoreweight;
	}

	public void setScoreweight(Integer scoreweight) {
		this.scoreweight = scoreweight;
	}

	public Integer getProfitweight() {
		return profitweight;
	}

	public void setProfitweight(Integer profitweight) {
		this.profitweight = profitweight;
	}

	public Integer getTouristsweight() {
		return touristsweight;
	}

	public void setTouristsweight(Integer touristsweight) {
		this.touristsweight = touristsweight;
	}

	public Double getYearratio() {
		return yearratio;
	}

	public void setYearratio(Double yearratio) {
		this.yearratio = yearratio;
	}

	public Double getMonthratio() {
		return monthratio;
	}

	public void setMonthratio(Double monthratio) {
		this.monthratio = monthratio;
	}

	public Integer getHeaderfee() {
		return headerfee;
	}

	public void setHeaderfee(Integer headerfee) {
		this.headerfee = headerfee;
	}
	
	
}
