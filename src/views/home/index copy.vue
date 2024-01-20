<template>
  <div class="container">
    <el-row :gutter="100">
      <el-col :lg="6" :md="12" :sm="24"><div class="grid-content ep-bg-purple" /></el-col>
      <el-col :lg="6" :md="12" :sm="24"><div class="grid-content ep-bg-purple" /></el-col>
      <el-col :lg="6" :md="12" :sm="24"><div class="grid-content ep-bg-purple" /></el-col>
      <el-col :lg="6" :md="12" :sm="24"><div class="grid-content ep-bg-purple" /></el-col>
    </el-row>
  </div>
</template>

<style>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  min-height: 36px;
  background-color: aqua;
  border-radius: 4px;
}
</style>
