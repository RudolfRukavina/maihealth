<template>
  <section class="section-padding bg-white">
    <div class="container-narrow">
      <div class="max-w-3xl mx-auto">
        <div class="text-center mb-10 sm:mb-14">
          <span class="section-label">{{ $t('concerns.label') }}</span>
          <h2 class="section-title">{{ $t('concerns.title') }}</h2>
        </div>

        <div class="space-y-3">
          <div
            v-for="(item, index) in items"
            :key="item.key"
            class="rounded-2xl overflow-hidden transition-all duration-200"
            :class="openIndex === index
              ? 'bg-cream shadow-md shadow-charcoal/[0.03] ring-1 ring-sage/15'
              : 'bg-cream/50 ring-1 ring-stone/30 hover:ring-stone/50'"
          >
            <button
              @click="toggle(index)"
              :aria-expanded="openIndex === index"
              :aria-controls="`concern-panel-${index}`"
              class="w-full flex items-center justify-between p-5 sm:p-6 md:p-8 text-left"
            >
              <div class="flex items-center gap-3 sm:gap-4">
                <div
                  class="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-150"
                  :class="openIndex === index ? 'bg-sage/15' : 'bg-stone/10'"
                >
                  <i :class="[item.icon, 'text-xs sm:text-sm transition-colors duration-150', openIndex === index ? 'text-sage' : 'text-muted']"></i>
                </div>
                <h3 class="text-base md:text-lg font-serif font-semibold text-charcoal pr-2 sm:pr-4">
                  {{ item.title }}
                </h3>
              </div>
              <div
                class="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-150"
                :class="openIndex === index ? 'bg-sage rotate-45' : 'bg-stone/10'"
              >
                <i class="fa-solid fa-plus text-xs transition-colors duration-150" :class="openIndex === index ? 'text-cream' : 'text-charcoal/60'"></i>
              </div>
            </button>

            <div
              :id="`concern-panel-${index}`"
              role="region"
              class="grid transition-[grid-template-rows] duration-200 ease-in-out"
              :class="openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
            >
              <div class="overflow-hidden">
                <p class="text-sm text-body/75 leading-relaxed px-5 sm:px-6 md:px-8 pb-5 sm:pb-6 md:pb-8 pl-[52px] sm:pl-[60px] md:pl-[84px]">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n()
const openIndex = ref(0)

const items = computed(() => [
  { key: 'energy', icon: 'fa-solid fa-wind', title: t('concerns.items.energy.title'), description: t('concerns.items.energy.description') },
  { key: 'digestive', icon: 'fa-solid fa-arrows-rotate', title: t('concerns.items.digestive.title'), description: t('concerns.items.digestive.description') },
  { key: 'hormonal', icon: 'fa-solid fa-brain', title: t('concerns.items.hormonal.title'), description: t('concerns.items.hormonal.description') },
])

const toggle = (index) => {
  openIndex.value = openIndex.value === index ? -1 : index
}
</script>
