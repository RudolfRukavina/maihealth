<template>
  <div>
    <section class="pt-32 md:pt-40">
      <ContactForm fullWidth bgClass="" />
    </section>
    <WaveDivider fromColor="#F5F1EC" toColor="#2D3A24" :variant="1" :height="80" />
    <NewsletterCTA />
    <WaveDivider fromColor="#2D3A24" toColor="#FFFFFF" :variant="2" :height="70" />
    <FaqAccordion />
  </div>
</template>

<script setup>
useHead({ title: 'Contact — Dr. Mai Jimenez' })
</script>
