<template>
  <el-card>
    <div slot="header" class="clearfix">更换头像</div>
        <img v-if="!avatar" class="target-img" src="@/assets/images/avatar.jpg" alt="" />
        <img v-else :src="avatar" class="target-img" alt="头像预览">
        <div class="btn-box">
          <input type="file" accept="image/*" style="display: none" ref="profileSub" @change="fileChange">
          <el-button type="primary" icon="el-icon-plus" @click="choosePic">选择图片</el-button>
          <el-button type="success" icon="el-icon-upload" :disabled="isChosen" @click="subPic">上传头像</el-button>
        </div>
  </el-card>
</template>

<script>
import { subUserProfileAPI } from '@/api'
export default {
  name: 'updateProfileVue',
  data () {
    return {
      avatar: '' // 保存图片链接或base64字符串
    }
  },
  computed: {
    isChosen () {
      if (this.avatar.length === 0) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    choosePic () {
      this.$refs.profileSub.click()
    },
    fileChange (e) {
      const files = e.target.files
      if (files.length === 0) {
        return 0
      } else {
        // 获取文件信息，并显示预览
        // 不能直接把文件放到img的src里面，src只能接受url链接或者base64字符串
        // 解决方案1：文件->内存临时地址（这个地址只能在js内存里，不能发给后台）
        // 创建方式: URL.createObjectURL(文件)
        // 返回内存临时地址
        // this.avatar = URL.createObjectURL(files[0])

        // 解决方案2： 把文件转成base64字符串
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.onload = e => {
          this.avatar = e.target.result
        }
      }
    },
    async subPic () {
      console.log(this.avatar)
      const { data: res } = await subUserProfileAPI(this.avatar)
      if (res.code !== 0) {
        console.log(res.code)
        return this.$message.error(res.message)
      } else {
        this.$message.success(res.message)
        this.$store.dispatch('initUserInfo')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.btn-box {
  margin-top: 30px;
}
</style>
