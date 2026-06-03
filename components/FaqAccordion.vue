<template>
  <section class="section-padding bg-white">
    <div class="container-narrow">
      <div class="max-w-3xl mx-auto">
        <div class="text-center mb-10 sm:mb-14">
          <span class="section-label">{{ $t('faq.label') }}</span>
          <h2 class="section-title">{{ $t('faq.title') }}</h2>
        </div>

        <div class="space-y-2.5 sm:space-y-3">
          <div
            v-for="(item, index) in items"
            :key="item.key"
            class="rounded-xl overflow-hidden transition-all duration-150"
            :class="openIndex === index
              ? 'bg-cream ring-1 ring-sage/15 shadow-sm'
              : 'bg-cream/40 ring-1 ring-stone/25 hover:ring-stone/40'"
          >
            <button
              @click="toggle(index)"
              class="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 text-left gap-3 sm:gap-4"
            >
              <h3 class="text-base sm:text-base font-medium text-charcoal flex items-center gap-2.5 sm:gap-3">
                <span
                  class="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 text-[10px] font-semibold transition-colors duration-150"
                  :class="openIndex === index ? 'bg-sage/15 text-sage' : 'bg-stone/10 text-muted'"
                >
                  {{ String(index + 1).padStart(2, '0') }}
                </span>
                {{ item.question }}
              </h3>
              <i
                class="fa-solid fa-chevron-down text-[10px] sm:text-xs flex-shrink-0 transition-all duration-150"
                :class="openIndex === index ? 'rotate-180 text-sage' : 'text-muted'"
              ></i>
            </button>

            <div
              class="overflow-hidden transition-all duration-200 ease-in-out"
              :style="{ maxHeight: openIndex === index ? contentHeights[index] + 'px' : '0px' }"
            >
              <div :ref="el => innerRefs[index] = el" class="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 pl-[46px] sm:pl-[52px] md:pl-[56px]">
                <p class="text-sm text-body/70 leading-relaxed">
                  {{ item.answer }}
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
const openIndex = ref(-1)
const innerRefs = ref([])
const contentHeights = ref({})

const items = computed(() => [
  { key: 'q1', question: t('faq.items.q1.question'), answer: t('faq.items.q1.answer') },
  { key: 'q2', question: t('faq.items.q2.question'), answer: t('faq.items.q2.answer') },
  { key: 'q3', question: t('faq.items.q3.question'), answer: t('faq.items.q3.answer') },
  { key: 'q4', question: t('faq.items.q4.question'), answer: t('faq.items.q4.answer') },
  { key: 'q5', question: t('faq.items.q5.question'), answer: t('faq.items.q5.answer') },
])

const toggle = (index) => {
  openIndex.value = openIndex.value === index ? -1 : index
}

const measureHeights = () => {
  innerRefs.value.forEach((el, i) => {
    if (el) contentHeights.value[i] = el.scrollHeight
  })
}

onMounted(() => {
  nextTick(measureHeights)
  window.addEventListener('resize', measureHeights)
})

onUnmounted(() => {
  window.removeEventListener('resize', measureHeights)
})
</script>
