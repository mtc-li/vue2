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

      <!-- <template v-for="(item,index) in $router.options.routes">
          <el-submenu :index="index + ''"  :key="index" v-if="!item.hidden">
              <template slot="title">
                <i :class="item.iconClass"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item-group v-for="(child,index) in item.children" :key="index" >
                <el-menu-item :index="child.path" >
                   <i :class="child.iconClass"></i>
                  {{child.meta.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            item.children[0].meta.title
      </template> -->
        <div  v-for="(item,index) in routes" :key="index" >
          <el-menu-item  v-if="!item.hidden" :index="item.path">
              <i :class="item.children[0].meta.icon"></i>
              <span slot="title">{{$t('route.' + item.children[0].name)}}</span>
            </el-menu-item>
        </div>

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
      menus: [],
      list: []
    }
  },
  computed: {
    ...mapGetters(['isCollapse', 'routes'])
  },
  watch: {

  },
  created () {
    // console.log(this.$router.options.routes)
    // console.log(this.routes)
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
       margin-right:10px;
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
