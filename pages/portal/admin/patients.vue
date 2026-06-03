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
        class="bg-white rounded-xl border border-stone/30 p-5 flex items-center justify-between"
      >
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
        <p class="text-xs text-muted">
          Joined {{ patient.createdAt?.toDate().toLocaleDateString() }}
        </p>
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
const patients = ref([])
const search = ref('')

const filteredPatients = computed(() => {
  if (!search.value) return patients.value
  const s = search.value.toLowerCase()
  return patients.value.filter(p =>
    (p.displayName || '').toLowerCase().includes(s) ||
    (p.email || '').toLowerCase().includes(s)
  )
})

onMounted(async () => {
  const snapshot = await getDocs(query(collection($firebase.db, 'users'), where('role', '==', 'patient')))
  patients.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
})
</script>
