<template>
  <div class="min-h-screen bg-cream"></div>
</template>

<script setup>
// The homepage hero now serves as the patient hub, so /portal is no longer a
// standalone page. Admins go to their dashboard; everyone else goes home.
definePageMeta({ layout: false, middleware: ['auth'] })

const { isAdmin, loading } = useAuth()

watch(loading, (isLoading) => {
  if (!isLoading) navigateTo(isAdmin.value ? '/portal/admin' : '/', { replace: true })
}, { immediate: true })
</script>
