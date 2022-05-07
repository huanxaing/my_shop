<template>
  <div class="wrapper">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }"><span @click="so">首页</span></el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div>
        <div style="width: 300px; position: relative">
          <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="sa(1, 3)"></el-button>
          </el-input>
          <div class="sl">
            <el-button type="primary" size="medium" @click="tjyh" >添加用户</el-button>
          </div>
        </div>
        <template>
          <el-table :data="tableData" border>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column prop="username" label="姓名"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="mobile" label="电话"></el-table-column>
            <el-table-column prop="role_name" label="角色"></el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949" @change="sp(scope.row)">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="修改" placement="top-start" :enterable='false'>
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="xg(scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="top-start" :enterable='false'>
                <el-button type="primary" icon="el-icon-delete" size="mini" @click="del(scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="分配权限" placement="top-start" :enterable='false'>
                <el-button type="warning" icon="el-icon-star-off" size="mini" @click="qx(scope.row)"></el-button>
              </el-tooltip>
                </template>
            </el-table-column>
          </el-table>
        </template>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[3, 4, 5, 6]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="zsj">
          </el-pagination>
          <el-dialog title="分配权限" :visible.sync="dialogVisible1" width="30%" :before-close="handleClose">
               <el-select v-model="value2" placeholder="分配角色">
                    <el-option v-for="item in options" :key="item.id" :label="item.roleName" :value="item.id">
                    </el-option>
              </el-select>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible1    = false">取 消</el-button>
                    <el-button type="primary" @click="qr1">确 定</el-button>
                </span>
            </el-dialog>
          <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" >
            <el-form label-width="100px" class="demo-ruleForm">
              <el-form-item v-if='flg' label="用户名称">
                <el-input v-model="tj.username" type="text"></el-input>
              </el-form-item>
              <el-form-item v-if='flg' label="用户密码" prop="checkPass">
                <el-input v-model="tj.password" type="text"></el-input>
              </el-form-item>
              <el-form-item  label="邮箱" prop="checkPass">
                <el-input v-model="tj.email" type="text"></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="checkPass">
                <el-input v-model="tj.mobile" type="text"></el-input>
              </el-form-item>  
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="qr">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
    </el-card>
  </div>
</template>


<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      input3: '',
      value: '',
      zsj: 0,
      mt: 3,
      my: 1,
      dialogVisible: false,
      dialogVisible1:false,
      title: '',
      value1: '',
      flg:'',
      currentPage4: 1,
      tj:{
          username:'',
          password:'',
          email:'',
          mobile:''
      },
      ids:0,
      id1:0,
       options: [],
        value2:''
    }
  },
  watch: {},
  computed: {},
  methods: {
    so() {
      window.sessionStorage.removeItem('val')
    },
    qx(row){
        this.id1=row.id
        this.$http.get('roles').then(res=>{
            this.options=res.data.data
            this.dialogVisible1=true 
        })
    },
    qr1(){
        this.$http.put('users/'+this.id1+'/role',{
            rid:this.value2
        }).then(res=>{
             if(res.data.meta.status !==200) return this.$sa.error("分配失败")
                this.$sa.success("分配成功")
            this.dialogVisible1=false
             this.sa(this.my, this.mt)
        })
    },
    del(row){
        this.$sd('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$http.delete('users/'+row.id).then(res=>{
                if((this.my*this.mt-this.mt)==this.zsj-1 ){
                  this.sa(this.my-1, this.mt)
                }else{
                    this.sa(this.my, this.mt)
                }
            })
          this.$sa({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$sa({
            type: 'info',
            message: '已取消删除'
          });          
        });

    },
    xg(row){
        this.flg=false
        this.dialogVisible=true
        this.tj.email=row.email
        this.tj.mobile=row.mobile
        this.ids = row.id
         this.title = '修改用户'
    },
    sp(row) {
      this.$http.put('users/' + row.id + '/state/' + row.mg_state).then((res) => {})
    },
    qr(){
        if(this.flg){
            this.$http.post('users',this.tj).then(res=>{            
                this.sa(this.my, this.mt)
                if(res.data.meta.status !==201) return this.$sa.error("添加失败")
                this.$sa.success("添加成功")
                this.dialogVisible=false
            })
        }else{
            this.$http.put('users/'+this.ids,this.tj).then(res=>{
                 this.sa(this.my, this.mt)
                  if(res.data.meta.status !==200) return this.$sa.error("修改失败")
                this.$sa.success("修改成功")
                this.dialogVisible=false
            })
        }
    },
    async sa(mt, my) {
      const { data: res } = await this.$http.get('users', {
        params: {
          query: this.input3,
          pagenum: mt,
          pagesize: my,
        },
      })
      this.tableData = res.data.users
      this.zsj = res.data.total
    },
    tjyh() {
      this.dialogVisible = true
      this.title = '添加用户'
      for(var val in this.tj){
          this.tj[val]=''
      }
      this.flg=true
    },
    handleSizeChange(val) {
      this.mt = val
      this.sa(this.my, this.mt)
    },
    handleCurrentChange(val) {
      this.my = val
      this.sa(this.my, this.mt)
    },
    handleClose() {
      this.dialogVisible = false    
      }
  },
  created() {
    this.sa(this.my, this.mt)
  },

  mounted() {},
}
</script>
<style  scoped>
.wrapper {
  color: red;
  height: 100%;
}
.item {
  width: 45px;
  height: 27px;
}

.el-breadcrumb {
  padding: 10px;
}
.el-table {
  margin-top: 10px;
  width: 1224px;
}
.el-main[data-v-8dc7cce2] {
  line-height: 60px;
}
.text {
  font-size: 14px;
}
.block {
  margin-top: 10px;
}
.item {
  padding: 18px 0;
}
.sl {
  position: absolute;
  top: 0;
  margin-left: 320px;
}
.box-card {
  width: 1224px;
  background: white;
  margin-left: 10px;
}
</style>