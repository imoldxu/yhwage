package com.x.yh.service;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.x.yh.context.ErrorCode;
import com.x.yh.context.HandleException;
import com.x.yh.context.bo.CalcYearAwardBo;
import com.x.yh.context.bo.DeleteWageBo;
import com.x.yh.context.bo.DepartmentQuery;
import com.x.yh.context.bo.StaffQuery;
import com.x.yh.context.bo.TaskQuery;
import com.x.yh.context.bo.TeamQuery;
import com.x.yh.context.vo.DepartmentVo;
import com.x.yh.context.vo.StaffVo;
import com.x.yh.context.vo.TaskVo;
import com.x.yh.context.vo.TeamVo;
import com.x.yh.context.vo.TeamWage;
import com.x.yh.context.vo.YearAwardVo;
import com.x.yh.entity.ClassOfPosition;
import com.x.yh.entity.Company;
import com.x.yh.entity.Wage;
import com.x.yh.mapper.WageMapper;

import ma.glasnost.orika.MapperFacade;
import tk.mybatis.mapper.entity.Example;

@Service
public class WageService {

	@Autowired
	StaffService staffService;
	@Autowired
	CompanyService companyService;
	@Autowired
	DepartmentService departmentService;
	@Autowired
	TeamService teamService;
	@Autowired
	TaskService taskService;
	@Autowired
	WageMapper wageMapper;
	@Autowired
	MapperFacade orikaMapper;
	
	@Transactional
	public void calcWage(Integer companyid, String month) {

		Company company = companyService.getCompanyById(companyid);
		
		DepartmentQuery departmentQuery = new DepartmentQuery();
		departmentQuery.setCompanyid(companyid);
		List<DepartmentVo> departments = departmentService.query(departmentQuery); 

		int companyProfit = 0;
		int companyTourists = 0;
		int companyOthercoast = 0;
		
		for(int i=0; i<departments.size(); i++) {

			DepartmentVo department = departments.get(i);
			
			TeamQuery teamQuery = new TeamQuery();
			teamQuery.setDepartmentid(department.getId());
			List<TeamVo> teams = teamService.query(teamQuery);
	
			int departmentProfit = 0;
			int departmentTourists = 0;
			int departmentOtherCost = 0;
			
			for(int j=0;j<teams.size();j++) {
				TeamVo team = teams.get(j);
				//按团队计算薪资
				TeamWage teamWage = calcTeamWage(team.getId(), month, company, department);
				if(i==0) {
					companyProfit += teamWage.getProfit();
					companyTourists += teamWage.getTourist();
					companyOthercoast += teamWage.getOthercost();
				}else {
					departmentProfit += teamWage.getProfit();
					departmentTourists += teamWage.getTourist();
					departmentOtherCost += teamWage.getOthercost();
				}
			}
			if(i!=0 && departmentProfit != companyProfit) {
				throw new HandleException(ErrorCode.NORMAL_ERROR, "部门间的利润完成不一致");
			}
			if(i!=0 && departmentTourists != companyTourists) {
				throw new HandleException(ErrorCode.NORMAL_ERROR, "部门间的流量完成不一致");
			}
			if(i!=0 && departmentOtherCost != companyOthercoast) {
				throw new HandleException(ErrorCode.NORMAL_ERROR, "部门间的其他支出完成不一致");
			}
		}
		
	}
	
