<template>
  <div class="formContent">
    <div class="formLogin">
      <div class="title">登 录</div>
      <el-form ref="formRef" :model="formData">
        <el-form-item label="" prop="account">
          <el-input v-model="formData.account" placeholder="请输入账号：admin" />
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input v-model="formData.password" type="password" placeholder="请输入登录密码：admin" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store';
import { ElMessage } from 'element-plus';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const formRef = ref();
const formData = ref({ account: 'admin', password: 'admin' });

const submitForm = async () => {
  await userStore.userLogin();
  ElMessage.success('登录成功');
  const redirect = route.query.redirect as string;
  const url = redirect ? decodeURIComponent(redirect) : '/';
  router.push(url);
};
</script>
<style lang="scss" scoped>
.formContent {
  height: 100vh;
  background-attachment: fixed;
  background-image: url('@/assets/bg2.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
.formLogin {
  position: absolute;
  top: 40%;
  left: 50%;
  width: 400px;
  padding: 30px 45px 20px;
  background-color: #5d646b;
  border-radius: 5px;
  opacity: 0.9;
  transform: translate(-50%, -50%);
  .title {
    height: 40px;
    margin-bottom: 10px;
    font-size: 24px;
    color: #fff;
    text-align: center;
  }
  .el-button {
    width: 100%;
  }
}
</style>
