<template>
  <NavBar/>

  <router-view/>
</template>

<script>

import NavBar from './components/NavBar.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap' 
// import $ from "jquery";

export default{
  components:{
    NavBar
},
setup() {
    // // 测试LoginService
    // $.ajax({
    //   url: "http://127.0.0.1:3001/user/account/token/",
    //   type: "post",
    //   data: {
    //     username: 'VJJJJJJ',
    //     password: '123456',
    //   },
    //   success(resp) {
    //     console.log(resp);
    //   },
    //   error(resp) {
    //     console.log(resp); 
    //   }
    // });
    // // 测试InfoService
    // $.ajax({
    //   url: "http://127.0.0.1:3001/user/account/info/",
    //   type: "get",
    //   headers: {
    //     Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI5NDUxYzQ3MDU3MWQ0NTg4ODZjNGFjY2QwZGMyY2Y0ZSIsInN1YiI6IjM0IiwiaXNzIjoic2ciLCJpYXQiOjE2NjUwMjQzOTksImV4cCI6MTY2NjIzMzk5OX0.iRMmHOsdLZWBSHdqdsXrZXqfRzdsV9dI1QmZHEzhYD0",
    //   },
    //   success(resp) {
    //     console.log(resp);
    //   },
    //   error(resp) {
    //     console.log(resp);
    //   }
    // });
    // // 测试RegisterService
    // $.ajax({
    //   url: "http://127.0.0.1:3001/user/account/register/",
    //   type: "post",
    //   data: {
    //     username: 'VJJJJJJ',
    //     password: '123456',
    //     confirmedPassword: "123456",
    //   },
    //   success(resp) {
    //     console.log(resp);
    //   },
    //   error(resp) {
    //     console.log(resp);
    //   }
    // })

  }
}
</script>

<style>
body{
  background-image: url("@/assets/images/bg.png");
  background-size : cover; 
}
</style>
