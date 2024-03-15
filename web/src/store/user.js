import $ from 'jquery'

export default{
    state: {
        id:"",
        username:"",
        photo:"",
        token:"",
        is_login:false,
        pulling_info:true,  //是否正在获取信息，处理刷新以后页面闪过登录界面，以及右上角
    },
    getters: {
    },
    mutations: {//mutions里面的函数只能是同步的(不用去云端、后端读取数据)
        updateUser(state,user){
            state.id = user.id;
            state.username = user.username;
            state.photo = user.photo;
            state.is_login = user.is_login;
        },
        updateToken(state , token){
            state.token = token;
        },

        logout(state){
            state.id = "";
            state.username = "";
            state.photo = "";
            state.token = "";
            state.is_login = false;
        },
        updatePullingInfo(state , pulling_info){
            state.pulling_info = pulling_info;
        }
    },
    actions: {//actions里面的函数只能是异步的(需要先从云端或者后端读取东西再继续执行)
        login(context , data){    //登录  
            $.ajax({
                url:"http://localhost:3000/user/account/token/",
                type:"post",
                data:{
                  username:data.username,
                  password:data.password,
                },
                success(resp){
                    if(resp.error_message === "success"){   //登录成功，则发放登录证明
                        localStorage.setItem("jwt_token" , resp.token);
                        context.commit("updateToken" , resp.token);  //error_message,resp.token都是后端自己里面定义的
                        data.success(resp);
                    }else {   //具体看后端里面的service/impl/user/account/LoginServiceImpl
                        data.error(resp);
                    }
                },
                error(resp){
                    data.error(resp);
                }
              });
        },
        getinfo(context , data){
            $.ajax({
                url:"http://localhost:3000/user/account/info/",
                type:"get",
                headers:{       //下面这个Bearer后面必须多一个空格
                  Authorization:"Bearer " + context.state.token,
                },
                success(resp){
                    if(resp.error_message === "success"){
                        context.commit("updateUser" , {
                            ...resp,    //把resp里面的k-v对解析出来，放到当前对象
                            is_login: true,
                        });
                        data.success(resp); 
                    }else{
                        data.error(resp);
                    }
                    
                },
                error(resp){
                  data.error(resp);
                }
              });
        },
        logout(context){
            localStorage.removeItem("jwt_token");   //移除本地登录证明
            context.commit("logout");
        }
    },
    modules: {
    }
}