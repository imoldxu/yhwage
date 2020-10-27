package com.x.yh.entity;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.apache.ibatis.type.JdbcType;

import tk.mybatis.mapper.annotation.ColumnType;

@Table(name="t_task")
public class Task {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ColumnType(jdbcType = JdbcType.INTEGER)
	private Integer id;
	
	@Column(name = "teamid")
	@ColumnType(jdbcType = JdbcType.INTEGER)
	private Integer teamid;
	
	@Column(name = "month")
	@ColumnType(jdbcType = JdbcType.VARCHAR)
	private String month;
	
	@Column(name = "profit")
	@ColumnType(jdbcType = JdbcType.INTEGER)
	private Integer profit;
	
	@Column(name = "tourists")
	@ColumnType(jdbcType = JdbcType.INTEGER)
	private Integer tourists;
	
	@Column(name = "actualprofit")
	@ColumnType(jdbcType = JdbcType.INTEGER)
	private Integer actualprofit;
	
	@Column(name = "actualtourists")
	@ColumnType(jdbcType = JdbcType.INTEGER)
	private Integer actualtourists;
	
	@Column(name = "actualscore")
	@ColumnType(jdbcType = JdbcType.DOUBLE)
	private Double actualscore;

	@Column(name = "othercost")
	@ColumnType(jdbcType = JdbcType.INTEGER)
	private Integer othercost;
	
	public Integer getOthercost() {
		return othercost;
	}

	public void setOthercost(Integer othercost) {
		this.othercost = othercost;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getTeamid() {
		return teamid;
	}

	public void setTeamid(Integer teamid) {
		this.teamid = teamid;
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
	
}
