import { collection, query, where, orderBy, onSnapshot, type Unsubscribe } from 'firebase/firestore'

export const useAppointments = () => {
  const { $firebase } = useNuxtApp()
  const { user } = useAuth()
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

  // Requests awaiting admin approval that are still in the future.
  const upcomingRequests = computed(() =>
    pendingRequests.value
      .filter(r => r.slotDate?.toDate() > new Date())
      .sort((a, b) => a.slotDate.toDate() - b.slotDate.toDate())
  )

  const fetchAppointments = () => {
    if (!user.value || !import.meta.client) return

    const q = query(
      collection($firebase.db, 'appointments'),
      where('patientId', '==', user.value.uid),
      orderBy('date', 'desc')
    )

    unsub = onSnapshot(q, (snapshot) => {
      appointments.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    })

    const reqQuery = query(
      collection($firebase.db, 'appointmentRequests'),
      where('patientId', '==', user.value.uid),
      where('status', '==', 'pending')
    )

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

  onUnmounted(() => {
    unsub?.()
    unsubReq?.()
  })

  return { appointments, upcomingAppointments, nextAppointment, pastAppointments, pendingRequests, upcomingRequests }
}
