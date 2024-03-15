<template>
    <PlayGround v-if="$store.state.pk.status === 'playing'" />
    <MatchGround v-if="$store.state.pk.status === 'matching'" />
    <Result-board v-if="$store.state.pk.loser != 'none'" />
</template>

<script>
import PlayGround from '../../components/PlayGround.vue'
import MatchGround from '../../components/MatchGround.vue'
import ResultBoard from '../../components/ResultBoard.vue'
import{ onMounted, onUnmounted } from 'vue'
import{ useStore } from 'vuex'

export default{
    components:{
        PlayGround,
        MatchGround,
        ResultBoard,
    },
    setup(){
        const store = useStore();
                            //参考http协议http://localhost:3000/user/account/token/,
                            //但是不能是双引号加的是~键旁边那个符号,因为地址里面存在${....}，没有则可以双引号
        const socketUrl = `ws://localhost:3000/websocket/${store.state.user.token}/`;

        store.commit("updateLoser" , "none");
        store.commit("updateIsRecord", false);


        let socket = null;
        onMounted(() => {
            store.commit("updateOpponent",{
                username:"我的对手",
                photo:"https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png"
            })
            socket = new WebSocket(socketUrl);

            socket.onopen = () => {
                console.log("connected!");
                store.commit("updateSocket" , socket);
            }

            socket.onmessage = msg =>{
                const data = JSON.parse(msg.data);
                if(data.event === "start-matching"){    //匹配成功
                    store.commit("updateOpponent",{
                       username:data.opponent_username,
                       photo:data.opponent_photo,     
                    });
                    setTimeout(() => {
                        store.commit("updateStatus" , "playing");
                    }, 200);    //匹配成功以后过多少时间开始
                    store.commit("updateGame" , data.game);
                }else if(data.event === "move"){
                    console.log(data);
                    const game = store.state.pk.gameObject;
                    const [snake0 , snake1] = game.snakes; 
                    snake0.set_direction(data.a_direction);
                    snake1.set_direction(data.b_direction);
                }else if(data.event === "result"){
                    console.log(data);
                    const game = store.state.pk.gameObject;
                    const [snake0 , snake1] = game.snakes; 

                    if(data.loser === "all" || data.loser === "A"){
                        snake0.status = "die";
                    }
                    if(data.loser === "all" || data.loser === "B"){
                        snake1.status = "die";
                    }
                    store.commit("updateLoser" , data.loser);
                }
            }

            socket.onclose = () =>{
                console.log("disconnected!");
                store.commit("updateStatus" , "matching");      //退出以后，需要把显示页面改成匹配页面
            }
        });

        onUnmounted(() => {     //关闭的时候需要断开连接，否则会产生多个连接，占用资源
            socket.close();
        })
    }
}
</script>

<style scoped>

</style>
