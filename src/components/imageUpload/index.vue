<template>
  <div>
      <el-upload
       list-type="picture-card"
       :limit="1"
       action="#"
       :on-preview="preview"
       :on-remove="handleRemove"
       :file-list="fileList"
       :on-change="change"
       :before-upload="beforeUpload"
       :class="{disabled:fileComputed}"
       :http-request="upload"
    >
      <i class="el-icon-plus"></i>
      </el-upload>
      <el-progress v-if="showpercen" :percentage="percen" style="width:180px"></el-progress>
      <el-dialog :visible.sync="showDialog" title="图片预览">
        <img :src="imgUrl" alt="" style="width:100%">
      </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5' // 引入腾讯云sdk
const cos = new COS({
  SecretId: 'AKID96qKYVCthUF2g8NacRvlP2Zs8NuENPGw',
  SecretKey: 'iCRV5WkliV4YyOl04D8uTq11znNjqjLj'
})
export default {
  props: {

  },
  components: {

  },
  data () {
    return {
      currentFileUid: null, // 上传图片的Uid
      imgUrl: '',
      showDialog: false,
      fileList: [],
      percen: 0, // 进度条当前百分比
      showpercen: false

    }
  },
  computed: {
    fileComputed () {
      return this.fileList.length === 1
    }
  },
  watch: {

  },
  created () {

  },
  methods: {
    preview (file) {
      // console.log(file)
      this.imgUrl = file.url
      this.showDialog = true
    },
    handleRemove (file, fileList) {
      console.log(file)
      console.log(fileList)
      console.log(this.fileList)
      // this.fileList = fileList
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)

      console.log(this.fileList)
    },
    change (file, fileList) {
      // 返回的是当前文件
      // console.log(file)
      // 返回的是最新数组
      // console.log(fileList)
      // console.log(123)

      this.fileList = fileList.map(item => item)
    },
    // 上传文件之前的钩子，控制图片大小类型
    beforeUpload (file) {
      // console.log(file)

      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      // 1M = 1024kB  1kB = 1024B
      const maxSize = 5 * 1024 * 1024
      if (!types.some(item => item === file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      if (file.size > maxSize) {
        this.$message.error('错误')
        return false
      }

      this.currentFileUid = file.uid
      this.showpercen = true // 开进度条
      return true // 最后一定要return  true ,不然会返回false
    },
    upload (params) {
      // console.log(1111111, params.file)
      if (params.file) {
        cos.putObject({
          Bucket: 'mtc-888-1317695233', /* 填入您自己的存储桶，必须字段 */
          Region: 'ap-nanjing', /* 存储桶所在地域，例如ap-beijing，必须字段 */
          Key: params.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
          Body: params.file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
          StorageClass: 'STANDARD', // 上传的模式类型，直接默认 标准模式即可
          onProgress: (params) => {
            // console.log(params)
            this.percen = params.percent * 100
          }
        }, (err, data) => {
          if (!err && data.statusCode === 200) {
            this.fileList = this.fileList.map(item => {
              if (item.uid === this.currentFileUid) {
                return { url: 'http://' + data.Location, upload: true }
              }
              // 走不到下面
              console.log(item)
              return item
            })
            setTimeout(() => {
              this.showpercen = false // 关进度条
              this.percen = 0 // 重置百分比
            }, 1000)
          }

          // console.log(this.fileList)
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
 /deep/.disabled .el-upload--picture-card {
     display: none
 }
</style>
