<template>
    <div class="home">
        <div class="list">
            <div
                v-for="(anchor, index) in list"
                :key="index"
                :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }"
                @click="handleAnchorClick(anchor)"
            >
                <a style="cursor: pointer">{{ anchor.title }}</a>
            </div>
        </div>
        <div class="content">
            <v-md-editor ref="previewRef" v-model="text" mode="preview"></v-md-editor>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';
import { getMd } from '@/api/table';

const previewRef = ref();
const list = ref();
const text = ref('');
onMounted(() => {
    getMd().then((response) => {
        text.value = response.data;
        nextTick(() => {
            const anchors = previewRef.value.$el.querySelectorAll('h1,h2,h3,h4,h5,h6');
            const titles = Array.from(anchors).filter((title: any) => !!title.innerText.trim());

            if (!titles.length) {
                list.value = [];
                return;
            }

            const hTags = Array.from(new Set(titles.map((title: any) => title.tagName))).sort();

            list.value = titles.map((el: any) => ({
                title: el.innerText,
                lineIndex: el.getAttribute('data-v-md-line'),
                indent: hTags.indexOf(el.tagName)
            }));
        });
    });
});
const handleAnchorClick = (anchor: any) => {
    const { lineIndex } = anchor;

    const heading = previewRef.value.$el.querySelector(`[data-v-md-line="${lineIndex}"]`);

    if (heading) {
        previewRef.value.previewScrollToTarget({
            target: heading,
            scrollContainer: window,
            top: 60
        });
    }
};
</script>

<style scoped lang="scss">
.list {
    position: fixed;
    top: 80px;
    left: calc(100vw / 2 + 600px);
}
.content {
    width: 1200px;
}
</style>
