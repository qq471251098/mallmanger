<template>
<el-card class="box-card">
  <!--1.面包屑-->
  <my-bread leve1='用户管理' leve2='用户列表'></my-bread>
  <!--2.输入框-->
  <el-row class="searchRow">
    <el-col>
      <el-input placeholder="请输入内容" v-model="query" class="inputSearch">
        <el-button slot="append" icon="el-icon-search" @click="serchUser()" clearable @clear='loadUserList()'></el-button>
      </el-input>
      <el-button type="success" @click="showAddUserDia()">添加用户</el-button>
    </el-col>
  </el-row>
  <!--3.表格-->
  <el-table :data="userList" style="width: 100%" max-height="700">
    <el-table-column label="#" width="60" type='index'></el-table-column>
    <el-table-column prop="username" label="姓名" width="120"></el-table-column>
    <el-table-column prop="email" label="邮箱"></el-table-column>
    <el-table-column prop="mobile" label="电话"></el-table-column>
    <el-table-column label="创建时间"> <template slot-scope="scope"> {{ scope.row.create_time | fmtdata }} </template> </el-table-column>
    <el-table-column label="用户状态">
      <template slot-scope="scope">
        <el-switch v-model="scope.row.mg_state" @change="changeMgState(scope.row)"></el-switch>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" plain type="primary" icon="el-icon-edit" circle @click="showEditUserDia(scope.row)"></el-button>
        <el-button size="mini" plain type="danger" icon="el-icon-delete" circle @click="showDeleUserMsgBox(scope.row.id)"></el-button>
        <el-button size="mini" plain type="success" icon="el-icon-check" circle @click="showCheckUserDia(scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table>
  <!--4.分页-->
  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[5, 10, 15, 20]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="total">
  </el-pagination>

  <!--对话框-->
  <!--添加用户的对话框-->
  <el-dialog title="添加用户" :visible.sync="showAddUser">
    <el-form :model="form">
      <el-form-item label="用户名" label-width="200px">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="200px">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" label-width="200px">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" label-width="200px">
        <el-input v-model="form.mobile" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="showAddUser = false">取 消</el-button>
      <el-button type="primary" @click="addUser()">确 定</el-button>
    </div>
  </el-dialog>
  <!--编辑用户的对话框-->
  <el-dialog title="编辑用户" :visible.sync="showEditUser">
    <el-form :model="form">
      <el-form-item label="用户名" label-width="200px">
        <el-input v-model="form.username" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱" label-width="200px">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" label-width="200px">
        <el-input v-model="form.mobile" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="showEditUser = false">取 消</el-button>
      <el-button type="primary" @click="editUser()">确 定</el-button>
    </div>
  </el-dialog>
  <!--分配角色的对话框-->
  <el-dialog title="分配角色" :visible.sync="showRolUser">
  <el-form :model="form">
    <el-form-item label="用户名" label-width="200px">{{currUserName}}</el-form-item>
    <el-form-item label="角色" label-width="200px">
      <el-select v-model="currRoleId">
        <el-option label="请选择" :value="-1"></el-option>
        <el-option v-for="(item,i) in roles" :key="i" :label="item.roleName" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="showRolUser = false">取 消</el-button>
    <el-button type="primary" @click="setRol()">确 定</el-button>
  </div>
</el-dialog>
</el-card>
</template>

<script>
import loginVue from '../login/login.vue'
export default {
  name: 'Users',
  data() {
    return {
      //搜索数据
      query: '',
      //用户信息
      userList: [],
      //当前页数
      pagenum: 1,
      //每页条数
      pagesize: 5,
      //总条数
      total: 0,
      //添加对话框的属性
      showAddUser: false,
      //添加用户的表单数据
      form: {username: '', password: '', email: '', mobile: ''},
      //编辑用户的对话框属性
      showEditUser: false,
      //分配角色对话框
      showRolUser: false,
      //分配角色
      currRoleId: -1,
      currUserId: -1,
      currUserName: '',
      //保存所有的角色数据
      roles:[]
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    //分页相关方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getUserList()
    },
    //获取用户数据请求方法
    async getUserList() {
      const res = await this.$http.get('users', {
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      })
      const {
        data: {
          users,
          total
        },
        meta: {
          status,
          msg
        }
      } = res.data
      if (status === 200) {
        this.userList = users
        this.total = total
      } else {
        this.$message.succes(msg)
      }
    },
    //搜索用户
    serchUser() {
      this.getUserList()
    },
    //清空输入框重新获取数据
    loadUserList() {
      this.getUserList()
    },
    //显示添加用户按钮
    showAddUserDia() {
      this.showAddUser = true;
      this.form = {}
    },
    //发送添加用户的请求
    async addUser () {
      this.showAddUser = false
      const res = await this.$http.post('users',this.form)
      const {data,meta:{status,msg}} = res.data
      if(status === 201) {
        this.$message.success(msg)
        this.getUserList()
        this.form = {}
      } else {
        this.$message.warning(msg)
      }
    },
    //点击删除按钮
    showDeleUserMsgBox(userId) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async () => {
          const res = await this.$http.delete(`users/${userId}`)
          if (res.data.meta.status === 200) {
            this.pagenum = 1
            this.getUserList()
             this.$message({
              type: 'success',
              message: res.data.meta.msg
          })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })        
        })
    },
    //点击编辑按钮
    showEditUserDia (user) {
      this.showEditUser = true
      this.form = user
    },
    //编辑用户发送请求
    async editUser () {
      this.showEditUser = false
      const res = await this.$http.put(`users/${this.form.id}`,this.form)
      this.getUserList()
    },
    //改变用户状态
    async changeMgState(user) {
      const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
    },
    //打开权限设置对话框
    async showCheckUserDia (user) {
      this.currUserName = user.username
      this.currUserId = user.id
      //获取所有角色
      const res1 = await this.$http.get(`roles`)
      this.roles = res1.data.data
      //获取当前用户角色id
      const res = await this.$http.get(`users/${user.id}`)
      this.currRoleId = res.data.data.rid
      this.showRolUser = true
    },
    //设置角色
    async setRol () {
      const res = await this.$http.put(`users/${this.currUserId}/role`,{rid:this.currRoleId})
      this.$message.success(res.data.meta.msg)
      this.showRolUser = false
    }
  }
}
</script>

<style>
.box-card {
  height: 100%;
}

.searchRow {
  margin-top: 20px;
}

.inputSearch {
  width: 500px;
}
</style>
