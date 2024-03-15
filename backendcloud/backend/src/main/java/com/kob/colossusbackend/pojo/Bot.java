package com.kob.colossusbackend.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.sf.jsqlparser.expression.DateTimeLiteralExpression;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bot {
    @TableId(type = IdType.AUTO)//id自增
    private Integer id;         //用Integer这个对象类型可以防止mybatis-plus报错,所以不用int
    private Integer userId;     //数据库里面是下划线，但是pojo这里需要用小驼峰方式命名,不过在queryWrapper中的名称仍然为user_id
    private String title;
    private String description;
    private String content;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss" , timezone = "Asia/Shanghai")   //规定一下时间的格式,后面的为时区
    private Date createtime;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss" , timezone = "Asia/Shanghai")
    private Date modifytime;


}
