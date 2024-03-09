<template>
  <div class="container">
    <el-form ref="searchFormRef" :model="searchData" :inline="true">
      <el-form-item prop="username" label="用户名">
        <el-input v-model="searchData.username" placeholder="请输入用户名" clearable />
      </el-form-item>
      <el-form-item prop="nickname" label="用户昵称">
        <el-input v-model="searchData.nickname" placeholder="请输入用户昵称" clearable />
      </el-form-item>
      <el-form-item prop="describe" label="描述">
        <el-input v-model="searchData.describe" placeholder="请输入描述" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">搜索</el-button>
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
      <el-table-column label="用户昵称" prop="nickname" />
      <el-table-column label="描述" prop="describe" />
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
      @get-data="getList"
    />

    <el-dialog v-model="dialog.visible" :title="dialog.title" :close-on-click-modal="false" @closed="closeDialog">
      <el-form ref="dialogFormRef" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickname">
          <el-input v-model="formData.nickname" placeholder="请输入用户昵称" />
        </el-form-item>
        <el-form-item label="描述" prop="describe">
          <el-input v-model="formData.describe" placeholder="请输入描述" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
          <el-button @click="dialog.visible = false">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>

  <!-- <SvgIcon name="resource"></SvgIcon> -->
  <!-- <div>Vue3视频插件 vue-video-player</div>
  <div>Vue3md编辑器 v-md-editor</div>
  <div>Vue3富文本编辑器 wangeditor</div> -->
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import { getUserList, addOrEditUser, delUser } from '@/api/system';

const searchFormRef = ref();
const searchData = reactive({
  username: '',
  nickname: '',
  describe: ''
});
const tableData = ref([
  {
    id: 1,
    username: '孙悟空',
    nickname: '齐天大圣',
    describe: '齐天大圣'
  },
  {
    id: 2,
    username: '猪八戒',
    nickname: '天蓬元帅',
    describe: '天蓬元帅'
  },
  {
    id: 3,
    username: '沙和尚',
    nickname: '卷帘大将',
    describe: '卷帘大将'
  }
]);
const selectIds = ref([]);
const pageInfo = reactive({
  currentPage: 1,
  pageSize: 20,
  total: 0
});

const dialogFormRef = ref();
const dialog = reactive({
  visible: false,
  type: '',
  title: ''
});
const formData = reactive<any>({
  username: '',
  nickname: '',
  describe: ''
});
const rules = reactive({
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  nickname: [{ required: true, message: '用户名不能为空', trigger: 'blur' }]
});

onMounted(() => {
  getList();
});

// 列表查询
function getList() {
  const params = {
    username: searchData.username,
    nickname: searchData.nickname,
    describe: searchData.describe,
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
  getList();
}

// 新增
function handleAdd() {
  dialog.visible = true;
  dialog.type = 'add';
  dialog.title = '新增用户';
}

// 编辑
function handleEdit(row: any) {
  dialog.visible = true;
  dialog.type = 'edit';
  dialog.title = '新增用户';
  nextTick(() => {
    Object.assign(formData, row);
  });
}

// 表单提交
function handleSubmit() {
  dialogFormRef.value.validate((valid: any) => {
    if (valid) {
      addOrEditUser(formData).then((res: any) => {
        if (res.code === 200) {
          ElMessage.success(`${dialog.title}成功`);
          dialog.visible = false;
          if (dialog.type === 'add') {
            pageInfo.currentPage = 1;
          }
          getList();
        }
      });
    }
  });
}

// 弹窗关闭
function closeDialog() {
  formData.id = null;
  dialogFormRef.value.resetFields();
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
        getList();
      });
    })
    .catch(() => {});
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
