<template>
<el-container class="container">
  <el-header class="header">
    <el-row>
      <el-col :span="4">
        <img src="../../assets/img/logo.png" alt="图片无法显示">
      </el-col>
        <el-col :span="18" class="middle">
          <h3>电商后台管理系统</h3>
        </el-col>
        <el-col :span="2">
          <a href="#" class="loginOut">退出</a>
        </el-col>
    </el-row>
  </el-header>
  <el-container>
    <el-aside width="200px" class="aside">Aside</el-aside>
    <el-main class="main">Main</el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style>
.container {
  height: 100%;
}

.header {
  background-color: #b3c0d1;
}

.aside {
  background-color: #d3dce6;
}

.main {
  background-color: #e9eef3;
}

/*头部样式 */
.header .middle {
  text-align: center
}

.header .loginOut {
  text-decoration: none;
  line-height: 60px;
}
</style>
