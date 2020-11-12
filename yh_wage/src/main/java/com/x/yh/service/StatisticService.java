package com.x.yh.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.x.yh.context.vo.StaffStatisticVo;
import com.x.yh.mapper.WageMapper;

@Service
public class StatisticService {

	@Autowired
	WageMapper wageMapper;

	public List<StaffStatisticVo> staffStatistic(String year) {
		return wageMapper.statisticStaff(year);
	}
	
}
