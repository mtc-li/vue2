<template>
  <el-dropdown trigger="click" @command="handleCommand">
    <div>
        <i class="el-icon-picture-outline"></i>
    </div>
    <el-dropdown-menu  slot="dropdown">
      <el-dropdown-item :disabled="this.$i18n.locale==='zh'" command="zh">中文</el-dropdown-item>
      <el-dropdown-item :disabled="this.$i18n.locale==='en'" command="en">EN</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  props: {

  },
  components: {

  },
  data () {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  created () {

  },
  methods: {
    handleCommand (type) {
      Cookie.set('language', type) // 存入缓存
      this.$i18n.locale = type
      this.$message.success('切换语言成功')
    }
  }
}
</script>

<style scoped lang="less">
.el-icon-picture-outline {
  font-size: 30px;
  color: #fff;
  margin-right: 20px;
}
</style>
