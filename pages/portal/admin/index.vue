<template>
  <div>
    <h1 class="text-3xl font-serif font-semibold text-charcoal mb-2">Admin Dashboard</h1>
    <p class="text-body/60 mb-10">Manage patients, appointments, and messages.</p>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      <div class="bg-white rounded-xl border border-stone/30 p-5">
        <p class="text-2xl font-serif font-bold text-charcoal">{{ stats.patients }}</p>
        <p class="text-xs text-muted mt-1">Patients</p>
      </div>
      <div class="bg-white rounded-xl border border-stone/30 p-5">
        <p class="text-2xl font-serif font-bold text-charcoal">{{ stats.upcoming }}</p>
        <p class="text-xs text-muted mt-1">Upcoming</p>
      </div>
      <div class="bg-white rounded-xl border border-stone/30 p-5">
        <p class="text-2xl font-serif font-bold text-sage">{{ stats.pendingRequests }}</p>
        <p class="text-xs text-muted mt-1">Pending Requests</p>
      </div>
      <div class="bg-white rounded-xl border border-stone/30 p-5">
        <p class="text-2xl font-serif font-bold text-charcoal">{{ stats.unreadMessages }}</p>
        <p class="text-xs text-muted mt-1">Unread Messages</p>
      </div>
    </div>

    <!-- Quick Links -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <NuxtLink to="/portal/admin/patients" class="bg-white rounded-xl border border-stone/30 p-6 hover:shadow-md hover:border-sage/30 transition-all group">
        <i class="fa-solid fa-users text-sage text-lg mb-3 block"></i>
        <h3 class="text-base font-serif font-semibold text-charcoal group-hover:text-sage transition-colors">Patients</h3>
        <p class="text-xs text-muted mt-1">View and manage patient list</p>
      </NuxtLink>
      <NuxtLink to="/portal/admin/appointments" class="bg-white rounded-xl border border-stone/30 p-6 hover:shadow-md hover:border-sage/30 transition-all group">
        <i class="fa-solid fa-calendar-check text-sage text-lg mb-3 block"></i>
        <h3 class="text-base font-serif font-semibold text-charcoal group-hover:text-sage transition-colors">Appointments</h3>
        <p class="text-xs text-muted mt-1">Manage appointments and requests</p>
      </NuxtLink>
      <NuxtLink to="/portal/admin/messages" class="bg-white rounded-xl border border-stone/30 p-6 hover:shadow-md hover:border-sage/30 transition-all group">
        <i class="fa-solid fa-envelope text-sage text-lg mb-3 block"></i>
        <h3 class="text-base font-serif font-semibold text-charcoal group-hover:text-sage transition-colors">Messages</h3>
        <p class="text-xs text-muted mt-1">Contact form submissions</p>
      </NuxtLink>
      <NuxtLink to="/portal/admin/availability" class="bg-white rounded-xl border border-stone/30 p-6 hover:shadow-md hover:border-sage/30 transition-all group">
        <i class="fa-solid fa-clock text-sage text-lg mb-3 block"></i>
        <h3 class="text-base font-serif font-semibold text-charcoal group-hover:text-sage transition-colors">Availability</h3>
        <p class="text-xs text-muted mt-1">Set your weekly schedule and blocked dates</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { collection, query, where, getDocs } from 'firebase/firestore'

definePageMeta({ layout: 'portal', middleware: ['auth', 'admin'] })

const { $firebase } = useNuxtApp()
const stats = ref({ patients: 0, upcoming: 0, pendingRequests: 0, unreadMessages: 0 })

onMounted(async () => {
  const db = $firebase.db
  const [patients, appointments, requests, messages] = await Promise.all([
    getDocs(query(collection(db, 'users'), where('role', '==', 'patient'))),
    getDocs(query(collection(db, 'appointments'), where('status', '==', 'scheduled'))),
    getDocs(query(collection(db, 'appointmentRequests'), where('status', '==', 'pending'))),
    getDocs(query(collection(db, 'contactSubmissions'), where('read', '==', false))),
  ])
  stats.value = {
    patients: patients.size,
    upcoming: appointments.size,
    pendingRequests: requests.size,
    unreadMessages: messages.size,
  }
})
</script>
