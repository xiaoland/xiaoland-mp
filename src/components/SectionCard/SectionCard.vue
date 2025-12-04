<template>
  <view
    class="section-card"
    :class="{ 'is-hover': isHover }"
    @touchstart="isHover = true"
    @touchend="isHover = false"
  >
    <view class="card-header">
      <view class="icon-box" :class="iconBgClass">
        <view :class="[icon, iconColorClass]" style="font-size: 36rpx"></view>
      </view>
      <text class="card-title">{{ title }}</text>
    </view>
    <view class="card-content">
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{
  title: string;
  icon: string;
  iconTheme?: "primary" | "tertiary" | "blue";
}>();

const isHover = ref(false);

const iconBgClass = computed(() => {
  switch (props.iconTheme) {
    case "primary":
      return "bg-primary-light";
    case "tertiary":
      return "bg-tertiary-light";
    case "blue":
      return "bg-blue-light";
    default:
      return "bg-gray-light";
  }
});

const iconColorClass = computed(() => {
  switch (props.iconTheme) {
    case "primary":
      return "text-primary";
    case "tertiary":
      return "text-tertiary";
    case "blue":
      return "text-blue";
    default:
      return "text-gray";
  }
});
</script>

<style lang="scss" scoped>
.section-card {
  background-color: $white;
  padding: 32rpx;
  border-radius: $radius-lg;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin-bottom: 24rpx;

  &.is-hover {
    transform: scale(0.98);
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.02);
  }
}

.card-header {
  display: flex;
  align-items: center;
  gap: 20rpx;
  margin-bottom: 24rpx;
  border-bottom: 2rpx solid $gray-100;
  padding-bottom: 20rpx;
}

.icon-box {
  width: 72rpx;
  height: 72rpx;
  border-radius: $radius-md;
  @include flex-center;

  &.bg-primary-light {
    background-color: rgba($primary, 0.1);
  }
  &.bg-tertiary-light {
    background-color: rgba($tertiary, 0.15);
  }
  &.bg-blue-light {
    background-color: #eff6ff;
  }
  &.bg-gray-light {
    background-color: $gray-100;
  }
}

.text-primary {
  color: $primary;
}
.text-tertiary {
  color: $tertiary;
}
.text-blue {
  color: #3b82f6;
}
.text-gray {
  color: $gray-500;
}

.card-title {
  font-size: 34rpx;
  font-weight: 600;
  color: $gray-900;
  letter-spacing: 0.5rpx;
}

.card-content {
  font-size: 28rpx;
  color: $gray-600;
  line-height: 1.6;
}
</style>
