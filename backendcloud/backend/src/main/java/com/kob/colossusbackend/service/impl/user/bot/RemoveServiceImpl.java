package com.kob.colossusbackend.service.impl.user.bot;

import com.kob.colossusbackend.mapper.BotMapper;
import com.kob.colossusbackend.pojo.Bot;
import com.kob.colossusbackend.pojo.User;
import com.kob.colossusbackend.service.impl.utils.UserDetailsImpl;
import com.kob.colossusbackend.service.user.bot.RemoveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class RemoveServiceImpl implements RemoveService {

    @Autowired
    private BotMapper botMapper;

    @Override
    public Map<String, String> remove(Map<String, String> data) {
        UsernamePasswordAuthenticationToken authenticationToken =
                (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl loginUser = (UserDetailsImpl) authenticationToken.getPrincipal();
        User user = loginUser.getUser();

        int bot_id = Integer.parseInt(data.get("bot_id"));
        Bot bot = botMapper.selectById(bot_id);//按照id查找一下是否有这一个Bot
        Map<String , String> map = new HashMap<>();

        if(bot == null){
            map.put("error_message" , "Bot不存在或者已被删除");
            return map;
        }

        if(!bot.getUserId().equals(user.getId())){   //判断这个Bot的作者是否和登录的用户一样
            map.put("error_message" , "没有权利删除不属于你的Bot");//不是作者则不能删除
            return map;
        }

        botMapper.deleteById(bot_id);
        map.put("error_message" , "success");

        return map;
    }
}
