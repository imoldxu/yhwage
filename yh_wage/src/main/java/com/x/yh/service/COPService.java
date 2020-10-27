package com.x.yh.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.x.yh.context.bo.AddClassOfPositionBo;
import com.x.yh.entity.ClassOfPosition;
import com.x.yh.mapper.COPMapper;

import ma.glasnost.orika.MapperFacade;

@Service
public class COPService {

	@Autowired
	COPMapper copMapper;
	@Autowired
	MapperFacade orikaMapper;
	
	
	public List<ClassOfPosition> getAll() {
		List<ClassOfPosition> all = copMapper.selectAll();
		return all;
	}

	public ClassOfPosition add(AddClassOfPositionBo addClassOfPosition) {
		ClassOfPosition record = orikaMapper.map(addClassOfPosition, ClassOfPosition.class);	
		copMapper.insertUseGeneratedKeys(record);
		return record;
	}
	
	public ClassOfPosition modify(ClassOfPosition cop) {
		copMapper.updateByPrimaryKey(cop);
		return cop;		
	}
	
}
