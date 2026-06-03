<template>
  <div>
    <!-- Portal hint for logged-in users -->
    <div v-if="isLoggedIn" class="pt-28 md:pt-36 pb-0">
      <div class="max-w-6xl mx-auto px-5 md:px-8">
        <div class="bg-sage/5 border border-sage/15 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-full bg-sage/10 flex items-center justify-center flex-shrink-0">
              <i class="fa-solid fa-calendar-check text-sage text-sm"></i>
            </div>
            <p class="text-sm text-body">{{ $t('cta.portal_hint') }}</p>
          </div>
          <NuxtLink to="/book" class="btn-primary text-xs px-5 py-2.5 whitespace-nowrap">
            {{ $t('nav.book') }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <section :class="isLoggedIn ? 'pt-6 md:pt-8' : 'pt-32 md:pt-40'">
      <ContactForm fullWidth bgClass="" />
    </section>
    <WaveDivider fromColor="#F5F1EC" toColor="#2D3A24" :variant="1" />
    <NewsletterCTA />
    <WaveDivider fromColor="#2D3A24" toColor="#FFFFFF" :variant="2" />
    <FaqAccordion />
  </div>
</template>

<script setup>
const { t } = useI18n()
const { isLoggedIn } = useAuth()

useHead({
  title: computed(() => t('meta.contact.title')),
  meta: [
    { name: 'description', content: computed(() => t('meta.contact.description')) },
    { property: 'og:title', content: computed(() => t('meta.contact.og_title')) },
    { property: 'og:description', content: computed(() => t('meta.contact.og_description')) },
  ],
})
</script>
