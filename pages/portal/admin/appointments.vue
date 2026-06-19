<template>
  <div>
    <div class="flex items-start justify-between gap-4 mb-8">
      <div>
        <h1 class="text-3xl font-serif font-semibold text-charcoal">Appointments</h1>
        <p class="text-sm text-muted mt-1">Manage requests, upcoming sessions, and history.</p>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <button
          @click="fetchData"
          :disabled="loading"
          class="w-9 h-9 rounded-lg border border-stone/30 text-muted hover:text-sage hover:border-sage/40 transition-colors flex items-center justify-center disabled:opacity-50"
          title="Refresh"
        >
          <i class="fa-solid fa-rotate-right text-xs" :class="{ 'fa-spin': loading }"></i>
        </button>
        <NuxtLink to="/portal/admin/appointments/create" class="btn-primary text-sm">
          <i class="fa-solid fa-plus text-xs"></i>
          New Appointment
        </NuxtLink>
      </div>
    </div>

    <!-- Loading skeleton -->
    <div v-if="loading" class="space-y-3">
      <div v-for="n in 3" :key="n" class="h-28 rounded-xl bg-white border border-stone/20 animate-pulse" />
    </div>

    <template v-else>
      <!-- Pending Requests -->
      <section v-if="pendingRequests.length" class="mb-10">
        <h2 class="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-4 flex items-center gap-2">
          Pending Requests
          <span class="px-2 py-0.5 rounded-full bg-sage/15 text-sage text-[10px] tracking-normal">{{ pendingRequests.length }}</span>
        </h2>
        <div class="space-y-3">
          <div v-for="req in pendingRequests" :key="req.id" class="bg-white rounded-xl border border-sage/30 shadow-sm p-5">
            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div class="min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <p class="text-sm font-semibold text-charcoal">{{ req.patientName || 'Unknown' }}</p>
                  <span :class="typeChip">{{ typeLabel(req.type) }}</span>
                </div>
                <p v-if="req.patientEmail" class="text-xs text-muted mt-0.5 truncate">
                  {{ req.patientEmail }}<span v-if="req.patientPhone"> · {{ req.patientPhone }}</span>
                </p>
                <p class="text-xs text-body/70 mt-2">
                  <i class="fa-regular fa-calendar text-sage/70 mr-1"></i>
                  Preferred: {{ formatFull(preferredDate(req)) }}
                  <span v-if="req.preferredTimeOfDay" class="capitalize"> · {{ req.preferredTimeOfDay }}</span>
                </p>
                <p v-if="req.reason" class="text-xs text-body/70 mt-2 bg-cream/70 rounded-lg px-3 py-2 leading-relaxed">{{ req.reason }}</p>
              </div>
              <div class="flex gap-2 shrink-0">
                <button @click="acceptRequest(req)" :class="btnSage">Accept</button>
                <button v-if="req.patientEmail" @click="openEmail(req)" :class="btnGhost"><i class="fa-regular fa-envelope text-[11px]"></i></button>
                <button @click="askDecline(req.id)" :class="btnGhost">Decline</button>
              </div>
            </div>

            <!-- Accept form -->
            <div v-if="acceptingId === req.id" class="mt-4 pt-4 border-t border-stone/15 flex flex-wrap gap-3 items-end">
              <div>
                <label class="block text-[11px] text-muted mb-1">Date &amp; time</label>
                <input v-model="acceptForm.date" type="datetime-local" :class="inputSm" />
              </div>
              <div>
                <label class="block text-[11px] text-muted mb-1">Duration (min)</label>
                <input v-model.number="acceptForm.duration" type="number" min="15" step="15" :class="inputSm + ' w-24'" />
              </div>
              <button @click="confirmAccept(req.id)" :disabled="!acceptForm.date || busyId === req.id" :class="btnSage">
                <i v-if="busyId === req.id" class="fa-solid fa-spinner fa-spin text-[11px]"></i>
                <span v-else>Confirm &amp; create</span>
              </button>
              <button @click="acceptingId = null" :class="btnGhost">Cancel</button>
            </div>

            <!-- Decline confirm -->
            <div v-else-if="decliningId === req.id" class="mt-4 pt-4 border-t border-stone/15 flex items-center flex-wrap gap-3">
              <p class="text-xs text-body/70">Decline this request? The patient will be notified by email.</p>
              <button @click="confirmDecline(req.id)" :disabled="busyId === req.id" :class="btnDanger">
                <i v-if="busyId === req.id" class="fa-solid fa-spinner fa-spin text-[11px]"></i>
                <span v-else>Yes, decline</span>
              </button>
              <button @click="decliningId = null" :class="btnGhost">Keep</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Upcoming -->
      <section class="mb-10">
        <h2 class="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-4">
          Upcoming ({{ upcomingAppointments.length }})
        </h2>
        <div class="space-y-3">
          <div v-for="appt in upcomingAppointments" :key="appt.id" class="bg-white rounded-xl border border-stone/30 p-5">
            <div class="flex items-start justify-between gap-4">
              <div class="min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <p class="text-sm font-semibold text-charcoal">{{ appt.patientName || 'Unknown' }}</p>
                  <span :class="typeChip">{{ typeLabel(appt.type) }}</span>
                </div>
                <p v-if="appt.patientEmail" class="text-xs text-muted mt-0.5 truncate">
                  {{ appt.patientEmail }}<span v-if="appt.patientPhone"> · {{ appt.patientPhone }}</span>
                </p>
                <p class="text-sm text-charcoal/90 mt-2 font-medium">
                  <span class="text-sage">{{ dayLabel(appt.date?.toDate()) }}</span>,
                  {{ formatTime(appt.date?.toDate()) }} · {{ appt.duration }} min
                </p>
                <p v-if="appt.notes" class="text-xs text-body/70 mt-2 bg-cream/70 rounded-lg px-3 py-2 leading-relaxed">{{ appt.notes }}</p>
              </div>
              <a
                v-if="appt.zoomJoinUrl"
                :href="appt.zoomJoinUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sage/10 text-sage text-xs font-medium hover:bg-sage/20 transition-colors"
              >
                <i class="fa-solid fa-video text-[11px]"></i> Join
              </a>
            </div>

            <!-- Actions -->
            <div class="mt-4 pt-3 border-t border-stone/15 flex flex-wrap items-center gap-2">
              <button @click="markCompleted(appt)" :disabled="busyId === appt.id" :class="btnAction">
                <i class="fa-solid fa-check text-[11px] text-sage"></i> Mark completed
              </button>
              <button @click="startReschedule(appt)" :class="btnAction">
                <i class="fa-regular fa-clock text-[11px]"></i> Reschedule
              </button>
              <button v-if="appt.patientEmail" @click="openEmail(appt)" :class="btnAction">
                <i class="fa-regular fa-envelope text-[11px]"></i> Email
              </button>
              <button @click="askCancel(appt.id)" :class="btnAction + ' ml-auto text-red-500 hover:bg-red-50'">
                <i class="fa-solid fa-xmark text-[11px]"></i> Cancel
              </button>
            </div>

            <!-- Reschedule form -->
            <div v-if="reschedulingId === appt.id" class="mt-3 pt-3 border-t border-stone/15 flex flex-wrap gap-3 items-end">
              <div>
                <label class="block text-[11px] text-muted mb-1">New date &amp; time</label>
                <input v-model="rescheduleForm.date" type="datetime-local" :class="inputSm" />
              </div>
              <div>
                <label class="block text-[11px] text-muted mb-1">Duration (min)</label>
                <input v-model.number="rescheduleForm.duration" type="number" min="15" step="15" :class="inputSm + ' w-24'" />
              </div>
              <button @click="confirmReschedule(appt.id)" :disabled="!rescheduleForm.date || busyId === appt.id" :class="btnSage">
                <i v-if="busyId === appt.id" class="fa-solid fa-spinner fa-spin text-[11px]"></i>
                <span v-else>Save &amp; notify</span>
              </button>
              <button @click="reschedulingId = null" :class="btnGhost">Cancel</button>
            </div>

            <!-- Cancel confirm -->
            <div v-if="cancelId === appt.id" class="mt-3 pt-3 border-t border-stone/15 flex items-center flex-wrap gap-3">
              <p class="text-xs text-body/70">Cancel this appointment? The patient will be notified by email.</p>
              <button @click="confirmCancel(appt.id)" :disabled="busyId === appt.id" :class="btnDanger">
                <i v-if="busyId === appt.id" class="fa-solid fa-spinner fa-spin text-[11px]"></i>
                <span v-else>Yes, cancel</span>
              </button>
              <button @click="cancelId = null" :class="btnGhost">Keep</button>
            </div>
          </div>
          <p v-if="!upcomingAppointments.length" class="text-sm text-muted text-center py-8 bg-white/50 rounded-xl border border-dashed border-stone/30">
            No upcoming appointments.
          </p>
        </div>
      </section>

      <!-- History -->
      <section>
        <h2 class="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-4">
          History ({{ pastAppointments.length }})
        </h2>
        <div class="space-y-2.5">
          <div
            v-for="appt in pastAppointments"
            :key="appt.id"
            class="bg-white/60 rounded-xl border border-stone/20 p-4 flex items-center justify-between gap-4"
          >
            <div class="min-w-0">
              <p class="text-sm font-medium text-charcoal truncate">{{ appt.patientName || 'Unknown' }}</p>
              <p class="text-xs text-muted mt-0.5">{{ formatFull(appt.date?.toDate()) }} · {{ appt.duration }} min</p>
            </div>
            <div class="flex items-center gap-3 shrink-0">
              <!-- Past-due but never marked: let the doctor resolve it -->
              <button
                v-if="isOverdue(appt)"
                @click="markCompleted(appt)"
                :disabled="busyId === appt.id"
                class="text-xs font-medium text-sage hover:underline"
              >
                <i v-if="busyId === appt.id" class="fa-solid fa-spinner fa-spin text-[11px]"></i>
                <span v-else>Mark completed</span>
              </button>
              <span :class="['text-[10px] font-medium px-2 py-0.5 rounded-full', statusBadge(appt).cls]">{{ statusBadge(appt).label }}</span>
              <button v-if="appt.patientEmail" @click="openEmail(appt)" class="text-muted hover:text-sage transition-colors" title="Email patient">
                <i class="fa-regular fa-envelope text-xs"></i>
              </button>
            </div>
          </div>
          <p v-if="!pastAppointments.length" class="text-sm text-muted text-center py-8 bg-white/50 rounded-xl border border-dashed border-stone/30">
            No past appointments yet.
          </p>
        </div>
      </section>
    </template>

    <ReplyComposer
      v-if="replyTarget"
      :to="replyTarget.to"
      :name="replyTarget.name"
      :locale="replyTarget.locale"
      @close="replyTarget = null"
    />
  </div>
