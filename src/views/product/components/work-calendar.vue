<template>
  <div>
    <el-row type="flex" justify="end">
      <el-select @change="dataChange" v-model="currentYear" size="small" style="width:120px">
          <el-option
              v-for="item in yearList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
      </el-select>
      <el-select @change="dataChange" v-model="currentMonth" size="small"  style="width:120px;margin-left:10px">
           <el-option
              v-for="item in 12"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
      </el-select>
    </el-row>
    <el-calendar v-model="currentDate">
      <template v-slot:dateCell="{date,data}">
          <div class="date-content">
          <span class="text"> {{ data.day | getDay }}</span>
           <span v-if="isWeek(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  props: {
    startDate: {
      type: Date,
      // 回调函数式的返回值
      default: () => new Date() // 如果没有传递startDate 就取当前时间
    }
  },
  components: {

  },
  data () {
    return {
      yearList: [],
      currentYear: null, // 当前年份
      currentMonth: null,
      currentDate: null // 当前时间

    }
  },
  computed: {

  },
  watch: {

  },
  created () {
    this.currentYear = this.startDate.getFullYear() // 得到当前的年份
    this.currentMonth = this.startDate.getMonth() + 1// 得到当前月份
    console.log(this.currentYear)
    console.log(this.currentMonth)
    // 通过 Array创建一个数组
    this.yearList = Array.from(Array(11), (v, i) => this.currentYear + i - 5)
    this.dataChange()
  },
  methods: {
    dataChange () {
      this.currentDate = new Date(`${this.currentYear}-${this.currentMonth}-1`)
    },
    isWeek (date) {
      return date.getDay() === 6 || date.getDay() === 0
    }
  },
  filters: {
    getDay (value) {
      const day = value.split('-')[2]
      // 如果以0位开头，就重第一个开始截取
      return day.startsWith('0') ? day.substr(1) : day
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .el-calendar-day {
  height:  auto;
 }
 /deep/ .el-calendar-table__row td,/deep/ .el-calendar-table tr td:first-child,  /deep/ .el-calendar-table__row td.prev{
  border:none;
 }
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
 display: inline-block;

}
 /deep/ .el-calendar-table td.is-selected .text{
   background: #409eff;
   color: #fff;
   border-radius: 50%;
 }
 /deep/ .el-calendar__header {
   display: none
 }
</style>
