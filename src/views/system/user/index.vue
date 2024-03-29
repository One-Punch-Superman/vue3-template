<template>
  <div class="container">
    <el-row>
      <el-col :span="20">
        <el-input v-model="searchName" placeholder="用户名" clearable></el-input>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-col>
      <el-col :span="4" align="right">
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </el-col>
    </el-row>
    <el-table :data="dataList" style="width: 100%" border>
      <el-table-column align="center" prop="username" label="用户名" />
      <el-table-column align="center" prop="email" label="邮箱" />
      <el-table-column align="center" prop="address" label="地址" />
      <el-table-column align="center" prop="role" label="角色" />
      <el-table-column align="center" prop="status" label="状态">
        <template #default="scope">
          <el-tag v-if="scope.row.status">正常</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template #default="scope">
          <el-button size="small" link type="primary" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" link type="primary" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-model:current-page="pageInfo.currentPage"
      v-model:page-size="pageInfo.pageSize"
      :total="pageInfo.total"
      @get-data="getList"
    />

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px" @close="handleCancel">
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="70px">
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="formData.username" :readonly="dialogTitle == '编辑'" />
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="formData.email" />
        </el-form-item>
        <el-form-item label="地址:" prop="address">
          <el-input v-model="formData.address" />
        </el-form-item>
        <el-form-item label="角色:" prop="role">
          <el-select v-model="formData.role" multiple placeholder=" ">
            <el-option v-for="(item, index) in roleList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态:" prop="status">
          <el-switch v-model="formData.status" :active-value="1" :inactive-value="0" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="handlecConfirm">确定</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ElMessageBox, ElMessage } from 'element-plus';
import { getUserList, addOrEditUser, delUser } from '@/api/system';

const searchName = ref('');
const dataList = ref<any>([]);
const roleList = ref<any>([]);

const pageInfo = reactive({
  currentPage: 1,
  pageSize: 20,
  total: 0
});

const dialogTitle = ref('');
const dialogVisible = ref(false);

const formRef = ref();
const formData = ref({
  id: '',
  username: '',
  email: '',
  address: '',
  role: [],
  status: 1
});
const checkEmail = (rule: any, value: any, callback: any) => {
  const reg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;
  if (value && !reg.test(value)) {
    return callback(new Error('邮箱格式错误'));
  }
  callback();
};
const formRules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  email: [{ validator: checkEmail, trigger: 'blur' }]
});

onMounted(() => {
  getList();
});
const getList = () => {
  const params = {
    username: searchName.value,
    pageNo: pageInfo.currentPage,
    pageSize: pageInfo.pageSize
  };
  getUserList(params).then((res: any) => {
    if (res.code == 200) {
      const data = res.data;
      dataList.value = data.rows;
      pageInfo.total = data.total;
    }
  });
};
const getRoleList = () => {
  roleList.value = [
    {
      label: '管理员',
      value: 'admin'
    },
    {
      label: '普通用户',
      value: 'common'
    }
  ];
};
// 新增
const handleAdd = () => {
  getRoleList();
  dialogTitle.value = '新增';
  formData.value = {
    id: '',
    username: '',
    email: '',
    address: '',
    role: [],
    status: 1
  };
  dialogVisible.value = true;
};
// 编辑
const handleEdit = (row: any) => {
  getRoleList();
  dialogTitle.value = '编辑';
  formData.value = row;
  dialogVisible.value = true;
};
// 删除
const handleDel = (row: any) => {
  ElMessageBox.confirm(`你确定要删除用户 ${row.username} 吗?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    delUser(row.id).then((res: any) => {
      if (res.code == 200) {
        dialogVisible.value = false;
        getList();
        ElMessage.success('删除成功');
      } else {
        ElMessage.error(res.message);
      }
    });
  });
};
// 确定
const handlecConfirm = () => {
  formRef.value.validate((valid: any) => {
    if (valid) {
      const params = formData.value;
      addOrEditUser(params).then((res: any) => {
        if (res.code == 200) {
          dialogVisible.value = false;
          getList();
          ElMessage.success('编辑成功');
        } else {
          ElMessage.error(res.message);
        }
      });
    }
  });
};
// 取消
const handleCancel = () => {
  formRef.value.resetFields();
  dialogVisible.value = false;
};
// 查询
const handleSearch = () => {
  pageInfo.currentPage = 1;
  getList();
};
</script>

<style lang="scss" scoped>
.el-input {
  width: 250px;
  margin-right: 10px;
}
.el-dialog .el-select {
  width: 100%;
}
.el-table {
  margin: 20px 0;
}
</style>
