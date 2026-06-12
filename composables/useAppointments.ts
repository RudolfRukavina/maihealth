import { collection, query, where, orderBy, onSnapshot, type Unsubscribe } from 'firebase/firestore'

export const useAppointments = () => {
  const { $firebase } = useNuxtApp()
  const { user, isAdmin } = useAuth()
  const appointments = ref<any[]>([])
  const pendingRequests = ref<any[]>([])
  let unsub: Unsubscribe | null = null
  let unsubReq: Unsubscribe | null = null

  const upcomingAppointments = computed(() =>
    appointments.value
      .filter(a => a.status === 'scheduled' && a.date?.toDate() > new Date())
      .sort((a, b) => a.date.toDate() - b.date.toDate())
  )

  const nextAppointment = computed(() => upcomingAppointments.value[0] || null)

  const pastAppointments = computed(() =>
    appointments.value
      .filter(a => a.status === 'completed' || (a.status === 'scheduled' && a.date?.toDate() <= new Date()))
      .sort((a, b) => b.date.toDate() - a.date.toDate())
  )

  const upcomingRequests = computed(() =>
    pendingRequests.value
      .filter(r => r.slotDate?.toDate() > new Date())
      .sort((a, b) => a.slotDate.toDate() - b.slotDate.toDate())
  )

  const fetchAppointments = () => {
    if (!user.value || !import.meta.client) return

    const apptQuery = isAdmin.value
      ? query(collection($firebase.db, 'appointments'), orderBy('date', 'desc'))
      : query(collection($firebase.db, 'appointments'), where('patientId', '==', user.value.uid), orderBy('date', 'desc'))

    unsub = onSnapshot(apptQuery, (snapshot) => {
      appointments.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    })

    const reqQuery = isAdmin.value
      ? query(collection($firebase.db, 'appointmentRequests'), where('status', '==', 'pending'))
      : query(collection($firebase.db, 'appointmentRequests'), where('patientId', '==', user.value.uid), where('status', '==', 'pending'))

    unsubReq = onSnapshot(reqQuery, (snapshot) => {
      pendingRequests.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    })
  }

  watch(user, (val) => {
    if (val) fetchAppointments()
    else {
      unsub?.()
      unsubReq?.()
      appointments.value = []
      pendingRequests.value = []
    }
  }, { immediate: true })

  watch(isAdmin, () => {
    if (user.value) {
      unsub?.()
      unsubReq?.()
      fetchAppointments()
    }
  })

  onUnmounted(() => {
    unsub?.()
    unsubReq?.()
  })

  return { appointments, upcomingAppointments, nextAppointment, pastAppointments, pendingRequests, upcomingRequests }
}
