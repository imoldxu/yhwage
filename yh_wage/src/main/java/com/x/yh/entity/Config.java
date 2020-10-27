package com.x.yh.entity;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.apache.ibatis.type.JdbcType;

import tk.mybatis.mapper.annotation.ColumnType;

@Table(name="t_config")
public class Config {
	
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ColumnType(jdbcType = JdbcType.INTEGER)
	private Integer id;
	
	@Column(name = "year")
	@ColumnType(jdbcType = JdbcType.VARCHAR)
	private String year;

	@Column(name = "scoreweight")
	@ColumnType(jdbcType = JdbcType.INTEGER)
	private Integer scoreweight;

	@Column(name = "profitweight")
	@ColumnType(jdbcType = JdbcType.INTEGER)
	private Integer profitweight;

	@Column(name = "touristsweight")
	@ColumnType(jdbcType = JdbcType.INTEGER)
	private Integer touristsweight;
	
	@Column(name = "teamyearratio")
	@ColumnType(jdbcType = JdbcType.DOUBLE)
	private Double teamyearratio;
	
	@Column(name = "teammouthratio")
	@ColumnType(jdbcType = JdbcType.DOUBLE)
	private Double teammouthratio;
	
	@Column(name = "manageryearratio")
	@ColumnType(jdbcType = JdbcType.DOUBLE)
	private Double manageryearratio;
	
	@Column(name = "managermouthratio")
	@ColumnType(jdbcType = JdbcType.DOUBLE)
	private Double managermouthratio;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
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

	public Double getTeamyearratio() {
		return teamyearratio;
	}

	public void setTeamyearratio(Double teamyearratio) {
		this.teamyearratio = teamyearratio;
	}

	public Double getTeammouthratio() {
		return teammouthratio;
	}

	public void setTeammouthratio(Double teammouthratio) {
		this.teammouthratio = teammouthratio;
	}

	public Double getManageryearratio() {
		return manageryearratio;
	}

	public void setManageryearratio(Double manageryearratio) {
		this.manageryearratio = manageryearratio;
	}

	public Double getManagermouthratio() {
		return managermouthratio;
	}

	public void setManagermouthratio(Double managermouthratio) {
		this.managermouthratio = managermouthratio;
	}
	
}
