<template>
  <section ref="root" id="steps" class="section-padding bg-white scroll-mt-24">
    <div class="container-narrow">
      <div class="text-center mb-10 md:mb-14">
        <span class="section-label">{{ $t('services.label') }}</span>
        <h2 class="section-title">{{ isPatient ? $t('steps.your_journey') : $t('practice.phases_title') }}</h2>
        <p v-if="isPatient" class="mt-3 text-sm font-medium text-sage">
          {{ $t('steps.progress', { done: clampedStage, total: phases.length }) }}
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        <div
          v-for="(phase, index) in phases"
          :key="phase.title"
          class="text-center relative transition-all duration-500 ease-out"
          :class="(!canAnimate || started) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
          :style="{ transitionDelay: (index * 90) + 'ms' }"
        >
          <div
            class="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 border transition-colors duration-300"
            :class="circleClass(index)"
          >
            <i v-if="stepState(index) === 'completed'" class="fa-solid fa-check text-base sm:text-lg"></i>
            <i
              v-else
              :class="[phase.icon, stepState(index) === 'current' ? 'text-sage' : 'text-gold']"
              class="text-base sm:text-lg"
            ></i>
            <span
              v-if="stepState(index) === 'current'"
              class="absolute inset-0 rounded-2xl ring-2 ring-sage/50 animate-ping"
            ></span>
          </div>

          <h3 class="text-sm sm:text-base font-serif font-semibold text-charcoal mb-1.5 sm:mb-2">{{ phase.title }}</h3>
          <p class="text-xs sm:text-sm text-body/60 leading-relaxed max-w-[200px] mx-auto">{{ phase.description }}</p>

          <!-- Connector with animated fill -->
          <div
            v-if="index < phases.length - 1"
            class="hidden md:block absolute top-7 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-[2px] bg-stone/30 overflow-hidden rounded-full"
          >
            <div
              class="h-full bg-sage transition-all duration-700 ease-out"
              :class="connectorFilled(index) ? 'w-full' : 'w-0'"
              :style="{ transitionDelay: (index * 140 + 250) + 'ms' }"
            ></div>
          </div>
        </div>
      </div>

      <div class="text-center mt-8 sm:mt-10">
        <NuxtLink to="/book" class="btn-primary px-8 py-4 sm:px-9 text-base sm:text-sm">
          <i class="fa-regular fa-calendar-check text-sm"></i>
          {{ $t('hero.cta_book') }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useIntersectionObserver } from '@vueuse/core'

const { tm, rt } = useI18n()
const { isLoggedIn, isAdmin, journeyStage } = useAuth()

const phases = computed(() => tm('practice.phases').map(obj => ({
  title: rt(obj.title),
  description: rt(obj.description),
  icon: rt(obj.icon),
})))

// Only real patients (not the doctor) see their personal progress.
const isPatient = computed(() => isLoggedIn.value && !isAdmin.value)
const clampedStage = computed(() => Math.max(0, Math.min(journeyStage.value || 0, phases.value.length)))

const stepState = (index) => {
  if (!isPatient.value) return 'default'
  const step = index + 1
  if (step <= clampedStage.value) return 'completed'
  if (step === clampedStage.value + 1) return 'current'
  return 'upcoming'
}

const circleClass = (index) => {
  switch (stepState(index)) {
    case 'completed': return 'bg-sage text-cream border-sage'
    case 'current': return 'bg-sage/10 border-sage/40'
    case 'upcoming': return 'bg-cream border-stone/30 opacity-60'
    default: return 'bg-cream border-stone/30'
  }
}

// Connector between step (index+1) and (index+2) is filled once both are done,
// or fully filled in demo mode for the decorative reveal.
const connectorFilled = (index) => {
  if (!started.value) return false
  if (!isPatient.value) return true
  return clampedStage.value >= index + 2
}

// Scroll-triggered reveal. canAnimate stays false during SSR / first paint so
// content is never hidden without JS; it flips on after mount.
const root = ref(null)
const started = ref(false)
const canAnimate = ref(false)

onMounted(() => { canAnimate.value = true })

const { stop } = useIntersectionObserver(
  root,
  ([entry]) => {
    if (entry?.isIntersecting) {
      started.value = true
      stop()
    }
  },
  { threshold: 0.25 },
)
</script>
