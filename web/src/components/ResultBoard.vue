<template>
    <div class="result-board">
        <div class="result-board-text" v-if="$store.state.pk.loser === 'all'">
            Draw
        </div>                                                          <!--三个等号会比较类型和具体的值，而两个等号要是遇到两个类型不一样则会变成字符串以后再比较-->
        <div class="result-board-text" v-else-if="$store.state.pk.loser === 'A' && $store.state.pk.a_id == parseInt($store.state.user.id) ">
            You Los
        </div>
        <div class="result-board-text" v-else-if="$store.state.pk.loser === 'B' && $store.state.pk.a_id == parseInt($store.state.user.id)">
            You Lose
        </div>
        <div class="result-board-text" v-else>
            You Win
        </div>
        <div class="result-board-btn">
            <button @click="restart" type="button" class="btn btn-success">
                再来一次
            </button>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
export default {
    setup(){
        const store = useStore();
        
        const restart = () => {
            store.commit("updateStatus" , "matching");
            store.commit("updateLoser" , "none");
            store.commit("updateOpponent",{
                username:"我的对手",
                photo:"https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png"
            })
        }
        
        return {
            restart
        };
    }
}
</script>


<style scoped>
div.result-board{
    height: 30vh;
    width: 30vw;
    background-color: rgba(50, 50, 50,0.5);
    position: absolute;
    top:30vh;
    left: 35vw;
}

div.result-board-text{
    text-align: center;
    color: white;
    font-size: 50px;
    font-weight: 600;
    font-style: italic;
    padding-top: 5vh;
}

div.result-board-btn{
    padding-top: 7vh;
    text-align:center;
}
</style>