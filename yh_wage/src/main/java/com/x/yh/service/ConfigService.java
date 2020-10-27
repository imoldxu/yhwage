package com.x.yh.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.x.yh.context.ErrorCode;
import com.x.yh.context.HandleException;
import com.x.yh.entity.Config;
import com.x.yh.mapper.ConfigMapper;

import tk.mybatis.mapper.entity.Example;

@Service
public class ConfigService {

	@Autowired
	ConfigMapper configMapper;
	
	public Config getConfig() {
		Example example = new Example(Config.class);
		//configMapper.selectByExample(example);
		Config config = configMapper.selectOneByExample(example);
		return config;
	}
	
	public Config modifyConfig(Config config) {
		config.setId(1);
		configMapper.updateByPrimaryKey(config);
		return config;
	}
	
	public Config newConfig(Config config) {
		int totalWeight = (config.getProfitweight() + config.getScoreweight() + config.getTouristsweight());
		if (totalWeight != 100) {
			throw new HandleException(ErrorCode.ARG_ERROR, "绩效权重相加需要等于100%");
		}
				
		Config c = getConfig();
		if(c==null) {
			configMapper.insertUseGeneratedKeys(config);
		}else {
			modifyConfig(config);
		}
		return config;
	}
	
}
