package com.kob.colossusbackend.service.user.account;

import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

public interface InfoService {
    public Map<String , String> getinfo();
}
