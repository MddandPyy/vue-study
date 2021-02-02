<template>
<div>
    <center> Welcome<br /></center>
    <input id="usertext" type="text" />
    <el-button  @click="doLogin">登录</el-button>
    <el-button  @click="closeWebSocket">下线</el-button>
      <hr />
    <input id="text" type="text" />
    <el-button  @click="send">发送消息</el-button>

    <hr />
    <div id="message"></div>
</div>
</template>

<script>
export default {
  name: 'websocket',
  data () {
      return {
        websocket: null
      }
  },
  methods:{
        doLogin(){//一点击登录按钮，这个方法就会执行
            var user = document.getElementById('usertext').value;
                
            //判断当前浏览器是否支持WebSocket
            if ('WebSocket' in window) {
                this.websocket = new WebSocket("ws://192.168.1.12:8899/testroom?username="+user);
            } else {
                alert('当前浏览器 Not support websocket')
            }
            //连接发生错误的回调方法
            this.websocket.onerror = function() {
                setMessageInnerHTML("WebSocket连接发生错误");
            };
            //连接成功建立的回调方法
            this.websocket.onopen = function() {
                setMessageInnerHTML("WebSocket连接成功");
            }

            //接收到消息的回调方法
            this.websocket.onmessage = function(event) {
                setMessageInnerHTML(event.data);
            }

            function setMessageInnerHTML(innerHTML) {
                document.getElementById('message').innerHTML += innerHTML + '<br/>';
            }
        },
        send() {
            var message = document.getElementById('text').value;
            document.getElementById('text').value = "";
            this.websocket.send(message);
        },
        closeWebSocket(){
            //alert("下线成功");
            document.getElementById('message').innerHTML += '你已下线' + '<br/>';
            this.websocket.close();
        }
    }
}
</script>