</template>

<script setup>
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore'

definePageMeta({ layout: 'portal', middleware: ['auth', 'admin'] })

const { $firebase } = useNuxtApp()
const { getIdToken } = useAuth()

// Shared class strings (keeps the template readable)
const typeChip = 'text-[10px] font-medium uppercase tracking-wide text-gold bg-gold/10 px-2 py-0.5 rounded-full'
const inputSm = 'px-3 py-2 text-sm bg-white border border-stone/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage/15'
const btnSage = 'inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-sage text-cream rounded-lg hover:bg-charcoal transition-colors disabled:opacity-50'
const btnGhost = 'inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium border border-stone/40 text-body rounded-lg hover:bg-cream transition-colors'
const btnDanger = 'inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50'
const btnAction = 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-charcoal/80 hover:bg-stone/10 transition-colors disabled:opacity-50'

const allAppointments = ref([])
const pendingRequests = ref([])
const loading = ref(true)
const busyId = ref(null)

const acceptingId = ref(null)
const acceptForm = reactive({ date: '', duration: 60 })
const decliningId = ref(null)
const reschedulingId = ref(null)
const rescheduleForm = reactive({ date: '', duration: 60 })
const cancelId = ref(null)
const replyTarget = ref(null)

const now = new Date()
const upcomingAppointments = computed(() =>
  allAppointments.value
    .filter(a => a.status === 'scheduled' && a.date?.toDate() > now)
    .sort((a, b) => a.date.toDate() - b.date.toDate())
)
const pastAppointments = computed(() =>
  allAppointments.value
    .filter(a => a.status !== 'scheduled' || a.date?.toDate() <= now)
    .sort((a, b) => b.date.toDate() - a.date.toDate())
)

