<template>
  <div class="wrapper">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }"
        ><span @click="so">首页</span></el-breadcrumb-item
      >
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div>
        <div style="width: 300px; position: relative">
          <el-input
            placeholder="请输入内容"
            v-model="input3"
            class="input-with-select"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="sa(mt, my)"
            ></el-button>
          </el-input>
          <div class="sl">
            <el-button type="primary" size="medium" @click="tjyh"
              >添加商品</el-button
            >
          </div>
        </div>
      </div>
      <template>
        <el-table
          border
          :data="tableData"
          stripe
          style="width: 100%; margin-top: 10px"
        >
          <el-table-column type="index" label="#"> </el-table-column>
          <el-table-column prop="goods_name" label="商品名称" width="650">
          </el-table-column>
          <el-table-column prop="goods_price" label="商品价值(元)">
          </el-table-column>
          <el-table-column prop="goods_weight" label="商品质量">
          </el-table-column>
          <el-table-column prop="add_time" label="创建时刻"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click="tz(scope.row)"
                icon="el-icon-edit"
                circle
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="del(scope.row)"
                circle
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[5, 10, 15, 20, 25, , 30]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="zsj"
        >
        </el-pagination>
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
      currentPage4: 1,
      zsj: 0,
      my: 1,
      mt: 5,
      input3: '',
    }
  },
  watch: {},
  computed: {},
  methods: {
    so() {
      window.sessionStorage.removeItem('val')
    },
    tz(row) {
      this.$router.push('/update/' + row.goods_id)
    },
    add(m) {
      return m < 10 ? '0' + m : m
    },
    format(shijianchuo) {
      //shijianchuo是整数，否则要parseInt转换
      var time = new Date(shijianchuo)
      var y = time.getFullYear()
      var m = time.getMonth() + 1
      var d = time.getDate()
      var h = time.getHours()
      var mm = time.getMinutes()
      var s = time.getSeconds()
      return (
        y +
        '-' +
        this.add(m) +
        '-' +
        this.add(d) +
        ' ' +
        this.add(h) +
        ':' +
        this.add(mm) +
        ':' +
        this.add(s)
      )
    },
    del(row) {
      this.$sd('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$http.delete('goods/' + row.goods_id).then((res) => {
            console.log(res)
            this.sa(this.mt, this.my)
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
    handleSizeChange(val) {
      this.mt = val
      this.sa(this.mt, this.my)
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.my = val
      this.sa(this.mt, this.my)
      console.log(`当前页: ${val}`)
    },
    sa(mt, my) {
      this.$http
        .get('goods', {
          params: {
            query: this.input3,
            pagenum: my,
            pagesize: mt,
          },
        })
        .then((res) => {
          console.log(res)
          this.zsj = res.data.data.total
          var temp = res.data.data.goods
          console.log(temp)
          this.tableData = temp
          // 将时间戳转换为日期格式
          for (var i = 0; i < temp.length; i++) {
            temp[i].add_time = this.format(temp[i].add_time)
          }
        })
    },
    tjyh() {
      this.$router.push('/add')
    },
  },
  created() {
    this.sa(this.mt, this.my)
  },
  mounted() {},
}
</script>
<style lang="less" scoped>
.wrapper {
  padding: 10px;
}
.box-card {
  width: 1224px;
  background: white;
  margin-top: 10px;
}
.sl {
  position: absolute;
  top: 0;
  margin-left: 320px;
}
.block {
  margin-top: 10px;
}
</style>