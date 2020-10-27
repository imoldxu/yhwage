package com.x.yh.entity;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.apache.ibatis.type.JdbcType;

import tk.mybatis.mapper.annotation.ColumnType;

@Table(name="t_wage")
public class Wage {

	@EmbeddedId
	@Column(name = "staffid")
	@ColumnType(jdbcType = JdbcType.INTEGER)
	private Integer staffid;
	
	@Column(name = "staffname")
	@ColumnType(jdbcType = JdbcType.VARCHAR)
	private String staffName;
	
	@Column(name = "companyid")
	@ColumnType(jdbcType = JdbcType.INTEGER)
	private Integer companyid;
	
	@Column(name = "companyname")
	@ColumnType(jdbcType = JdbcType.VARCHAR)
	private String companyName;
	
	@Column(name = "copid")
	@ColumnType(jdbcType = JdbcType.INTEGER)
	private Integer copid;
	
	@Column(name = "copname")
	@ColumnType(jdbcType = JdbcType.VARCHAR)
	private String copName;
	
	@Column(name = "teamid")
	@ColumnType(jdbcType = JdbcType.INTEGER)
	private Integer teamid;
	
	@Column(name = "teamname")
	@ColumnType(jdbcType = JdbcType.VARCHAR)
	private String teamName;
	
	
	@EmbeddedId
	@Column(name = "month")
	@ColumnType(jdbcType = JdbcType.VARCHAR)
	private String month;
	
	@Column(name = "basicwage")
	@ColumnType(jdbcType = JdbcType.INTEGER)
	private Integer basicwage;
	
	@Column(name = "floatwage")
	@ColumnType(jdbcType = JdbcType.INTEGER)
	private Integer floatwage;
	
	@Column(name = "award")
	@ColumnType(jdbcType = JdbcType.INTEGER)
	private Integer award;
	
	@Column(name = "yearaward")
	@ColumnType(jdbcType = JdbcType.INTEGER)
	private Integer yearaward;
	
	@Transient
	private Double yearRatio;
	
	public Double getYearRatio() {
		return yearRatio;
	}

	public void setYearRatio(Double yearRatio) {
		this.yearRatio = yearRatio;
	}

	public Integer getCopid() {
		return copid;
	}

	public void setCopid(Integer copid) {
		this.copid = copid;
	}

	public String getCopName() {
		return copName;
	}

	public void setCopName(String copName) {
		this.copName = copName;
	}

	public Integer getStaffid() {
		return staffid;
	}

	public void setStaffid(Integer staffid) {
		this.staffid = staffid;
	}
	
	public Integer getCompanyid() {
		return companyid;
	}

	public void setCompanyid(Integer companyid) {
		this.companyid = companyid;
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

	public Integer getAward() {
		return award;
	}

	public void setAward(Integer award) {
		this.award = award;
	}

	public Integer getYearaward() {
		return yearaward;
	}

	public void setYearaward(Integer yearaward) {
		this.yearaward = yearaward;
	}

	public String getStaffName() {
		return staffName;
	}

	public void setStaffName(String staffName) {
		this.staffName = staffName;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getTeamName() {
		return teamName;
	}

	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}
	
}
