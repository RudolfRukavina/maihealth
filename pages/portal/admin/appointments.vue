<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-serif font-semibold text-charcoal">Appointments</h1>
      <NuxtLink to="/portal/admin/appointments/create" class="btn-primary text-sm">
        <i class="fa-solid fa-plus text-xs"></i>
        New Appointment
      </NuxtLink>
    </div>

    <!-- Pending Requests -->
    <div v-if="pendingRequests.length" class="mb-10">
      <h2 class="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-4">
        Pending Requests ({{ pendingRequests.length }})
      </h2>
      <div class="space-y-3">
        <div v-for="req in pendingRequests" :key="req.id" class="bg-white rounded-xl border border-sage/30 p-5">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p class="text-sm font-medium text-charcoal">{{ req.patientName }}</p>
              <p class="text-xs text-muted mt-1">
                Preferred: {{ formatDate(req.preferredDateRange?.start?.toDate()) }}
                <span v-if="req.preferredTimeOfDay"> &middot; {{ req.preferredTimeOfDay }}</span>
                &middot; {{ req.type }}
              </p>
              <p v-if="req.reason" class="text-xs text-body/60 mt-1">{{ req.reason }}</p>
            </div>
            <div class="flex gap-2">
              <button @click="acceptRequest(req)" class="px-4 py-2 text-xs font-medium bg-sage text-cream rounded-lg hover:bg-charcoal transition-colors">
                Accept
              </button>
              <button @click="declineRequest(req.id)" class="px-4 py-2 text-xs font-medium border border-stone/40 text-body rounded-lg hover:bg-cream transition-colors">
                Decline
              </button>
            </div>
          </div>

          <!-- Accept form -->
          <div v-if="acceptingId === req.id" class="mt-4 pt-4 border-t border-stone/15 flex flex-wrap gap-3 items-end">
            <div>
              <label class="block text-xs text-muted mb-1">Date & Time</label>
              <input v-model="acceptForm.date" type="datetime-local" class="px-3 py-2 text-sm border border-stone/40 rounded-lg" />
            </div>
            <div>
              <label class="block text-xs text-muted mb-1">Duration (min)</label>
              <input v-model.number="acceptForm.duration" type="number" class="px-3 py-2 text-sm border border-stone/40 rounded-lg w-20" />
            </div>
            <button @click="confirmAccept(req.id)" :disabled="!acceptForm.date" class="px-4 py-2 text-xs font-medium bg-sage text-cream rounded-lg hover:bg-charcoal transition-colors disabled:opacity-50">
              Confirm & Create
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Upcoming Appointments -->
    <div class="mb-10">
      <h2 class="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-4">
        Upcoming ({{ upcomingAppointments.length }})
      </h2>
      <div class="space-y-3">
        <div v-for="appt in upcomingAppointments" :key="appt.id" class="bg-white rounded-xl border border-stone/30 p-5 flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-charcoal">{{ appt.patientName }}</p>
            <p class="text-xs text-muted mt-1">
              {{ formatDate(appt.date?.toDate()) }} &middot; {{ formatTime(appt.date?.toDate()) }} &middot; {{ appt.duration }}min
            </p>
          </div>
          <div class="flex items-center gap-3">
            <a v-if="appt.zoomJoinUrl" :href="appt.zoomJoinUrl" target="_blank" class="text-xs text-sage hover:underline">
              <i class="fa-solid fa-video"></i> Zoom
            </a>
            <button @click="cancelAppointment(appt.id)" class="text-xs text-muted hover:text-red-500 transition-colors">
              Cancel
            </button>
          </div>
        </div>
        <p v-if="!upcomingAppointments.length" class="text-sm text-muted text-center py-4">No upcoming appointments.</p>
      </div>
    </div>

    <!-- Past Appointments -->
    <div>
      <h2 class="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-4">
        Past ({{ pastAppointments.length }})
      </h2>
      <div class="space-y-3">
        <div v-for="appt in pastAppointments" :key="appt.id" class="bg-white/60 rounded-xl border border-stone/20 p-5 flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-charcoal">{{ appt.patientName }}</p>
            <p class="text-xs text-muted mt-1">{{ formatDate(appt.date?.toDate()) }} &middot; {{ appt.duration }}min</p>
          </div>
          <span class="text-xs text-muted">{{ appt.status }}</span>
        </div>
        <p v-if="!pastAppointments.length" class="text-sm text-muted text-center py-4">No past appointments.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore'

definePageMeta({ layout: 'portal', middleware: ['auth', 'admin'] })

const { $firebase } = useNuxtApp()
const { getIdToken } = useAuth()

const allAppointments = ref([])
const pendingRequests = ref([])
const acceptingId = ref(null)
const acceptForm = reactive({ date: '', duration: 60 })

const now = new Date()
const upcomingAppointments = computed(() =>
  allAppointments.value.filter(a => a.status === 'scheduled' && a.date?.toDate() > now).sort((a, b) => a.date.toDate() - b.date.toDate())
)
const pastAppointments = computed(() =>
  allAppointments.value.filter(a => a.status !== 'scheduled' || a.date?.toDate() <= now).sort((a, b) => b.date.toDate() - a.date.toDate())
)

const formatDate = (d) => d?.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) || ''
const formatTime = (d) => d?.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }) || ''

const fetchData = async () => {
  const db = $firebase.db
  const [appts, reqs] = await Promise.all([
    getDocs(query(collection(db, 'appointments'), orderBy('date', 'desc'))),
    getDocs(query(collection(db, 'appointmentRequests'), where('status', '==', 'pending'), orderBy('createdAt', 'desc'))),
  ])
  allAppointments.value = appts.docs.map(d => ({ id: d.id, ...d.data() }))
  pendingRequests.value = reqs.docs.map(d => ({ id: d.id, ...d.data() }))
}

const acceptRequest = (req) => {
  acceptingId.value = req.id
  const preferred = req.preferredDateRange?.start?.toDate()
  if (preferred) {
    acceptForm.date = preferred.toISOString().slice(0, 16)
  }
}

const confirmAccept = async (id) => {
  const token = await getIdToken()
  await $fetch(`/api/admin/requests/${id}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: { action: 'accept', date: acceptForm.date, duration: acceptForm.duration },
  })
  acceptingId.value = null
  await fetchData()
}

const declineRequest = async (id) => {
  const token = await getIdToken()
  await $fetch(`/api/admin/requests/${id}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: { action: 'decline' },
  })
  await fetchData()
}

const cancelAppointment = async (id) => {
  const token = await getIdToken()
  await $fetch(`/api/admin/appointments/${id}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
    body: { status: 'cancelled' },
  })
  await fetchData()
}

onMounted(fetchData)
</script>
