<template>
    <div>
        <el-card>
            <div slot="header" class="clearfix header-box">
                <span>文章分类</span>
                <el-button type="primary" size="mini" @click="addCateFn">添加分类</el-button>
            </div>
            <!-- 表格部分 -->
            <el-table :data="cateList" style="width: 100%" border stripe>
                <el-table-column
                    type="index"
                    label="序号"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="cate_name"
                    label="分类名称"
                    >
                </el-table-column>
                <el-table-column
                    prop="cate_alias"
                    label="分类别名">
                </el-table-column>
                <el-table-column label="操作">
                    <template v-slot="scope">
                        <el-button type = 'primary' size="mini" @click="modifyFn(scope.row)">修改</el-button>
                        <el-button type="danger" size="mini" @click="deleteFn(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
                </el-table>
            </el-card>
            <!-- 添加文章分类 -->
            <el-dialog :title="title" :visible.sync="dialogFormVisible" @close="clearForm" width="30%">
                <el-form :model="form" :rules = "addRule" ref="addForm" label-width="80px">
                    <el-form-item label="分类名称" prop="cate_name">
                        <el-input v-model="form.cate_name" minlength="1" maxlength="10"></el-input>
                    </el-form-item>
                    <el-form-item label="分类别名"  prop="cate_alias">
                        <el-input v-model="form.cate_alias" minlength="1" maxlength="15"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancelFn">取 消</el-button>
                    <el-button type="primary" @click="confirmFn">确 定</el-button>
                </div>
            </el-dialog>
    </div>
</template>

<script>
import { getArtCategory, addArtCategory, updateArtCategory, deleteArtCategory } from '@/api'
export default {
  name: 'artCateVue',
  data () {
    return {
      cateList: [],
      dialogFormVisible: false,
      title: '添加分类',
      form: {
        id: '',
        cate_name: '',
        cate_alias: ''
      },
      addRule: {
        cate_name: [
          { required: true, message: '请输入分类名', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '分类名必须是1-10位的非空字符', trigger: 'blur' }
        ],
        cate_alias: [
          { required: true, message: '请输入分类别名', trigger: 'blur' },
          { pattern: /^\S{1,15}$/, message: '分类名必须是1-15位的非空字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async getArtCateFn () {
      const { data: res } = await getArtCategory()
      this.cateList = res.data
    },
    addCateFn () {
      this.dialogFormVisible = true
      this.title = '添加分类'
    },
    clearForm () {
      this.$refs.addForm.resetFields()
    },
    cancelFn () {
      this.dialogFormVisible = false
    },
    confirmFn () {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          if (this.title === '添加分类') {
            const { data: res } = await addArtCategory(this.form)
            if (res.code === 0) this.$message.success(res.message)
            else this.$message.error(res.message)
          } else if (this.title === '修改分类') {
            const { data: res } = await updateArtCategory(this.form)
            if (res.code === 0) this.$message.success(res.message)
            else this.$message.error(res.message)
          }
          this.getArtCateFn()
        } else {
          return false
        }
        this.dialogFormVisible = false
      })
    },
    modifyFn (obj) {
      this.dialogFormVisible = true
      this.title = '修改分类'
      this.$nextTick(() => {
        this.form.cate_name = obj.cate_name // 数据回显
        this.form.cate_alias = obj.cate_alias
        this.form.id = obj.id
      })
    },
    deleteFn (obj) {
      this.$confirm('确认删除？', '提示', { // 第一个参数是字段，第二个参数title，第三个参数配置对象
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        customClass: 'delConfirm'
      }).then(async (response) => {
        const { data: res } = await deleteArtCategory(obj.id)
        if (res.code !== 0) {
          this.$message.error(res.message)
        } else {
          this.$message.success(res.message)
          this.getArtCateFn()
        }
      }).catch(() => {
        this.$message('已取消')
      })
    }
  },
  created () {
    this.getArtCateFn()
  }
}
</script>

<style lang="less" >
    .header-box{
        .el-button{
            float: right;
        }
    }
    .delConfirm{
        width: 300px;
    }
</style>
