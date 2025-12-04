<template>
    <view class="page">
        <!-- Hero Section -->
        <view class="hero">
            <view class="hero__status-bar"></view>

            <!-- Capsule button safe area -->
            <view class="hero__capsule-spacer"></view>

            <view class="hero__content">
                <image
                    class="hero__avatar"
                    src="/static/Potrait.png"
                    mode="aspectFill"
                    :class="{ 'is-pressed': avatarPressed }"
                    @touchstart="avatarPressed = true"
                    @touchend="avatarPressed = false"
                ></image>

                <view class="hero__intro">
                    <text class="hero__greeting">你好，我是</text>
                    <text class="hero__name">袁翊闳</text>
                </view>

                <view class="hero__title-group">
                    <view
                        class="hero__title-item"
                        :class="{ 'is-active': activeTitle === 0 }"
                        @tap="setActiveTitle(0)"
                    >
                        <view class="hero__title-marker"></view>
                        <text class="hero__title-text">全栈开发者</text>
                    </view>
                    <view
                        class="hero__title-item"
                        :class="{ 'is-active': activeTitle === 1 }"
                        @tap="setActiveTitle(1)"
                    >
                        <view class="hero__title-marker"></view>
                        <text class="hero__title-text">技术探索者</text>
                    </view>
                    <view
                        class="hero__title-item"
                        :class="{ 'is-active': activeTitle === 2 }"
                        @tap="setActiveTitle(2)"
                    >
                        <view class="hero__title-marker"></view>
                        <text class="hero__title-text">代码工匠</text>
                    </view>
                </view>
            </view>

            <view class="hero__divider">
                <view class="hero__divider-line"></view>
                <view class="hero__divider-dot"></view>
                <view class="hero__divider-line"></view>
            </view>
        </view>

        <!-- About Section -->
        <view class="section section--about">
            <view class="section__header">
                <text class="section__number">01</text>
                <text class="section__label">关于</text>
            </view>
            <view class="section__body">
                <text class="about__text">
                    热衷于通过代码解决实际问题，追求极致的用户体验与代码质量。相信技术的力量能够改变世界，也相信每一行代码都应该被认真对待。
                </text>
                <view class="about__quote">
                    <text class="about__quote-mark">"</text>
                    <text class="about__quote-text">代码如诗，简洁即美</text>
                </view>
            </view>
        </view>

        <!-- Tech Stack Section -->
        <view class="section section--tech">
            <view class="section__header">
                <text class="section__number">02</text>
                <text class="section__label">技术栈</text>
            </view>
            <view class="section__body">
                <view class="tech-list">
                    <view
                        v-for="(item, index) in techStack"
                        :key="item.category"
                        class="tech-item"
                        :class="{ 'is-expanded': expandedTech === index }"
                        @tap="toggleTech(index)"
                    >
                        <view class="tech-item__header">
                            <text class="tech-item__category">{{
                                item.category
                            }}</text>
                            <view class="tech-item__toggle">
                                <view class="tech-item__toggle-h"></view>
                                <view class="tech-item__toggle-v"></view>
                            </view>
                        </view>
                        <view class="tech-item__content">
                            <text class="tech-item__skills">{{
                                item.skills
                            }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <!-- Projects Section -->
        <view class="section section--projects">
            <view class="section__header">
                <text class="section__number">03</text>
                <text class="section__label">项目</text>
            </view>
            <view class="section__body">
                <view class="project-grid">
                    <view
                        v-for="project in projects"
                        :key="project.name"
                        class="project-card"
                        :class="{
                            'is-pressed': pressedProject === project.name,
                        }"
                        @touchstart="pressedProject = project.name"
                        @touchend="pressedProject = ''"
                    >
                        <view class="project-card__index">{{
                            project.index
                        }}</view>
                        <text class="project-card__name">{{
                            project.name
                        }}</text>
                        <text class="project-card__desc">{{
                            project.desc
                        }}</text>
                        <view class="project-card__arrow">
                            <view class="i-ic-baseline-arrow-forward"></view>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <!-- Contact Section -->
        <view class="section section--contact">
            <view class="section__header">
                <text class="section__number">04</text>
                <text class="section__label">联系</text>
            </view>
            <view class="section__body">
                <text class="contact__text">
                    有想法？有项目？或者只是想聊聊技术？
                </text>
                <button
                    class="contact__btn"
                    :class="{ 'is-pressed': btnPressed }"
                    @touchstart="btnPressed = true"
                    @touchend="btnPressed = false"
                >
                    <text class="contact__btn-text">开始对话</text>
                    <view class="contact__btn-line"></view>
                </button>
            </view>
        </view>

        <!-- Footer -->
        <view class="footer">
            <view class="footer__line"></view>
            <text class="footer__text">crafted with passion</text>
            <text class="footer__year">2024</text>
        </view>
    </view>
</template>

<script setup lang="ts">
import { onHide, onShow, onLoad, onShareAppMessage } from "@dcloudio/uni-app";
import { ref } from "vue";

// State
const activeTitle = ref(0);
const avatarPressed = ref(false);
const expandedTech = ref<number | null>(null);
const pressedProject = ref("");
const btnPressed = ref(false);

// Data
const techStack = ref([
    { category: "前端开发", skills: "Vue 3 · TypeScript · UnoCSS · Vite" },
    { category: "跨平台应用", skills: "UniApp · Flutter · React Native" },
    { category: "后端服务", skills: "Node.js · Go · PostgreSQL · Redis" },
    { category: "开发工具", skills: "Git · Docker · Linux · Neovim" },
]);

const projects = ref([
    { index: "A", name: "小岛", desc: "个人名片小程序" },
    { index: "B", name: "开源工具", desc: "提升开发效率" },
    { index: "C", name: "技术博客", desc: "分享与记录" },
]);

// Methods
const setActiveTitle = (index: number) => {
    activeTitle.value = index;
};

const toggleTech = (index: number) => {
    if (expandedTech.value === index) {
        expandedTech.value = null;
    } else {
        expandedTech.value = index;
    }
};

// Lifecycle
onLoad(() => {
    console.log("Home page loaded");
});

onShow(() => {
    // Auto cycle through titles
    setInterval(() => {
        activeTitle.value = (activeTitle.value + 1) % 3;
    }, 3000);
});

onHide(() => {});

// 启用分享到微信群聊/好友
onShareAppMessage(() => {
    return {
        title: "袁翊闳 - 全栈开发者",
        path: "/pages/home/home",
        imageUrl: "/static/Potrait.png",
    };
});
</script>

<style lang="scss" src="./home.scss" scoped />
