<template>
    <div ref="parent" class="gamemap">
        <!--canvas是画布 , 具体百度搜索MDN（查前端标签） ， 然后输入canvas就可以知道了-->
        <!--加上tabindex="0"就可以输入用户操作了-->
        <canvas ref="canvas" tabindex="0"></canvas>
    </div>
</template>

<script>
import{ GameMap } from '@/assets/scripts/GameMap'
import{ ref , onMounted } from 'vue'
import{ useStore } from 'vuex';

export default{
    setup(){
        const store = useStore();
        let parent = ref(null);
        let canvas = ref(null);

        onMounted(() =>{
            store.commit(
                "updateGameObject",
                new GameMap(canvas.value.getContext('2d') , parent.value , store)
            );
            
        });

        return {
            parent,
            canvas
        }
    }
}

</script>

<style scoped>
div.gamemap{
    width:100%;
    height: 100%;
    display:flex;
    justify-content: center;
    align-items: center;
}
</style>
