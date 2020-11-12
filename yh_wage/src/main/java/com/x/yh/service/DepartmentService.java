package com.x.yh.service;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSONObject;
import com.x.yh.context.ErrorCode;
import com.x.yh.context.HandleException;
import com.x.yh.context.bo.AddDepartmentBo;
import com.x.yh.context.bo.DepartmentQuery;
import com.x.yh.context.bo.SetDepartmentRatioBo;
import com.x.yh.context.vo.DepartmentVo;
import com.x.yh.entity.Company;
import com.x.yh.entity.Department;
import com.x.yh.mapper.DepartmentMapper;

import ma.glasnost.orika.MapperFacade;

@Service
public class DepartmentService {

	@Autowired
	DepartmentMapper departmentMapper;
	@Autowired
	CompanyService companyService;
	@Autowired
	MapperFacade orikaMapper;
	
	public Department add(AddDepartmentBo addCompanyBo) {
		Department record = orikaMapper.map(addCompanyBo, Department.class);	
		departmentMapper.insertUseGeneratedKeys(record);
		return record;
	}
	
	public Department modify(Department cop) {
		departmentMapper.updateByPrimaryKeySelective(cop);
		return cop;		
	}
	
	public Department getCompanyById(Integer departmentid) {
		Department department = departmentMapper.selectByPrimaryKey(departmentid);
		return department;
	}
	
	public List<Department> getAll() {
		List<Department> all = departmentMapper.selectAll();
		return all;
	}
	
	public List<DepartmentVo> query(DepartmentQuery departmentQuery) {
		List<DepartmentVo> all = departmentMapper.queryDepartmentVo(departmentQuery.getCompanyid());
		return all;
	}
	
	public JSONObject queryAllByCompany() {
		
		List<Company> companys = companyService.getAll();

		JSONObject ret = new JSONObject(companys.size());
		companys.forEach(company->{
			
			DepartmentQuery departmentQuery = new DepartmentQuery();
			departmentQuery.setCompanyid(company.getId());
			List<DepartmentVo> departments = query(departmentQuery);
			ret.put(company.getId().toString(), departments);
		});
		
		return ret;
	}

	@Transactional
	public void setDepartmentsRatio(@Valid List<SetDepartmentRatioBo> ratios) {
		int totalRatio = 0;
		for(int i=0; i<ratios.size(); i++) {
			totalRatio += ratios.get(i).getRatio();
		}
		if(totalRatio>100) {
			throw new HandleException(ErrorCode.ARG_ERROR, "部门提成之和不能超过100");
		}
		ratios.forEach(ratio->{
			Department department = orikaMapper.map(ratio, Department.class);
			departmentMapper.updateByPrimaryKeySelective(department);
			
		});
		
		
	}
}
