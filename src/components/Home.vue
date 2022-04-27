<template>
  <div class="wrapper">
    <el-container>
      <el-header>
        <img src="../assets/heima.png" alt="" />
        <span>电商管理后台系统</span>
        <button @click="ht">退出</button>
      </el-header>
      <el-container>
        <el-aside :width="flg ==true?50+'px':200+'px'">
            <div class="sf" @click="flg = !flg">|||</div>
          <el-col>
            <el-menu
              :default-active="vall"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              unique-opened
              :collapse='flg'
              router
            >
              <el-submenu :key="index" :index="index+''" v-for="(item,index) in arr">
                <template slot="title">
                  <i :class="arr1[index]"></i>
                  <span>{{item.authName}}</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item :key="item1.id" :index="'/'+item1.path" v-for="item1 in item.children" @click="sk('/'+item1.path)">{{item1.authName}}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
        arr:[],
        flg:false,
        vall:'',
        arr1:['el-icon-location','el-icon-s-goods','el-icon-s-promotion','el-icon-s-opportunity','el-icon-mouse']
    }
  },
  watch: {},
  computed: {},
  methods: {
    ht() {
      // 清空token
      window.sessionStorage.clear()
      // 跳转到登录界面
      this.$router.push('/login')
    },
     handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      async sa(){
          const {data:res}=await this.$http.get('menus')
          console.log(res.data);
          this.arr = res.data
      },
      sk(val){     
         window.sessionStorage.setItem('val',val)
         this.vall = window.sessionStorage.getItem('val')
      }
  },
  created() {
      this.sa()
      this.vall = window.sessionStorage.getItem('val')
  },
  mounted() {},
}
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
  span {
    position: absolute;
    left: 5%;
    color: white;
  }
  button {
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
  // text-align: center;
  
  padding: 0;
}
.el-container {
  height: 100%;
}
.el-menu{
    border: 0;
}
body > .el-container {
  margin-bottom: 40px;
}
.sf{
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: #545c64;
    color: white;
}
</style>