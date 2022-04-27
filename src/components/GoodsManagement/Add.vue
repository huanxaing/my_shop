<template>
  <div class="wrapper">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }"
        ><span @click="so">首页</span></el-breadcrumb-item
      >
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
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
                    :props="props"
                    @change="handleChange"
                  ></el-cascader>
                </div>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane :disabled="flg" name="1" label="商品参数">
            <div v-for="item in na" :key="item.attr_id">
              <el-tag style="margin-top: 20px">{{ item.attr_name }}</el-tag>
            </div>
          </el-tab-pane>
          <el-tab-pane :disabled="flg" name="2" label="商品属性">
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
          <el-tab-pane :disabled="flg" name="3" label="商品图片">
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
            </el-upload>
          </el-tab-pane>
          <el-tab-pane :disabled="flg" name="4" label="商品内容">
            <quill-editor
              ref="myQuillEditor"
              v-model="content"
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
      active: '0',
      tabPosition: 'left',
      value: [],
      options: [],
      fileList: [],
      props: {
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
      flg: true,
      na: [],
      id: 0,
      ids: 0,
      content:'',
      header: {
        Authorization: window.sessionStorage.getItem('token'),
      },
    }
  },
  watch: {},
  computed: {},
  methods: {
    so() {
      window.sessionStorage.removeItem('val')
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
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
      tab._uid == 56 ? (this.fl = 'many') : (this.fl = 'only')
      this.handleChange(this.id)
    },
    qr() {
      console.log(this.tj)
      this.tj.goods_cat = this.ids
      this.tj.goods_introduce=this.content
      this.$http.post('goods', this.tj).then((res) => {
        console.log(res)
        this.active += 2
        this.$router.push('/goods')
        this.$sa.success('添加成功')
      })
    },
    next() {
      this.$http.get('categories').then((res) => {
        this.options = res.data.data
      })
    },
    handleChange(value) {
      this.id = value
      this.ids = this.id.join(',')
      this.$http
        .get('categories/' + this.id[2] + '/attributes', {
          params: {
            sel: this.fl,
          },
        })
        .then((res) => {
          console.log(res.data.data)
          this.na = res.data.data
          this.flg = false
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