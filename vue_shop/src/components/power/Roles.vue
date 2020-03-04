<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card class="box-card">
      <!-- 添加角色按钮区 -->
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>

      <!-- 角色列表 -->
      <el-table :data="rolelist" border stripe>
          <el-table-column type="expand">
              <template slot-scope="scope">
                  <el-row :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']" v-for="(item1, i1) in scope.row.children" :key="item1.id">
                      <!-- 渲染一级权限 -->
                      <el-col :span="5">
                          <el-tag @close="removeRightById(scope.row, item1.id)" closable> {{ item1.authName }} </el-tag>
                          <i class="el-icon-caret-right"></i>
                      </el-col>
                      <!-- 渲染二级权限 -->
                      <el-col :span="19">
                          <!-- 通过 for 嵌套渲染二级权限 -->
                          <el-row :class="[i2 === 0? '' : 'bdtop', 'vcenter']" v-for="(item2, i2) in item1.children" :key="item2.id">
                              <el-col :span="6">
                                <el-tag @close="removeRightById(scope.row, item2.id)" closable type="success"> {{ item2.authName }} </el-tag>
                                <i class="el-icon-caret-right"></i>
                              </el-col>
                              <el-col :span="18">
                                  <el-tag @close="removeRightById(scope.row, item3.id)" closable type="warning" v-for="(item3) in item2.children" :key="item3.id">{{ item3.authName }}</el-tag>
                              </el-col>
                          </el-row>
                      </el-col>
                  </el-row>
              </template>
          </el-table-column>
          <!-- 索引列 -->
          <el-table-column type="index"></el-table-column>
          <el-table-column label="角色名称" prop="roleName"></el-table-column>
          <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
          <el-table-column label="操作" width="300px">
              <template>
                <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                <el-button type="warning" icon="el-icon-setting" size="mini" @click="showSetRightDialog">分配权限</el-button>
              </template>
          </el-table-column>
      </el-table>
    </el-card>
    <!-- 分配权限对话框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightDialogVisible"
      width="50%">
      <!-- 树形控件 -->
      <el-tree :data="rightsList" :props="treeProps"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="setRightDialogVisible = false">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 所有角色列表数据
      rolelist: [],
      // 控制分配权限对话框显示与否
      setRightDialogVisible: false,
      // 所有权限的数据
      rightsList: [],
      // 属性控件属性绑定对象
      treeProps: {
        label: 'authName',
        children: 'children'
      }
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    // 过去所有角色列表
    async getRolesList() {
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败')
      }

      this.rolelist = res.data
      console.log(this.rolelist)
    },
    // 根据 id, 删除对应的权限
    async removeRightById(role, rightId) {
      // 弹框提示是否删除
      const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.info('取消删除')
      }

      // console.log('确认删除')
      // 请求删除权限
      const { data: res } = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
      if (res.meta.status !== 200) {
        return this.$message.error('删除权限失败')
      }

      // 这个渲染很巧妙
      role.children = res.data
    },
    // 展示分配权限的对话框
    async showSetRightDialog() {
      // 获取所有权限列表数据
      const { data: res } = await this.$http.get('rights/tree')
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败')
      }

      this.rightsList = res.data
      console.log(this.rightsList)
      this.setRightDialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.el-tag {
    margin: 7px;
}

.bdtop {
    border-top: 1px solid #eee;
}

.bdbottom {
    border-bottom: 1px solid #eee;
}

.vcenter {
    display: flex;
    align-items: center;
}
</style>
