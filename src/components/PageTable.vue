<template>
  <el-table :data="data" border v-bind="$attrs">
    <template v-for="item in columns" :key="item.prop">
      <el-table-column align="center" v-bind="item">
        <template v-if="item.custom" #default="scope">
          <slot :name="item.prop" v-bind="scope"></slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
  <Pagination
    v-model:current-page="pageInfo.currentPage"
    v-model:page-size="pageInfo.pageSize"
    :total="pageInfo.total"
    @get-data="emit('getList')"
  />
</template>

<script lang="ts" setup>
interface ITableColumns {
  type?: string;
  prop?: string;
  label?: string;
  custom?: boolean;
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

const pageInfo = reactive(props.page);
</script>

<style lang="scss"></style>
