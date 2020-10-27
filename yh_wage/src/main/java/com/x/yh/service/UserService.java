package com.x.yh.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.x.yh.context.ErrorCode;
import com.x.yh.context.HandleException;
import com.x.yh.context.bo.AddUserBo;
import com.x.yh.entity.Role;
import com.x.yh.entity.User;
import com.x.yh.entity.UserRole;
import com.x.yh.mapper.RoleMapper;
import com.x.yh.mapper.UserMapper;
import com.x.yh.mapper.UserRoleMapper;

import tk.mybatis.mapper.entity.Example;

/**
 * 用户、角色管理
 * @author 老徐
 *
 */
@Service
public class UserService {

	private static final Logger logger = LoggerFactory.getLogger(UserService.class);
	
	@Autowired
	RoleMapper roleMapper;
	@Autowired
	UserMapper userMapper;
	@Autowired
	UserRoleMapper userRoleMapper;

	public User login(String phone, String password) {
		User user = userMapper.selectUserByPhone(phone);
		if(user == null){
			throw new HandleException(ErrorCode.LOGIN_ERROR, "用户不存在");
		}else{
			if(user.getPassword().equals(password)){
				return user;
			}else{
				throw new HandleException(ErrorCode.LOGIN_ERROR, "密码错误");
			}
		}
	}

	@Transactional
	public void register(AddUserBo addUserBo) {
		String phone =addUserBo.getPhone();
		String password = addUserBo.getPassword(); 
		List<Integer> roleIds = addUserBo.getRoleIds();
		String name = addUserBo.getName();
		
		Example ex = new Example(User.class);
		ex.createCriteria().andEqualTo("phone", phone);
		User user = userMapper.selectOneByExample(ex);
		if(user != null){
			throw new HandleException(ErrorCode.NORMAL_ERROR, "用户已存在");
		}else{
			user = new User();
			user.setName(name);
			user.setPhone(phone);
			user.setPassword(password);
			userMapper.insertUseGeneratedKeys(user);
			
			final Integer uid = user.getId();
			
			List<UserRole> userRoles = roleIds.stream().map(roleId->{
				UserRole userRole = new UserRole();
				userRole.setRid(roleId);
				userRole.setUid(uid);
				return userRole;
			}).collect(Collectors.toList());
			
			userRoleMapper.insertList(userRoles);
		}
	}

	@Transactional
	public void updateRole(Integer uid, Set<Role> roles) {
	
		userRoleMapper.deleteAllRoleByUser(uid);
		
		List<UserRole> userRoleList = new ArrayList<UserRole>();
		roles.forEach(role->{
			UserRole userRole = new UserRole();
			userRole.setRid(role.getId());
			userRole.setUid(uid);
			userRoleList.add(userRole);
		});
		
		userRoleMapper.insertList(userRoleList);
	}
	
	@Transactional
	public void addRole(String name) {
		Example ex = new Example(Role.class);
		ex.createCriteria().andEqualTo("name", name);
		Role role = roleMapper.selectOneByExample(ex);
		if(role != null){
			throw new HandleException(ErrorCode.NORMAL_ERROR, "角色已存在");
		}else{
			role = new Role();
			role.setName(name);
			roleMapper.insertUseGeneratedKeys(role);
		}
	}

	public List<Role> listRole() {
		return roleMapper.selectAll();
	}

	@Transactional
	public User updateUser(User user) {
		
		userMapper.updateByPrimaryKey(user);
		
		Set<Role> roles = user.getRoles();
		
		updateRole(user.getId(), roles);
		
		return user;
	}

	public User getUserById(Integer uid) {
		User user = userMapper.selectUserById(uid);
		return user;
	}

	
}
