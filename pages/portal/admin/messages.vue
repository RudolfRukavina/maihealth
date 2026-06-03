<template>
  <div>
    <h1 class="text-3xl font-serif font-semibold text-charcoal mb-8">Messages</h1>

    <div class="space-y-3">
      <div
        v-for="msg in messages"
        :key="msg.id"
        class="bg-white rounded-xl border p-5 cursor-pointer transition-all"
        :class="msg.read ? 'border-stone/20' : 'border-sage/30 shadow-sm'"
        @click="toggleMessage(msg)"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <span v-if="!msg.read" class="w-2 h-2 rounded-full bg-sage flex-shrink-0"></span>
              <p class="text-sm font-medium text-charcoal">{{ msg.firstName }} {{ msg.lastName }}</p>
            </div>
            <p class="text-xs text-muted mt-1">{{ msg.email }} &middot; {{ formatDate(msg.createdAt?.toDate()) }}</p>
          </div>
          <i class="fa-solid fa-chevron-down text-xs text-muted transition-transform" :class="{ 'rotate-180': expandedId === msg.id }"></i>
        </div>

        <div v-if="expandedId === msg.id" class="mt-4 pt-4 border-t border-stone/15">
          <p v-if="msg.phone" class="text-xs text-muted mb-2">Phone: {{ msg.phone }}</p>
          <p class="text-sm text-body/80 leading-relaxed whitespace-pre-wrap">{{ msg.message }}</p>
        </div>
      </div>

      <p v-if="!messages.length" class="text-sm text-muted text-center py-8">No messages yet.</p>
    </div>
  </div>
</template>

<script setup>
import { collection, query, orderBy, getDocs, doc, updateDoc } from 'firebase/firestore'

definePageMeta({ layout: 'portal', middleware: ['auth', 'admin'] })

const { $firebase } = useNuxtApp()
const messages = ref([])
const expandedId = ref(null)

const formatDate = (d) => d?.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) || ''

const toggleMessage = async (msg) => {
  if (expandedId.value === msg.id) {
    expandedId.value = null
    return
  }
  expandedId.value = msg.id
  if (!msg.read) {
    await updateDoc(doc($firebase.db, 'contactSubmissions', msg.id), { read: true })
    msg.read = true
  }
}

onMounted(async () => {
  const snapshot = await getDocs(query(collection($firebase.db, 'contactSubmissions'), orderBy('createdAt', 'desc')))
  messages.value = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
})
</script>
