package com.x.yh.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.x.commons.mybatis.BaseMapper;
import com.x.yh.context.vo.DepartmentVo;
import com.x.yh.entity.Department;

public interface DepartmentMapper extends BaseMapper<Department> {

	List<DepartmentVo> queryDepartmentVo(@Param(value = "companyid")Integer companyid);

}
