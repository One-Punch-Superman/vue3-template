<template>
  <el-card>
    <el-row class="add">
      <el-col :span="24" align="right">
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </el-col>
    </el-row>
    <el-table :data="dataList" style="width: 100%" border>
      <el-table-column align="center" prop="roleName" label="角色名" />
      <el-table-column align="center" prop="mark" label="角色标识" />
      <el-table-column align="center" prop="describe" label="描述" />
      <el-table-column align="center" label="操作" width="150">
        <template #default="scope">
          <el-button size="small" link type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" link type="primary" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts" setup>
const dataList = [
  {
    roleName: '管理员',
    mark: 'admin',
    describe: '管理员，拥有所以权限'
  },
  {
    roleName: '普通角色',
    mark: 'common',
    describe: '普通角色'
  },
  {
    roleName: '测试账号',
    mark: 'test',
    describe: '测试账号'
  }
];
// 新增
const handleAdd = () => {};
// 编辑
const handleEdit = () => {};
// 删除
const handleDel = () => {};
</script>

<style lang="scss" scoped>
.el-card {
  height: calc(100vh - 100px);
  box-sizing: border-box;
}
.add {
  margin-bottom: 20px;
}
</style>
