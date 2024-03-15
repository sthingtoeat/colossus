<template>
    <div class="container">
        <div class="row">
            <div class="col-3">
                <div class="card" style="margin-top:30px">
                    <div class="card-body">
                        <img :src="$store.state.user.photo" alt="" style="width:100%">
                    </div>
                </div>
            </div>
            <div class="col-9">
                <div class="card" style="margin-top:30px">
                    <div class="card-header">
                        我的Bot
                        <button type="button" class="btn btn-success float-end" data-bs-toggle="modal" href="#add_bot_btn" role="button">
                            创建Bot
                        </button>
                        
                        <div class="modal fade" id="add_bot_btn" aria-hidden="true" >
                            <div class="modal-dialog modal-xl">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalToggleLabel">创建Bot</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="mb-3">
                                            <label for="add_bot_title" class="form-label">名称</label>
                                            <input v-model="botadd.title" type="text" class="form-control" id="add_bot_title" placeholder="为你的Bot进行命名">
                                            </div>
                                        <div class="mb-3">
                                            <label for="add_bot_description" class="form-label">简介</label>
                                            <textarea v-model="botadd.description" class="form-control" id="add_bot_description" rows="3" placeholder="简单描述一下你的Bot"></textarea>
                                        </div>
                                         <div class="mb-3">
                                            <label for="add_bot_code" class="form-label">代码</label>
                                            <!--<textarea v-model="botadd.content" class="form-control" id="add_bot_code" rows="10" placeholder="为你的Bot编写代码"></textarea>-->
                                            <VAceEditor
                                                v-model:value="botadd.content"
                                                @init="editorInit"
                                                lang="c_cpp"
                                                theme="textmate"
                                                style="height: 300px" />
                                            <!--用编辑器替代这里的text-->
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <div class="error_message">{{botadd.error_message}} </div>
                                        <button class="btn btn-primary" @click="add_bot" >创建</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">                    
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>名称</th>
                                    <th>创建系统</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="bot in bots" :key="bot.id">
                                    <td>{{ bot.title }}</td>
                                    <td>{{ bot.createtime }}</td>
                                    <td>
                                        <button type="button" class="btn btn-primary" style="margin-right:10px" data-bs-toggle="modal" :data-bs-target="'#update-bot-modal-' + bot.id">修改</button>
                                        <button type="button" class="btn btn-danger" @click="remove_bot(bot)">删除</button>
                                        <div class="modal fade" :id="'update-bot-modal-' + bot.id" aria-hidden="true" >
                                            <div class="modal-dialog modal-xl">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title">修改Bot</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="mb-3">
                                                            <label for="add_bot_title" class="form-label">名称</label>
                                                            <input v-model="bot.title" type="text" class="form-control" id="add_bot_title" placeholder="为你的Bot进行命名">
                                                            </div>
                                                        <div class="mb-3">
                                                            <label for="add_bot_description" class="form-label">简介</label>
                                                            <textarea v-model="bot.description" class="form-control" id="add_bot_description" rows="3" placeholder="简单描述一下你的Bot"></textarea>
                                                        </div>
                                                        <div class="mb-3">
                                                            <label for="add_bot_code" class="form-label">代码</label>
                                                            <!--<textarea v-model="botadd.content" class="form-control" id="add_bot_code" rows="10" placeholder="为你的Bot编写代码"></textarea>-->
                                                            <VAceEditor
                                                                v-model:value="bot.content"
                                                                @init="editorInit"
                                                                lang="c_cpp"
                                                                theme="textmate"
                                                                style="height: 300px" />
                                                            <!--用编辑器替代这里的text-->
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <div class="error_message">{{bot.error_message}} </div>
                                                        <button class="btn btn-primary" @click="update_bot(bot)" >保存</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { ref ,reactive} from 'vue'
import $ from 'jquery'
import { useStore } from 'vuex'
import { Modal } from 'bootstrap/dist/js/bootstrap'
import { VAceEditor } from 'vue3-ace-editor';
import ace from 'ace-builds';


export default{
    components:{
        VAceEditor,
    },

    setup(){
       
       ace.config.set(//编辑器的配置
            "basePath", 
            "https://cdn.jsdelivr.net/npm/ace-builds@" + require('ace-builds').version + "/src-noconflict/")
       
       const store = useStore();
       let bots = ref([]);

        const botadd = reactive({   //绑定一个对象，可以理解为结构体
            title:"",
            description:"",
            content:"",
            error_message:"",
        });

       const refresh_bots = () => {  //读取一下数据库
           $.ajax({
               url:"http://localhost:3000/user/bot/getlist/",
               type:"get",
                headers:{
                    Authorization:"Bearer " + store.state.user.token,
                },
                success(resp){
                    bots.value = resp;
                }
           })
       }

       refresh_bots();

       const add_bot = () =>{   //创建Bot
           botadd.error_message = "";//先要清空一下错误信息
            $.ajax({
                url:"http://localhost:3000/user/bot/add/",
                type:"post",
                data:{
                    title:botadd.title,     //不加.value是因为botadd是reactive对象
                    description:botadd.description,
                    content:botadd.content,
                },
                headers:{
                    Authorization:"Bearer " + store.state.user.token,
                },
                success(resp){
                    if(resp.error_message === "success"){
                        botadd.title="";        //如果创建成功则清空输入的内容
                        botadd.description="";
                        botadd.content="";
                        Modal.getInstance("#add_bot_btn").hide();//关闭创建页面
                        refresh_bots();
                    }else{
                        botadd.error_message = resp.error_message;
                    }
                }
            })

       }

        const update_bot = (bot) => {   //修改Bot
            $.ajax({
                url:"http://localhost:3000/user/bot/update/",
                type:"post",
                data:{
                    bot_id:bot.id,
                    title:bot.title,     
                    description:bot.description,
                    content:bot.content,
                },
                headers:{
                    Authorization:"Bearer " + store.state.user.token,
                },
                success(resp){
                    if(resp.error_message === "success"){
                        Modal.getInstance("#update-bot-modal-" + bot.id).hide();//关闭创建页面
                        refresh_bots();
                    }else{
                        botadd.error_message = resp.error_message;
                    }
                }
            })
        }


       const remove_bot = (bot) => {    //删除bot
           $.ajax({
               url:"http://localhost:3000/user/bot/remove/",
                type:"post",
                data:{
                    bot_id:bot.id,
                },
                headers:{
                    Authorization:"Bearer " + store.state.user.token,
                },
                success(resp){
                    if(resp.error_message === "success"){
                        refresh_bots();
                    }
                }
           })
       }
       
       return {
           bots,
           botadd,
           add_bot,
           update_bot,
           remove_bot,
       }
    }
}
</script>

<style scoped>
div.error_message{
    color:red;
    margin-right: 85%;
}
</style>
