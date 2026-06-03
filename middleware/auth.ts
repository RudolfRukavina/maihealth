export default defineNuxtRouteMiddleware(() => {
  const { isLoggedIn, loading } = useAuth()

  if (loading.value) return

  if (!isLoggedIn.value) {
    return navigateTo('/login')
  }
})
