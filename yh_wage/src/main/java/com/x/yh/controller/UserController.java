package com.x.yh.controller;

import java.util.List;

import javax.validation.Valid;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.x.yh.context.ErrorCode;
import com.x.yh.context.HandleException;
import com.x.yh.context.bo.AddUserBo;
import com.x.yh.context.bo.LoginBo;
import com.x.yh.entity.Role;
import com.x.yh.entity.User;
import com.x.yh.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/user")
@Api("用户接口")
public class UserController {

	@Autowired
	UserService userService;
	
	@RequiresRoles({"manager"})
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(method = RequestMethod.POST)
	@ApiOperation(value = "用户注册账户", notes = "用户注册接口")
	public void register(@ApiParam(name="addUserBo",value="添加用户信息") @Valid @RequestBody AddUserBo addUserBo) {
		
		userService.register(addUserBo);	
		return;
	}
	
	@RequiresRoles({"manager"})
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(method = RequestMethod.PUT)
	@ApiOperation(value = "更新用户信息", notes = "更新用户信息")
	public User updateUser(@ApiParam(name="user",value="用户json数据") @RequestBody User user) {
		
		user = userService.updateUser(user);
		return user;	
	}
	
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(method = RequestMethod.GET)
	@ApiOperation(value = "用户信息", notes = "用户信息")
	public User get() {
		Subject subject = SecurityUtils.getSubject();
		User user = (User) subject.getPrincipal();
		if(user == null) {
			throw new HandleException(ErrorCode.UNLOGIN, "还未登陆");
		}
		return user;
	}
	
	@RequiresRoles({"manager"})
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(value = "/role", method = RequestMethod.POST)
	@ApiOperation(value = "添加角色", notes = "添加角色")
	public void addRole(@ApiParam(name="name",value="角色名称") @RequestParam(name="name") String name) {
		userService.addRole(name);
		return;
	}
	
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(value = "/role", method = RequestMethod.GET)
	@ApiOperation(value = "查询角色", notes = "查询角色")
	public List<Role> listRole() {
		List<Role> roleList = userService.listRole();
		return roleList;
	}
	
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(value = "/session", method = RequestMethod.POST)
	@ApiOperation(value = "用户登陆", notes = "用户登陆接口")
	public User login(@ApiParam(name="loginBo",value="登陆信息") @Valid @RequestBody LoginBo loginBo) {
		Subject subject = SecurityUtils.getSubject();
		AuthenticationToken token = new UsernamePasswordToken(loginBo.getPhone(), loginBo.getPassword());
		subject.login(token);
		User user = (User) subject.getPrincipal();
		return user;
	}
	
	@CrossOrigin(allowedHeaders = "*", allowCredentials = "true")
	@RequestMapping(value = "/session", method = RequestMethod.DELETE)
	@ApiOperation(value = "用户登出", notes = "用户登出接口")
	public void logout() {
		Subject subject = SecurityUtils.getSubject();
		subject.logout();
	}
}
