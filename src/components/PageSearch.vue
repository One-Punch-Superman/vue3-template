<template>
  <el-form ref="formRef" :model="formData" :label-width="labelWidth" v-bind="$attrs">
    <el-row :gutter="20">
      <template v-for="item in formItems" :key="item.prop">
        <el-col :span="6" :md="6" :lg="5" :xl="4" class="el-col-max-3">
          <el-form-item :prop="item.prop" :label="item.label">
            <component
              :is="getType(item)"
              v-model="formData[item.prop]"
              :placeholder="`请${item.options ? '选择' : '输入'}${item.label}`"
              v-bind="omit(item, ['prop', 'label', 'value'])"
              clearable
            >
              <template v-if="item.options">
                <el-option
                  v-for="option in item.options"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </template>
            </component>
          </el-form-item>
        </el-col>
      </template>
      <el-col :span="6" :md="6" :lg="5" :xl="4" class="el-col-max-3">
        <el-form-item label="">
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts" setup>
import { omit } from 'lodash';

interface IFormItems {
  prop: string;
  label: string;
  value?: string;
  placeholder?: string;
  [key: string]: any;
}

const props = defineProps({
  labelWidth: {
    type: String,
    default: '60px'
  },
  formItems: {
    type: Array<IFormItems>,
    default: () => []
  }
});
const formData = defineModel({
  type: Object
});
const emit = defineEmits(['getList']);

const formRef = ref();

function getType(item: any) {
  if (item.options) {
    return 'el-select';
  }
  if (!item.type || item.type === 'textarea') {
    return 'el-input';
  }
  if (item.type === 'date' || item.type === 'daterange' || item.type === 'datetime' || item.type === 'datetimerange') {
    return 'el-date-picker';
  }
  return `el-${item.type}`;
}

// 查询
function handleSearch() {
  emit('getList');
}

// 重置
function handleReset() {
  formRef.value.resetFields();
  emit('getList', true);
}
</script>

<style lang="scss" scoped>
.el-form--inline .el-form-item {
  width: 100%;
  max-width: 340px;
  margin-right: 0;
}

@media only screen and (min-width: 1200px) {
  .el-col-lg-5 {
    flex: 0 0 20%;
    max-width: 20%;
  }
}

@media only screen and (min-width: 1920px) {
  .el-col-xl-4 {
    flex: 0 0 16.6666666667%;
    max-width: 16.6666666667%;
  }
}

@media only screen and (min-width: 2560px) {
  .el-col-max-3 {
    flex: 0 0 12.5%;
    max-width: 12.5%;
  }
}
</style>
