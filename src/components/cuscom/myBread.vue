<template>
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item>首页</el-breadcrumb-item>
  <el-breadcrumb-item>{{leve1}}</el-breadcrumb-item>
  <el-breadcrumb-item>{{leve2}}</el-breadcrumb-item>
</el-breadcrumb>
</template>

<script>
export default {
  name: 'my-bread',
  props: ['leve1','leve2']
}
</script>

<style>

</style>
