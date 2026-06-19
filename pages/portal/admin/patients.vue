<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-serif font-semibold text-charcoal">Patients</h1>
      <input
        v-model="search"
        type="text"
        placeholder="Search patients..."
        class="px-4 py-2.5 bg-white rounded-xl border border-stone/40 text-sm text-charcoal placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-sage/15 w-64"
      />
    </div>

    <div class="space-y-3">
      <div
        v-for="patient in filteredPatients"
        :key="patient.id"
        class="bg-white rounded-xl border border-stone/30 p-5"
      >
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <img v-if="patient.photoURL" :src="patient.photoURL" alt="" class="w-10 h-10 rounded-full" referrerpolicy="no-referrer" />
            <div v-else class="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center">
              <i class="fa-solid fa-user text-sage text-sm"></i>
            </div>
            <div>
              <p class="text-sm font-medium text-charcoal">{{ patient.displayName || 'No name' }}</p>
              <p class="text-xs text-muted">{{ patient.email }}</p>
            </div>
          </div>
          <p class="text-xs text-muted whitespace-nowrap">
            Joined {{ patient.createdAt?.toDate().toLocaleDateString() }}
          </p>
        </div>

        <!-- Treatment journey stage -->
        <div class="mt-4 pt-4 border-t border-stone/15">
          <div class="flex items-center justify-between mb-2.5">
            <p class="text-xs font-semibold uppercase tracking-[0.12em] text-gold">Treatment journey</p>
            <span class="text-xs text-muted">
              <span v-if="(patient.journeyStage || 0) === 0">Not started</span>
              <span v-else>{{ patient.journeyStage }} / {{ phaseTitles.length }} · {{ phaseTitles[(patient.journeyStage || 0) - 1] }}</span>
            </span>
          </div>
          <div class="flex items-center gap-2">
            <button
              v-for="step in phaseTitles.length"
              :key="step"
              type="button"
              :disabled="savingId === patient.id"
              @click="setStage(patient, step)"
              :title="phaseTitles[step - 1]"
              :class="[
                'w-9 h-9 rounded-full text-xs font-semibold flex items-center justify-center border transition-all disabled:opacity-50',
                step <= (patient.journeyStage || 0)
                  ? 'bg-sage text-cream border-sage'
                  : 'border-stone/40 text-muted hover:border-sage hover:text-sage',
              ]"
            >
              <i v-if="step <= (patient.journeyStage || 0)" class="fa-solid fa-check text-[11px]"></i>
              <span v-else>{{ step }}</span>
            </button>
            <span v-if="savingId === patient.id" class="ml-2 text-xs text-muted">Saving…</span>
            <span v-else-if="errorId === patient.id" class="ml-2 text-xs text-red-500">Failed — try again</span>
          </div>
        </div>
      </div>

      <p v-if="!filteredPatients.length" class="text-sm text-muted text-center py-8">
        No patients found.
      </p>
    </div>
  </div>
</template>

<script setup>
import { collection, query, where, getDocs } from 'firebase/firestore'

definePageMeta({ layout: 'portal', middleware: ['auth', 'admin'] })

const { $firebase } = useNuxtApp()
const { getIdToken } = useAuth()
const patients = ref([])
const search = ref('')
const savingId = ref('')
const errorId = ref('')

// Mirrors the public "Four steps" labels so the dots are self-explanatory.
const phaseTitles = ['Consultation', 'Diagnostics', 'Therapy Plan', 'Support']

const filteredPatients = computed(() => {
  if (!search.value) return patients.value
  const s = search.value.toLowerCase()
  return patients.value.filter(p =>
    (p.displayName || '').toLowerCase().includes(s) ||
    (p.email || '').toLowerCase().includes(s)
  )
})

const setStage = async (patient, step) => {
  // Clicking the current top step toggles it off (so the doctor can step back to 0).
  const newStage = (patient.journeyStage || 0) === step ? step - 1 : step
  const previous = patient.journeyStage || 0
  savingId.value = patient.id
  errorId.value = ''
  patient.journeyStage = newStage // optimistic
  try {
    const token = await getIdToken()
    await $fetch(`/api/admin/patients/${patient.id}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
      body: { journeyStage: newStage },
    })
  } catch (err) {
    patient.journeyStage = previous // revert
    errorId.value = patient.id
  } finally {
    savingId.value = ''
  }
}

onMounted(async () => {
  const snapshot = await getDocs(query(collection($firebase.db, 'users'), where('role', '==', 'patient')))
  patients.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
})
</script>
