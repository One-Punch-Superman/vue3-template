<template>
  <div class="container">
    <el-form :inline="true" :model="formInline" label-width="100px" class="demo-form-inline clearfix">
      <el-form-item label="Approved by">
        <el-input v-model="formInline.user" placeholder="Approved by" clearable />
      </el-form-item>
      <el-form-item label="Approved by">
        <el-input v-model="formInline.user" placeholder="Approved by" clearable />
      </el-form-item>
      <el-form-item label="Approved by">
        <el-input v-model="formInline.user" placeholder="Approved by" clearable />
      </el-form-item>
      <el-form-item label="Approved by">
        <el-input v-model="formInline.user" placeholder="Approved by" clearable />
      </el-form-item>
      <el-form-item label="Approved by">
        <el-input v-model="formInline.user" placeholder="Approved by" clearable />
      </el-form-item>
      <el-form-item label="Approved by">
        <el-input v-model="formInline.user" placeholder="Approved by" clearable />
      </el-form-item>
      <el-form-item label="Approved by">
        <el-input v-model="formInline.user" placeholder="Approved by" clearable />
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-select v-model="formInline.region" placeholder="Activity zone" clearable>
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="Activity time">
        <el-date-picker v-model="formInline.date" type="date" placeholder="Pick a date" clearable />
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" @click="onSubmit">Query</el-button>
      </el-form-item>
    </el-form>
  </div>
  <!-- <SvgIcon name="resource"></SvgIcon> -->
  <!-- <div>Vue3视频插件 vue-video-player</div>
  <div>Vue3md编辑器 v-md-editor</div>
  <div>Vue3富文本编辑器 wangeditor</div> -->
</template>

<script lang="ts" setup>
const formInline = reactive({
  user: '',
  region: '',
  date: ''
});

onMounted(() => {
  console.log();
});

const onSubmit = () => {
  console.log('submit!');
};
</script>

<style lang="scss" scoped>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}
.demo-form-inline .el-select {
  --el-select-width: 220px;
}
.el-form {
  margin-left: calc(-1 * (100% - 1280px) / 3);
  .el-form-item {
    float: left;
    width: 25%;
    padding-left: calc((100% - 1280px) / 4);
    margin-right: 0;
    box-sizing: border-box;
  }
}
.clearfix::after {
  display: table;
  clear: both;
  content: '';
}
</style>
