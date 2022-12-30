<template>
  <div class="reg-container">
    <el-card class="reg-body" shadow="always">
      <div class="reg-title"></div>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
        <el-form-item class="reg-group" prop="username">
          <el-input v-model="loginForm.username" class="account_name" placeholder="请输入用户名" maxlength="10" minlength="1"></el-input>
        </el-form-item>
        <el-form-item class="reg-group" prop="password">
          <el-input class="password"
          placeholder="请输入密码"
          v-model="loginForm.password"
          type="password"
          maxlength="15"
          minlength="6"
          ></el-input>
        </el-form-item>
        <el-form-item class="reg-group">
          <el-button type="primary" class="btn_register" @click="loginSubmit">登录</el-button>
          <router-link to="/register" class="jmp">去注册</router-link>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { loginAPI } from '@/api'
import { mapMutations } from 'vuex'
export default {
  name: 'loginVue',
  data () {
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
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,10}$/, message: '用户名必须是1-10的数字或大小写字母', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: checkPass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['updateToken']),
    loginSubmit: function () {
      this.$refs.loginForm.validate(async valid => {
        if (!valid) {
          return false
        } else {
          const { data: res } = await loginAPI(this.loginForm)
          if (res.code !== 0) {
            this.$message.error(res.message)
          } else {
            this.$message.success(res.message)
            this.updateToken(res.token)
          }
        }
      })
    }
  }
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
