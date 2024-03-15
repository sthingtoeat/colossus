package com.kob.colossusbackend.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.kob.colossusbackend.pojo.Record;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RecordMapper extends BaseMapper<Record> {
}
