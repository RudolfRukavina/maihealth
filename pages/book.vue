<template>
  <div class="min-h-screen bg-cream">

    <!-- Page header -->
    <section class="bg-white border-b border-stone/20 pt-24 pb-8">
      <div class="container-narrow">
        <p class="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-3">{{ $t('book.label') }}</p>
        <h1 class="text-3xl md:text-4xl font-serif font-semibold text-charcoal mb-2">{{ $t('book.title') }}</h1>
        <p class="text-body/70">{{ $t('book.subtitle') }}</p>
      </div>
    </section>

    <div class="container-narrow pt-10 md:pt-14 pb-24 sm:pb-28 lg:pb-36">

      <!-- Step indicator -->
      <div class="flex items-center gap-1.5 mb-10">
        <template v-for="(s, i) in steps" :key="s.key">
          <div class="flex items-center gap-2">
            <div :class="[
              'w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors',
              stepIndex > i ? 'bg-sage text-white' : stepIndex === i ? 'bg-sage text-white' : 'bg-stone/20 text-muted',
            ]">
              <i v-if="stepIndex > i" class="fa-solid fa-check text-[9px]" />
              <span v-else>{{ i + 1 }}</span>
            </div>
            <span :class="['text-xs font-medium transition-colors', stepIndex >= i ? 'text-charcoal' : 'text-muted']">
              {{ $t(s.label) }}
            </span>
          </div>
          <div v-if="i < steps.length - 1" class="flex-1 max-w-[48px] h-px bg-stone/30" />
        </template>
      </div>

      <!-- Step 1: Choose time (public — no auth needed) -->
      <div v-if="step === 'slots'" class="max-w-xl">
        <h2 class="text-xl font-serif font-semibold text-charcoal mb-6">{{ $t('book.step_slots') }}</h2>

        <!-- Loading -->
        <div v-if="loadingSlots" class="text-sm text-muted py-12 text-center">
          <i class="fa-solid fa-spinner fa-spin mr-2"></i>
          {{ $t('book.loading_slots') }}
        </div>

        <!-- Error loading slots -->
        <div v-else-if="slotsError" class="bg-white/60 rounded-2xl border border-stone/20 p-8 text-center">
          <i class="fa-regular fa-circle-exclamation text-2xl text-muted mb-3 block"></i>
          <p class="text-sm text-muted mb-5">{{ $t('book.slots_error') }}</p>
          <button @click="fetchSlots" class="btn-secondary text-xs inline-flex">
            <i class="fa-solid fa-rotate-right text-xs"></i>
            {{ $t('book.retry') }}
          </button>
        </div>

        <!-- No slots available -->
        <div v-else-if="!calendarDates.filter(d => d.available).length" class="bg-white/60 rounded-2xl border border-stone/20 p-8 text-center">
          <i class="fa-regular fa-calendar-xmark text-2xl text-muted mb-3 block"></i>
          <p class="text-sm text-muted mb-1">{{ $t('book.step_slots_empty') }}</p>
          <p class="text-xs text-muted/80 mb-5">{{ $t('book.step_slots_empty_hint') }}</p>
          <NuxtLink to="/contact" class="btn-secondary text-xs inline-flex">
            <i class="fa-regular fa-envelope text-xs"></i>
            {{ $t('book.step_slots_empty_cta') }}
          </NuxtLink>
        </div>

        <!-- Calendar grid -->
        <div v-else>
          <!-- Month label -->
          <p class="text-xs font-semibold tracking-[0.12em] uppercase text-charcoal/50 mb-3">
            {{ new Date().toLocaleDateString(undefined, { month: 'long', year: 'numeric' }) }}
          </p>

          <!-- Day-of-week headers (Mon–Sun) -->
          <div class="grid grid-cols-7 gap-1 mb-1">
            <div v-for="d in weekDayLabels" :key="d" class="text-center text-[11px] font-medium text-muted py-1">{{ d }}</div>
          </div>

          <!-- Day cells -->
          <div class="grid grid-cols-7 gap-1">
            <!-- Offset empty cells -->
            <div v-for="n in calendarOffset" :key="'offset-' + n" />
            <button
              v-for="date in calendarDates"
              :key="date.iso"
              @click="date.available ? selectDate(date.iso) : undefined"
              :disabled="!date.available"
              :class="[
                'aspect-square rounded-xl text-xs font-medium flex items-center justify-center transition-all',
                date.iso === selectedDate
                  ? 'bg-sage text-white shadow-sm'
                  : date.available
                    ? 'bg-white border border-stone/20 text-charcoal hover:border-sage/50 hover:bg-sage/5'
                    : 'text-stone/30 cursor-default',
              ]"
            >
              {{ date.day }}
            </button>
          </div>

          <!-- Time slots for selected date -->
          <Transition
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
          >
            <div v-if="selectedDate" class="mt-6 pt-5 border-t border-stone/15">
              <p class="text-xs font-semibold tracking-[0.12em] uppercase text-charcoal/50 mb-3">
                {{ formatDisplayDate(selectedDate) }}
              </p>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="slot in slotsForDate(selectedDate)"
                  :key="slot"
                  @click="chooseSlot(slot)"
                  class="px-4 py-2 rounded-full text-sm font-medium border transition-all bg-white border-stone/40 text-body hover:border-sage hover:text-sage hover:bg-sage/5"
                >
                  {{ formatTime(new Date(slot)) }}
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Step 2: Your details / confirm -->
      <div v-else-if="step === 'confirm'" class="max-w-md">
        <button
          @click="backToSlots"
          class="inline-flex items-center gap-2 text-xs font-medium text-muted hover:text-charcoal transition-colors mb-5"
        >
          <i class="fa-solid fa-arrow-left text-[10px]"></i>
          {{ $t('book.back') }}
        </button>

        <div class="bg-white rounded-2xl border border-stone/30 p-6 md:p-8 shadow-sm">
          <h3 class="text-base font-serif font-semibold text-charcoal mb-5">{{ $t('book.step_confirm') }}</h3>

          <!-- Selected slot summary -->
          <div class="bg-cream rounded-xl p-4 mb-6">
            <p class="text-sm font-semibold text-charcoal">{{ formatDisplayDate(selectedDate!) }}</p>
            <p class="text-sm text-body/60 mt-0.5">{{ formatTime(new Date(selectedSlot!)) }} · {{ slotDuration }} min</p>
          </div>

          <!-- Consultation type -->
          <div class="mb-4">
            <label class="block text-xs font-medium text-charcoal/80 mb-2 tracking-wide">{{ $t('book.type_label') }}</label>
            <div class="flex gap-2">
              <button
                v-for="typeOpt in ['initial', 'followup']"
                :key="typeOpt"
                type="button"
                @click="form.type = typeOpt"
                :class="[
                  'px-4 py-2 text-xs font-medium rounded-full border transition-all',
                  form.type === typeOpt
                    ? 'bg-sage text-cream border-sage'
                    : 'border-stone/40 text-body hover:border-sage hover:text-sage',
                ]"
              >
                {{ $t(`book.${typeOpt}`) }}
                <span
                  v-if="typeOpt === 'initial'"
                  :class="[
                    'ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide align-middle',
                    form.type === typeOpt ? 'bg-cream text-sage' : 'bg-gold text-cream',
                  ]"
                >
                  {{ $t('book.free_badge') }}
                </span>
              </button>
            </div>
          </div>

          <!-- Reason -->
          <div class="mb-5">
            <label class="block text-xs font-medium text-charcoal/80 mb-2 tracking-wide">{{ $t('book.reason_label') }}</label>
            <textarea
              v-model="form.reason"
              rows="2"
              :placeholder="$t('book.reason_placeholder')"
              class="w-full px-4 py-3 bg-cream rounded-xl border border-stone/30 text-sm text-charcoal placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-sage/15 focus:border-sage/30 transition-all resize-none"
            />
          </div>

          <!-- Identity: signed in, or Google + guest details -->
          <div class="pt-5 border-t border-stone/15">
            <!-- Already signed in -->
            <div v-if="isLoggedIn" class="flex items-center gap-2 text-sm text-body/70 mb-5">
              <i class="fa-solid fa-circle-check text-sage text-xs"></i>
              {{ $t('book.logged_in_as', { name: user?.displayName || user?.email }) }}
            </div>

            <!-- Not signed in: Google only -->
            <template v-else>
              <button
                @click="handleLogin"
                :disabled="signingIn"
                class="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white border border-stone/40 rounded-xl text-sm font-medium text-charcoal hover:bg-cream/50 hover:border-stone/60 transition-all duration-150 active:scale-[0.98] disabled:opacity-60"
              >
                <i v-if="signingIn" class="fa-solid fa-spinner fa-spin text-xs" />
                <svg v-else class="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                {{ $t('book.continue_google') }}
              </button>
            </template>

            <!-- Consent (health data — Art. 9 GDPR) -->
            <label class="flex items-start gap-2.5 cursor-pointer mt-5">
              <input
                v-model="consent"
                type="checkbox"
                required
                class="mt-0.5 h-4 w-4 shrink-0 rounded border-stone/50 text-sage focus:ring-sage/30"
              />
              <span class="text-xs text-body/60 leading-relaxed">
                {{ $t('consent.booking') }}
                <NuxtLink to="/privacy" class="text-sage underline underline-offset-2 hover:text-charcoal">{{ $t('consent.privacy_link') }}</NuxtLink>.
              </span>
            </label>

            <!-- Error -->
            <p v-if="bookError" class="text-sm text-red-600 mt-4 mb-1 flex items-center gap-1.5">
              <i class="fa-solid fa-circle-exclamation text-xs"></i>
              {{ bookError }}
            </p>

            <!-- Confirm button -->
            <button @click="handleBook" :disabled="booking || !consent" class="btn-primary w-full justify-center mt-5 disabled:opacity-50 disabled:cursor-not-allowed">
              <i v-if="booking" class="fa-solid fa-spinner fa-spin text-xs" />
              <template v-else>
                {{ $t('book.confirm_btn') }}
                <i class="fa-solid fa-check text-xs"></i>
              </template>
            </button>

            <p class="text-xs text-muted mt-4 leading-relaxed">
              <i class="fa-solid fa-circle-info text-[10px] mr-1"></i>
              {{ $t('book.requesting') }}
            </p>
          </div>
        </div>
      </div>

      <!-- Step 3: Confirmation -->
      <div v-else-if="step === 'confirmed'" class="max-w-xl">
        <div class="bg-white rounded-2xl border border-stone/30 p-8 shadow-sm text-center">
          <div class="w-14 h-14 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-6">
            <i class="fa-solid fa-circle-check text-2xl text-sage"></i>
          </div>

          <template v-if="bookResult?.type === 'booked'">
            <h2 class="text-2xl font-serif font-semibold text-charcoal mb-2">{{ $t('book.confirmed_title') }}</h2>
            <p class="text-body/70 mb-6">{{ $t('book.confirmed_subtitle') }}</p>
          </template>
          <template v-else>
            <h2 class="text-2xl font-serif font-semibold text-charcoal mb-2">{{ $t('book.request_sent_title') }}</h2>
            <p class="text-body/70 mb-6">{{ $t('book.request_sent_subtitle') }}</p>
          </template>

          <!-- Appointment summary -->
          <div class="bg-cream rounded-xl p-5 text-left mb-6">
            <p class="text-sm font-semibold text-charcoal">{{ formatDisplayDate(confirmedDate!) }}</p>
            <p class="text-sm text-body/60 mt-0.5">{{ confirmedTime }} · {{ bookResult?.duration || slotDuration }} min</p>
            <a
              v-if="bookResult?.zoomJoinUrl"
              :href="bookResult.zoomJoinUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 text-sm text-sage font-medium mt-3 hover:underline"
            >
              <i class="fa-solid fa-video text-xs"></i>
              {{ $t('book.zoom_link') }}
            </a>
          </div>

          <!-- Actions -->
          <div class="flex flex-col gap-3">
            <a
              v-if="bookResult?.type === 'booked'"
              :href="googleCalendarLink"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-secondary justify-center"
            >
              <i class="fa-regular fa-calendar-plus text-sm"></i>
              {{ $t('book.add_to_calendar') }}
            </a>
            <NuxtLink to="/" class="btn-primary justify-center">
              {{ $t('book.back_home') }}
              <i class="fa-solid fa-arrow-right text-xs"></i>
            </NuxtLink>
          </div>

          <!-- What to expect note -->
          <p class="text-xs text-muted mt-6 leading-relaxed text-left bg-cream/50 rounded-xl p-4">
            <i class="fa-solid fa-circle-info text-[10px] mr-1.5"></i>
            {{ $t('book.what_to_expect_text') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t, locale } = useI18n()
const { signInWithGoogle, isLoggedIn, getIdToken, user } = useAuth()

// Step logic
const bookResult = ref<Record<string, any> | null>(null)

const step = computed<'slots' | 'confirm' | 'confirmed'>(() => {
  if (bookResult.value) return 'confirmed'
  if (selectedSlot.value) return 'confirm'
  return 'slots'
})

const steps = [
  { key: 'slots', label: 'book.step_nav_slots' },
  { key: 'confirm', label: 'book.step_nav_confirm' },
  { key: 'confirmed', label: 'book.step_nav_done' },
] as const

const stepIndex = computed(() => {
  const map = { slots: 0, confirm: 1, confirmed: 2 } as const
  return map[step.value] ?? 0
})

// Auth
const signingIn = ref(false)
const handleLogin = async () => {
  signingIn.value = true
  try {
    await signInWithGoogle()
  } catch (err) {
    console.error('Login failed:', err)
  } finally {
    signingIn.value = false
  }
}

// Slots
const slots = ref<string[]>([])
const slotDuration = ref(60)
const loadingSlots = ref(false)
const slotsError = ref(false)
const selectedDate = ref<string | null>(null)
const selectedSlot = ref<string | null>(null)

// Local YYYY-MM-DD key (avoids UTC off-by-one when grouping slots by day)
const toDateKey = (d: Date) => {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

const today = new Date()
today.setHours(0, 0, 0, 0)
const fromDate = toDateKey(today)
const toDate = toDateKey(new Date(today.getTime() + 28 * 24 * 60 * 60 * 1000))

// Calendar helpers
const weekDayLabels = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

const calendarOffset = computed(() => {
  // Monday-first grid: Sun=0 → offset 6, Mon=1 → offset 0, etc.
  const dow = today.getDay()
  return dow === 0 ? 6 : dow - 1
})

const availableDateSet = computed(() => new Set(slots.value.map(s => toDateKey(new Date(s)))))

const calendarDates = computed(() => {
  const dates: { iso: string; day: number; available: boolean }[] = []
  const cursor = new Date(today)
  for (let i = 0; i < 28; i++) {
    const iso = toDateKey(cursor)
    dates.push({ iso, day: cursor.getDate(), available: availableDateSet.value.has(iso) })
    cursor.setDate(cursor.getDate() + 1)
  }
  return dates
})

const slotsForDate = (date: string) => slots.value.filter(s => toDateKey(new Date(s)) === date)

const selectDate = (iso: string) => {
  selectedDate.value = iso
  selectedSlot.value = null
}

// Selecting a time advances to the confirm step
const chooseSlot = (slot: string) => {
  selectedSlot.value = slot
  bookError.value = ''
}

const backToSlots = () => {
  selectedSlot.value = null
  bookError.value = ''
}

const fetchSlots = async () => {
  loadingSlots.value = true
  slotsError.value = false
  try {
    const data = await $fetch<{ slots: string[]; slotDuration: number }>(
      `/api/availability/slots?from=${fromDate}&to=${toDate}`
    )
    slots.value = data.slots ?? []
    slotDuration.value = data.slotDuration ?? 60
  } catch (err) {
    console.error('Failed to fetch slots:', err)
    slotsError.value = true
  } finally {
    loadingSlots.value = false
  }
}

// Load availability immediately — no auth required to view slots
onMounted(fetchSlots)

// Booking
const form = reactive({ type: 'initial', reason: '' })
const consent = ref(false)
const booking = ref(false)
const bookError = ref('')
// Captured at confirmation time so they persist on the confirmed screen
const confirmedDate = ref<string | null>(null)
const confirmedTime = ref('')

const handleBook = async () => {
  if (!selectedSlot.value) return
  bookError.value = ''

  if (!consent.value) {
    bookError.value = t('consent.required')
    return
  }

  if (!isLoggedIn.value) {
    bookError.value = t('book.step_auth')
    return
  }

  booking.value = true
  try {
    const headers: Record<string, string> = {}
    if (isLoggedIn.value) {
      const token = await getIdToken()
      if (token) headers.Authorization = `Bearer ${token}`
    }
    const result = await $fetch<Record<string, any>>('/api/appointments/book', {
      method: 'POST',
      headers,
      body: {
        slotDateTime: selectedSlot.value,
        type: form.type,
        reason: form.reason,
        consent: true,
        locale: locale.value,
        guestName: '',
        guestEmail: '',
        guestPhone: '',
      },
    })
    confirmedDate.value = selectedDate.value
    confirmedTime.value = formatTime(new Date(selectedSlot.value))
    bookResult.value = result
  } catch (err: any) {
    bookError.value = err?.data?.statusMessage || t('portal.request.error')
  } finally {
    booking.value = false
  }
}

// Google Calendar link
const googleCalendarLink = computed(() => {
  if (!selectedSlot.value) return '#'
  const start = new Date(selectedSlot.value)
  const end = new Date(start.getTime() + (bookResult.value?.duration ?? slotDuration.value) * 60_000)
  const fmt = (d: Date) => d.toISOString().replace(/[-:.]/g, '').slice(0, 15) + 'Z'
  const details = bookResult.value?.zoomJoinUrl ?? ''
  return (
    `https://calendar.google.com/calendar/render?action=TEMPLATE` +
    `&text=${encodeURIComponent('MaiHealth Consultation')}` +
    `&dates=${fmt(start)}/${fmt(end)}` +
    `&details=${encodeURIComponent(details)}` +
    `&location=${encodeURIComponent('Online (Zoom)')}`
  )
})

// Formatting
const formatDisplayDate = (key: string) =>
  new Date(key + 'T00:00:00').toLocaleDateString(undefined, {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

const formatTime = (date: Date) =>
  date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })

// SEO
useHead({
  title: computed(() => t('book.meta_title')),
  meta: [{ name: 'description', content: computed(() => t('book.meta_description')) }],
})
</script>
