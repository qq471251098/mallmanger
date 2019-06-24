<template>
<div class="login-wrap">
  <el-form label-position="top" label-width="80px" :model="fromDate" class="login-form">
    <h2>用户登录</h2>
    <el-form-item label="用户名">
      <el-input v-model="fromDate.username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="fromDate.password"></el-input>
    </el-form-item>
    <el-button type="primary" class="login-btn" @click='handleLogin()'>登录</el-button>
  </el-form>
</div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      fromDate: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    handleLogin () {
      this.$http.post('login',this.fromDate).then( (res) => {
        const {
          data,
          meta: {msg, status}
        } = res.data

        if (status === 200) {
          this.$message.success(msg)
        } else {
          this.$message.warning(msg)
        }
      })
    }
  }
}
</script>

<style>
  .login-wrap{
    height: 100%;
    background-color: #324152;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-wrap .login-form {
    padding: 30px;
    width: 400px;
    background-color: #fff;
    border-radius: 10px;
  }

  .login-wrap .login-btn {
    width: 100%;
  }

</style>
