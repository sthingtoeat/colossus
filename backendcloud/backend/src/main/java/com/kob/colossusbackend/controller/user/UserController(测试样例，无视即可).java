package com.kob.colossusbackend.controller.user;//package com.kob.colossusbackend.controller.user;
//
//import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
//import com.kob.colossusbackend.mapper.UserMapper;
//import com.kob.colossusbackend.pojo.User;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.List;
//
//@RestController
//public class UserController {
//
//    @Autowired  //用到数据库里面的mapper,就是平常写的Dao层，只不过这里的接口，通过mybitsplus写好了里面的功能
//    UserMapper userMapper;
//
//    @GetMapping("/user/all/")
//    public List<User> getAll(){
//
//        return userMapper.selectList(null);
//    }
//
//    @GetMapping("/user/{userId}/")      //地址传一个参数
//    public User getuser(@PathVariable int userId){  //地址接收一个参数（查）
//        QueryWrapper<User> queryWrapper = new QueryWrapper<>();     //条件构造器，下面写按照条件查询
//
//        queryWrapper.eq("id" , userId);
//
//        return userMapper.selectOne(queryWrapper);
//
//
//
//        //queryWrapper.eq("id" , userId);       字符串比较相等，相等的取出来
//        //queryWrapper.ge("id" , 2).le("id" , 3);     //ge大于等于2，gt大于2 , le小于等于3 ,lt小于3
//                                                                            //这里可以一直点下去加条件
//        //return  userMapper.selectList(queryWrapper);//返回的是一个List<User>属性
//    }
//
//    @GetMapping("/user/add/{userId}/{username}/{password}")//地址传参实现插入数据（增）
//    public String addUser(
//            @PathVariable int userId,
//            @PathVariable String username,
//            @PathVariable String password){
//        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//        String encodePassword = passwordEncoder.encode(password);
//
//        User user= new User(userId , username,encodePassword);
//        userMapper.insert(user);
//        return "success";
//    }
//
//    @GetMapping("/user/delete/{userId}")            //删除
//    public String deleteUser(@PathVariable int userId){
//        userMapper.deleteById(userId);
//        return "delete success";
//    }
//}
