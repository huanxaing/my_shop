<template>
  <div class="wrapper">
    <el-container>
      <el-header>
        <img src="../assets/heima.png" alt="" />
        <span>电商管理后台系统</span>
        <button @click=ht>退出</button>
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
      ht(){
          // 清空token
          window.sessionStorage.clear()
          // 跳转到登录界面
          this.$router.push('/login')
      }
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-header {
  img {
    position: absolute;
    left: 10px;
    height: 40px;
    top: 10px;
  }
  span{
      position: absolute;
      left: 5%;
      color: white;
  }
  button{
      height: 30px;
      width: 90px;
      position: absolute;
      right: 20px;
      top: 15px;
  }
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.wrapper {
  height: 100%;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.el-container {
  height: 100%;
}
body > .el-container {
  margin-bottom: 40px;
}
</style>