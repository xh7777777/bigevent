<template>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>重置密码</span>
      </div>
      <el-form
        :model="pwdForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="ruleForm"
      >
        <el-form-item label="原密码" prop="old_pwd">
          <el-col :span="8">
            <el-input type="password" v-model="pwdForm.old_pwd"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="新密码" prop="new_pwd">
          <el-col :span="8">
            <el-input
             type="password"
              v-model="pwdForm.new_pwd"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="确认新密码" prop="re_pwd">
          <el-col :span="8">
            <el-input type="password" v-model="pwdForm.re_pwd"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updatePwd()" style="width:8rem"
            >修改密码</el-button
          >
          <el-button @click="resetForm()" style="width:8rem">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
</template>

<script>
import { updatePwdAPI } from '@/api'
export default {
  name: 'userPasswordVue',
  data () {
    const checkPass = (rule, value, callback) => {
      if (value.trim().length === 0) {
        callback(new Error('密码不能为空'))
      } else if (value.includes(' ')) {
        callback(new Error('密码中不能包含空格'))
      } else {
        callback()
      }
    }
    const samePwdFn = (rule, value, callback) => {
      if (value !== this.pwdForm.new_pwd) {
        callback(new Error('两次输入的密码不一致!'))
      } else if (value === this.pwdForm.old_pwd) {
        callback(new Error('修改的密码不能和原密码一致'))
      } else {
        callback()
      }
    }
    return {
      pwdForm: {
        old_pwd: '',
        new_pwd: '',
        re_pwd: ''
      },
      rules: {
        old_pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: checkPass, trigger: 'blur' }
        ],
        new_pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: checkPass, trigger: 'blur' }
        ],
        re_pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: samePwdFn, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm () {
      this.$refs.ruleForm.resetFields()
    },
    async updatePwd () {
      const { data: res } = await updatePwdAPI(this.pwdForm)
      if (res.code !== 0) {
        this.$message.error(res.message)
      } else {
        this.$message.success(res.message)
        for (const item in this.pwdForm) {
          this.pwdForm[item] = ''
        }
      }
    }
  }
}
</script>

<style scoped>
.el-form{
    width: 80rem;
}
</style>
