<template>
  <div class="aside-container">
    <el-menu router
      :collapse="isCollapse"
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      text-color="#fff"
      background-color="#5b8cff"
      active-text-color="#ffd04b">
       <el-menu-item >
         <img src="@/assets/common/logo.png"  :class="{titleImg:isCollapse}">
      </el-menu-item>
      <el-submenu index="$route.path">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="'/product'">列表</el-menu-item>

        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
    ...mapGetters(['isCollapse'])
  },
  watch: {

  },
  created () {
    console.log(this.$route)
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped lang="less">
.aside-container {
  height: 100%;
  .el-menu-vertical-demo {
      border:0;
     height:100%;
     background: url('~@/assets/common/leftnavBg.png') no-repeat 0 100%;
     i {
       font-size: 22px;
       color:#fff;
     }
  }
   /deep/.el-menu-item-group__title {
    padding:0;
  }
  /deep/  li:hover {
    background-color: khaki !important;
  }
  /deep/.el-submenu__title:hover {
  background-color:khaki !important;
  }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
  .titleImg {
    width: 30px;
    height: 30px;
  }
}
</style>
