<template>
  <div class="wrapper">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }"><span @click="so">首页</span></el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="sg">
      <el-input v-model="cxjg" placeholder="根据角色ID查询" type="text" style="width: 200px; margin-right: 10px"></el-input>
      <el-button type="primary" @click="cx()">查询角色</el-button>
      <el-button type="primary" @click="tj()">添加角色</el-button>
    </div>
    <template>
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="修改" placement="top-start" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="xg(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top-start" :enterable="false">
              <el-button type="primary" icon="el-icon-delete" size="mini" @click="del(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="分配权限" placement="top-start" :enterable="false">
              <el-button type="warning" icon="el-icon-star-off" size="mini" @click="qx()"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色名称" prop="checkPass">
          <el-input v-model="tjj.roleName" type="text"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="checkPass">
          <el-input v-model="tjj.roleDesc" type="text"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="qr">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      title: '',
      tjj: {
        roleName: '',
        roleDesc: '',
      },
      flg: '',
      cxjg: '',
      ids: 0,
    }
  },
  watch: {},
  computed: {},
  methods: {
    so() {
      window.sessionStorage.removeItem('val')
    },
    cx() {
      if(this.cxjg ==0){
        this.sa()
      }
      this.$http.get('roles/' + this.cxjg).then((res) => {
        this.tableData = []
        this.tableData.push(res.data.data)      
      })
    },
    qr() {
      if (this.flg) {
        this.$http.post('roles', this.tjj).then((res) => {
          if (res.data.meta.status !== 201) return this.$sa.error('添加失败')
          this.$sa.success('添加成功')
          this.sa()
          this.dialogVisible = false
        })
      } else {
        this.$http.put('roles/' + this.ids, this.tjj).then((res) => {
          if (res.data.meta.status !== 200) return this.$sa.error('修改失败')
          this.$sa.success('修改成功')
          this.sa()
          this.dialogVisible = false
        })
      }
    },
    sa() {
      this.$http.get('roles').then((res) => {
        this.tableData = res.data.data
      })
    },
    xg(row) {
      this.ids = row.id
      this.tjj.roleName = row.roleName
      this.tjj.roleDesc = row.roleDesc
      this.dialogVisible = true
      this.title = '修改角色'
      this.flg = false
    },
    del(row) {
      this.$sd('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$http.delete('roles/' + row.id).then((res) => {
            this.sa()
          })
          this.$sa({
            type: 'success',
            message: '删除成功!',
          })
        })
        .catch(() => {
          this.$sa({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    qx() {
      this.$router.push('/rights')
      window.sessionStorage.setItem('val','/rights')
      location.reload()
    },
    tj(row) {
      this.flg = true
      this.dialogVisible = true
      this.title = '添加角色'
      this.tjj.roleName = ''
      this.tjj.roleDesc = ''
    },
    handleClose() {
      this.dialogVisible = false
    },
  },
  created() {
    this.sa()
  },
  mounted() {},
}
</script>
<style  scoped>
.wrapper {
  padding: 10px;
  position: relative;
}
.el-table {
  margin-top: 70px;
}
.sg {
  position: absolute;
  margin-top: 15px;
}
</style> 