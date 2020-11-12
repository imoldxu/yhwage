package com.x.yh.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.x.yh.context.ErrorCode;
import com.x.yh.context.HandleException;
import com.x.yh.context.bo.AddCompanyTaskBo;
import com.x.yh.context.bo.CompanyTaskQuery;
import com.x.yh.context.vo.CompanyTaskVo;
import com.x.yh.entity.CompanyTask;
import com.x.yh.mapper.CompanyTaskMapper;

import ma.glasnost.orika.MapperFacade;
import tk.mybatis.mapper.entity.Example;

@Service
public class CompanyTaskService {

	@Autowired
	CompanyTaskMapper taskMapper;
	@Autowired
	MapperFacade orikaMapper;
	
	public CompanyTask add(AddCompanyTaskBo addTaskBo) {
		CompanyTask task = orikaMapper.map(addTaskBo, CompanyTask.class);
		try {
			taskMapper.insertUseGeneratedKeys(task);
		}catch (Exception e) {
			throw new HandleException(ErrorCode.NORMAL_ERROR, "提交失败，当月任务可能已存在");
		}
		return task;
	}
	
	public CompanyTask modify(CompanyTask companyTask) {
		taskMapper.updateByPrimaryKeySelective(companyTask);
		return companyTask;
	}
	
	public List<CompanyTaskVo> query(CompanyTaskQuery taskQuery) {
		List<CompanyTaskVo> ret = null;
		//Integer companyid = taskQuery.getCompanyid();
		//String month = taskQuery.getMonth();
		//Example example = new Example(CompanyTask.class);
		//example.createCriteria().andEqualTo("companyid", companyid);
		ret = taskMapper.queryCompanyTaskVo(taskQuery.getCompanyid(), taskQuery.getMonth());
		return ret;
	}
		
	public CompanyTask selectCompanyMonthTask(CompanyTaskQuery taskQuery) {

		Integer companyid = taskQuery.getCompanyid();
		String month = taskQuery.getMonth();
		Example example = new Example(CompanyTask.class);
		example.createCriteria().andEqualTo("companyid", companyid).andEqualTo("month", month);
		
		CompanyTask ret = taskMapper.selectOneByExample(example);
		return ret;
	}
	
}
