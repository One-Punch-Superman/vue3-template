<template>
  <div class="container">
    <PageSearch v-model="formData" :form-items="formItems" @get-list="getList"></PageSearch>

    <div style="margin: 10px 0">
      <el-button type="primary" @click="handleAdd">新增</el-button>
      <el-button type="danger" :disabled="selectIds.length === 0" @click="handleDel()">删除</el-button>
    </div>

    <PageTable v-bind="tableInfo" @get-list="getList" @selection-change="selectionChange">
      <template #department="{ row }">11{{ row.department }}</template>
      <template #operation="{ row }">
        <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
        <el-button link type="primary" @click="handleDel(row.id)">删除</el-button>
      </template>
    </PageTable>

    <Modal ref="dialogRef" :type="modelData.type" :row="modelData.row" @get-list="getList"></Modal>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import { getUserList, delUser } from '@/api/system';
import PageSearch from '@/components/PageSearch.vue';
import PageTable from '@/components/PageTable.vue';
import Modal from './Modal.vue';

const formItems = reactive([
  { prop: 'username', label: '用户名' },
  { prop: 'department', label: '部门', showPassword: true },
  { prop: 'roles', label: '角色', rows: '1', type: 'textarea' },
  { prop: 'status', label: '状态' },
  { prop: 'name1', label: '用户名' },
  { prop: 'department1', label: '部门' },
  {
    prop: 'roles1',
    label: '角色',
    options: [
      { value: '1', label: 'Option1' },
      { value: '2', label: 'Option2' }
    ]
  },
  { prop: 'status1', label: '状态' }
]);

function getInitData(data: any) {
  const initData: any = {};
  data.forEach((item: any) => {
    initData[item.prop] = item.value ?? '';
  });
  return initData;
}
const formData = reactive(getInitData(formItems));

const tableInfo = reactive({
  data: [],
  columns: [
    { type: 'selection', align: 'center', width: '50px' },
    { prop: 'username', label: '用户名' },
    { prop: 'department', label: '部门', custom: true },
    { prop: 'roles', label: '角色' },
    { prop: 'status', label: '状态' },
    { prop: 'operation', label: '操作', width: '150px', custom: true }
  ],
  page: {
    currentPage: 1,
    pageSize: 20,
    total: 0
  }
});

const selectIds = ref([]);
// 行选中
function selectionChange(selection: any) {
  selectIds.value = selection.map((item: any) => item.id);
}

const dialogRef = ref();

onMounted(() => {
  getList();
});

// 列表查询
function getList(isReset = false) {
  const { page } = tableInfo;
  if (isReset) {
    page.currentPage = 1;
  }
  const params = {
    ...formData,
    pageNo: page.currentPage,
    pageSize: page.pageSize
  };
  tableInfo.data = [
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
  ];
  tableInfo.page.total = 30;
  getUserList(params).then((res: any) => {
    if (res.code === 200) {
      const data = res.data;
      tableInfo.data = data.rows;
      tableInfo.page.total = data.total;
    }
  });
}

const modelData = reactive({
  type: '',
  row: {}
});
// 新增
function handleAdd() {
  modelData.type = 'add';
  modelData.row = {};
  dialogRef.value.openDialog();
}
// 编辑
function handleEdit(row: any) {
  modelData.type = 'edit';
  modelData.row = row;
  dialogRef.value.openDialog();
}

// 删除
function handleDel(id?: number) {
  const ids = [id || selectIds.value].join(',');
  if (!ids) {
    ElMessage.warning('请勾选删除项');
    return;
  }
  ElMessageBox.confirm('确认删除用户?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(function () {
      delUser(ids).then(() => {
        ElMessage.success('删除成功');
        if (tableInfo.data.length === 1 && tableInfo.page.currentPage > 1) {
          tableInfo.page.currentPage = tableInfo.page.currentPage - 1;
        }
        getList();
      });
    })
    .catch(() => {});
}
</script>

<style lang="scss" scoped></style>
