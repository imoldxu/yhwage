package com.x.yh.config;

import org.apache.shiro.authc.AuthenticationToken;

public class WeiXinToken implements AuthenticationToken{

	/**
	 * 
	 */
	private static final long serialVersionUID = -7201330939078675492L;
	
	private String wxCode;
	
	public WeiXinToken(String wxCode) {
		this.wxCode = wxCode;
	}
	
	
	@Override
	public Object getPrincipal() {
		return wxCode;
	}

	@Override
	public Object getCredentials() {
		return wxCode;
	}

}
