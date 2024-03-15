package com.kob.colossusbackend.service.impl.user.account;

import com.kob.colossusbackend.pojo.User;
import com.kob.colossusbackend.service.impl.utils.UserDetailsImpl;
import com.kob.colossusbackend.service.user.account.LoginService;
import com.kob.colossusbackend.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Override//alt+insert
    public Map<String, String> getToken(String username, String password) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(username , password);//封装用户名和密码，对明文进行加密

        Authentication authenticate = authenticationManager.authenticate(authenticationToken);//验证能否登录，如果失败，会自动处理

        //上面如果没出异常（登录成功）,则执行下面
        UserDetailsImpl loginUser = (UserDetailsImpl) authenticate.getPrincipal();
        User user = loginUser.getUser();//取出用户

        String jwt = JwtUtil.createJWT(user.getId().toString());//传入一个用户id

        Map<String ,String> map = new HashMap<>();
        map.put("error_message" , "success");   //前端接收k v键值对
        map.put("token",jwt);

        return map;
    }
}
