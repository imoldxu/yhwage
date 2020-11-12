package com.x.yh.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.x.yh.context.bo.AddCompanyBo;
import com.x.yh.entity.Company;
import com.x.yh.mapper.CompanyMapper;

import ma.glasnost.orika.MapperFacade;

@Service
public class CompanyService {

	@Autowired
	CompanyMapper companyMapper;
	@Autowired
	MapperFacade orikaMapper;
	
	
	public List<Company> getAll() {
		List<Company> all = companyMapper.selectAll();
		return all;
	}

	public Company add(AddCompanyBo addCompanyBo) {
		Company record = orikaMapper.map(addCompanyBo, Company.class);	
		companyMapper.insertUseGeneratedKeys(record);
		return record;
	}
	
	public Company modify(Company cop) {
		companyMapper.updateByPrimaryKey(cop);
		return cop;		
	}
	
	public Company getCompanyById(Integer companyid) {
		Company company = companyMapper.selectByPrimaryKey(companyid);
		return company;
	}
	
}
