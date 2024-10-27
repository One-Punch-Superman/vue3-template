<template>
  <div>
    <el-table :data="tableData" :span-method="objectSpanMethod" border style="width: 100%; margin-top: 20px">
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="amount1" label="Amount 1" />
      <el-table-column prop="amount2" label="Amount 2" />
      <el-table-column prop="amount3" label="Amount 3" />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
interface User {
  id: string;
  name: string;
  amount1: string;
  amount2: string;
  amount3: number;
}

interface SpanMethodProps {
  row: User;
  column: TableColumnCtx<User>;
  rowIndex: number;
  columnIndex: number;
}
const tableData: User[] = [
  {
    id: '12987122',
    name: 'Tom',
    amount1: '234',
    amount2: '3.2',
    amount3: 10
  },
  {
    id: '12987123',
    name: 'Tom',
    amount1: '234',
    amount2: '4.43',
    amount3: 10
  },
  {
    id: '12987124',
    name: 'Tom',
    amount1: '234',
    amount2: '1.9',
    amount3: 9
  },
  {
    id: '12987125',
    name: 'Tom2',
    amount1: '234',
    amount2: '2.2',
    amount3: 17
  },
  {
    id: '12987126',
    name: 'Tom2',
    amount1: '234',
    amount2: '4.1',
    amount3: 15
  }
];

let str = '';
const stroageValue: Record<string, string | number> = reactive({});
const objectSpanMethod = ({ row, column, rowIndex, columnIndex }: SpanMethodProps) => {
  debugger;
  if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2 || columnIndex === 3) {
    let spanCount = 1;
    for (let i = rowIndex + 1; i < tableData.length; i++) {
      if (tableData[i][`${column.property}`] === row[`${column.property}`]) {
        spanCount++;
        str = row[`${column.property}`];
      } else {
        break;
      }
    }
    if (spanCount === 1 && !stroageValue[`${str}`]) {
      return [1, 1];
    }
    !stroageValue[`${str}`] && (stroageValue[`${str}`] = spanCount);
    if (spanCount > (stroageValue[`${str}`] as number) - 1) {
      return [spanCount, 1];
    } else if (rowIndex > 0 && tableData[rowIndex - 1][`${column.property}`] === row[`${column.property}`]) {
      return [0, 0];
    }
  }
};
</script>
