<template>
<el-card>
  <!--1.面包屑-->
  <my-bread leve1='权限管理' leve2='角色列表'></my-bread>
  <!--2.添加角色按钮-->
  <el-row class="addRoleBtn">
    <el-col>
      <el-button type="primary">添加角色</el-button>
    </el-col>
  </el-row>
  <!--3.角色权限列表-->
  <el-table :data="roleList" style="width: 100%" max-height="700">
    <el-table-column type="expand">
      <template slot-scope="scope">
        <el-row v-for="(item1,i) in scope.row.children" :key="i" style="margin-top:20px" type="flex" align="middle">
          <el-col :span="4">
            <el-tag @close='deleRight(scope.row,item1.id)' closable>{{item1.authName}}</el-tag>
            <i class="el-icon-arrow-right"></i>
          </el-col>
          <el-col :span="20">
            <el-row v-for="(item2,i) in item1.children" :key="i">
              <el-col :span="4">
                <el-tag type="success" closable @close='deleRight(scope.row,item2.id)'>{{item2.authName}}</el-tag>
                <i class="el-icon-arrow-right"></i>
              </el-col>
              <el-col :span="20">
                <el-tag closable v-for="(item3,i) in item2.children" :key="i" type="danger" @close='deleRight(scope.row,item3.id)'>{{item2.authName}}</el-tag>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <span v-if="scope.row.children.length === 0">未分配权限</span>
      </template>
    </el-table-column>
    <el-table-column label="#" type='index'></el-table-column>
    <el-table-column prop="roleName" label="角色名称"></el-table-column>
    <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
        <el-button size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
        <el-button size="mini" plain type="success" icon="el-icon-check" circle @click="showSetRightDia(scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table>

  <!--4.修改权限对话框-->

  <el-dialog title="修改权限" :visible.sync="setRightDia">
    <!--树形结构-->
    <el-tree  ref="tree" :data="treelist" show-checkbox node-key="id" default-expand-all :default-checked-keys="arrcheck" :props="defaultProps">
    </el-tree>

    <div slot="footer" class="dialog-footer">
      <el-button @click="setRightDia = false">取 消</el-button>
      <el-button type="primary" @click="setRoleRight()">确 定</el-button>
    </div>
  </el-dialog>
</el-card>
</template>

<script>
export default {
  name: 'Role',
  data() {
    return {
      roleList: [],
      //修改权限对话框
      setRightDia: false,
      //树形结构数据
      treelist: [],
      //树形结构配置项
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      //存放当前角色权限的id
      arrcheck: [],
      //存放当前角色ID
      currRoleId: '-1'
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    //获取角色权限列表
    async getRoleList() {
      const res = await this.$http.get(`roles`)
      this.roleList = res.data.data
    },
    //取消权限
    async deleRight(role, rightId) {
      const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
      const {
        data,
        meta: {
          msg,
          status
        }
      } = res.data
      if (status === 200) {
        role.children = data
        this.$message.success(msg)
      }
    },
    //弹出修改权限对话框
    async showSetRightDia(role) {
      this.setRightDia = true
      this.currRoleId = role.id
      //获取树形结构的权限数据
      const res = await this.$http.get(`rights/tree`)
      this.treelist = res.data.data
      //获取当前角色拥有权限的id
      let arrtemp2 =[]
      role.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            arrtemp2.push(item3.id)
          })
        })
      })
      this.arrcheck = arrtemp2 
    },
    
    async setRoleRight () {
      let arr1= this.$refs.tree.getCheckedKeys()
      let arr2= this.$refs.tree.getHalfCheckedKeys()
      let arr = [...arr1,...arr2]
      const res = await this.$http.post(`roles/${this.currRoleId}/rights`,{rids: arr.join(',')})
      this.getRoleList()
      this.setRightDia = false
    }
  }
}
</script>

<style>
.addRoleBtn {
  margin-top: 20px;
}
</style>
