<template>
  <div class="wrapper">
        <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/home' }"><span @click="so">首页</span></el-breadcrumb-item>
                <el-breadcrumb-item>订单管理</el-breadcrumb-item>
                <el-breadcrumb-item>订单参数</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
           <div style="width: 400px; position: relative">
                <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click='sa(1,10)'></el-button>
                </el-input>
            </div>
            <template>
                <el-table border :data="tableData" stripe style="width: 100%">
                    <el-table-column type='index' label="" width="50"></el-table-column>
                    <el-table-column prop="order_number" label="订单单号" ></el-table-column>
                    <el-table-column prop="order_price" label="订单价格" ></el-table-column>
                    <el-table-column  label="是否付款">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.pay_status==0" type="warning">未付款</el-tag>
                            <el-tag v-if="scope.row.pay_status==1">已付款</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="is_send" label="是否发货" ></el-table-column>
                    <el-table-column prop="update_time" label="下单时间" ></el-table-column>
                    <el-table-column label="操作" >
                        <template slot-scope="scope">
                            <el-button type="primary" @click="xg(scope.row)" icon="el-icon-edit" size="mini"></el-button>
                            <el-button type="warning" @click=del icon="el-icon-location" size="mini"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 15, 20, 25,30]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="zsj">
                </el-pagination>
            </div>
            <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
                <el-form label-width="100px">
                    <el-form-item label="省市区/县" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
                        <el-cascader :options="cityOptions"  @change="changeProvince" change-on-select style="width:100%;"></el-cascader>
                    </el-form-item>
                    <el-form-item label="详细地址" :rules="{required: true, message: '地址不能为空', trigger: 'blur'}">
                        <el-input v-model="value"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="qr">确 定</el-button>
                </span>
            </el-dialog>
        </el-card>
  </div>
</template>

<script>
import cityOptions from '../../assets/js/city_data2017_element.js'
export default {
  components: {},
  props: {},
  data() {
    return {
        tableData: [],
        input3:'',
        currentPage4: 1,
        zsj:0,
        mt:10,
        my:1,
        value:'',
        cityOptions: cityOptions,
        dialogVisible:false
    };
  },
  watch: {},
  computed: {},
  methods: {
    so() {
      window.sessionStorage.removeItem('val')
    },
    xg(row){
        this.dialogVisible=true
    },
    qr(){
        this.dialogVisible = false
        if(this.value!=''){
            this.$sa.success("修改成功")
        }else{
            this.$sa.error('修改失败')
        }
    },
    del(){
        this.$sa.warning('......正在维护中')
        
    },
    changeProvince(val){},
    handleClose(){
        this.dialogVisible=false
    },
    sa(my,mt){
        this.$http.get('orders',{
            params:{
                query:'',
                pagenum:my,
                pagesize:mt
            }
        }).then(res=>{
            this.tableData=res.data.data.goods
            this.zsj=res.data.data.total
        })
    },
     handleSizeChange(val) {
        this.mt=val
        this.sa(this.my,this.mt)
      },
      handleCurrentChange(val) {
        this.my=val
        this.sa(this.my,this.mt)
      }
  },
  created() {
    this.sa(this.my,this.mt)
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.wrapper{
    padding: 10px;
}
.box-card{
    margin-top: 15px;
}
.block{
    margin-top: 10px;
}
</style>