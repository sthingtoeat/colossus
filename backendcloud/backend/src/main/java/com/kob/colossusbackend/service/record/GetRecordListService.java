package com.kob.colossusbackend.service.record;

import com.alibaba.fastjson2.JSONObject;

public interface GetRecordListService {
    JSONObject getList(Integer page);
}
