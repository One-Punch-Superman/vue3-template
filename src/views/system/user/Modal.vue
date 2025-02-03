<template>
  <el-dialog
    v-model="dialogVisible"
    :title="type === 'add' ? '新增' : '编辑'"
    width="560px"
    :close-on-click-modal="false"
  >
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="80px">
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
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { addOrEditUser } from '@/api/system';

const props = defineProps({
  type: {
    type: String,
    default: ''
  },
  row: {
    type: Object,
    default: () => ({})
  }
});
const emit = defineEmits(['getList']);

const formRef = ref();
const dialogVisible = ref(false);

const formData = reactive({
  username: '',
  department: '',
  roles: [],
  status: ''
});
const rules = reactive({
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }]
});

// 提交
function handleSubmit() {
  formRef.value.validate((valid: any) => {
    if (valid) {
      addOrEditUser(formData).then((res: any) => {
        if (res.code === 200) {
          ElMessage.success(`${props.type === 'add' ? '新增' : '编辑'}成功`);
          dialogVisible.value = false;
          emit('getList');
        }
      });
    }
  });
}

function openDialog() {
  dialogVisible.value = true;
  formRef.value.resetFields();
  nextTick(() => {
    if (props.type === 'edit') {
      Object.assign(formData, props.row);
    }
  });
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
