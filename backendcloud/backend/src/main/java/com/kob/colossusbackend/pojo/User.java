package com.kob.colossusbackend.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor  //无参构造函数
@AllArgsConstructor //有参构造函数
public class User { //通过lombok可以在运行以后自动生成get set方法，还有toString方法等其他的

    @TableId(type = IdType.AUTO)//id自增
    private Integer id;         //可以去taget文件里面看，不用再手写了
    private String username;
    private String password;
    private String photo;
    private Integer rating;
}
