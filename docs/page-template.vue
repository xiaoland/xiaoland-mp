<template>
    <!-- you should handle top safeAreaInset if customizeNavigationBar is enabled -->
    <!-- you should handle TabBar safeAreaInset if customize TabBar is enabled and this page is a tabBar page -->
    <!-- you always should handle bottom safeAreaInset -->
</template>

<script setup lang="ts">
// Import here
// Read more about page lifecycle here: <https://uniapp.dcloud.net.cn/tutorial/page.html#lifecycle>
import { onHide } from "@dcloudio/uni-app";
import { onShow } from "@dcloudio/uni-app";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";

// data
const params = ref({});

// computed

// methods

// watch

// lifycycle
onLoad((params) => {
    // onLoad 触发时，响应式数据、计算属性、方法、侦听器、props、slots 已设置完成
    // 在这里接收页面参数
});

onShow(() => {
    // trigger on page rendered.
    // navigate back will also trigger.
});

onHide(() => {
    // navigate to other page or navigate back will trigger.
});
</script>

<style lang="scss" src="./pageName.scss" scoped />
