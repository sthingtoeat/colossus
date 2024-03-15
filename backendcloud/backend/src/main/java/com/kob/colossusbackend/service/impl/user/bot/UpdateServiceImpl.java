package com.kob.colossusbackend.service.impl.user.bot;

import com.kob.colossusbackend.mapper.BotMapper;
import com.kob.colossusbackend.pojo.Bot;
import com.kob.colossusbackend.pojo.User;
import com.kob.colossusbackend.service.impl.utils.UserDetailsImpl;
import com.kob.colossusbackend.service.user.bot.UpdateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class UpdateServiceImpl implements UpdateService {

    @Autowired
    private BotMapper botMapper;

    @Override
    public Map<String, String> update(Map<String, String> data) {
        UsernamePasswordAuthenticationToken authenticationToken =
                (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl loginUser = (UserDetailsImpl) authenticationToken.getPrincipal();
        User user = loginUser.getUser();

        int bot_id = Integer.parseInt(data.get("bot_id"));

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


        Bot bot = botMapper.selectById(bot_id);


        if(bot == null){
            map.put("error_message" , "Bot不存在或者已被删除");
            return map;
        }

        if(!bot.getUserId().equals(user.getId())){
            map.put("error_message" , "你没有修改Bot的权利");
            return map;
        }

        Bot new_bot = new Bot(
                bot.getId(),
                user.getId(),
                title,
                description,
                content,
                bot.getCreatetime(),
                new Date()      //修改时间
        );

        botMapper.updateById(new_bot);

        map.put("error_message" , "success");

        return map;
    }
}
