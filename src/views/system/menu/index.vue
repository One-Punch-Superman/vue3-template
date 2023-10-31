<template>
  <div class="container">
    <el-row class="add">
      <el-col :span="24" align="right">
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </el-col>
    </el-row>
    <el-table :data="dataList" style="width: 100%" border row-key="path" default-expand-all>
      <el-table-column prop="meta.title" label="菜单名" />
      <el-table-column align="center" prop="meta.icon" label="菜单图标" />
      <el-table-column align="center" prop="path" label="菜单路径" />
      <el-table-column align="center" prop="component" label="组件路径" />
      <el-table-column align="center" label="操作" width="150">
        <template #default="scope">
          <el-button size="small" link type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" link type="primary" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
const dataList = [
  {
    path: '/',
    name: 'list',
    component: '/',
    meta: {
      icon: 'Printer',
      title: '首页'
    }
  },
  {
    path: '/system',
    redirect: '/system/user',
    meta: {
      icon: 'Tickets',
      title: '系统管理'
    },
    children: [
      {
        path: '/system/user',
        component: '/system/user/index',
        meta: {
          icon: 'Printer',
          title: '用户管理'
        }
      },
      {
        path: '/system/role',
        component: '/system/role/index',
        meta: {
          icon: 'Printer',
          title: '角色管理'
        }
      },
      {
        path: '/system/menu',
        component: '/system/menu/index',
        meta: {
          icon: 'Printer',
          title: '菜单管理'
        }
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: '/user/index',
    meta: {
      icon: 'Printer',
      title: '个人中心'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: '/about/index',
    meta: {
      icon: 'Printer',
      title: '关于项目'
    }
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
.add {
  margin-bottom: 20px;
}
</style>
