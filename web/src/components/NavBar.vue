<!--这里是上方导航栏，公共组件-->

<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container">
    <!--下面这一行和a标签差不多，就是跳转的时候不会刷新页面-->
    <router-link class="navbar-brand" :to="{name:'home'}">巨像计划</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <!--         ：表示需要使用表达式     如果满足?前面的那个等式,那么class="nav-link active" , 反正取后面那个-->
          <router-link :class="route_name == 'pk_index'? 'nav-link active' : 'nav-link'" :to="{name:'pk_index'}">对战</router-link>
        </li>
        <li class="nav-item">
          <router-link :class="route_name == 'record_index' ? 'nav-link active' : 'nav-link'"  :to="{name:'record_index'}">对局列表</router-link>
        </li>
        <li class="nav-item">
          <router-link :class="route_name == 'ranklist_index' ? 'nav-link active' : 'nav-link'"  :to="{name:'ranklist_index'}">排行榜</router-link>
        </li>
        
      </ul>
      <form class="d-flex" v-if="$store.state.user.is_login" role="search" >
        <span class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {{ $store.state.user.username }}
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><router-link class="dropdown-item"  :to="{name:'user_bot_index'}">我的Bot</router-link></li>
            <li><a class="dropdown-item" href="#" @click="logout">退出</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </span>
      </form>
      <form class="d-flex" role="search"  v-else-if="!$store.state.user.pulling_info">
        <span class="nav-item dropdown">
          <router-link class="nav-link" :to="{name: 'user_account_login'}" role="button">
            登录/
          </router-link>
        </span>  
        <span class="nav-item dropdown">
          <router-link class="nav-link" :to="{name: 'user_account_register'}" role="button">
            注册 
          </router-link>
        </span>
        
      </form>
    </div>
  </div>
</nav>
</template>

<script>
import { useRoute } from 'vue-router'
import { computed } from 'vue' // 用于实时计算，这里是计算当前在哪个页面
import { useStore } from 'vuex';

export default{
    setup(){                    //返回当前页面的名字，使得导航栏高亮
      const store = useStore();
      const route = useRoute();
      let route_name = computed(() => route.name)
     
      const logout = () => {
        store.dispatch("logout");
      }
     
      return {
        route_name,
        logout
      }
    }
}
</script>


<style scoped>

</style>