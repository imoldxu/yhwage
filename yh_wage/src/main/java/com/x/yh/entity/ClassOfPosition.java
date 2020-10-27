package com.x.yh.entity;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.apache.ibatis.type.JdbcType;

import tk.mybatis.mapper.annotation.ColumnType;

@Table(name="t_class_of_position")
public class ClassOfPosition {
	
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ColumnType(jdbcType = JdbcType.INTEGER)
	private Integer id;
	
	@Column(name = "name")
	@ColumnType(jdbcType = JdbcType.VARCHAR)
	private String name;

	@Column(name = "basicwage")
	@ColumnType(jdbcType = JdbcType.INTEGER)
	private Integer basicwage;

	@Column(name = "floatwage")
	@ColumnType(jdbcType = JdbcType.INTEGER)
	private Integer floatwage;

	@Column(name = "monthratio")
	@ColumnType(jdbcType = JdbcType.DOUBLE)
	private Double monthratio;
	
	@Column(name = "yearratio")
	@ColumnType(jdbcType = JdbcType.DOUBLE)
	private Double yearratio;

	@Column(name = "ismanager")
	@ColumnType(jdbcType = JdbcType.TINYINT)
	private Integer ismanager;
	
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

	public Double getMonthratio() {
		return monthratio;
	}

	public void setMonthratio(Double monthratio) {
		this.monthratio = monthratio;
	}

	public Double getYearratio() {
		return yearratio;
	}

	public void setYearratio(Double yearratio) {
		this.yearratio = yearratio;
	}

	public Integer getIsmanager() {
		return ismanager;
	}

	public void setIsmanager(Integer ismanager) {
		this.ismanager = ismanager;
	}
	
}
