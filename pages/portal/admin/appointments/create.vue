<template>
  <div>
    <h1 class="text-3xl font-serif font-semibold text-charcoal mb-2">Create Appointment</h1>
    <p class="text-body/60 mb-8">Schedule a new appointment with a patient. A Zoom link will be auto-generated.</p>

    <form @submit.prevent="handleSubmit" class="max-w-2xl space-y-5">
      <div>
        <label class="block text-xs font-medium text-charcoal/80 mb-2">Patient *</label>
        <select
          v-model="form.patientId"
          required
          @change="onPatientSelect"
          class="w-full px-4 py-3 bg-white rounded-xl border border-stone/40 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-sage/15"
        >
          <option value="">Select a patient...</option>
          <option v-for="p in patients" :key="p.id" :value="p.id">
            {{ p.displayName || p.email }}
          </option>
        </select>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label class="block text-xs font-medium text-charcoal/80 mb-2">Date & Time *</label>
          <input
            v-model="form.date"
            type="datetime-local"
            required
            class="w-full px-4 py-3 bg-white rounded-xl border border-stone/40 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-sage/15"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-charcoal/80 mb-2">Duration (minutes)</label>
          <input
            v-model.number="form.duration"
            type="number"
            min="15"
            step="15"
            class="w-full px-4 py-3 bg-white rounded-xl border border-stone/40 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-sage/15"
          />
        </div>
      </div>

      <div>
        <label class="block text-xs font-medium text-charcoal/80 mb-2">Type</label>
        <div class="flex gap-3">
          <button
            v-for="type in ['initial', 'follow-up']"
            :key="type"
            type="button"
            @click="form.type = type"
            :class="[
              'px-5 py-2.5 text-xs font-medium rounded-full border transition-all',
              form.type === type ? 'bg-sage text-cream border-sage' : 'border-stone/40 text-body hover:border-sage',
            ]"
          >
            {{ type === 'initial' ? 'Initial Consultation' : 'Follow-up' }}
          </button>
        </div>
      </div>

      <div>
        <label class="block text-xs font-medium text-charcoal/80 mb-2">Notes</label>
        <textarea
          v-model="form.notes"
          rows="3"
          class="w-full px-4 py-3 bg-white rounded-xl border border-stone/40 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-sage/15 resize-none"
        />
      </div>

      <button type="submit" :disabled="submitting" class="btn-primary">
        <i v-if="submitting" class="fa-solid fa-spinner fa-spin text-xs"></i>
        <template v-else>
          Create Appointment
          <i class="fa-solid fa-calendar-plus text-xs"></i>
        </template>
      </button>

      <div v-if="result" class="bg-sage/10 rounded-xl p-5 border border-sage/20">
        <p class="text-sm text-sage font-medium mb-2">
          <i class="fa-solid fa-circle-check"></i> Appointment created!
        </p>
        <p v-if="result.zoomJoinUrl" class="text-xs text-body/70">
          Zoom link: <a :href="result.zoomJoinUrl" target="_blank" class="text-sage underline">{{ result.zoomJoinUrl }}</a>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { collection, query, where, getDocs } from 'firebase/firestore'

definePageMeta({ layout: 'portal', middleware: ['auth', 'admin'] })

const { $firebase } = useNuxtApp()
const { getIdToken } = useAuth()

const patients = ref([])
const submitting = ref(false)
const result = ref(null)

const form = reactive({
  patientId: '',
  patientName: '',
  patientEmail: '',
  date: '',
  duration: 60,
  type: 'initial',
  notes: '',
})

const onPatientSelect = () => {
  const p = patients.value.find(p => p.id === form.patientId)
  if (p) {
    form.patientName = p.displayName || ''
    form.patientEmail = p.email || ''
  }
}

const handleSubmit = async () => {
  submitting.value = true
  result.value = null
  try {
    const token = await getIdToken()
    const res = await $fetch('/api/admin/appointments', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: { ...form },
    })
    result.value = res
  } catch (err) {
    console.error('Failed to create appointment:', err)
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  const snapshot = await getDocs(query(collection($firebase.db, 'users'), where('role', '==', 'patient')))
  patients.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
})
</script>
