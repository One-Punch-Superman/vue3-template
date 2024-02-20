<template>
  <div class="container">
    <el-form :inline="true" :model="formInline" label-width="100px">
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
      <el-form-item label=" " style="float: right">
        <el-button type="primary" @click="onSubmit">搜索</el-button>
        <el-button @click="onSubmit">重置</el-button>
      </el-form-item>
    </el-form>

    <div style="margin: 10px 0">
      <el-button type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
      <el-button type="success" plain icon="Edit" @click="handleEdit">修改</el-button>
      <el-button type="danger" plain icon="Delete" @click="handleDel">删除</el-button>
      <el-button type="warning" plain icon="Download" @click="handleExport">导出</el-button>
    </div>
    <el-table :data="dataList" border>
      <el-table-column align="center" prop="roleName" label="角色名" />
      <el-table-column align="center" prop="mark" label="角色标识" />
      <el-table-column align="center" prop="status" label="状态">
        <template #default="scope">
          <el-tag>{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="describe" label="描述" />
      <el-table-column align="center" label="操作" width="150">
        <template #default="scope">
          <el-button size="small" link type="primary">编辑</el-button>
          <el-button size="small" link type="primary">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-model:current-page="pageInfo.currentPage"
      v-model:page-size="pageInfo.pageSize"
      :total="pageInfo.total"
      @get-data="getList"
    />
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
const dataList = [
  {
    roleName: '管理员',
    mark: 'admin',
    status: '成功',
    describe: '管理员，拥有所以权限'
  },
  {
    roleName: '普通角色',
    mark: 'common',
    status: '成功',
    describe: '普通角色'
  },
  {
    roleName: '测试账号',
    mark: 'test',
    status: '成功',
    describe: '测试账号'
  }
];

const pageInfo = reactive({
  currentPage: 1,
  pageSize: 20,
  total: 0
});

onMounted(() => {
  console.log();
});

const getList = () => {
  const params = {
    username: searchName.value,
    pageNo: pageInfo.currentPage,
    pageSize: pageInfo.pageSize
  };
  getUserList(params).then((res: any) => {
    if (res.code == 200) {
      const data = res.data;
      dataList.value = data.rows;
      pageInfo.total = data.total;
    }
  });
};

const onSubmit = () => {
  console.log('submit!');
};
</script>

<style lang="scss" scoped>
.el-form {
  margin-left: calc(-1 * (100% - 1600px) / 4);
  .el-form-item {
    // float: left;
    width: 20%;
    padding-left: calc((100% - 1600px) / 5);
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
