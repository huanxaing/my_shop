<template>
  <div class="wrapper">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }"
        ><span @click="so">首页</span></el-breadcrumb-item
      >
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>修改商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div style="text-align: left">
        <el-steps :active="active - 0" finish-status="success">
          <el-step title="基本信息"></el-step>
          <el-step title="商品参数"></el-step>
          <el-step title="商品属性"></el-step>
          <el-step title="商品图片"></el-step>
          <el-step title="商品内容"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
      </div>
      <template>
        <el-tabs
          :tab-position="tabPosition"
          @tab-click="handleClick"
          v-model="active"
        >
          <el-tab-pane name="0" label="基本信息">
            <el-form status-icon label-width="100px" class="demo-ruleForm">
              <el-form-item label="商品名称">
                <el-input type="text" v-model="tj.goods_name"></el-input>
              </el-form-item>
              <el-form-item label="商品价格" prop="checkPass">
                <el-input type="text" v-model="tj.goods_price"></el-input>
              </el-form-item>
              <el-form-item label="商品重量">
                <el-input type="text" v-model="tj.goods_weight"></el-input>
              </el-form-item>
              <el-form-item label="商品数量">
                <el-input type="text" v-model="tj.goods_number"></el-input>
              </el-form-item>
              <el-form-item label="商品分类">
                <div class="block">
                  <el-cascader
                    v-model="value"
                    :options="options"
                    :props="propss"
                    @change="handleChange"
                  ></el-cascader>
                </div>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane  name="1" label="商品参数">
            <div v-for="item in na" :key="item.attr_id">
              <el-tag style="margin-top: 20px">{{ item.attr_name }}</el-tag>
            </div>
          </el-tab-pane>
          <el-tab-pane  name="2" label="商品属性">
            <el-form
              v-for="item in na"
              :key="item.attr_id"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label=""
                >{{ item.attr_name }}
                <el-input type="text" v-model="item.attr_vals"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane  name="3" label="商品图片">
            <el-upload
              class="upload-demo"
              action="http://localhost:8888/api/private/v1/upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="cg"
              :file-list="fileList"
              :headers="header"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              {{flg}}
            </el-upload>
          </el-tab-pane>
          <el-tab-pane  name="4" label="商品内容">
              <quill-editor
              ref="myQuillEditor"
              v-model="tj.goods_introduce"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
            />
            <el-button type="primary" @click="qr">确认</el-button>
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
      props: ['id'],
      active: '0',
      tabPosition: 'left',
      value: [],
      options: [],
      fileList: [],
      propss: {
        label: 'cat_name',
        children: 'children',
        value: 'cat_id',
      },
       editorOption: {
          // Some Quill options...
        },
      tj: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: [],
      },
      fl: 'many',
      na: [],
      id: 0,
      ids: 0,
      num:0,
      flg:'',
      header: {
        Authorization: window.sessionStorage.getItem('token'),
      },
      num2:''
    }
  },
  computed: {},
  methods: {
    so() {
      window.sessionStorage.removeItem('val')
    },
    handleRemove(file, fileList) {
      this.tj.pics=fileList
      console.log(this.tj.pics);
    },
    handlePreview(file) {
      console.log(file)
    },
    cg(file) {
      console.log(file)
      this.tj.pics.push({
        pic: file.data.tmp_path,
      })
    },
    handleClick(tab, event) {
      console.log(tab)
      tab.index == '1' ? (this.fl = 'many') : (this.fl = 'only')
      this.handleChange(this.id)
    },
    qr() {
        this.$http.put('goods/'+this.num,this.tj).then(res=>{
            console.log(res);
            this.$router.push('/goods')
            this.$sa.success('修改成功')
        })
    },
    next() {
      this.$http.get('categories').then((res) => {
        this.options = res.data.data
      })
    },
    handleChange(value) {
      this.ids = this.value.join(',')
      console.log(this.value);
      this.$http
        .get('categories/' + this.value[2] + '/attributes', {
          params: {
            sel: this.fl,
          },
        })
        .then((res) => {
          console.log(res.data.data)
          this.na = res.data.data
        })
    },
     onEditorBlur(quill) {
        console.log('editor blur!', quill)
      },
      onEditorFocus(quill) {
        console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        console.log('editor ready!', quill)
      },
  },
  created() {
      this.next()
      console.log(this.$route.params.id);
      this.$http.get('goods/'+this.$route.params.id).then(res=>{
          console.log(res);
          this.tj=res.data.data
          this.num = res.data.data.goods_id
          this.value=[res.data.data.cat_one_id,res.data.data.cat_two_id,res.data.data.cat_three_id]
          console.log(this.tj);
          res.data.data.pics.forEach(val => {
              this.fileList.push({name:val.pics_big,url:val.pics_sma_url})
          });
          console.log(this.fileList);
      })
  },
  mounted() {

  },
}
</script>
<style lang="less" scoped>
.wrapper {
  padding: 10px;
}
.box-card {
  margin-top: 15px;
  width: 1324px;
}
.el-tabs {
  margin-top: 20px;
}
.el-form {
  line-height: 50px;
}
.el-step__icon is-text {
  position: absolute;
}
</style>