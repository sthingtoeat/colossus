<template>
    <NavBar />
    <router-view></router-view>
</template>

<script>
import NavBar from './components/NavBar.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"
//import $ from 'jquery'

export default{
    components: {
      NavBar
    },
    setup(){
    //   $.ajax({
    //     url:"http://localhost:3000/user/account/token/",
    //     type:"post",
    //     data:{
    //       username:"qly",
    //       password:"123",
    //     },
    //     success(resp){
    //       console.log(resp);
    //     },
    //     error(resp){
    //       console.log(resp);
    //     }
    //   });

    //   $.ajax({
    //     url:"http://localhost:3000/user/account/info/",
    //     type:"get",
    //     headers:{       //下面这个Bearer后面必须多一个空格
    //       Authorization:"Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwMmNjZGU5OTM1OGQ0NzU4YmFmYWY4YTFmMWJkNDkxNSIsInN1YiI6IjEiLCJpc3MiOiJzZyIsImlhdCI6MTY2NzkxMDQ1MCwiZXhwIjoxNjY5MTIwMDUwfQ.J4tiOH2aPX38UXB5op1O3c3lMsUEsXwHv6YQJQ42Y9w"
    //     },
    //     success(resp){
    //       console.log(resp);
    //     },
    //     error(resp){
    //       console.log(resp);
    //     }
    //   });

    //   $.ajax({
    //     url:"http://localhost:3000/user/account/register/",
    //     type:"post",
    //     data:{
    //       username:"qly",
    //       password:"123",
    //       confirmedPassword:"123",
    //     },
    //     success(resp){
    //       console.log(resp);
    //     },
    //     error(resp){
    //       console.log(resp);
    //     }
    //   })
    }
  }
</script>
  

<style>
body{
  background-image: url("@/assets/images/background.jpg");
  background-size: cover;
}
</style>
