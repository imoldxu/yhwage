package com.x.yh.entity;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.apache.ibatis.type.JdbcType;

import tk.mybatis.mapper.annotation.ColumnType;

@Table(name="t_company_task")
public class CompanyTask {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ColumnType(jdbcType = JdbcType.INTEGER)
	private Integer id;
	
	@Column(name = "companyid")
	@ColumnType(jdbcType = JdbcType.INTEGER)
	private Integer companyid;
	
	@Column(name = "month")
	@ColumnType(jdbcType = JdbcType.VARCHAR)
	private String month;
	
	@Column(name = "profit")
	@ColumnType(jdbcType = JdbcType.INTEGER)
	private Integer profit;
	
	@Column(name = "tourists")
	@ColumnType(jdbcType = JdbcType.INTEGER)
	private Integer tourists;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

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
