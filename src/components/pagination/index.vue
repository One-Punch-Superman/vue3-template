<template>
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :total="total"
    :page-sizes="pageSizes"
    layout="total, sizes, prev, pager, next, jumper"
    background
  />
</template>

<script lang="ts" setup>
const props = defineProps({
  currentPage: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 20
  },
  total: {
    required: true,
    type: Number
  },
  pageSizes: {
    type: Array<number>,
    default() {
      return [20, 50, 100, 200];
    }
  }
});

const emit = defineEmits(['update:currentPage', 'update:pageSize', 'getData']);

const currentPage = computed({
  get() {
    return props.currentPage;
  },
  set(val) {
    emit('update:currentPage', val);
    emit('getData');
  }
});

const pageSize = computed({
  get() {
    return props.pageSize;
  },
  set(val) {
    emit('update:currentPage', 1);
    emit('update:pageSize', val);
    emit('getData');
  }
});
</script>

<style lang="scss">
.el-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  .el-select {
    width: 110px;
    .el-input {
      width: 100%;
    }
  }
  button,
  .el-pager li {
    min-width: 30px;
    height: 30px;
  }
  .el-pagination__editor.el-input {
    width: 45px;
  }
}
</style>
