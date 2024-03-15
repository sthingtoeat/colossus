package com.kob.colossusbackend.service.impl.user.bot;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.kob.colossusbackend.mapper.BotMapper;
import com.kob.colossusbackend.pojo.Bot;
import com.kob.colossusbackend.pojo.User;
import com.kob.colossusbackend.service.impl.utils.UserDetailsImpl;
import com.kob.colossusbackend.service.user.bot.AddService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class AddServiceImpl implements AddService {

    @Autowired                          //注入
    private BotMapper botMapper;        //这类里面有sql代码，封装好的方法


    @Override
    public Map<String, String> add(Map<String, String> data) {
        UsernamePasswordAuthenticationToken authenticationToken =
                (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl loginUser = (UserDetailsImpl) authenticationToken.getPrincipal();
        User user = loginUser.getUser();

        String title = data.get("title");
        String description = data.get("description");
        String content = data.get("content");

        Map<String , String> map = new HashMap<>();

        if(title == null || title.length() == 0){
            map.put("error_message" , "标题不能为空");
            return map;
        }
        if(title.length() > 100){
            map.put("error_message" , "标题名字过长");
            return map;
        }

        if(description == null || description.length() == 0){
            description = "这个用户很懒，啥都没写";

        }

        if(description.length() > 300){
            map.put("error_message", "描述过长,长度不能超过300");
            return map;
        }

        if(content == null || content.length() == 0){
            map.put("error_message" , "代码不能为空");
            return map;
        }

        if(content.length() > 10000){
            map.put("error_message" , "代码长度不能超过10000");
        }

        QueryWrapper<Bot> queryWrapper = new QueryWrapper<>();
        if(botMapper.selectCount(queryWrapper) >= 10){
            map.put("error_message" , "你最多只能创建10个Bot");
            return map;
        }

        Date now = new Date();
        Bot bot = new Bot(null , user.getId(),title,description , content ,now , now);

        botMapper.insert(bot);
        map.put("error_message" , "success");

        return map;
    }
}
