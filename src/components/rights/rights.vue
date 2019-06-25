<template>
<el-card>
  <!--1.面包屑-->
  <my-bread leve1='权限管理' leve2='权限列表'></my-bread>
  <!--2.权限列表-->
  <el-table :data="rightList" border style="width: 100%" height='800'>
    <el-table-column label="#" type="index"></el-table-column>
    <el-table-column prop="authName" label="权限名称"></el-table-column>
    <el-table-column prop="path" label="路径"></el-table-column>
    <el-table-column label="层级">
      <template slot-scope="scope">
        <span v-if="scope.row.level === '0'">一级</span>
        <span v-if="scope.row.level === '1'">二级</span>
        <span v-if="scope.row.level === '2'">三级</span>
      </template>
    </el-table-column>
  </el-table>
</el-card>
</template>

<script>
export default {
  name: 'Rights',
  data() {
    return {
      rightList: []
    }
  },
  created() {
    this.getRightList()
  },
  methods: {
    async getRightList() {
      const res = await this.$http.get(`rights/list`)
      this.rightList = res.data.data
    }
  }
}
</script>

<style>

</style>