	//计算团队的月薪
	public TeamWage calcTeamWage(Integer teamId, String month, Company company, DepartmentVo department){
	
		TeamWage teamWage = new TeamWage();
		
		List<Wage> ret = new ArrayList<Wage>();
		
		//先获取团队人员
		StaffQuery teamQuery = new StaffQuery();
		teamQuery.setTeamid(teamId);
		List<StaffVo> teamStaff = staffService.query(teamQuery);
		
		//计算总的提成值=所有团队人员的提成值的综合
		double totalMonthRatio = 0.0d;
		double totalYearRatio = 0.0d;
		for(int i=0;i<teamStaff.size();i++) {
			StaffVo staff = teamStaff.get(i);
			ClassOfPosition cop = staff.getCop();
			totalMonthRatio += cop.getMonthratio();
			totalYearRatio += cop.getYearratio();
		}

		//获取团队的绩效
		TaskQuery taskQuery = new TaskQuery();
		taskQuery.setTeamid(teamId);
		taskQuery.setMonth(month);
		TaskVo task = taskService.selectTeamMonthTask(taskQuery);
		if(task==null) {
			throw new HandleException(ErrorCode.ARG_ERROR,"没有匹配的绩效");
		}
		if(task.getActualprofit() == null) {
			throw new HandleException(ErrorCode.ARG_ERROR,"还没有确认绩效");
		}
		
		//获取公司月奖励配置
		double companyMonthRatio = company.getMonthratio();
		//或去人头费
		Integer headerFee = company.getHeaderfee();
		
		//计算绩效完成比例
		double profitPre = 0.0d;
		if(task.getActualprofit()>=task.getProfit()) {
			profitPre = 1.0d;
		} else if(task.getActualprofit() <= 0) {//比要求的利润少，实际利润为负，则不考虑有利润分值
			profitPre = 0d;
		} else {
			profitPre = ((double)task.getActualprofit())/task.getProfit();
		}
		double touristsPre = 0.0d;
		if(task.getActualtourists()>=task.getTourists()) {
			touristsPre = 1.0d;
		}else {
			touristsPre = ((double)task.getActualtourists())/task.getTourists();
		}
		double scorePre = 0.0d;
		if(task.getActualscore()>=5) {
			scorePre = 1.0d;
		}else {
			scorePre = task.getActualscore()/5;
		}
		double compPre = (profitPre*company.getProfitweight() + touristsPre*company.getTouristsweight()+ scorePre*company.getScoreweight())/100;
		
		
		//计算当月总奖励=团队利润*公司月提成比例
		double totalAward = companyMonthRatio*department.getRatio()*task.getActualprofit()/10000;
		double totalHeaderFee = department.getRatio()*headerFee*task.getTourists()/100;
		int monthcost =0;//计算月支出=基本工资+浮动工资+奖金
		for(int i=0;i<teamStaff.size();i++) {
			StaffVo staff = teamStaff.get(i);
			ClassOfPosition cop = staff.getCop();
			//计算个人在团队中的提成占比
			double actualRatio = cop.getMonthratio()/totalMonthRatio;
			
			Wage wage = new Wage();
			wage.setBasicwage(cop.getBasicwage());
			wage.setFloatwage((int)Math.round(cop.getFloatwage()*compPre));	
			//计算提成=总提成*个人在团队中的提成占比,比较是人头费高还是提成高，哪个高发哪个
			if(totalAward>totalHeaderFee) {
				wage.setAward((int) Math.round(totalAward*actualRatio));
			}else {
				wage.setAward((int) Math.round(totalHeaderFee*actualRatio));
			}
			wage.setProfit((int) Math.round(task.getActualprofit()*department.getRatio()*actualRatio/100));
			wage.setStaffName(staff.getName());
			wage.setCompanyid(staff.getCompanyid());
			wage.setCompanyName(staff.getCompanyName());
			wage.setDepartmentid(department.getId());
			wage.setDepartmentName(department.getName());
			wage.setCopid(staff.getCop().getId());
			wage.setCopName(staff.getCop().getName());
			wage.setStaffid(staff.getId());
			wage.setTeamid(staff.getTeamid());
			wage.setTeamName(staff.getTeamName());
			wage.setMonth(month);
			wage.setYearRatio(cop.getYearratio());
			//累计团队支出
			monthcost += wage.getBasicwage()+wage.getFloatwage()+wage.getAward();
			ret.add(wage);
		}
		
		//年度奖励= （月利润-薪资支出-额外支出）*公司配置的奖励比例*部门占比
		double yearTotalAward = (task.getActualprofit()-task.getOthercost()
				-monthcost)*company.getYearratio()*department.getRatio()/10000;
		
		for(int i=0;i<ret.size();i++) {
			Wage wage = ret.get(i); 
			//计算个人在团队奖励中的占比
			double actualRatio = wage.getYearRatio()/totalYearRatio;
			wage.setYearaward((int) Math.round(yearTotalAward*actualRatio));
		}
		if(!ret.isEmpty()) {
			try {
				wageMapper.insertList(ret);
			}catch (Exception e) {
				throw new HandleException(ErrorCode.NORMAL_ERROR, "生成月薪失败，请勿重复生成");
			}
		}
		//teamWage.setTotalCost(monthcost);
		teamWage.setProfit(task.getActualprofit());
		teamWage.setTourist(task.getActualtourists());
		teamWage.setOthercost(task.getOthercost());
		//teamWage.setStaffWage(ret);
		return teamWage;
	}
	
//	public void calcManagerWage(Integer companyid, String month, int teamcost, Company company){
//		
//		List<Wage> ret = new ArrayList<Wage>();
//		
//		//获取公司的管理层
//		List<StaffVo> managers = staffService.queryManager(companyid);
//		
//		//计算总的提成值
//		double totalMonthRatio = 0.0d;
//		double totalYearRatio = 0.0d;
//		for(int i=0;i<managers.size();i++) {
//			StaffVo staff = managers.get(i);
//			ClassOfPosition cop = staff.getCop();
//			totalMonthRatio += cop.getMonthratio();
//			totalYearRatio += cop.getYearratio();
//		}
//		
//		//统计各个团队的任务完成情况
//		TaskQuery taskQuery = new TaskQuery();
//		taskQuery.setCompanyid(companyid);
//		taskQuery.setMonth(month);
//		TaskVo task = taskService.selectCompanyMonthTask(taskQuery);
//		if(task==null) {
//			throw new HandleException(ErrorCode.ARG_ERROR,"没有匹配的绩效");
//		}
//		
//		//获取管理者的月提成总额=总利润*提成比例
//		double configMangaerMonthRatio = company.getManagermonthratio();
//		double totalAward = task.getActualprofit()*configMangaerMonthRatio/100;
//		
//		//计算绩效完成情况（三个维度按权重来考核）
//		double profitPre = 0.0d;
//		if(task.getActualprofit()>=task.getProfit()) {
//			profitPre = 1.0d;
//		}else {
//			profitPre = ((double)task.getActualprofit())/task.getProfit();
//		}
//		double touristsPre = 0.0d;
//		if(task.getActualtourists()>=task.getTourists()) {
//			touristsPre = 1.0d;
//		}else {
//			touristsPre = ((double)task.getActualtourists()/task.getTourists());
//		}
//		double scorePre = 0.0d;
//		if(task.getActualscore()>=5) {
//			scorePre = 1.0d;
//		}else {
//			scorePre = task.getActualscore()/5;
//		}
//		double compPre = (profitPre*company.getProfitweight() + touristsPre*company.getTouristsweight()+ scorePre*company.getScoreweight())/100;
//		
//		//统计月支出总额
//		int monthcost = 0;
//		for(int i=0;i<managers.size();i++) {
//			//计算个人在团队中的提成占比
//			StaffVo staff = managers.get(i);
//			ClassOfPosition cop = staff.getCop();
//			double actualRatio = cop.getMonthratio()/totalMonthRatio;
//			
//			Wage wage = new Wage();
//			wage.setBasicwage(cop.getBasicwage());
//			wage.setYearRatio(cop.getYearratio());
//			wage.setAward((int) Math.round(totalAward*actualRatio));
//			wage.setStaffName(staff.getName());
//			wage.setCompanyid(staff.getCompanyid());
//			wage.setCompanyName(staff.getCompanyName());
//			wage.setStaffid(staff.getId());
//			wage.setCopid(staff.getCop().getId());
//			wage.setCopName(staff.getCop().getName());
//			wage.setTeamid(staff.getTeamid());
//			wage.setTeamName(staff.getTeamName());
//			wage.setFloatwage((int)Math.round(cop.getFloatwage()*compPre));
//			wage.setMonth(month);
//			
//			monthcost += wage.getBasicwage()+wage.getFloatwage()+wage.getAward();
//			
//			ret.add(wage);
//		}
//	
//		//年度奖励= （月利润-薪资支出-额外支出）*公司配置的奖励比例
//		//TODO:应该减去团队所有的薪资支出
//		//Wage teamWage = wageMapper.sumMonthCostByCompany(companyid, month);
//		//int teamcost = teamWage.getBasicwage()+teamWage.getFloatwage()+teamWage.getAward();
//		double yearTotalAward = (task.getActualprofit()-task.getOthercost()
//			-monthcost-teamcost)*company.getTeamyearratio()/100;
//		
//		for(int i=0;i<ret.size();i++) {
//			Wage wage = ret.get(i); 
//			//计算个人在管理层中奖励中的占比
//			double actualRatio = wage.getYearRatio()/totalYearRatio;
//			wage.setYearaward((int) Math.round(yearTotalAward*actualRatio));
//	
//		}
//		//插入管理层wage
//		wageMapper.insertList(ret);
//	}

