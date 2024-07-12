<template>
  <div class="container">
    <el-form ref="searchFormRef" :model="searchData" :inline="true">
      <el-form-item prop="username" label="用户名">
        <el-input v-model="searchData.username" placeholder="请输入用户名" clearable />
      </el-form-item>
      <el-form-item prop="department" label="部门">
        <el-input v-model="searchData.department" placeholder="请输入部门" clearable />
      </el-form-item>
      <el-form-item prop="roles" label="角色">
        <el-input v-model="searchData.roles" placeholder="请输入角色" clearable />
      </el-form-item>
      <el-form-item prop="status" label="状态">
        <el-input v-model="searchData.status" placeholder="请输入状态" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getData">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>

    <div style="margin: 10px 0">
      <el-button type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
      <el-button type="danger" plain icon="Delete" :disabled="selectIds.length === 0" @click="handleDel()">
        删除
      </el-button>
    </div>

    <el-table :data="tableData" border show-overflow-tooltip @selection-change="selectionChange">
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column label="用户名" prop="username" />
      <el-table-column label="部门" prop="department" />
      <el-table-column label="角色" prop="roles" />
      <el-table-column label="状态" prop="status">
        <template #default="{ row }">
          <el-tag v-if="row.status">正常</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="{ row }">
          <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
          <el-button link type="primary" @click="handleDel(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-model:current-page="pageInfo.currentPage"
      v-model:page-size="pageInfo.pageSize"
      :total="pageInfo.total"
      @get-data="getData"
    />
  </div>
  <Detail ref="detailRef" :title="title" @get-data="getData"></Detail>
  <!-- <SvgIcon name="resource"></SvgIcon> -->
  <!-- <div>Vue3视频插件 vue-video-player</div>
  <div>Vue3md编辑器 v-md-editor</div>
  <div>Vue3富文本编辑器 wangeditor</div> -->
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import { getUserList, delUser } from '@/api/system';
import Detail from '@/views/home/detail/index.vue';

const searchFormRef = ref();
const searchData = reactive({
  username: '',
  department: '',
  roles: [],
  status: ''
});

const tableData = ref([
  {
    id: 1,
    username: '孙悟空',
    department: '齐天大圣',
    roles: [],
    status: false
  },
  {
    id: 2,
    username: '猪八戒',
    department: '天蓬元帅',
    roles: [],
    status: true
  },
  {
    id: 3,
    username: '沙和尚',
    department: '卷帘大将',
    roles: [],
    status: true
  }
]);
const selectIds = ref([]);
const pageInfo = reactive({
  currentPage: 1,
  pageSize: 20,
  total: 0
});

const detailRef = ref();
const title = ref('');

onMounted(() => {
  getData();
});

// 列表查询
function getData() {
  const params = {
    username: searchData.username,
    department: searchData.department,
    roles: searchData.roles,
    status: searchData.status,
    pageNo: pageInfo.currentPage,
    pageSize: pageInfo.pageSize
  };
  getUserList(params).then((res: any) => {
    if (res.code === 200) {
      const data = res.data;
      tableData.value = data.rows;
      pageInfo.total = data.total;
    }
  });
}

// 重置查询
function handleReset() {
  searchFormRef.value.resetFields();
  pageInfo.currentPage = 1;
  getData();
}

// 行选中
function selectionChange(selection: any) {
  selectIds.value = selection.map((item: any) => item.id);
}

// 删除
function handleDel(id?: number) {
  const ids = [id || selectIds.value].join(',');
  if (!ids) {
    ElMessage.warning('请勾选删除项');
    return;
  }
  ElMessageBox.confirm('确认删除用户?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(function () {
      delUser(ids).then(() => {
        ElMessage.success('删除成功');
        if (tableData.value.length === 1 && pageInfo.currentPage > 1) {
          pageInfo.currentPage = pageInfo.currentPage - 1;
        }
        getData();
      });
    })
    .catch(() => {});
}

// 新增
function handleAdd() {
  title.value = '新增用户';
  detailRef.value.openDialog();
}

// 编辑
function handleEdit(row: any) {
  title.value = '编辑用户';
  detailRef.value.openDialog();
}
</script>

<style lang="scss" scoped>
.el-input {
  width: 220px;
}
.el-select {
  width: 220px;
}
</style>
