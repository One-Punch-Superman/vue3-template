<template>
  <el-dialog v-model="dialogVisible" :title="title" :close-on-click-modal="false" @closed="closeDialog">
    <el-form ref="dialogFormRef" :model="formData" :rules="rules" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="部门" prop="department">
        <el-input v-model="formData.department" placeholder="请输入部门" />
      </el-form-item>
      <el-form-item label="角色" prop="roles">
        <el-input v-model="formData.roles" placeholder="请输入角色" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-input v-model="formData.status" placeholder="请输入状态" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { addOrEditUser } from '@/api/system';

const props = defineProps({
  title: {
    type: String,
    default: ''
  }
});
const emit = defineEmits(['getData']);

const dialogVisible = ref(false);
const dialogFormRef = ref();
const formData = reactive<any>({
  username: '',
  department: '',
  roles: [],
  status: ''
});
const rules = reactive({
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }]
});

// 表单提交
function handleSubmit() {
  dialogFormRef.value.validate((valid: any) => {
    if (valid) {
      addOrEditUser(formData).then((res: any) => {
        if (res.code === 200) {
          ElMessage.success(`${props.title}成功`);
          dialogVisible.value = false;
          emit('getData');
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

function openDialog() {
  dialogVisible.value = true;
}

defineExpose({
  openDialog
});
</script>

<style lang="scss" scoped>
.el-input {
  width: 220px;
}
.el-select {
  width: 220px;
}
</style>
