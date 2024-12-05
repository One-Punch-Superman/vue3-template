<template>
  <div class="container">
    <el-form :inline="true" :model="searchData" label-width="100px">
      <el-form-item label="Approved by">
        <el-input v-model="searchData.user" placeholder="Approved by" clearable />
      </el-form-item>
      <el-form-item label="Approved by">
        <el-input v-model="searchData.user" placeholder="Approved by" clearable />
      </el-form-item>
      <el-form-item label="Approved by">
        <el-input v-model="searchData.user" placeholder="Approved by" clearable />
      </el-form-item>
      <el-form-item label="Approved by">
        <el-input v-model="searchData.user" placeholder="Approved by" clearable />
      </el-form-item>
      <el-form-item label="Approved by">
        <el-input v-model="searchData.user" placeholder="Approved by" clearable />
      </el-form-item>
      <el-form-item label="Approved by">
        <el-input v-model="searchData.user" placeholder="Approved by" clearable />
      </el-form-item>
      <el-form-item label="Approved by">
        <el-input v-model="searchData.user" placeholder="Approved by" clearable />
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-select v-model="searchData.region" placeholder="Activity zone" clearable>
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="Activity time">
        <el-date-picker v-model="searchData.date" type="date" placeholder="Pick a date" clearable />
      </el-form-item>
      <el-form-item label=" " style="float: right">
        <el-button type="primary" @click="onSubmit">搜索</el-button>
        <el-button @click="onSubmit">重置</el-button>
      </el-form-item>
    </el-form>

    <div style="margin: 10px 0">
      <el-button type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
      <el-button type="danger" plain icon="Delete" :disabled="selectIds.length === 0" @click="handleDel()">
        删除
      </el-button>
      <el-button type="warning" plain icon="Download" @click="handleExport">导出</el-button>
    </div>

    <el-table :data="tableData" border show-overflow-tooltip @selection-change="selectionChange">
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="nickname" label="用户昵称" />
      <el-table-column prop="status" label="状态">
        <template #default="{ row }">
          <el-tag>{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="describe" label="描述" />
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
    <el-dialog v-model="dialog.visible" :title="dialog.title" :close-on-click-modal="false" @close="closeDialog">
      <el-form ref="dialogFormRef" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickname">
          <el-input v-model="formData.nickname" placeholder="请输入用户昵称" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
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
import { getUserList, delUser } from '@/api/system';

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
    status: '成功',
    describe: '齐天大圣'
  },
  {
    id: 2,
    username: '猪八戒',
    nickname: '天蓬元帅',
    status: '成功',
    describe: '天蓬元帅'
  },
  {
    id: 3,
    username: '沙和尚',
    nickname: '卷帘大将',
    status: '成功',
    describe: '卷帘大将'
  }
]);

const pageInfo = reactive({
  currentPage: 1,
  pageSize: 20,
  total: 0
});

const selectIds = ref([]);

const dialog = reactive({
  visible: false,
  type: '',
  title: ''
});
const dialogFormRef = ref();
const formData = reactive<any>({
  username: '',
  nickname: '',
  status: 1,
  describe: ''
});

const rules = reactive({
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }]
});

onMounted(() => {
  console.log();
});

const getList = () => {
  const params = {
    username: searchData.username,
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
};

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
  ElMessageBox.confirm('确认删除用户?', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(function () {
      delUser(ids).then(() => {
        ElMessage.success('删除成功');
        getList();
      });
    })
    .catch(() => {});
}

const onSubmit = () => {
  console.log('submit!');
};

const loading = ref();
function handleSubmit() {
  dialogFormRef.value.validate((valid: any) => {
    if (valid) {
      const userId = formData.id;
      loading.value = true;
    }
  });
}

function closeDialog() {
  debugger;
  formData.id = null;
  dialogFormRef.value.resetFields();
}
</script>

<style lang="scss" scoped>
.el-form {
  margin-left: calc(-1 * (100% - 1600px) / 4);
  .el-form-item {
    box-sizing: border-box;

    // float: left;
    width: 20%;
    padding-left: calc((100% - 1600px) / 5);
    margin-right: 0;
  }
}
.clearfix::after {
  display: table;
  clear: both;
  content: '';
}
</style>
