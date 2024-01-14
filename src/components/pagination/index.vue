<template>
  <div class="pagination-container">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :total="total"
      :page-sizes="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      background
    />
  </div>
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
    emit('update:pageSize', val);
    emit('getData');
  }
});
</script>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: end;
  margin-top: 20px;
  background: #fff;
}
</style>
