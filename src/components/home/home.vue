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
          <a href="#" class="loginOut" @click.prevent="handleSignout()">退出</a>
        </el-col>
    </el-row>
  </el-header>
  <el-container>
    <el-aside width="200px" class="aside">
      <el-menu :router="true" :unique-opened="true">
        <el-submenu v-for="(item1,i) in menus" :key="i" :index = 'item1.order.toString()'>
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{item1.authName}}</span>
          </template>
          <el-menu-item v-for="(item2,i) in item1.children" :key="i" :index="item2.path">
            <i class="el-icon-location"></i>
            <span>{{item2.authName}}</span>
          </el-menu-item>
        </el-submenu>
      </el-menu> 
    </el-aside>
    <el-main class="main">
      <router-view style="height: 100%"></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      menus: []
    }
  },
  created () {
    this.getMues()
  },
  methods: {
    //获取导航数据
    async getMues() {
      const res = await this.$http.get(`menus`)
      this.menus = res.data.data
    },
    handleSignout() {
      localStorage.clear()
      this.$message.success('退出成功')
      this.$router.push({
        name: 'login'
      })
    }
  }
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
  height: 100%;
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
