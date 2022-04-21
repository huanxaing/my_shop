<template>
  <div class="wrapper">
    <template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <!-- slot-scope="props" -->
          <template slot-scope="scope">
            <el-row
              type="flex"
              class="row-bg"
              justify="space-around"
              :key="item.id"
              v-for="item in scope.row.children"
            >
              <el-col :span="6"
                ><div class="grid-content bg-purple">
                  <el-tag>{{ item.authName }}</el-tag>
                </div></el-col
              >
              <el-col :span="18">
                <el-row
                  type="flex"
                  :key="item1.id"
                  v-for="item1 in item.children"
                >
                  <el-col :span="8">
                    <div class="grid-content bg-purple">
                      <el-tag closable type="success">{{
                        item1.authName
                      }}</el-tag>
                    </div>
                  </el-col>
                  <el-col :span="16" style="display: flex; flex-wrap: wrap">
                    <div
                      class="grid-content bg-purple"
                      :key="item2.id"
                      v-for="item2 in item1.children"
                    >
                      <el-tag closable  @close="del(scope.row,item2.id)" type="info" style="margin-left: 10px">{{
                        item2.authName
                      }}</el-tag>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="角色名称" prop="roleName"> </el-table-column>
        <el-table-column label="角色列表" prop="roleDesc"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="warning" @click="qx(scope.row)"
              >分配角色权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-dialog
      title="权限"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="qxxs"
        :props="defaultProps"
        ref='tree'
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="qr"
          >确 定</el-button
        >
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
      qxxs:[],
      ids:'',
      dialogVisible: false,
      data: [],
        defaultProps: {
          children: 'children',
          label: 'authName'
        }
    }
  },
  watch: {},
  computed: {},
  methods: {
    sa() {
      this.$http.get('roles').then((res) => {
        console.log(res.data.data)
        this.tableData = res.data.data
      })
    },
    qr(){
      this.dialogVisible = false
      console.log(this.$refs.tree.getCheckedKeys());
      this.$http.post('roles/'+this.ids+'/rights',{
        rids:this.$refs.tree.getCheckedKeys().join(',')
      }).then(res=>{
        console.log(res);
        this.sa()
      })
    },
    del(row,idd){
      this.$http.delete('roles/'+row.id+'/rights/'+idd).then(res=>{
        console.log(res);
        row.children = res.data.data
      })
    },
    qx(row) {
      // console.log(row)
      this.ids=row.id
      this.dialogVisible = true
      this.qxxs=[]
      row.children.forEach(val => {
        val.children.forEach(val1 =>{
          val1.children.forEach(val2 =>{
            this.qxxs.push(val2.id)
          })
        })
      });
      this.$http.get('rights/tree').then(res=>{
        console.log(res);
        this.data = res.data.data
      })
    },
    handleClose(){
      this.dialogVisible=false
    }
  },
  created() {
    this.sa()
  },
  mounted() {},
}
</script>
<style  scoped>
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
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  margin-top: 10px;
  margin-left: 10px;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-row {
  margin-bottom: 20px;
}
</style>