<template>
  <el-container class="main-container">
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
            <img src="@/assets/images/logo.png" alt="" class="avatar" />
            <span>个人中心</span>
          </template>
          <el-menu-item index="1-1"
            ><i class="el-icon-s-operation"></i>基本资料</el-menu-item
          >
          <el-menu-item index="1-2"
            ><i class="el-icon-camera"></i>更换头像</el-menu-item
          >
          <el-menu-item index="1-3"
            ><i class="el-icon-key"></i>重置密码</el-menu-item
          >
        </el-submenu>
        <el-menu-item index="2" @click="logout"
          ><i class="el-icon-switch-button"></i>退出</el-menu-item
        >
      </el-menu>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <div class="user-box">
          <img :src="user_pic" alt="" v-if="user_pic" />
          <img src="@/assets/images/logo.png" alt="" v-else />
          <span>欢迎 {{ nickname || username }}</span>
        </div>
        <el-row class="tac">
          <el-col>
            <el-menu
              :default-active="$route.path"
              class="el-menu-vertical-demo"
              background-color="#23262E"
              text-color="#fff"
              active-text-color="#409EFF"
              unique-opened
              router
            >
              <template v-for ="item in menus">
                <el-menu-item v-if="!item.children" :index="item.indexPath" :key="item.indexPath">
                  <i :class="item.icon"></i>
                  <span>{{item.title}}</span>
                </el-menu-item>
                <el-submenu v-else :index="item.indexPath" :key="item.title">
                  <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{item.title}}</span>
                  </template>
                  <el-menu-item v-for="child in item.children" :index="child.indexPath" :key="child.indexPath">
                    <i :class="child.icon"></i>
                    <span>{{child.title}}</span>
                  </el-menu-item>
                </el-submenu>
              </template>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
        <el-container>
          <!-- 主体页面 -->
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { getMenusInfoAPI } from '@/api'
export default {
  name: 'layoutVue',
  data () {
    return {
      menus: ''
    }
  },
  computed: {
    ...mapGetters(['username', 'nickname', 'user_pic'])
  },
  methods: {
    logout () {
      // 弹出确认提示框
      this.$confirm('确定退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
          // 清除token和用户信息
          this.$store.commit('updateToken', '')
          this.$store.commit('updateUserInfo', '')
          // 跳转到登陆页面
          this.$router.push('/login')
        })
        .catch(() => {})
    },
    async getMenu () {
      const { data: res } = await getMenusInfoAPI()
      if (res.code === 0) {
        this.menus = res.data
      }
    }
  },
  created () {
    this.getMenu()
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
    background-color: #f2f2f2;
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

.user-box {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  user-select: none;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 15px;
    object-fit: cover;
  }
  span {
    color: white;
    font-size: 12px;
  }
}
</style>
