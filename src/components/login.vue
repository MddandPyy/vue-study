<template>
  <div>
    <!--flex弹性盒子模型，justify-content：主抽 -->
    <div style="display: flex;justify-content: center;margin-top: 150px">
      <el-card style="width: 400px">
        <div slot="header" class="clearfix">
          <span>登录</span>
        </div>


        <el-form ref="form" :model="user" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="user.password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
           <el-form-item >
            <el-button  type="primary" @click="doLogin">登录</el-button>
            <el-button>取消</el-button>
          </el-form-item>
          没有账号，去<el-link type="primary" @click="toRegister" >
          注册
          </el-link>
        </el-form>

      </el-card>
    </div>
  </div>
</template>
<script>


  export default {
    name: 'login',
    //单页面中不支持前面的data:{}方式
    data() {
      //相当于以前的function data(){},这是es5之前的写法，新版本可以省略掉function
      return{
        //之前是在里面直接写username，password等等，但是这里要写return
        //因为一个组件不管要不要被其他组件用，只要这样定义了，它就会认为可能这个组件会在其他的组件中使用
        //比如说在这里定义了一个变量，然后把这个组件引入到A组件中，A组件中修改了这个变量
        //同时这个组件也在B组件中引用了，这时候A里面一修改，B里面也变了，它们用的是一个值
        //可是一般来说可能希望在不同的组件中引用的时候，使用不同的值，所以这里要用return
        //这样在A组件和B组件分别引用这个变量的时候是不会互相影响的
        user:{
          username:'',
          password:'',
          //为了登录方便，可以直接在这里写好用户名和密码的值
        }
      }
    },
    methods:{
      doLogin(){//一点击登录按钮，这个方法就会执行
        this.$axios({
          url: '/api/login',
          method: 'post',
          data: {'name':this.user.username,'password':this.user.password}
          }).then(res => {
            console.log(res);
            if(res.data.flag){
              this.$router.push('/hello');
              localStorage.setItem("usertoken", res.data.data);
              localStorage.setItem("username", this.user.username);
            }else{
                this.$message.error(res.data.msg);
            }
              
          });
      },
      toRegister(){
        this.$router.push('/register');
      }
    }
  }
</script>