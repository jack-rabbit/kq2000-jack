<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <Button type="primary">Primary</Button>
    <router-view/> -->
    <router-view/>
    <!-- <loginBox></loginBox> -->
  </div>
</template>

<script>
  // import loginBox from "@/components/login/login_box.vue"
  export default {
    name: 'App',
    // components:{loginBox}
  }
</script>

<style>
  #app {
    font-family: 'MicrosoftYaHei','Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height:100%;
    background-color:#f3f3f3;
  }
  html,body{
    width:100%;
    height:100%;
    padding:0;
    margin:0;
  }

  
</style>
