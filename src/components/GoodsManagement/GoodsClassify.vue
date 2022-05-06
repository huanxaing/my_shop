<template>
  <div class="wrapper">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }"><span @click="so">首页</span></el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-button type="primary" @click="tjfl">添加分类</el-button>
      <zk-table :data="data" :columns="columns" show-index index-text="#" :selection-type="false" :expand-type="false" border>
        <template slot="likes" slot-scope="scope">
          <i class="el-icon-success" v-if="scope.row.cat_deleted == false" style="color: #90ee90"></i>
          <i class="el-icon-error" v-else style="color: #90ee90"></i>
        </template>
        <template slot="likee" slot-scope="scope">
          <el-tag v-if="scope.row.cat_level == 0">一级</el-tag>
          <el-tag v-if="scope.row.cat_level == 1" type="success">二级</el-tag>
          <el-tag v-if="scope.row.cat_level == 2" type="warning">三级</el-tag>
        </template>
        <template slot="caoz" slot-scope="scope">
          <el-button type="primary" @click="xg(scope.row)" icon="el-icon-edit" size="mini" >编辑</el-button>
          <el-button type="danger" @click="del(scope.row)" icon="el-icon-delete" size="mini" >删除</el-button>
        </template>
      </zk-table>
      <div class="block" style="margin-top: 10px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[5, 6, 7, 8]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="zsj"></el-pagination>
      </div>
    </el-card>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form label-width="100px">
        <el-form-item label="分类" :prop="num" :rules="{required: true, message: '分类名称不能为空', trigger: 'blur'}">
          <el-input type="text" v-model="num"></el-input>
        </el-form-item>
        <el-form-item label="父级分类" v-if="zj">
          <div class="block">
            <el-cascader v-model="value" :options="options" :props="props" :popper-append-to-body="false"></el-cascader>
          </div>
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

  data() {
    return {
      data: [],
      currentPage4: 1,
      zsj: 0,
      dialogVisible: false,
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name',
        },
        {
          label: '是否有效',
          type: 'template',
          template: 'likes',
        },
        {
          label: '排序',
          type: 'template',
          template: 'likee',
        },
        {
          label: '操作',
          type: 'template',
          template: 'caoz',
        },
      ],
      my: 1,
      mt: 5,
      zj: true,
      title: '',
      num: '',
      id:0,
      value: '',
      options: [],
      props: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        checkStrictly: true,
      },
    }
  },
  watch: {},
  computed: {},
  methods: {
    so() {
      window.sessionStorage.removeItem('val')
    },
    tjfl() {
      this.dialogVisible = true
      this.title = '添加分类'
      this.sa1()
      this.num=''
      this.zj = true
      this.value=''
    },
    qr() {
      this.dialogVisible = false
      if (this.zj) {
        var th = this.value[this.value.length - 1]
        th === undefined ? (th = 0) : (th = this.value[this.value.length - 1])
        this.$http.post('categories', {
            cat_pid: th,
            cat_name: this.num,
            cat_level: this.value.length,
          }).then((res) => {
            this.sa(this.my, this.mt)
            this.num = ''
            this.zc_cw(res.data.meta.status,res.data.meta.status,'添加失败','添加成功')
          })
      }else{
        this.$http.put('categories/'+this.id,{
          cat_name:this.num
        }).then(res=>{
          this.sa(this.my, this.mt)
          this.zc_cw(res.data.meta.status,res.data.meta.status,'修改失败','修改成功')
        })
      }
    },
    sa1() {
      this.$http.get('categories', {
          params: {
            type: 2,
          },
        }).then((res) => {
          this.options = res.data.data
        })
    },
    sa(my, mt) {
      this.$http.get('categories', {
          params: {
            type: 3,
            pagenum: my,
            pagesize: mt,
          },
        }).then((res) => {
          this.data = res.data.data.result
          this.zsj = res.data.data.total
        })
    },
     zc_cw(res,val,num,num1){
        if (res !== val) return this.$sa.error(num)
        this.$sa.success(num1)
    },
    xg(row) {
      this.id=row.cat_id
      this.dialogVisible = true
      this.num = row.cat_name
      this.zj = false
      this.title = '修改分类'
    },
    del(row) {
       this.$sd('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
          this.$http.delete('categories/'+row.cat_id).then(res=>{
            this.sa(this.my, this.mt)
          })
          this.$sa({
            type: 'success',
            message: '删除成功!',
          })
        }).catch(() => {
          this.$sa({
            type: 'info',
            message: '已取消删除',
          })
        })
      
    },
    handleSizeChange(val) {
      this.mt = val
      this.sa(this.my, this.mt)
    },
    handleCurrentChange(val) {
      this.my = val
      this.sa(this.my, this.mt)
    },
    handleClose(done) {
      this.$sd('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
  },
  created() {
    this.sa(this.my, this.mt)
  },
  mounted() {},
}
</script>
<style lang="less" scoped>
.wrapper {
  padding: 10px;
}
.box-card {
  margin-top: 10px;
}
.zk-table {
  margin-top: 10px;
}
.el-cascader {
  width: 100%;
}
</style>