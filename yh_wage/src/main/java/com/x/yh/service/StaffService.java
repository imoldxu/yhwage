package com.x.yh.service;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.x.yh.context.ErrorCode;
import com.x.yh.context.HandleException;
import com.x.yh.context.bo.AddStaffBo;
import com.x.yh.context.bo.StaffQuery;
import com.x.yh.context.vo.StaffVo;
import com.x.yh.entity.Staff;
import com.x.yh.mapper.StaffMapper;

import ma.glasnost.orika.MapperFacade;


@Service
public class StaffService {

	@Autowired
	StaffMapper staffMapper;
	@Autowired
	COPService copService;
	@Autowired
	MapperFacade orikaMapper;
	
	public Staff add(Staff staff) {
		staffMapper.insertUseGeneratedKeys(staff);
		return staff;
	}
	
	public Staff modify(Staff staff) {
		staffMapper.updateByPrimaryKey(staff);
		return staff;
	}

	public Staff add(AddStaffBo addStaffBo) {
		Staff staff = orikaMapper.map(addStaffBo, Staff.class);
		staffMapper.insertUseGeneratedKeys(staff);
		return staff;
	}

	public StaffVo getById(Integer id) {
		StaffVo staffVo = staffMapper.selectStaffVoById(id);
		return staffVo;
	}

	public List<StaffVo> query(@Valid StaffQuery staffQuery) {
		List<StaffVo> list = null;
		Integer teamid = staffQuery.getTeamid();
		Integer companyid = staffQuery.getCompanyid();
		if(teamid!=null) {
			list = staffMapper.queryStaffVoByTeam(teamid);
		}else if (companyid != null) {
			list = staffMapper.queryStaffVoByCompany(companyid);
		}else {
			throw new HandleException(ErrorCode.ARG_ERROR, "必须指定公司或团队");
		}

		return list;
	}
	
	public List<StaffVo> queryManager(Integer companyid) {
		List<StaffVo> list = null;
		list = staffMapper.queryManagerStaffVoByCompany(companyid);
		
		return list;
	}

	public void delete(Integer id) {
		staffMapper.deleteByPrimaryKey(id);
	}

	
}
