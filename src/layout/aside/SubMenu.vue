<template>
  <template v-for="item in menuList" :key="item.path">
    <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
      <template #title>
        <el-icon v-if="item.icon">
          <component :is="item.icon"></component>
        </el-icon>
        <span>{{ item.title }}</span>
      </template>
      <SubMenu :menuList="item.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="item.path" @click="handleClickMenu(item)">
      <el-icon v-if="item.icon">
        <component :is="item.icon"></component>
      </el-icon>
      <span>{{ item.title }}</span>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
defineProps({
  menuList: {
    type: Array<any>,
    required: true
  }
});

const router = useRouter();

const handleClickMenu = (item: any) => {
  if (item.isLink) {
    window.open(item.isLink, '_blank');
  }
  router.push(item.path);
};
</script>

<style lang="scss" scoped></style>
