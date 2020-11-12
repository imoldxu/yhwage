package com.x.yh.context.bo;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;

import com.alibaba.fastjson.annotation.JSONField;

public class AddCompanyTaskBo {

	@NotNull
	private Integer companyid;
	
	@NotNull
	@JSONField(format="yyyy-MM")
	private String month;
	
	private Integer profit;
	
	@PositiveOrZero
	private Integer tourists;

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
