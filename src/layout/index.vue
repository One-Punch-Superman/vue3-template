<template>
    <div class="layout-container">
        <Header></Header>
        <div class="layout-body">
            <transition name="fade-transform" mode="out-in">
                <router-view :key="key"></router-view>
            </transition>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/layout/header.vue';

export default defineComponent({
    name: 'Layout',
    components: { Header }
});
</script>

<style scoped lang="scss">
.layout-body {
    width: 1400px;
    margin: 70px auto 30px;
}
</style>
<style lang="scss">
html {
    background-color: #f9f9f9;
}
</style>
