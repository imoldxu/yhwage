package com.x.yh.context.bo;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;

public class ConfirmTaskBo {

	@NotNull
	private Integer id;
	
	private Integer actualprofit;
	
	@PositiveOrZero
	private Integer actualtourists;
	
	@PositiveOrZero
	@Min(0)
	@Max(5)
	private Double actualscore;
	
	@PositiveOrZero
	private Integer othercost;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getActualprofit() {
		return actualprofit;
	}

	public void setActualprofit(Integer actualprofit) {
		this.actualprofit = actualprofit;
	}

	public Integer getActualtourists() {
		return actualtourists;
	}

	public void setActualtourists(Integer actualtourists) {
		this.actualtourists = actualtourists;
	}

	public Double getActualscore() {
		return actualscore;
	}

	public void setActualscore(Double actualscore) {
		this.actualscore = actualscore;
	}

	public Integer getOthercost() {
		return othercost;
	}

	public void setOthercost(Integer othercost) {
		this.othercost = othercost;
	}
	
}
