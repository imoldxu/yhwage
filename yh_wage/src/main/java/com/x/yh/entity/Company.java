package com.x.yh.entity;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.apache.ibatis.type.JdbcType;

import tk.mybatis.mapper.annotation.ColumnType;

@Table(name="t_company")
public class Company {
	
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ColumnType(jdbcType = JdbcType.INTEGER)
	private Integer id;
	
	@Column(name = "name")
	@ColumnType(jdbcType = JdbcType.VARCHAR)
	private String name;
	
	@Column(name = "scoreweight")
	@ColumnType(jdbcType = JdbcType.INTEGER)
	private Integer scoreweight;

	@Column(name = "profitweight")
	@ColumnType(jdbcType = JdbcType.INTEGER)
	private Integer profitweight;

	@Column(name = "touristsweight")
	@ColumnType(jdbcType = JdbcType.INTEGER)
	private Integer touristsweight;
	
	@Column(name = "yearratio")
	@ColumnType(jdbcType = JdbcType.DOUBLE)
	private Double yearratio;
	
	@Column(name = "monthratio")
	@ColumnType(jdbcType = JdbcType.DOUBLE)
	private Double monthratio;
	
	@Column(name = "headerfee")
	@ColumnType(jdbcType = JdbcType.INTEGER)
	private Integer headerfee;//人头费

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

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
