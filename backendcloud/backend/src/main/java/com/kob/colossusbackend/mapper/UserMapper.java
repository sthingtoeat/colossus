package com.kob.colossusbackend.mapper;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.kob.colossusbackend.pojo.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper extends BaseMapper<User> {//使用mybitsplus可以不用再写sql语句了

}