// --- Formatting ---
const preferredDate = (req) => req.slotDate?.toDate?.() || req.preferredDateRange?.start?.toDate?.() || null
const formatFull = (d) => d?.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) || ''
const formatTime = (d) => d?.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }) || ''
const typeLabel = (t) => (t || '').toLowerCase().includes('follow') ? 'Follow-up' : 'Initial'

const dayLabel = (d) => {
  if (!d) return ''
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const date = new Date(d); date.setHours(0, 0, 0, 0)
  const diff = Math.round((date - today) / 86400000)
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Tomorrow'
  return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
}

const isOverdue = (appt) => appt.status === 'scheduled' && appt.date?.toDate() <= now

const statusBadge = (appt) => {
  if (isOverdue(appt)) return { label: 'Past due', cls: 'bg-amber-50 text-amber-600' }
  return {
    completed: { label: 'Completed', cls: 'bg-charcoal/8 text-charcoal/60' },
    cancelled: { label: 'Cancelled', cls: 'bg-red-50 text-red-500' },
    scheduled: { label: 'Scheduled', cls: 'bg-sage/10 text-sage' },
  }[appt.status] || { label: appt.status || '—', cls: 'bg-stone/15 text-muted' }
}

// datetime-local value in the browser's local timezone (avoids UTC drift)
const toLocalInput = (d) => {
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

// --- Data ---
const fetchData = async () => {
  loading.value = true
  try {
    const db = $firebase.db
    const [appts, reqs] = await Promise.all([
      getDocs(query(collection(db, 'appointments'), orderBy('date', 'desc'))),
      getDocs(query(collection(db, 'appointmentRequests'), where('status', '==', 'pending'), orderBy('createdAt', 'desc'))),
    ])
    allAppointments.value = appts.docs.map(d => ({ id: d.id, ...d.data() }))
    pendingRequests.value = reqs.docs.map(d => ({ id: d.id, ...d.data() }))
  } finally {
    loading.value = false
  }
}

const authPatch = async (id, body) => {
  const token = await getIdToken()
  return $fetch(`/api/admin/appointments/${id}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
    body,
  })
}

const requestAction = async (id, body) => {
  const token = await getIdToken()
  return $fetch(`/api/admin/requests/${id}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body,
  })
}

