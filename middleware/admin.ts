export default defineNuxtRouteMiddleware(() => {
  const { isAdmin, loading } = useAuth()

  if (loading.value) return

  if (!isAdmin.value) {
    return navigateTo('/portal')
  }
})
