import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, type User } from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'

export const useAuth = () => {
  const { $firebase } = useNuxtApp()
  const user = useState<User | null>('auth-user', () => null)
  const userRole = useState<string>('auth-role', () => 'patient')
  const loading = useState<boolean>('auth-loading', () => true)

  const isLoggedIn = computed(() => !!user.value)
  const isAdmin = computed(() => !loading.value && userRole.value === 'admin')
  const authReady = computed(() => !loading.value)

  const initAuth = () => {
    if (!import.meta.client) return

    onAuthStateChanged($firebase.auth, async (firebaseUser) => {
      user.value = firebaseUser
      if (firebaseUser) {
        const userDoc = await getDoc(doc($firebase.db, 'users', firebaseUser.uid))
        if (userDoc.exists()) {
          userRole.value = userDoc.data().role || 'patient'
        } else {
          await setDoc(doc($firebase.db, 'users', firebaseUser.uid), {
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            role: 'patient',
            createdAt: serverTimestamp(),
          })
          userRole.value = 'patient'
        }
      } else {
        userRole.value = 'patient'
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
    navigateTo('/')
  }

  const getIdToken = async () => {
    if (!user.value) return null
    return await user.value.getIdToken()
  }

  if (import.meta.client) {
    initAuth()
  }

  return { user, isLoggedIn, isAdmin, authReady, loading, signInWithGoogle, signOut, getIdToken }
}
