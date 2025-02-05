<template>
  <el-table v-loading="loading" :data="data" border v-bind="$attrs">
    <template v-for="(item, index) in columns" :key="index">
      <el-table-column align="center" show-overflow-tooltip v-bind="item">
        <template v-for="slot in Object.keys($slots)" :key="slot" #[slot]="scope">
          <slot :name="slot" v-bind="scope"></slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
  <Pagination
    v-model:current-page="pageInfo.currentPage"
    v-model:page-size="pageInfo.pageSize"
    :total="pageInfo.total"
    @get-list="emit('getList')"
  />
</template>

<script lang="ts" setup>
interface ITableColumns {
  type?: string;
  prop?: string;
  label?: string;
  [key: string]: any;
}

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Array<ITableColumns>,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  page: {
    type: Object,
    default: () => ({
      currentPage: 1,
      pageSize: 20,
      total: 0
    })
  }
});
const emit = defineEmits(['getList']);

const showColumns = computed(() => props.columns.filter((i) => i.show !== false));

const pageInfo = reactive(props.page);

function defaultFormatter(row: any, column: any, cellValue: any) {
  if (cellValue === '' || cellValue === null || cellValue === undefined) {
    return '--';
  }
  return cellValue;
}
</script>

<style lang="scss"></style>
