<template>
      <el-container class ="main-container">
        <!-- 头部导航 -->
        <el-header>
          <img src="@/assets/images/logo.png" alt="" />
          <el-menu
            class="el-menu-top"
            mode="horizontal"
            background-color="#23262E"
            text-color="fff"
            active-text-color="#409EFF"
          >
            <el-submenu index="1">
              <template slot="title">
                <img src="@/assets/images/logo.png" alt="" class="avatar">
                <span>个人中心</span>
              </template>
              <el-menu-item index="1-1"><i class="el-icon-s-operation"></i>基本资料</el-menu-item>
              <el-menu-item index="1-2"><i class="el-icon-camera"></i>更换头像</el-menu-item>
              <el-menu-item index="1-3"><i class="el-icon-key"></i>重置密码</el-menu-item>
            </el-submenu>
            <el-menu-item index="2" @click="logout"><i class="el-icon-switch-button"></i>退出</el-menu-item>
          </el-menu>
        </el-header>
        <el-container>
          <el-aside width="200px">Aside</el-aside>
          <el-container>
            <el-main>Main</el-main>
            <el-footer>Footer</el-footer>
          </el-container>
        </el-container>
      </el-container>
  </template>

<script>
export default {
  name: 'layoutVue',
  methods: {
    logout () {
      // 弹出确认提示框
      this.$confirm('确定退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        // 清除token
        this.$store.commit('updateToken', '')
        // 跳转到登陆页面
        this.$router.push('/login')
      }).catch(() => {
      })
    }

  }
}
</script>
<style lang="less" scoped>
  .main-container {
  height: 100%;
  .el-header,
  .el-aside {
    background-color: #23262e;
  }
  .el-header {
    padding: 0;
    display: flex;
    justify-content: space-between;
  }
  .el-main {
    overflow-y: scroll;
    height: 0;
    background-color: #F2F2F2;
  }
  .el-footer {
    background-color: #eee;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.avatar {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background-color: #fff;
  margin-right: 10px;
  object-fit: cover;
}
</style>
