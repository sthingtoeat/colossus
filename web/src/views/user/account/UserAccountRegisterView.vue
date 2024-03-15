<template>
    <content-field>
        <div class="row justify-content-md-center">
            <div class="col-3">
                <form @submit.prevent="register">
                    <div class="mb-3">
                        <label for="username" class="form-label">用户名</label>
                        <input v-model="username" type="text" class="form-control" id="username" placeholder="输入用户名..">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">密码</label>
                        <input v-model="password" type="password" class="form-control" id="password" placeholder="输入密码..">
                    </div>
                    <div class="mb-3">
                        <label for="confirmedPassword" class="form-label">确认密码</label>
                        <input v-model="confirmedPassword" type="password" class="form-control" id="confirmedPassword" placeholder="再次输入密码..">
                    </div>
                    <div class="error_message">{{ error_message }}</div>
                    <button type="submit" class="btn btn-success">提交</button>
                </form>
            </div>
        </div>
    </content-field>

</template>

<script>//下面这个import 如果导入的东西里面是(导入的东西内部) export default则需要加上{}里面的名不能改
        //如果没有default则不需要，可以写上任意名
import ContentField from '../../../components/ContentField.vue'
import { ref } from 'vue'
import router from '../../../router/index'
import $ from 'jquery'

export default{
    components:{
        ContentField
    },
    setup(){
        let username = ref('');
        let password = ref('');
        let confirmedPassword = ref('');
        let error_message = ref('');

        const register = () => {
            $.ajax({
                url:"http://localhost:3000/user/account/register/",
                type:"post",
                data:{
                    username:username.value,
                    password:password.value,
                    confirmedPassword:confirmedPassword.value,

                },
                
                success(resp) {
                    if(resp.error_message === "success"){
                        router.push({name:"user_account_login"});
                    }else{
                        error_message.value = resp.error_message;
                    }
                },
            });
        }

        return {
            username,
            password,
            confirmedPassword,
            error_message,
            register,
        }

    }
}
</script>

<style scoped>
button{
    width:100%;
}

div.error_message{
    color: red;
}
</style>
