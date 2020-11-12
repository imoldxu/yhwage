package com.x.yh.context.bo;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;

import com.alibaba.fastjson.annotation.JSONField;

public class ModifyTaskBo {

	@PositiveOrZero
	private Integer id;
	
	@NotNull
	@JSONField(format="yyyy-MM")
	private String month;
	
	private Integer profit;
	
	@PositiveOrZero
	private Integer tourists;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}

	public Integer getProfit() {
		return profit;
	}

	public void setProfit(Integer profit) {
		this.profit = profit;
	}

	public Integer getTourists() {
		return tourists;
	}

	public void setTourists(Integer tourists) {
		this.tourists = tourists;
	}
	
}
