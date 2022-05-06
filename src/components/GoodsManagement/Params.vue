<template>
  <div class="wrapper">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }"><span @click="so">首页</span></el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-alert title="注意：只允许为第三方分类设置相关参数" type="warning" center show-icon></el-alert>
      <div class="block">
        <span class="demonstration">选择商品分类:</span>
        <el-cascader v-model="value" :options="options" :props="props" :popper-append-to-body="false" @change="handleChange"></el-cascader>
      </div>
      <template>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="用户管理" name="many">
            <el-button type="primary" :disabled="flg" @click="dttj">添加参数</el-button>
            <el-table border :data="tableData" style="width: 100%; margin-top: 15px">
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <el-tag v-for="(tag, i) in scope.row.attr_vals" :key="i" closable @close="handleClose(i,scope.row)">{{ tag  }} </el-tag>
                  <el-input class="input-new-tag" v-if="scope.row.inputVisible" v-model="scope.row.inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(scope.row)" @blur="handleInputConfirm(scope.row)">
                  </el-input>
                  <el-button v-else class="button-new-tag"  size="small" @click="showInput(scope.row)">+ New Tag</el-button>
                </template>
              </el-table-column>
              <el-table-column type="index"></el-table-column>
              <el-table-column label="参数名称" prop="attr_name">
              </el-table-column>
              <el-table-column label="操作">
               <template slot-scope="scope">
                    <el-button type="primary" @click='xg(scope.row)' icon="el-icon-edit" size="mini">编辑</el-button>
                    <el-button type="danger"  @click='del(scope.row)' icon="el-icon-delete" size="mini">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
            <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="qr">确 定</el-button>
            </span>
          </el-dialog>
          <el-tab-pane label="配置管理" name="only">
            <el-button type="primary" :disabled="flg" @click="jttj">添加参数</el-button>
            <el-table border :data="tableData" style="width: 100%; margin-top: 15px">
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <el-tag v-for="(tag, i) in scope.row.attr_vals" :key="i" closable @close="handleClose(i, scope.row)">{{ tag  }} </el-tag>
                  <el-input class="input-new-tag" v-if="scope.row.inputVisible" v-model="scope.row.inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(scope.row)" @blur="handleInputConfirm(scope.row)"></el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
                </template>
              </el-table-column>
              <el-table-column type="index"></el-table-column>
              <el-table-column label="参数名称" prop="attr_name">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" @click='xg(scope.row)' icon="el-icon-edit" size="mini">编辑</el-button>
                    <el-button type="danger"  @click='del(scope.row)' icon="el-icon-delete" size="mini">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </template>
    </el-card>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      value: [],
      options: [],
      props: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
      },
      activeName: 'many',
      flg: true,
      tableData: [],
      id: 0,
      dynamicTags: [],
      title: '',
      input: '',
      dialogVisible: false,
      filg:true,
      idd:0
    }
  },
  watch: {},
  computed: {},
  methods: {
    so() {
      window.sessionStorage.removeItem('val')
    },
    zc_cw(res,val,num,num1){
        if (res !== val) return this.$sa.error(num)
        this.$sa.success(num1)
    },
    async handleChange(value) {
      console.log(value.length)
     if(value.length ==3){
          this.flg = false
     }
      this.id = value
      const { data: res } = await this.$http.get('categories/' + this.id[2] + '/attributes',
        { params: { sel: this.activeName } }
      )
      res.data.forEach((item) => {
        item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
        item.inputVisible = false
        item.inputValue = ''
      })
       this.tableData = res.data
    },
    jttj(){
        this.dialogVisible = true
        this.title = '静态添加'
        this.filg=true
        this.activeName='only'
        this.input=''
    },
    dttj() {
      this.dialogVisible = true
      this.title = '动态添加'
      this.filg=true
      this.input=''
    },
    del(row){
        console.log(row);
        this.$http.delete('categories/'+this.id[2]+'/attributes/'+row.attr_id).then(res=>{
            this.zc_cw(res.data.meta.status,res.data.meta.status,'删除失败','删除成功')
            this.handleChange(this.id)
        })
    },
    xg(row){
        this.idd=row.attr_id
        this.dialogVisible = true
        this.activeName == 'many'?this.title='动态添加':this.title='静态添加'
        this.input=row.attr_name 
        this.filg=false
    },
    qr() {
      this.dialogVisible = false
     if(this.filg){
          this.$http.post('categories/'+this.id[2]+'/attributes', {
          attr_name:this.input,
          attr_sel:this.activeName
        }).then((res) => {
        this.zc_cw(res.data.meta.status,res.data.meta.status,'添加失败','添加成功')
         this.handleChange(this.id)
        })
     }else{
         this.$http.put('categories/'+this.id[2]+'/attributes/'+this.idd,{
            attr_name:this.input,
            attr_sel:this.activeName
        }).then(res=>{
           this.zc_cw(res.data.meta.status,res.data.meta.status,'修改失败','修改成功')
            this.handleChange(this.id)
        })
     }
    },
    sa() {
      this.$http.get('categories').then((res) => {
        this.options = res.data.data
      })
    },
    handleClick(tab, event) {
      
      console.log(tab._uid)
      tab._uid == 30 ? (this.activeName = 'many') : (this.activeName = 'only')
      this.handleChange(this.id)
   
    },
    handleClose(i,row) {
      row.attr_vals.splice(i, 1)
      this.tjsj(row)
    },

    showInput(row) {
       row.inputVisible = true;
     
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm(row) {
        console.log(row);
        row.attr_vals.push(row.inputValue);
        row.inputValue=''
        row.inputVisible = false
         this.tjsj(row)
    },
    tjsj(row){
         this.$http.put('categories/'+this.id[2]+'/attributes/'+row.attr_id,{
            attr_name:row.attr_name,
            attr_sel:this.activeName,
            attr_vals:row.attr_vals.join(' ')
        }).then(res=>{
            this.zc_cw(res.data.meta.status,res.data.meta.status,'更新失败','更新成功')
            this.handleChange(this.id)
        })
    }
  },
  created() {
    this.sa()
  },
  mounted() {},
}
</script>
<style lang="less" scoped>
.wrapper {
  padding: 10px;
}
.box-card {
  margin-top: 15px;
}
.block {
  margin-top: 10px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>