<template>
  <div class="wave-divider" :style="{ backgroundColor: fromColor }">
    <svg
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      class="block w-full"
      :class="{ 'rotate-180': flip }"
    >
      <!-- Gentle wave -->
      <path v-if="variant === 1" :fill="toColor" d="M0,40 C240,90 480,0 720,50 C960,100 1200,10 1440,60 L1440,100 L0,100 Z" />
      <!-- Double curve -->
      <path v-else-if="variant === 2" :fill="toColor" d="M0,60 C180,20 360,80 540,40 C720,0 900,70 1080,30 C1260,-10 1350,50 1440,40 L1440,100 L0,100 Z" />
      <!-- Soft arc -->
      <path v-else-if="variant === 3" :fill="toColor" d="M0,80 C360,0 1080,0 1440,80 L1440,100 L0,100 Z" />
      <!-- Asymmetric swoop -->
      <path v-else-if="variant === 4" :fill="toColor" d="M0,20 C200,80 400,90 720,40 C1040,-10 1300,50 1440,30 L1440,100 L0,100 Z" />
      <!-- Layered wave -->
      <path v-else-if="variant === 5" :fill="toColor" opacity="0.5" d="M0,50 C360,100 720,-20 1080,60 C1260,80 1380,30 1440,40 L1440,100 L0,100 Z" />
      <path v-if="variant === 5" :fill="toColor" d="M0,70 C240,30 480,80 720,50 C960,20 1200,70 1440,60 L1440,100 L0,100 Z" />
    </svg>
  </div>
</template>

<script setup>
defineProps({
  fromColor: { type: String, default: '#FFFFFF' },
  toColor: { type: String, default: '#F5F1EC' },
  variant: { type: Number, default: 1 },
  flip: { type: Boolean, default: false },
})
</script>

<style scoped>
.wave-divider {
  line-height: 0;
  overflow: hidden;
  margin-top: -1px;
  margin-bottom: -1px;
  padding-top: 1px;
  padding-bottom: 1px;
}

.wave-divider svg {
  height: 40px;
}

@media (min-width: 640px) {
  .wave-divider svg {
    height: 60px;
  }
}

@media (min-width: 1024px) {
  .wave-divider svg {
    height: 80px;
  }
}
</style>
