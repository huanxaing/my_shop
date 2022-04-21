<template>
  <div class="wrapper">
    <div class="box">
      <div class="toux">
        <img src="../assets/logo.png" alt="" />
      </div>
      <div class="biaodan">
        <el-form label-width="100px" class="demo-ruleForm">
          <el-form-item label="账号" >
            <el-input prefix-icon="el-icon-user-solid" v-model="ruleForm.username" type="text" ></el-input>
          </el-form-item>
          <el-form-item label="密码" >
            <el-input prefix-icon="iconfont icon-mima" v-model="ruleForm.password" type="text"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button style="margin-left:150px;" @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() { 
    return {
       ruleForm:{
            username:'admin',
            password:'123456'
       }
      };
  },
  methods: { 
     async submitForm() {
       const {data:res}= await this.$http.post('login',this.ruleForm)
        console.log(res.data);
        if(res.meta.status !==200) return this.$sa.error("登录失败")
        this.$sa.success("登陆成功")
        // token 只在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
        window.sessionStorage.setItem('token',res.data.token)
         window.sessionStorage.removeItem('val')
        // 通过编程导航跳转到后台主页，路由地址是 /home
        this.$router.push('/home')
      },
      resetForm() {
      this.ruleForm.username='' 
      this.ruleForm.password='' 
      }
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  background: #2b4b6b;
  height: 100%;
}
.box {
  width: 450px;
  height: 350px;
  background: white;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .toux {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: white;
    position: absolute;
    left: 50%;
    box-shadow: 0 0 10px rgb(27, 26, 26);
    transform: translate(-50%, -50%);
    img {
      width: 110px;
      border-radius: 50%;
      background: #dedede;
      margin: 5px;
    }
  }
  .biaodan{
        width: 400px;
        height: 200px;
        transform: translateY(50%);
    }
}

</style>