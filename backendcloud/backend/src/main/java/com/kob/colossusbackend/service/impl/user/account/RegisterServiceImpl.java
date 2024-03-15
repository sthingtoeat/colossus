package com.kob.colossusbackend.service.impl.user.account;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.kob.colossusbackend.mapper.UserMapper;
import com.kob.colossusbackend.pojo.User;
import com.kob.colossusbackend.service.user.account.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RegisterServiceImpl implements RegisterService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Map<String, String> register(String username, String password, String confirmedPassword) {
        Map<String , String> map = new HashMap<>();
        if(username == null){
            map.put("error_message","用户名不能为空");
            return map;
        }
        if(password == null || confirmedPassword == null){
            map.put("error_message" , "密码不能为空");
            return map;
        }
        username = username.trim();     //删除首位的空白字符（包括回车等）
        if(username.length() == 0){
            map.put("error_message" , "用户名长度不能为0");
            return map;
        }

        if(password.length() == 0 || confirmedPassword.length() == 0){
            map.put("error_message" , "密码长度不能为0");
            return map;
        }

        if(username.length() > 100){
            map.put("error_message" , "用户名长度不能大于100");
            return map;
        }

        if(password.length() > 100 || confirmedPassword.length() > 100){
            map.put("error_message" , "密码长度不能超过100");
            return map;
        }

        if(!password.equals(confirmedPassword)){
            map.put("error_message" , "两次密码输入不一致");
            return map;
        }

        QueryWrapper<User> queryWrapper = new QueryWrapper<User>();
        queryWrapper.eq("username" ,username);
        List<User> users = userMapper.selectList(queryWrapper);
        if(!users.isEmpty()){
            map.put("error_message" , "用户已存在");
            return  map;
        }

        //都没问题以后再进行注册
        String encodedPassword = passwordEncoder.encode(password);
        String photo = "https://cdn.acwing.com/media/user/profile/photo/150655_lg_8d32256772.jpg";
        User user = new User(null , username ,encodedPassword ,photo , 1500); //id自增所以为null
        userMapper.insert(user);

        map.put("error_message" , "success");
        return map;
    }
}
