<template>
  <div class="reg-container">
    <el-card class="reg-body" shadow="always">
      <div class="reg-title"></div>
      <el-form ref="form" :model="form" :rules="rulesObj">
        <el-form-item class="reg-group" prop="username">
          <el-input class="account_name" placeholder="请输入用户名" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item class="reg-group" prop="password">
          <el-input type="password" class="password" placeholder="请输入密码" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item class="reg-group" prop="repassword">
          <el-input
            type="password"
            class="repeat_password"
            placeholder="请确认你的密码"
            v-model="form.repassword"
          ></el-input>
        </el-form-item>
        <div class="reg-group">
          <el-button type="primary" class="btn_register" @click="registerSubmit">注册</el-button>
          <router-link to="/login" class="jmp">去登陆</router-link>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { registerAPI } from '@/api'
export default {
  name: 'registerVue',
  data () {
    const samePwdFn = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('两次输入的密码不一致!'))
      } else {
        callback()
      }
    }
    const checkPass = (rule, value, callback) => {
      if (value.trim().length === 0) {
        callback(new Error('密码不能为空'))
      } else if (value.includes(' ')) {
        callback(new Error('密码不能包含空格'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: '',
        password: '',
        repassword: ''
      },
      rulesObj: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,10}$/, message: '用户名必须是1-10的数字或大小写字母', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: checkPass, trigger: 'blur' }
        ],
        repassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: samePwdFn, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    registerSubmit () {
      // 注册前进行兜底校验
      this.$refs.form.validate(async valid => {
        if (!valid) {
          return false // 阻止默认提交行为
        } else {
          const { data: res } = await registerAPI(this.form)
          if (res.code !== 0) return this.$message.error(res.message)
          this.$message.success(res.message)
          this.$router.push('/login')
        }
      })
    }
  },
  created () {}
}
</script>

  <style lang="less" scoped>
.reg-container {
  background: url("@/assets/images/login_bg.jpg") center;
  background-size: cover;
  height: 100%;
}
.reg-body {
  width: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 0 30px;
}
.reg-title {
  background: url("@/assets/images/login_title.png") no-repeat center;
  height: 30px;
}
.reg-group {
  margin: 30px 0;
}
.btn_register {
  width: 100%;
}
.jmp {
  display: inline-block;
  padding: 15px 0;
  text-decoration: none;
  color: #000;
}
.jmp:hover {
  color: rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid #ccc;
}
</style>
