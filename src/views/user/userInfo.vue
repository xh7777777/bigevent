<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基本资料</span>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="ruleForm"
      >
        <el-form-item label="登录名称" prop="name">
          <el-col :span="8">
            <el-input v-model="ruleForm.name" disabled></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="用户名称" prop="nickname">
          <el-col :span="8">
            <el-input
              v-model="ruleForm.nickname"
              maxlength="10"
              minlength="1"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-col :span="8">
            <el-input v-model="ruleForm.email"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()"
            >提交修改</el-button
          >
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { subUserInfoAPI } from '@/api'
export default {
  name: 'userInfo',
  data () {
    return {
      ruleForm: {
        name: this.$store.state.userInfo.username,
        nickname: '',
        email: ''
      },
      rules: {
        nickname: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '昵称必须是1-10位的非空字符串', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.ruleForm.validate(async (valid, error) => {
        if (valid) {
          this.ruleForm.id = this.$store.state.userInfo.id
          const { data: res } = await subUserInfoAPI(this.ruleForm)
          this.$message.success(res.message)
          this.$store.dispatch('initUserInfo') // 更新用户信息
        } else {
          this.$message.error('更新失败')
        }
      })
    },
    resetForm () {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style>
</style>