	public List<YearAwardVo> calcYearAward(@Valid CalcYearAwardBo calcYearAwardBo) {
		
		List<YearAwardVo> ret = null; 
		ret = wageMapper.sumYearAward(calcYearAwardBo.getName(), calcYearAwardBo.getYear()+"%");
			
		return ret;
	}

	public List<Wage> queryDepartmentWage(Integer departmentid, String month) {
		Example ex = new Example(Wage.class);
		
		ex.createCriteria().andEqualTo("departmentid", departmentid).andEqualTo("month", month);
		
		List<Wage> wages = wageMapper.selectByExample(ex);
		
		return wages;
	}
	
	public List<Wage> queryTeamWage(Integer teamid, String month) {
		Example ex = new Example(Wage.class);
		
		ex.createCriteria().andEqualTo("teamid", teamid).andEqualTo("month", month);
		
		List<Wage> wages = wageMapper.selectByExample(ex);
		
		return wages;
	}
	
	public List<Wage> queryCompanyWage(Integer companyid, String month){
		Example ex = new Example(Wage.class);
		ex.createCriteria().andEqualTo("companyid", companyid).andEqualTo("month", month);
		List<Wage> wages = wageMapper.selectByExample(ex);
		return wages;
	}

	public void deleteCompanyWage(@Valid DeleteWageBo deleteWageBo) {
		Example example = new Example(Wage.class);
		example.createCriteria().andEqualTo("companyid", deleteWageBo.getCompanyid()).andEqualTo("month", deleteWageBo.getMonth());
		wageMapper.deleteByExample(example);
		return;
	}
}
