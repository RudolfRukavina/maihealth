<template>
  <section class="relative h-svh lg:min-h-screen lg:h-auto flex items-center overflow-hidden bg-cream">
    <div class="absolute inset-0 bg-gradient-to-br from-cream via-cream to-cream-dark/30" />
    <div class="absolute top-20 left-1/4 w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full bg-sage/[0.04] blur-[60px] md:blur-[100px]" />
    <div class="absolute bottom-20 right-1/4 w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full bg-mauve/[0.06] blur-[50px] md:blur-[80px]" />

    <div class="container-narrow relative z-10 pt-20 pb-6 sm:pt-28 sm:pb-16 md:py-0 h-full lg:h-auto flex flex-col justify-center">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">

        <div class="max-w-xl text-center lg:text-left mx-auto lg:mx-0 lg:order-1">
          <p class="hero-fade hero-fade-1 text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-4">
            {{ $t('portal.my_appointments') }}
          </p>
          <h1 class="hero-fade hero-fade-1 text-display-hero sm:text-4xl md:text-display-sm xl:text-display font-serif font-bold text-charcoal text-balance mb-5">
            {{ $t('portal.welcome') }}, {{ firstName }}
          </h1>

          <!-- Next appointment -->
          <div
            v-if="nextAppointment"
            class="hero-fade hero-fade-2 bg-white rounded-2xl border border-stone/30 shadow-sm p-5 sm:p-6 mb-8 text-left"
          >
            <p class="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-3">
              {{ $t('portal.next_appointment') }}
            </p>
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p class="text-lg font-serif font-semibold text-charcoal">
                  {{ formatDate(nextAppointment.date?.toDate()) }}
                </p>
                <p class="text-sm text-body/60 mt-1">
                  {{ formatTime(nextAppointment.date?.toDate()) }} &middot; {{ nextAppointment.duration || 60 }} min
                </p>
              </div>
              <div class="sm:text-right">
                <a
                  v-if="zoomReady && nextAppointment.zoomJoinUrl"
                  :href="nextAppointment.zoomJoinUrl"
                  target="_blank"
                  rel="noopener"
                  class="btn-primary text-sm justify-center"
                >
                  <i class="fa-solid fa-video text-xs"></i>
                  {{ $t('portal.enter_zoom') }}
                </a>
                <button
                  v-else
                  type="button"
                  disabled
                  class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-stone/15 text-muted cursor-not-allowed"
                >
                  <i class="fa-solid fa-lock text-xs"></i>
                  {{ $t('portal.enter_zoom') }}
                </button>
                <p class="text-xs text-muted mt-2">{{ $t('portal.zoom_locked_hint') }}</p>
              </div>
            </div>
          </div>

          <!-- Pending request (awaiting approval) -->
          <div
            v-else-if="upcomingRequests.length"
            class="hero-fade hero-fade-2 bg-white rounded-2xl border border-stone/30 shadow-sm p-5 sm:p-6 mb-8 text-left"
          >
            <p class="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-3">
              {{ $t('portal.pending_requests') }}
            </p>
            <p class="text-lg font-serif font-semibold text-charcoal">
              {{ formatDate(upcomingRequests[0].slotDate?.toDate()) }}
            </p>
            <p class="text-sm text-body/60 mt-1">
              {{ formatTime(upcomingRequests[0].slotDate?.toDate()) }}
              <span class="inline-block ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold/10 text-gold">
                {{ $t('portal.status.pending') }}
              </span>
            </p>
          </div>

          <!-- No appointments yet -->
          <p v-else class="hero-fade hero-fade-2 text-base sm:text-lg text-body/80 leading-relaxed mb-8">
            {{ $t('portal.no_upcoming') }}
          </p>

          <div class="hero-fade hero-fade-3 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-center lg:justify-start">
            <NuxtLink to="/book" class="btn-primary px-8 py-4 sm:px-9 sm:py-4 text-base sm:text-sm justify-center">
              <i class="fa-regular fa-calendar-check text-sm"></i>
              {{ $t('nav.book') }}
            </NuxtLink>
            <NuxtLink v-if="isAdmin" to="/portal/admin" class="btn-secondary px-8 py-4 sm:px-9 sm:py-4 text-base sm:text-sm justify-center">
              {{ $t('nav.admin') }}
              <i class="fa-solid fa-arrow-right text-xs"></i>
            </NuxtLink>
          </div>
        </div>

        <!-- Photo — desktop only, normal flow -->
        <div class="hero-fade hero-fade-0 hidden lg:flex lg:order-2 justify-center items-center">
          <div class="relative">
            <div class="absolute -inset-4 hero-blob bg-gradient-to-br from-sage/8 via-mauve/5 to-sage/8" />
            <div class="relative hero-blob w-[420px] h-[500px] xl:w-[460px] xl:h-[540px] overflow-hidden shadow-2xl shadow-charcoal/8">
              <picture>
                <source srcset="/mai2.webp" type="image/webp" />
                <img src="/mai2.png" alt="Dr. med. Mai Wald" class="w-full h-full object-cover" loading="eager" fetchpriority="high" />
              </picture>
            </div>

            <div class="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-xl shadow-charcoal/6 px-5 py-3.5 flex items-center gap-3 border border-stone/15">
              <div class="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center">
                <i class="fa-solid fa-heart-pulse text-sage"></i>
              </div>
              <div>
                <p class="text-xs font-semibold text-charcoal">{{ $t('hero.badge_card.title') }}</p>
                <p class="text-[10px] text-muted">{{ $t('hero.badge_card.subtitle') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { user, isAdmin } = useAuth()
const { nextAppointment, upcomingRequests } = useAppointments()

const firstName = computed(() => user.value?.displayName?.split(' ')[0] || '')

// Tick every 30s so the Zoom button unlocks automatically near the call time.
const now = ref(Date.now())
let timer
onMounted(() => { timer = setInterval(() => { now.value = Date.now() }, 30000) })
onUnmounted(() => clearInterval(timer))

// Zoom opens 15 minutes before the appointment start.
const zoomReady = computed(() => {
  const d = nextAppointment.value?.date?.toDate?.()
  if (!d) return false
  return now.value >= d.getTime() - 15 * 60 * 1000
})

const formatDate = (date) => {
  if (!date) return ''
  return date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

const formatTime = (date) => {
  if (!date) return ''
  return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
}
</script>
