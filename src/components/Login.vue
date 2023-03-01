<template>
  <div id="loginform">
    <el-input class="txt" v-model.lazy="user.userName" placeholder="请输入内容"></el-input>
    <el-input class="txt" v-model.lazy="user.password" placeholder="请输入密码" show-password></el-input>
    <el-button type="primary" v-on:click="loginCheck()">登录</el-button>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data: function() {
      return {
        user: {
          userName: '',
          password: ''
        }

      }
    },
    methods: {
      loginCheck: function() {
        let that = this;
        this.$axios.post('UserController/loginCheck', this.$qs.stringify(this.user))
          .then(resp => {
            if (resp.status == 200) {
              let responseBean = resp.data;
              if (responseBean.msg == "ok") {
                let user = responseBean.data;
                if (user != null) {
                  sessionStorage.setItem('userId', user.userId);
                  sessionStorage.setItem('roleId', user.roleId);
                  sessionStorage.setItem('realName', user.realName);
                  if (user.roleId == 1) {
                    that.$router.push("/GuaHao/GuaHaoGL")
                  } else if (user.roleId == 2) {
                    that.$router.push("/MenZhen/MenZhenBL")
                  } else if (user.roleId == 4) {
                    that.$router.push("/Admin")
                  } else {
                    that.$router.push("/JianCha")
                  }
                }
              } else if (responseBean.msg == "errorpwd") {
                alert('登录密码错误');
              } else {
                alert('用户不存在');
              }
            }
          })
          .catch(error => {
            if (error.response) {
              alert(responseBean.msg);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log('Error', error.message);
            }
          });

      }
    }
  }
</script>

<style scoped="scoped">
  #loginform {
    /* border: 1px solid black; */
    width: 300px;
    margin: 200px auto;


  }

  .txt {
    margin-bottom: 20px;

  }
</style>
