package com.kob.colossusbackend.service.impl.record;

import com.alibaba.fastjson2.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.kob.colossusbackend.mapper.RecordMapper;
import com.kob.colossusbackend.mapper.UserMapper;
import com.kob.colossusbackend.pojo.Record;
import com.kob.colossusbackend.pojo.User;
import com.kob.colossusbackend.service.record.GetRecordListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
public class GetRecordListServiceImpl implements GetRecordListService {
    @Autowired
    private RecordMapper recordMapper;
    @Autowired
    private UserMapper userMapper;

    @Override
    public JSONObject getList(Integer page) {
        IPage<Record> recordIPage = new Page<>(page , 10);
        QueryWrapper<Record> queryWrapper = new QueryWrapper<>();
        queryWrapper.orderByDesc("id");     //按照id降序排列(可查看所有人的信息),加上.eq(..)可进行限制
        List<Record> records = recordMapper.selectPage(recordIPage , queryWrapper).getRecords();
        JSONObject resp = new JSONObject();
        List<JSONObject> items = new LinkedList<>();        //存放用户头像等信息
        for(Record record : records){
            User userA = userMapper.selectById(record.getAId());
            User userB = userMapper.selectById(record.getBId());
            JSONObject item = new JSONObject();
            item.put("a_photo" , userA.getPhoto());
            item.put("a_username" ,userA.getUsername());
            item.put("b_photo" , userB.getPhoto());
            item.put("b_username" , userB.getUsername());

            String result = "平局";
            if("A".equals(record.getLoser())) result="B胜";
            else if("B".equals(record.getLoser())) result="A胜";
            item.put("result",result);

            item.put("record" , record);
            items.add(item);
        }
        resp.put("records" , items);
        resp.put("records_count" , recordMapper.selectCount(null));//返回符合条件的所有内容，这里表示查询所有

        return resp;
    }
}
