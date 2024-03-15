<template>
    <content-field v-if="!$store.state.user.pulling_info">
        <div class="row justify-content-md-center">
            <div class="col-3">
                <form @submit.prevent="login">
                    <div class="mb-3">
                        <label for="username" class="form-label">用户名</label>
                        <input v-model="username" type="text" class="form-control" id="username" placeholder="输入用户名..">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">密码</label>
                        <input v-model="password" type="password" class="form-control" id="password" placeholder="输入密码..">
                    </div>
                    <div class="error_message">{{ error_message }}</div>
                    <button type="submit" class="btn btn-success">提交</button>
                </form>
            </div>
        </div>
    </content-field>
    
</template>

<script>
import ContentField from '../../../components/ContentField.vue'
import { useStore } from 'vuex'
import { ref } from 'vue'
import router from '../../../router/index'

export default{
    components:{
        ContentField
    },
    setup(){
        const store = useStore();
        let username = ref('');
        let password = ref('');
        let error_message = ref('');

        const jwt_token = localStorage.getItem("jwt_token");
        if(jwt_token){      //判断本地localStorage是否存有登录证明
            store.commit("updateToken" , jwt_token);
            store.dispatch("getinfo" , {
                success(){
                    router.push({name: "home"});
                    store.commit("updatePullingInfo" , false);      //数据拉取结束后，再显示登录界面
                },
                error(){                                            //使用mutation里面的函数得用commit,如果是action里面的函数则需要用dispatch
                    store.commit("updatePullingInfo" , false);      //这里不能是store.dispatch()，否则退出登录以后报错(不显示登录界面)
                }                                                   //actions里面的函数只能是异步的(需要先从云端或者后端读取东西再继续执行)
            })
        }else{
            store.commit("updatePullingInfo" , false); 
        }

        const login = () =>{
            error_message.value="";
            store.dispatch("login" , {
                username:username.value,
                password:password.value,
                success(){
                    store.dispatch("getinfo",{
                        success(){
                            router.push({ name : 'home'});
                            console.log(store.state.user);
                        }
                    })
                    
                },
                error(){
                    error_message.value = "用户名或密码错误";
                }
            })
        }

        return {
            username,
            password,
            error_message,
            login,
        }
    }
}
</script>

<style scoped>
button{
    width:100%;
}
div.error_message{
    color:red;
}
</style>
