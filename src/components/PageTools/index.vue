<template>
  <el-card class="page-tools">
      <el-row type="flex" justify="space-between" align="middle">
          <!-- 前 -->
          <el-col>
              <div class="before" v-if="showBefore">
                   <i class="el-icon-s-tools"></i>
                    <slot name="before">
                    </slot>
              </div>
          </el-col>

              <!-- 后 -->

              <el-col>
                  <el-row type="flex" justify="end">
                    <slot  name="after"></slot>
                  </el-row>
              </el-col>

      </el-row>

  </el-card>
</template>

<script>
export default {
  props: {
    showBefore: {
      default: false,
      type: Boolean
    }
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

  }
}
</script>

<style scoped lang="less">
.page-tools {
    margin: 10px 0;
    .before {
      line-height: 34px;
    i {
      margin-right: 5px;
      color: #409eff;
    }
    display: inline-block;
    padding: 0px 10px;
    border-radius: 3px;
    border: 1px solid rgba(145, 213, 255, 1);
    background: rgba(230, 247, 255, 1);
  }
 }
</style>
