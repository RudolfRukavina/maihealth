import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, type User } from 'firebase/auth'

export const useAuth = () => {
  const { $firebase } = useNuxtApp()
  const user = useState<User | null>('auth-user', () => null)
  const userRole = useState<string>('auth-role', () => 'patient')
  const journeyStage = useState<number>('auth-journey-stage', () => 0)
  const loading = useState<boolean>('auth-loading', () => true)

  const isLoggedIn = computed(() => !!user.value)
  const isAdmin = computed(() => !loading.value && userRole.value === 'admin')
  const authReady = computed(() => !loading.value)

  const initAuth = () => {
    if (!import.meta.client) return

    onAuthStateChanged($firebase.auth, async (firebaseUser) => {
      user.value = firebaseUser
      if (firebaseUser) {
        // The server creates the profile and resolves the role — clients
        // aren't allowed to write roles (see firestore.rules).
        try {
          const token = await firebaseUser.getIdToken()
          const { role, journeyStage: stage } = await $fetch<{ role: string; journeyStage: number }>('/api/auth/bootstrap', {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
          })
          userRole.value = role
          journeyStage.value = stage ?? 0
        } catch (err) {
          console.error('Failed to resolve user role:', err)
          userRole.value = 'patient'
        }
      } else {
        userRole.value = 'patient'
        journeyStage.value = 0
      }
      loading.value = false
    })
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup($firebase.auth, provider)
  }

  const signOut = async () => {
    await $firebase.auth.signOut()
    user.value = null
    userRole.value = 'patient'
    journeyStage.value = 0
    navigateTo('/')
  }

  const getIdToken = async () => {
    if (!user.value) return null
    return await user.value.getIdToken()
  }

  if (import.meta.client) {
    initAuth()
  }

  return { user, isLoggedIn, isAdmin, journeyStage, authReady, loading, signInWithGoogle, signOut, getIdToken }
}
