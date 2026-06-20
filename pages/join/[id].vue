<template>
  <div class="min-h-screen bg-cream flex items-center justify-center px-5 py-12 font-sans text-charcoal">
    <div class="w-full max-w-md">
      <!-- Wordmark -->
      <div class="text-center mb-8">
        <span class="text-2xl font-serif font-semibold">Mai</span><span class="text-2xl font-serif font-semibold text-gold">Health</span>
      </div>

      <div class="bg-white rounded-3xl shadow-sm shadow-charcoal/5 border border-cream-dark p-8 sm:p-10">
        <!-- Loading -->
        <div v-if="state === 'loading'" class="text-center py-8 text-muted">
          <i class="fa-solid fa-circle-notch fa-spin text-2xl mb-3"></i>
          <p>{{ tr.loading }}</p>
        </div>

        <!-- Invalid / not found -->
        <div v-else-if="state === 'error'" class="text-center py-6">
          <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-mauve-light flex items-center justify-center">
            <i class="fa-solid fa-link-slash text-mauve"></i>
          </div>
          <h1 class="text-xl font-serif font-semibold mb-2">{{ tr.invalidTitle }}</h1>
          <p class="text-body text-sm leading-relaxed">{{ tr.invalidBody }}</p>
        </div>

        <!-- Cancelled -->
        <div v-else-if="data?.status === 'cancelled'" class="text-center py-6">
          <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-mauve-light flex items-center justify-center">
            <i class="fa-solid fa-calendar-xmark text-mauve"></i>
          </div>
          <h1 class="text-xl font-serif font-semibold mb-2">{{ tr.cancelledTitle }}</h1>
          <p class="text-body text-sm leading-relaxed">{{ tr.cancelledBody }}</p>
        </div>

        <!-- Scheduled -->
        <div v-else>
          <h1 class="text-2xl font-serif font-semibold mb-1">{{ tr.heading }}</h1>
          <p class="text-body text-sm mb-6">{{ greeting }}</p>

          <div class="bg-cream rounded-2xl p-5 mb-6 space-y-1.5 text-sm">
            <p><span class="text-muted">{{ tr.date }}:</span> <strong>{{ dateStr }}</strong></p>
            <p><span class="text-muted">{{ tr.time }}:</span> <strong>{{ timeStr }}</strong></p>
            <p><span class="text-muted">{{ tr.duration }}:</span> <strong>{{ data?.duration }} {{ tr.minutes }}</strong></p>
          </div>

          <!-- Ready to join -->
          <a
            v-if="data?.joinable && data?.joinUrl"
            :href="data.joinUrl"
            target="_blank"
            rel="noopener"
            class="btn-primary w-full"
          >
            <i class="fa-solid fa-video"></i> {{ tr.joinBtn }}
          </a>

          <!-- Locked until 15 min before -->
          <template v-else>
            <button type="button" disabled class="btn-primary w-full opacity-50 cursor-not-allowed">
              <i class="fa-solid fa-lock"></i> {{ tr.joinBtn }}
            </button>
            <p class="text-center text-xs text-muted mt-3">{{ tr.lockedHint }}</p>
          </template>
        </div>
      </div>

      <p class="text-center text-xs text-muted mt-6">
        Mai Jimenez · <a href="https://mai-health.de" class="text-gold hover:underline">mai-health.de</a>
      </p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: false })
useSeoMeta({ robots: 'noindex, nofollow' })

const route = useRoute()
const id = route.params.id
const token = route.query.t

const state = ref('loading') // loading | error | ok
const data = ref(null)

async function load() {
  if (!id || !token) { state.value = 'error'; return }
  try {
    data.value = await $fetch(`/api/join/${id}`, { query: { t: token } })
    state.value = 'ok'
  } catch {
    state.value = 'error'
  }
}

let timer
onMounted(() => {
  load()
  // Re-poll so the button unlocks (and the Zoom link arrives) at call time.
  timer = setInterval(load, 30000)
})
onUnmounted(() => clearInterval(timer))

const locale = computed(() => (data.value?.locale === 'de' ? 'de-DE' : 'en-US'))
const dateObj = computed(() => (data.value?.date ? new Date(data.value.date) : null))

const dateStr = computed(() =>
  dateObj.value
    ? dateObj.value.toLocaleDateString(locale.value, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : ''
)
const timeStr = computed(() =>
  dateObj.value ? dateObj.value.toLocaleTimeString(locale.value, { hour: '2-digit', minute: '2-digit' }) : ''
)

const tr = computed(() => {
  const de = data.value?.locale === 'de'
  return de
    ? {
        loading: 'Einen Moment …',
        invalidTitle: 'Link ungültig',
        invalidBody: 'Dieser Link ist ungültig oder abgelaufen. Bitte prüfen Sie Ihre Bestätigungs-E-Mail oder melden Sie sich bei uns.',
        cancelledTitle: 'Termin abgesagt',
        cancelledBody: 'Dieser Termin wurde abgesagt. Bei Fragen melden Sie sich gerne bei uns.',
        heading: 'Ihr Videogespräch',
        date: 'Datum', time: 'Uhrzeit', duration: 'Dauer', minutes: 'Minuten',
        joinBtn: 'Videogespräch beitreten',
        lockedHint: 'Der Button wird 15 Minuten vor Beginn aktiv. Diese Seite aktualisiert sich automatisch.',
      }
    : {
        loading: 'One moment …',
        invalidTitle: 'Invalid link',
        invalidBody: 'This link is invalid or has expired. Please check your confirmation email or get in touch with us.',
        cancelledTitle: 'Appointment cancelled',
        cancelledBody: 'This appointment has been cancelled. Please contact us if you have any questions.',
        heading: 'Your video consultation',
        date: 'Date', time: 'Time', duration: 'Duration', minutes: 'minutes',
        joinBtn: 'Join video call',
        lockedHint: 'The button activates 15 minutes before the start. This page refreshes automatically.',
      }
})

const greeting = computed(() => {
  const name = data.value?.patientName
  if (!name) return ''
  return data.value?.locale === 'de' ? `Hallo ${name},` : `Hi ${name},`
})
</script>
