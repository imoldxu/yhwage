package com.x.yh.context.vo;

import java.util.List;

import com.x.yh.entity.Wage;

public class TeamWage {

	private int totalCost; //总支出
	
	private int profit; //完成利润
	
	private int tourist; //完成流量
	
	private int othercost; //其他支出
	
	private List<Wage> staffWage;

	public int getTotalCost() {
		return totalCost;
	}

	public void setTotalCost(int totalCost) {
		this.totalCost = totalCost;
	}

	public int getProfit() {
		return profit;
	}

	public void setProfit(int profit) {
		this.profit = profit;
	}

	public int getTourist() {
		return tourist;
	}

	public void setTourist(int tourist) {
		this.tourist = tourist;
	}

	public List<Wage> getStaffWage() {
		return staffWage;
	}

	public void setStaffWage(List<Wage> staffWage) {
		this.staffWage = staffWage;
	}

	public int getOthercost() {
		return othercost;
	}

	public void setOthercost(int othercost) {
		this.othercost = othercost;
	}
	
}
