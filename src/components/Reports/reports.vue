<template>
  <div class="wrapper">
    <h3>数据报表</h3>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }"><span @click="so">首页</span></el-breadcrumb-item>
        <el-breadcrumb-item>数据统计</el-breadcrumb-item>
        <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
        <div class="box"></div>
    </el-card>

  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  components: {},
  props: {},
  data() {
    return {
        arr:[],
        arr1:[]
    };
  },
  watch: {},
  computed: {},
  methods: {
    so() {
      window.sessionStorage.removeItem('val')
    },
    sa(){
        this.$http.get('reports/type/1').then(res=>{
            console.log(res);
            this.arr1 = res.data.data.series.map(val=>{
                return val.name
            })
            console.log(this.arr1);
            this.arr=res.data.data.xAxis[0].data
            var myChart = echarts.init(document.querySelector('.box'))
        var option = {
            title: {
                text: '用户来源'
            }, 
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
                }
            },
            legend: {
                data: this.arr1
            },
            toolbox: {
                feature: {
                saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                type: 'category',
                boundaryGap: false,
                data: this.arr
                }
            ],
            yAxis: [
                {
                type: 'value'
                }
            ],
            series: [
                {
                name: this.arr1[0],
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: res.data.data.series[0].data
                },
                {
                name: this.arr1[1],
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: res.data.data.series[1].data
                },
                {
                name: this.arr1[2],
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: res.data.data.series[2].data
                },
                {
                name: this.arr1[3],
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: res.data.data.series[3].data
                },
                {
                name: this.arr1[4],
                type: 'line',
                stack: 'Total',
                label: {
                    show: true,
                    position: 'top'
                },
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
               
                },
                 {
                name: this.arr1[4],
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: res.data.data.series[4].data
                },
            ]
            };
             myChart.setOption(option);
        })

        
    }
  },
  created() {},
  mounted() {
      this.sa()
  }
};
</script>
<style lang="less" scoped>
.wrapper{
    padding: 10px;
}
.box-card{
    margin-top: 15px;
}
.box{
    width: 42.1941rem;
    height: 28.1294rem;
}
</style>