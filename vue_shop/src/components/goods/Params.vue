<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品参数</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card class="box-card">
      <!-- 警告区域 -->
      <el-alert title="注意：只允许为第三级分类设置参数" type="warning" :closable="false" show-icon></el-alert>
      <!-- 选择商品分类 -->
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类:</span>
          <!-- 商品分类级联选择框 -->
          <el-cascader
            v-model="selectedCateKeys"
            :options="catelist"
            :props="{ expandTrigger: 'hover', value: 'cat_id',
                label: 'cat_name', children: 'children' }"
            @change="handleChange"
          ></el-cascader>
        </el-col>
      </el-row>
      <!-- tab 页签区 -->
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <!-- 添加动态参数面板 -->
        <el-tab-pane label="用户管理" name="many">
          <el-button type="primary" size="mini" :disabled="isBtnDisabled">添加参数</el-button>
        </el-tab-pane>
        <!-- 添加静态属性面板 -->
        <el-tab-pane label="配置管理" name="only">
          <el-button type="primary" size="mini" :disabled="isBtnDisabled">添加属性</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 商品分类列表
      catelist: [],
      // 级联选择框双向绑定的数据
      selectedCateKeys: [],
      // 被激活的页签的名称
      activeName: 'many'
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    // 获取所有的商品列表
    async getCateList() {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类失败')
      }

      this.catelist = res.data
      console.log(this.catelist)
    },
    // 级联选择框变化触发
    async handleChange() {
      //   console.log(this.selectedCateKeys)
      // 选中的不是三级分类，数组清空
      if (this.selectedCateKeys.length !== 3) {
        this.selectedCateKeys = []
        this.$message.warning('请选择三级分类商品')
      }

      // 更具所选分类 ID 和当前所处面板获取对应参数
      const { data: res } = await this.$http.get(
        `categories/${this.cateId}/attributes`,
        {
          params: { sel: this.activeName }
        }
      )
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品信参数失败')
      }
      console.log(res.data)
    },
    // Tab页签点击事件的处理函数
    handleTabClick() {
      console.log(this.activeName)
    }
  },
  computed: {
    // 如果按钮需要被禁用，返回 true, 否则 返回 false
    isBtnDisabled() {
      if (this.selectedCateKeys.length !== 3) {
        return true
      }
      return false
    },
    // 当前选中的三级分类id
    cateId() {
      if (this.selectedCateKeys.length === 3) {
        return this.selectedCateKeys[2]
      }
      return null
    }
  }
}
</script>

<style lang="less" scoped>
.cat_opt {
  margin: 15px 0px;
}
</style>
