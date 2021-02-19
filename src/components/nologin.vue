<template>
  <div>
    登录失效，请重新<el-link
           type="primary" 
          @click="doLogin" >
          登录
          </el-link>
  </div>
</template>
<script>


  export default {
    methods:{
      doLogin(){//一点击登录按钮，这个方法就会执行
        this.$router.push('/login');
      }
    }
  }
</script>