// --- Request handlers ---
const acceptRequest = (req) => {
  decliningId.value = null
  acceptingId.value = req.id
  const preferred = preferredDate(req)
  acceptForm.date = preferred ? toLocalInput(preferred) : ''
  acceptForm.duration = 60
}

const confirmAccept = async (id) => {
  busyId.value = id
  try {
    await requestAction(id, { action: 'accept', date: acceptForm.date, duration: acceptForm.duration })
    acceptingId.value = null
    await fetchData()
  } finally {
    busyId.value = null
  }
}

const askDecline = (id) => { acceptingId.value = null; decliningId.value = id }
const confirmDecline = async (id) => {
  busyId.value = id
  try {
    await requestAction(id, { action: 'decline' })
    decliningId.value = null
    await fetchData()
  } finally {
    busyId.value = null
  }
}

// --- Appointment handlers ---
const markCompleted = async (appt) => {
  busyId.value = appt.id
  try {
    await authPatch(appt.id, { status: 'completed' })
    await fetchData()
  } finally {
    busyId.value = null
  }
}

const startReschedule = (appt) => {
  cancelId.value = null
  reschedulingId.value = appt.id
  rescheduleForm.date = appt.date ? toLocalInput(appt.date.toDate()) : ''
  rescheduleForm.duration = appt.duration || 60
}

const confirmReschedule = async (id) => {
  busyId.value = id
  try {
    await authPatch(id, { date: new Date(rescheduleForm.date).toISOString(), duration: rescheduleForm.duration })
    reschedulingId.value = null
    await fetchData()
  } finally {
    busyId.value = null
  }
}

const askCancel = (id) => { reschedulingId.value = null; cancelId.value = id }
const confirmCancel = async (id) => {
  busyId.value = id
  try {
    await authPatch(id, { status: 'cancelled' })
    cancelId.value = null
    await fetchData()
  } finally {
    busyId.value = null
  }
}

const openEmail = (person) => {
  replyTarget.value = { to: person.patientEmail, name: person.patientName, locale: person.locale }
}

onMounted(fetchData)
</script>
